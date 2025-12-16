<?php
/**
 * Plugin Name: FateFinder Synastry Calculator
 * Plugin URI: https://www.fatefinder.org
 * Description: Relationship compatibility calculator - Analyze energy interactions between two people based on synastry aspects
 * Version: 1.0.0
 * Author: FateFinder
 * Author URI: https://www.fatefinder.org
 * License: GPL v2 or later
 * Text Domain: fatefinder-synastry
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class FateFinder_Synastry {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_shortcode('fatefinder_synastry_form', array($this, 'render_synastry_form'));
        add_action('wp_ajax_fatefinder_calculate_synastry', array($this, 'ajax_calculate_synastry'));
        add_action('wp_ajax_nopriv_fatefinder_calculate_synastry', array($this, 'ajax_calculate_synastry'));
        add_action('wp_ajax_fatefinder_geocode_synastry', array($this, 'ajax_geocode_location'));
        add_action('wp_ajax_nopriv_fatefinder_geocode_synastry', array($this, 'ajax_geocode_location'));
        
        // Admin settings
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        add_filter('plugin_action_links_' . plugin_basename(__FILE__), array($this, 'add_plugin_action_links'));
    }
    
    public function init() {
        // Plugin initialization
    }
    
    public function enqueue_scripts() {
        wp_enqueue_style('fatefinder-synastry', plugins_url('', __FILE__) . '/assets/synastry-style.css', array(), '1.0.0');
        wp_enqueue_script('fatefinder-synastry', plugins_url('', __FILE__) . '/assets/synastry-script.js', array('jquery'), '1.0.0', true);
        
        wp_localize_script('fatefinder-synastry', 'fatefinderSynastry', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('fatefinder_synastry_nonce'),
            'crystalShopUrl' => get_option('fatefinder_crystal_shop_url', '#'),
            'consultationUrl' => get_option('fatefinder_consultation_url', '#')
        ));
    }
    
    /**
     * Render the synastry form shortcode
     */
    public function render_synastry_form($atts) {
        ob_start();
        ?>
        <div class="fatefinder-synastry-container">
            <div class="fatefinder-synastry-form-wrapper">
                <h2 class="fatefinder-synastry-title">Relationship Compatibility Calculator</h2>
                <p class="fatefinder-synastry-subtitle">Discover Your Energy Interactions: Synastry Analysis</p>
                
                <form id="fatefinder-synastry-form" class="fatefinder-synastry-form">
                    <!-- Person A Section -->
                    <div class="fatefinder-person-section">
                        <h3 class="fatefinder-person-title">Your Information</h3>
                        <div class="fatefinder-form-group">
                            <label for="person-a-date">Birth Date</label>
                            <input type="date" id="person-a-date" name="person_a_date" required>
                        </div>
                        <div class="fatefinder-form-group">
                            <label for="person-a-time">Birth Time</label>
                            <input type="time" id="person-a-time" name="person_a_time" required>
                        </div>
                        <div class="fatefinder-form-group">
                            <label for="person-a-location">Birth Location (City, Country)</label>
                            <input type="text" id="person-a-location" name="person_a_location" placeholder="e.g., New York, USA" required>
                        </div>
                    </div>
                    
                    <!-- Person B Section -->
                    <div class="fatefinder-person-section">
                        <h3 class="fatefinder-person-title">Partner's Information</h3>
                        <div class="fatefinder-form-group">
                            <label for="person-b-date">Birth Date</label>
                            <input type="date" id="person-b-date" name="person_b_date" required>
                        </div>
                        <div class="fatefinder-form-group">
                            <label for="person-b-time">Birth Time</label>
                            <input type="time" id="person-b-time" name="person_b_time" required>
                        </div>
                        <div class="fatefinder-form-group">
                            <label for="person-b-location">Birth Location (City, Country)</label>
                            <input type="text" id="person-b-location" name="person_b_location" placeholder="e.g., Los Angeles, USA" required>
                        </div>
                    </div>
                    
                    <button type="submit" id="fatefinder-synastry-btn" class="fatefinder-synastry-button">
                        Calculate Compatibility
                    </button>
                </form>
                
                <div id="fatefinder-synastry-loading" class="fatefinder-synastry-loading" style="display: none;">
                    <div class="fatefinder-loading-spinner"></div>
                    <div class="fatefinder-loading-text">🔮 Analyzing your energy interactions...</div>
                </div>
                
                <div id="fatefinder-synastry-result" class="fatefinder-synastry-result" style="display: none;">
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
        check_ajax_referer('fatefinder_synastry_nonce', 'nonce');
        
        $location = sanitize_text_field($_POST['location']);
        
        if (empty($location)) {
            wp_send_json_error(array('message' => 'Location is required'));
        }
        
        // Use Nominatim API for geocoding
        $url = 'https://nominatim.openstreetmap.org/search?q=' . urlencode($location) . '&format=json&limit=1';
        
        $response = wp_remote_get($url, array(
            'headers' => array(
                'User-Agent' => 'FateFinder Synastry Calculator/1.0'
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
     * AJAX handler for synastry calculation
     */
    public function ajax_calculate_synastry() {
        check_ajax_referer('fatefinder_synastry_nonce', 'nonce');
        
        // Person A data
        $person_a_date = sanitize_text_field($_POST['person_a_date']);
        $person_a_time = sanitize_text_field($_POST['person_a_time']);
        $person_a_lat = floatval($_POST['person_a_lat']);
        $person_a_lon = floatval($_POST['person_a_lon']);
        
        // Person B data
        $person_b_date = sanitize_text_field($_POST['person_b_date']);
        $person_b_time = sanitize_text_field($_POST['person_b_time']);
        $person_b_lat = floatval($_POST['person_b_lat']);
        $person_b_lon = floatval($_POST['person_b_lon']);
        
        // Validate inputs
        if (empty($person_a_date) || empty($person_a_time) || empty($person_b_date) || empty($person_b_time)) {
            wp_send_json_error(array('message' => 'All fields are required'));
        }
        
        // Calculate planetary positions for both persons
        $person_a_planets = $this->calculate_planetary_positions($person_a_date, $person_a_time, $person_a_lat, $person_a_lon);
        $person_b_planets = $this->calculate_planetary_positions($person_b_date, $person_b_time, $person_b_lat, $person_b_lon);
        
        if (is_wp_error($person_a_planets) || is_wp_error($person_b_planets)) {
            wp_send_json_error(array('message' => 'Failed to calculate planetary positions'));
        }
        
        // Calculate synastry aspects
        $aspects = $this->calculate_synastry_aspects($person_a_planets, $person_b_planets);
        
        // Generate AI analysis
        $ai_analysis = $this->generate_synastry_analysis($aspects, $person_a_planets, $person_b_planets);
        
        if (is_wp_error($ai_analysis)) {
            wp_send_json_success(array(
                'aspects' => $aspects,
                'person_a_planets' => $person_a_planets,
                'person_b_planets' => $person_b_planets,
                'analysis' => 'Unable to generate AI analysis at this time. Please check your API key configuration.',
                'ai_error' => true
            ));
        }
        
        wp_send_json_success(array(
            'aspects' => $aspects,
            'person_a_planets' => $person_a_planets,
            'person_b_planets' => $person_b_planets,
            'analysis' => $ai_analysis
        ));
    }
    
    /**
     * Calculate planetary positions for a person
     * Returns array with Sun, Moon, Mercury, Venus, Mars positions
     */
    private function calculate_planetary_positions($date, $time, $lat, $lon) {
        $datetime = DateTime::createFromFormat('Y-m-d H:i', $date . ' ' . $time, new DateTimeZone('UTC'));
        
        if (!$datetime) {
            return new WP_Error('invalid_datetime', 'Invalid date or time format');
        }
        
        // Simplified calculation - in production, use Swiss Ephemeris
        // For now, return approximate positions based on date
        $month = (int)$datetime->format('n');
        $day = (int)$datetime->format('j');
        
        // Calculate approximate positions (simplified)
        $sun_sign = $this->calculate_sun_sign($datetime);
        $moon_sign = $this->calculate_moon_sign_approx($datetime);
        $mercury_sign = $this->calculate_mercury_sign_approx($datetime);
        $venus_sign = $this->calculate_venus_sign_approx($datetime);
        $mars_sign = $this->calculate_mars_sign_approx($datetime);
        
        return array(
            'sun' => array('sign' => $sun_sign, 'degree' => ($day * 12) % 360),
            'moon' => array('sign' => $moon_sign, 'degree' => (($month + $day) * 10) % 360),
            'mercury' => array('sign' => $mercury_sign, 'degree' => (($month * 30) + ($day * 2)) % 360),
            'venus' => array('sign' => $venus_sign, 'degree' => (($month * 25) + ($day * 3)) % 360),
            'mars' => array('sign' => $mars_sign, 'degree' => (($month * 20) + ($day * 4)) % 360)
        );
    }
    
    /**
     * Calculate synastry aspects between two people's planets
     * Returns simplified list of key inter-chart aspects
     */
    private function calculate_synastry_aspects($person_a_planets, $person_b_planets) {
        $aspects = array();
        $orb = 8; // Orb tolerance in degrees
        
        // Define aspect types and their angle ranges
        $aspect_types = array(
            'conjunction' => array('angle' => 0, 'tolerance' => $orb, 'symbol' => '☌'),
            'opposition' => array('angle' => 180, 'tolerance' => $orb, 'symbol' => '☍'),
            'square' => array('angle' => 90, 'tolerance' => $orb, 'symbol' => '□'),
            'trine' => array('angle' => 120, 'tolerance' => $orb, 'symbol' => '△'),
            'sextile' => array('angle' => 60, 'tolerance' => $orb, 'symbol' => '⚹')
        );
        
        // Planet names for display
        $planet_names = array(
            'sun' => 'Sun',
            'moon' => 'Moon',
            'mercury' => 'Mercury',
            'venus' => 'Venus',
            'mars' => 'Mars'
        );
        
        // Calculate aspects between all planet pairs
        foreach ($person_a_planets as $planet_a => $pos_a) {
            foreach ($person_b_planets as $planet_b => $pos_b) {
                $angle = abs($pos_a['degree'] - $pos_b['degree']);
                if ($angle > 180) {
                    $angle = 360 - $angle;
                }
                
                // Check each aspect type
                foreach ($aspect_types as $aspect_name => $aspect_data) {
                    $target_angle = $aspect_data['angle'];
                    $tolerance = $aspect_data['tolerance'];
                    
                    if (abs($angle - $target_angle) <= $tolerance) {
                        $aspects[] = array(
                            'planet_a' => $planet_names[$planet_a],
                            'planet_b' => $planet_names[$planet_b],
                            'aspect' => $aspect_name,
                            'symbol' => $aspect_data['symbol'],
                            'angle' => $angle,
                            'description' => $person_a_planets[$planet_a]['sign'] . ' ' . $planet_names[$planet_a] . ' ' . 
                                           $aspect_data['symbol'] . ' ' . 
                                           $person_b_planets[$planet_b]['sign'] . ' ' . $planet_names[$planet_b]
                        );
                        break; // Only record one aspect per pair
                    }
                }
            }
        }
        
        return $aspects;
    }
    
    /**
     * Generate AI analysis of synastry aspects
     */
    private function generate_synastry_analysis($aspects, $person_a_planets, $person_b_planets) {
        $api_key = get_option('fatefinder_gemini_api_key', '');
        
        if (empty($api_key)) {
            return $this->generate_synastry_analysis_openai($aspects, $person_a_planets, $person_b_planets);
        }
        
        $prompt = $this->build_synastry_prompt($aspects, $person_a_planets, $person_b_planets);
        
        // Try multiple models
        $models = array('gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro');
        
        foreach ($models as $model) {
            $url = 'https://generativelanguage.googleapis.com/v1beta/models/' . $model . ':generateContent?key=' . $api_key;
            
            $response = wp_remote_post($url, array(
                'headers' => array('Content-Type' => 'application/json'),
                'body' => json_encode(array(
                    'contents' => array(array(
                        'parts' => array(array('text' => $prompt))
                    ))
                )),
                'timeout' => 30
            ));
            
            if (is_wp_error($response)) {
                continue;
            }
            
            $body = wp_remote_retrieve_body($response);
            $data = json_decode($body, true);
            
            if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
                return trim($data['candidates'][0]['content']['parts'][0]['text']);
            }
        }
        
        return new WP_Error('ai_error', 'Failed to generate analysis');
    }
    
    /**
     * Generate analysis using OpenAI API (fallback)
     */
    private function generate_synastry_analysis_openai($aspects, $person_a_planets, $person_b_planets) {
        $api_key = get_option('fatefinder_openai_api_key', '');
        
        if (empty($api_key)) {
            return new WP_Error('no_api_key', 'AI API key not configured');
        }
        
        $prompt = $this->build_synastry_prompt($aspects, $person_a_planets, $person_b_planets);
        
        $response = wp_remote_post('https://api.openai.com/v1/chat/completions', array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $api_key,
                'Content-Type' => 'application/json'
            ),
            'body' => json_encode(array(
                'model' => 'gpt-3.5-turbo',
                'messages' => array(
                    array('role' => 'system', 'content' => 'You are a relationship dynamics astrologer specializing in synastry.'),
                    array('role' => 'user', 'content' => $prompt)
                ),
                'max_tokens' => 400,
                'temperature' => 0.7
            )),
            'timeout' => 30
        ));
        
        if (is_wp_error($response)) {
            return new WP_Error('ai_error', 'Failed to connect to AI service');
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        if (isset($data['choices'][0]['message']['content'])) {
            return trim($data['choices'][0]['message']['content']);
        }
        
        return new WP_Error('ai_error', 'Invalid response from AI service');
    }
    
    /**
     * Build AI prompt for synastry analysis
     */
    private function build_synastry_prompt($aspects, $person_a_planets, $person_b_planets) {
        $aspects_text = '';
        foreach ($aspects as $aspect) {
            $aspects_text .= "- " . $aspect['description'] . " (" . ucfirst($aspect['aspect']) . ")\n";
        }
        
        return "Act as a relationship dynamics astrologer specializing in synastry. Your task is to analyze the provided key aspects between two individuals and generate an 'Energy Interaction Analysis' (max 300 words).

The analysis must be modern, objective, and focus on practical dynamics. 

**Key Aspects Found:**
" . $aspects_text . "

**Analysis Requirements:**
1. Start by identifying the **primary harmonious areas** (using trine/sextile aspects) with encouraging language.
2. Clearly point out **potential conflict areas** (using square/opposition aspects) with gentle but firm language.
3. Use specific phrasing like: 'In communication, you are highly compatible (Mercury Harmony), but in emotional needs, conflict may arise (Moon Square).' based on the actual aspects.
4. Focus on energy interactions, not compatibility scores.
5. Be practical and actionable.

**Example Output Style:** 'You find easy emotional flow because of [Aspect 1], but you may clash over shared ambition due to [Aspect 2].'

Generate the analysis now:";
    }
    
    // Helper methods for simplified planet calculations
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
            if ($start_month == 12 && $month == 12 && $day >= $start_day) {
                return $sign['name'];
            }
            if ($end_month == 1 && $month == 1 && $day <= $end_day) {
                return $sign['name'];
            }
        }
        
        return 'Unknown';
    }
    
    private function calculate_moon_sign_approx($datetime) {
        $signs = array('Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces');
        $seed = (int)$datetime->format('Ymd') + (int)$datetime->format('Hi');
        return $signs[$seed % 12];
    }
    
    private function calculate_mercury_sign_approx($datetime) {
        $signs = array('Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces');
        $seed = (int)$datetime->format('Ymd') + (int)$datetime->format('Hi') + 1;
        return $signs[$seed % 12];
    }
    
    private function calculate_venus_sign_approx($datetime) {
        $signs = array('Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces');
        $seed = (int)$datetime->format('Ymd') + (int)$datetime->format('Hi') + 2;
        return $signs[$seed % 12];
    }
    
    private function calculate_mars_sign_approx($datetime) {
        $signs = array('Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces');
        $seed = (int)$datetime->format('Ymd') + (int)$datetime->format('Hi') + 3;
        return $signs[$seed % 12];
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_options_page(
            'FateFinder Synastry Settings',
            'Synastry Calculator',
            'manage_options',
            'fatefinder-synastry',
            array($this, 'render_settings_page')
        );
        
        add_menu_page(
            'Synastry Calculator',
            'Synastry Calculator',
            'manage_options',
            'fatefinder-synastry',
            array($this, 'render_settings_page'),
            'dashicons-heart',
            31
        );
    }
    
    /**
     * Register settings
     */
    public function register_settings() {
        register_setting('fatefinder_synastry_settings', 'fatefinder_gemini_api_key');
        register_setting('fatefinder_synastry_settings', 'fatefinder_openai_api_key');
        register_setting('fatefinder_synastry_settings', 'fatefinder_crystal_shop_url');
        register_setting('fatefinder_synastry_settings', 'fatefinder_consultation_url');
    }
    
    /**
     * Add settings link to plugin action links
     */
    public function add_plugin_action_links($links) {
        $settings_link = '<a href="' . admin_url('admin.php?page=fatefinder-synastry') . '">' . __('Settings', 'fatefinder-synastry') . '</a>';
        array_unshift($links, $settings_link);
        return $links;
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
            <h1>FateFinder Synastry Calculator Settings</h1>
            <form method="post" action="options.php">
                <?php settings_fields('fatefinder_synastry_settings'); ?>
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
                    <tr>
                        <th scope="row">
                            <label for="fatefinder_crystal_shop_url">Crystal Shop URL</label>
                        </th>
                        <td>
                            <input type="text" 
                                   id="fatefinder_crystal_shop_url" 
                                   name="fatefinder_crystal_shop_url" 
                                   value="<?php echo esc_attr(get_option('fatefinder_crystal_shop_url')); ?>" 
                                   class="regular-text" />
                            <p class="description">
                                URL for "Purchase Energy Harmonizing Crystal" CTA button
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="fatefinder_consultation_url">Consultation Service URL</label>
                        </th>
                        <td>
                            <input type="text" 
                                   id="fatefinder_consultation_url" 
                                   name="fatefinder_consultation_url" 
                                   value="<?php echo esc_attr(get_option('fatefinder_consultation_url')); ?>" 
                                   class="regular-text" />
                            <p class="description">
                                URL for "Book Live Consultation" CTA button
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
FateFinder_Synastry::get_instance();

