<?php
/**
 * Plugin Name: FateFinder Chart Calculator
 * Plugin URI: https://www.fatefinder.org
 * Description: Free astrology chart calculator - Calculate Big Three (Sun, Moon, Ascendant) with AI-generated insights
 * Version: 1.0.0
 * Author: FateFinder
 * Author URI: https://www.fatefinder.org
 * License: GPL v2 or later
 * Text Domain: fatefinder-chart-calculator
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class FateFinder_Chart_Calculator {
    
    private static $instance = null;
    private $sweph_path;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        // Set Swiss Ephemeris path (you may need to download and include sweph library)
        // Ensure we get the directory path, not the file path
        $plugin_dir = dirname(__FILE__);
        $this->sweph_path = $plugin_dir . '/includes/sweph/';
        
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_shortcode('fatefinder_chart_form', array($this, 'render_chart_form'));
        add_action('wp_ajax_fatefinder_calculate_chart', array($this, 'ajax_calculate_chart'));
        add_action('wp_ajax_nopriv_fatefinder_calculate_chart', array($this, 'ajax_calculate_chart'));
        add_action('wp_ajax_fatefinder_geocode_location', array($this, 'ajax_geocode_location'));
        add_action('wp_ajax_nopriv_fatefinder_geocode_location', array($this, 'ajax_geocode_location'));
        
        // Admin settings
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        add_filter('plugin_action_links_' . plugin_basename(__FILE__), array($this, 'add_plugin_action_links'));
    }
    
    public function init() {
        // Plugin initialization
    }
    
    public function enqueue_scripts() {
        // Get plugin directory URL - plugin_dir_url() returns the directory containing the file
        $plugin_url = plugins_url('', __FILE__);
        
        wp_enqueue_style('fatefinder-chart-calculator', $plugin_url . '/assets/chart-style.css', array(), '1.0.0');
        wp_enqueue_script('fatefinder-chart-calculator', $plugin_url . '/assets/chart-script.js', array('jquery'), '1.0.0', true);
        
        wp_localize_script('fatefinder-chart-calculator', 'fatefinderChart', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('fatefinder_chart_nonce')
        ));
    }
    
    /**
     * Render the chart calculation form shortcode
     */
    public function render_chart_form($atts) {
        ob_start();
        ?>
        <div class="fatefinder-chart-container">
            <div class="fatefinder-chart-form-wrapper">
                <h2 class="fatefinder-chart-title">Free Chart Calculator</h2>
                <p class="fatefinder-chart-subtitle">Discover Your Big Three: Sun, Moon & Ascendant</p>
                
                <form id="fatefinder-chart-form" class="fatefinder-chart-form">
                    <div class="fatefinder-form-group">
                        <label for="birth-date">Birth Date</label>
                        <input type="date" id="birth-date" name="birth_date" required>
                    </div>
                    
                    <div class="fatefinder-form-group">
                        <label for="birth-time">Birth Time</label>
                        <input type="time" id="birth-time" name="birth_time" required>
                    </div>
                    
                    <div class="fatefinder-form-group">
                        <label for="birth-location">Birth Location (City, Country)</label>
                        <input type="text" id="birth-location" name="birth_location" placeholder="e.g., New York, USA" required>
                        <small class="fatefinder-help-text">We'll automatically find the coordinates</small>
                    </div>
                    
                    <button type="submit" id="fatefinder-calculate-btn" class="fatefinder-chart-button">
                        Calculate My Chart
                    </button>
                </form>
            
            <div id="fatefinder-chart-loading" class="fatefinder-chart-loading" style="display: none;">
                <div class="fatefinder-loading-spinner"></div>
                <div class="fatefinder-loading-text">🔮 Calculating your chart...</div>
            </div>
            
            <div id="fatefinder-chart-result" class="fatefinder-chart-result" style="display: none;">
                    <!-- Results will be inserted here -->
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * AJAX handler for geocoding location
     */
    public function ajax_geocode_location() {
        check_ajax_referer('fatefinder_chart_nonce', 'nonce');
        
        $location = sanitize_text_field($_POST['location']);
        
        if (empty($location)) {
            wp_send_json_error(array('message' => 'Location is required'));
        }
        
        // Use Nominatim API for geocoding
        $url = 'https://nominatim.openstreetmap.org/search?q=' . urlencode($location) . '&format=json&limit=1';
        
        $response = wp_remote_get($url, array(
            'headers' => array(
                'User-Agent' => 'FateFinder Chart Calculator/1.0'
            ),
            'timeout' => 10
        ));
        
        if (is_wp_error($response)) {
            wp_send_json_error(array('message' => 'Failed to geocode location'));
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        if (empty($data) || !isset($data[0]['lat']) || !isset($data[0]['lon'])) {
            wp_send_json_error(array('message' => 'Location not found. Please try a different format (e.g., "City, Country")'));
        }
        
        wp_send_json_success(array(
            'lat' => floatval($data[0]['lat']),
            'lon' => floatval($data[0]['lon']),
            'display_name' => $data[0]['display_name']
        ));
    }
    
    /**
     * AJAX handler for chart calculation
     */
    public function ajax_calculate_chart() {
        check_ajax_referer('fatefinder_chart_nonce', 'nonce');
        
        $birth_date = sanitize_text_field($_POST['birth_date']);
        $birth_time = sanitize_text_field($_POST['birth_time']);
        $lat = floatval($_POST['lat']);
        $lon = floatval($_POST['lon']);
        
        // Validate inputs
        if (empty($birth_date) || empty($birth_time) || empty($lat) || empty($lon)) {
            wp_send_json_error(array('message' => 'All fields are required'));
        }
        
        // Calculate Big Three
        $big_three = $this->calculate_big_three($birth_date, $birth_time, $lat, $lon);
        
        if (is_wp_error($big_three)) {
            wp_send_json_error(array('message' => $big_three->get_error_message()));
        }
        
        // Generate AI snapshot
        $ai_snapshot = $this->generate_ai_snapshot($big_three);
        
        if (is_wp_error($ai_snapshot)) {
            // Log the error for debugging
            error_log('FateFinder Chart Calculator AI Error: ' . $ai_snapshot->get_error_message());
            
            // Check if it's a missing API key error
            if ($ai_snapshot->get_error_code() === 'no_api_key') {
                wp_send_json_success(array(
                    'big_three' => $big_three,
                    'snapshot' => 'AI insights are not available. Please configure your API key in WordPress Settings > Chart Calculator.',
                    'ai_error' => true,
                    'error_code' => 'no_api_key'
                ));
            }
            
            // If AI fails, still return the basic results with helpful message
            wp_send_json_success(array(
                'big_three' => $big_three,
                'snapshot' => 'Unable to generate AI insights at this time. Please check your API key configuration or try again later.',
                'ai_error' => true,
                'error_message' => $ai_snapshot->get_error_message()
            ));
        }
        
        wp_send_json_success(array(
            'big_three' => $big_three,
            'snapshot' => $ai_snapshot
        ));
    }
    
    /**
     * Calculate Big Three: Sun Sign, Moon Sign, Ascendant Sign
     * 
     * @param string $date Birth date (YYYY-MM-DD)
     * @param string $time Birth time (HH:MM)
     * @param float $lat Latitude
     * @param float $lon Longitude
     * @return array|WP_Error Array with sun_sign, moon_sign, ascendant_sign or WP_Error
     */
    private function calculate_big_three($date, $time, $lat, $lon) {
        // Parse date and time
        $datetime = DateTime::createFromFormat('Y-m-d H:i', $date . ' ' . $time, new DateTimeZone('UTC'));
        
        if (!$datetime) {
            return new WP_Error('invalid_datetime', 'Invalid date or time format');
        }
        
        // Convert to Julian Day Number
        $jd = $this->gregorian_to_julian($datetime);
        
        // Calculate local sidereal time
        $lst = $this->calculate_lst($datetime, $lon);
        
        // For now, we'll use a simplified calculation
        // In production, you should use Swiss Ephemeris library (sweph-php)
        // This is a placeholder that uses approximate calculations
        
        $sun_sign = $this->calculate_sun_sign($datetime);
        $moon_sign = $this->calculate_moon_sign($datetime, $lat, $lon);
        $ascendant_sign = $this->calculate_ascendant($lst, $lat);
        
        return array(
            'sun_sign' => $sun_sign,
            'moon_sign' => $moon_sign,
            'ascendant_sign' => $ascendant_sign,
            'birth_date' => $date,
            'birth_time' => $time,
            'coordinates' => array('lat' => $lat, 'lon' => $lon)
        );
    }
    
    /**
     * Simplified Sun Sign calculation (approximate)
     * Note: For accurate calculations, use Swiss Ephemeris
     */
    private function calculate_sun_sign($datetime) {
        $month = (int)$datetime->format('n');
        $day = (int)$datetime->format('j');
        
        $signs = array(
            array('name' => 'Capricorn', 'start' => array(12, 22), 'end' => array(1, 19)),
            array('name' => 'Aquarius', 'start' => array(1, 20), 'end' => array(2, 18)),
            array('name' => 'Pisces', 'start' => array(2, 19), 'end' => array(3, 20)),
            array('name' => 'Aries', 'start' => array(3, 21), 'end' => array(4, 19)),
            array('name' => 'Taurus', 'start' => array(4, 20), 'end' => array(5, 20)),
            array('name' => 'Gemini', 'start' => array(5, 21), 'end' => array(6, 20)),
            array('name' => 'Cancer', 'start' => array(6, 21), 'end' => array(7, 22)),
            array('name' => 'Leo', 'start' => array(7, 23), 'end' => array(8, 22)),
            array('name' => 'Virgo', 'start' => array(8, 23), 'end' => array(9, 22)),
            array('name' => 'Libra', 'start' => array(9, 23), 'end' => array(10, 22)),
            array('name' => 'Scorpio', 'start' => array(10, 23), 'end' => array(11, 21)),
            array('name' => 'Sagittarius', 'start' => array(11, 22), 'end' => array(12, 21))
        );
        
        foreach ($signs as $sign) {
            $start_month = $sign['start'][0];
            $start_day = $sign['start'][1];
            $end_month = $sign['end'][0];
            $end_day = $sign['end'][1];
            
            if ($month == $start_month && $day >= $start_day) {
                return $sign['name'];
            }
            if ($month == $end_month && $day <= $end_day) {
                return $sign['name'];
            }
            // Handle year boundary (Capricorn)
            if ($start_month == 12 && $month == 12 && $day >= $start_day) {
                return $sign['name'];
            }
            if ($end_month == 1 && $month == 1 && $day <= $end_day) {
                return $sign['name'];
            }
        }
        
        return 'Unknown';
    }
    
    /**
     * Simplified Moon Sign calculation (approximate)
     * Note: For accurate calculations, use Swiss Ephemeris
     */
    private function calculate_moon_sign($datetime, $lat, $lon) {
        // This is a placeholder - actual moon sign requires ephemeris data
        // For now, return a random sign (in production, use sweph)
        $signs = array('Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces');
        
        // Use date as seed for consistency
        $seed = (int)$datetime->format('Ymd') + (int)$datetime->format('Hi');
        return $signs[$seed % 12];
    }
    
    /**
     * Calculate Ascendant (Rising Sign)
     */
    private function calculate_ascendant($lst, $lat) {
        // Simplified ascendant calculation
        // Actual calculation requires Swiss Ephemeris
        $signs = array('Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces');
        
        // Approximate based on LST
        $index = floor($lst / 2) % 12;
        return $signs[$index];
    }
    
    /**
     * Convert Gregorian date to Julian Day Number
     */
    private function gregorian_to_julian($datetime) {
        $year = (int)$datetime->format('Y');
        $month = (int)$datetime->format('n');
        $day = (int)$datetime->format('j');
        $hour = (int)$datetime->format('G');
        $minute = (int)$datetime->format('i');
        
        if ($month <= 2) {
            $year -= 1;
            $month += 12;
        }
        
        $a = floor($year / 100);
        $b = 2 - $a + floor($a / 4);
        
        $jd = floor(365.25 * ($year + 4716)) + floor(30.6001 * ($month + 1)) + $day + $b - 1524.5;
        $jd += ($hour + $minute / 60) / 24;
        
        return $jd;
    }
    
    /**
     * Calculate Local Sidereal Time
     */
    private function calculate_lst($datetime, $lon) {
        $jd = $this->gregorian_to_julian($datetime);
        
        // Calculate Greenwich Sidereal Time
        $t = ($jd - 2451545.0) / 36525.0;
        $gst = 280.46061837 + 360.98564736629 * ($jd - 2451545.0) + $t * $t * (0.000387933 - $t / 38710000.0);
        $gst = fmod($gst, 360.0);
        if ($gst < 0) $gst += 360.0;
        
        // Convert to Local Sidereal Time
        $lst = $gst + $lon;
        $lst = fmod($lst, 360.0);
        if ($lst < 0) $lst += 360.0;
        
        return $lst;
    }
    
    /**
     * Generate AI snapshot using Gemini API
     */
    private function generate_ai_snapshot($big_three) {
        // Get API key from options (you should add this to plugin settings)
        $api_key = get_option('fatefinder_gemini_api_key', '');
        
        if (empty($api_key)) {
            // Fallback to OpenAI if Gemini key not set
            return $this->generate_ai_snapshot_openai($big_three);
        }
        
        $prompt = $this->build_ai_prompt($big_three);
        
        // Use the latest Gemini API endpoint and model
        // Try gemini-2.0-flash first (faster and free), fallback to other models if needed
        $model = 'gemini-2.0-flash';
        $url = 'https://generativelanguage.googleapis.com/v1beta/models/' . $model . ':generateContent?key=' . $api_key;
        
        $response = wp_remote_post($url, array(
            'headers' => array(
                'Content-Type' => 'application/json'
            ),
            'body' => json_encode(array(
                'contents' => array(array(
                    'parts' => array(array(
                        'text' => $prompt
                    ))
                ))
            )),
            'timeout' => 30
        ));
        
        if (is_wp_error($response)) {
            return new WP_Error('ai_error', 'Failed to connect to AI service');
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        // Check for API errors
        if (isset($data['error'])) {
            $error_message = isset($data['error']['message']) ? $data['error']['message'] : 'API error occurred';
            
            // If model not found, try alternative models
            if (strpos($error_message, 'not found') !== false || strpos($error_message, 'not supported') !== false) {
                // Try multiple fallback models in order
                $fallback_models = array(
                    'gemini-2.0-flash-lite',
                    'gemini-1.5-flash',
                    'gemini-1.5-flash-latest',
                    'gemini-1.5-pro',
                    'gemini-1.5-pro-latest',
                    'gemini-pro'
                );
                
                // First try v1beta API
                foreach ($fallback_models as $fallback_model) {
                    $fallback_result = $this->try_alternative_gemini_model($big_three, $api_key, $fallback_model, 'v1beta');
                    if (!is_wp_error($fallback_result)) {
                        return $fallback_result;
                    }
                }
                
                // If v1beta fails, try v1 API
                foreach ($fallback_models as $fallback_model) {
                    $fallback_result = $this->try_alternative_gemini_model($big_three, $api_key, $fallback_model, 'v1');
                    if (!is_wp_error($fallback_result)) {
                        return $fallback_result;
                    }
                }
                
                // If all models fail, return the original error
                return new WP_Error('ai_error', 'All Gemini models failed. Please check your API key and available models.');
            }
            
            return new WP_Error('ai_error', 'Gemini API Error: ' . $error_message);
        }
        
        if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
            return $data['candidates'][0]['content']['parts'][0]['text'];
        }
        
        // Log the response for debugging
        error_log('FateFinder Gemini API Response: ' . print_r($data, true));
        
        return new WP_Error('ai_error', 'Invalid response from Gemini API. Please check API key and try again.');
    }
    
    /**
     * Try alternative Gemini model if primary fails
     */
    private function try_alternative_gemini_model($big_three, $api_key, $model, $api_version = 'v1beta') {
        $prompt = $this->build_ai_prompt($big_three);
        $url = 'https://generativelanguage.googleapis.com/' . $api_version . '/models/' . $model . ':generateContent?key=' . $api_key;
        
        $response = wp_remote_post($url, array(
            'headers' => array(
                'Content-Type' => 'application/json'
            ),
            'body' => json_encode(array(
                'contents' => array(array(
                    'parts' => array(array(
                        'text' => $prompt
                    ))
                ))
            )),
            'timeout' => 30
        ));
        
        if (is_wp_error($response)) {
            return new WP_Error('ai_error', 'Failed to connect to Gemini API');
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        if (isset($data['error'])) {
            $error_message = isset($data['error']['message']) ? $data['error']['message'] : 'API error occurred';
            // Return error so caller can try next model
            return new WP_Error('ai_error', 'Gemini API Error: ' . $error_message);
        }
        
        if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
            return trim($data['candidates'][0]['content']['parts'][0]['text']);
        }
        
        return new WP_Error('ai_error', 'Invalid response from Gemini API');
    }
    
    /**
     * Generate AI snapshot using OpenAI API (fallback)
     */
    private function generate_ai_snapshot_openai($big_three) {
        $api_key = get_option('fatefinder_openai_api_key', '');
        
        if (empty($api_key)) {
            return new WP_Error('no_api_key', 'AI API key not configured');
        }
        
        $prompt = $this->build_ai_prompt($big_three);
        
        $response = wp_remote_post('https://api.openai.com/v1/chat/completions', array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $api_key,
                'Content-Type' => 'application/json'
            ),
            'body' => json_encode(array(
                'model' => 'gpt-3.5-turbo',
                'messages' => array(array(
                        'role' => 'system',
                    'content' => 'You are a modern, empathetic, and insightful astrologer.'
                ), array(
                        'role' => 'user',
                    'content' => $prompt
                )),
                'max_tokens' => 300,
                'temperature' => 0.7
            )),
            'timeout' => 30
        ));
        
        if (is_wp_error($response)) {
            return new WP_Error('ai_error', 'Failed to connect to AI service');
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        // Check for API errors
        if (isset($data['error'])) {
            $error_message = isset($data['error']['message']) ? $data['error']['message'] : 'API error occurred';
            return new WP_Error('ai_error', 'OpenAI API Error: ' . $error_message);
        }
        
        if (isset($data['choices'][0]['message']['content'])) {
            return $data['choices'][0]['message']['content'];
        }
        
        // Log the response for debugging
        error_log('FateFinder OpenAI API Response: ' . print_r($data, true));
        
        return new WP_Error('ai_error', 'Invalid response from OpenAI API. Please check API key and try again.');
    }
    
    /**
     * Build AI prompt for Big Three snapshot
     */
    private function build_ai_prompt($big_three) {
        return "Act as a modern, empathetic, and insightful astrologer. Your goal is to generate a concise, encouraging 'Big Three Snapshot' (under 200 words) for the user. 

Based on their:
- Sun Sign: {$big_three['sun_sign']}
- Moon Sign: {$big_three['moon_sign']}
- Ascendant Sign: {$big_three['ascendant_sign']}

Synthesize a summary of their core self, emotional needs, and social presentation. Use contemporary language and focus on empowering self-understanding. Be warm, insightful, and avoid overly technical astrological jargon. Make it personal and relatable.";
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        // Add to Settings menu
        add_options_page(
            'FateFinder Chart Calculator Settings',
            'Chart Calculator',
            'manage_options',
            'fatefinder-chart-calculator',
            array($this, 'render_settings_page')
        );
        
        // Also add as a top-level menu item for easier access
        add_menu_page(
            'Chart Calculator',
            'Chart Calculator',
            'manage_options',
            'fatefinder-chart-calculator',
            array($this, 'render_settings_page'),
            'dashicons-chart-line',
            30
        );
    }
    
    /**
     * Add settings link to plugin action links
     */
    public function add_plugin_action_links($links) {
        $settings_link = '<a href="' . admin_url('admin.php?page=fatefinder-chart-calculator') . '">' . __('Settings', 'fatefinder-chart-calculator') . '</a>';
        array_unshift($links, $settings_link);
        return $links;
    }
    
    /**
     * Register settings
     */
    public function register_settings() {
        register_setting('fatefinder_chart_settings', 'fatefinder_gemini_api_key');
        register_setting('fatefinder_chart_settings', 'fatefinder_openai_api_key');
    }
    
    /**
     * Render settings page
     */
    public function render_settings_page() {
        if (!current_user_can('manage_options')) {
            return;
        }
        ?>
        <div class="wrap">
            <h1>FateFinder Chart Calculator Settings</h1>
            <form method="post" action="options.php">
                <?php settings_fields('fatefinder_chart_settings'); ?>
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="fatefinder_gemini_api_key">Gemini API Key</label>
                        </th>
                        <td>
                            <input type="text" 
                                   id="fatefinder_gemini_api_key" 
                                   name="fatefinder_gemini_api_key" 
                                   value="<?php echo esc_attr(get_option('fatefinder_gemini_api_key')); ?>" 
                                   class="regular-text" />
                            <p class="description">
                                Get your API key from <a href="https://makersuite.google.com/app/apikey" target="_blank">Google AI Studio</a>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="fatefinder_openai_api_key">OpenAI API Key (Fallback)</label>
                        </th>
                        <td>
                            <input type="text" 
                                   id="fatefinder_openai_api_key" 
                                   name="fatefinder_openai_api_key" 
                                   value="<?php echo esc_attr(get_option('fatefinder_openai_api_key')); ?>" 
                                   class="regular-text" />
                            <p class="description">
                                Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank">OpenAI Platform</a>
                            </p>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }
}

// Initialize the plugin
FateFinder_Chart_Calculator::get_instance();
