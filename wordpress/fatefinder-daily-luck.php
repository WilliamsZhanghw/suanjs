<?php
/**
 * Plugin Name: FateFinder Daily Luck
 * Plugin URI: https://www.fatefinder.org
 * Description: A mystical daily luck divination plugin - Free for all users
 * Version: 1.0.1
 * Author: FateFinder
 * Author URI: https://www.fatefinder.org
 * License: GPL v2 or later
 * Text Domain: fatefinder-daily-luck
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Include hexagram data
$gua_data_file = plugin_dir_path(__FILE__) . 'includes/gua-data.php';
if (file_exists($gua_data_file)) {
    require_once $gua_data_file;
} else {
    // Fallback: define the function if file doesn't exist
    if (!function_exists('fatefinder_get_all_gua_jie')) {
        function fatefinder_get_all_gua_jie() {
            // Return minimal hexagram data as fallback
            return array(
                '11' => array('', 'Cannot be used, no opportunity to act', 'Good for meetings', 'Diligent, in difficulty, but ultimately no disaster', 'Able to act without disaster', 'Great accomplishments', 'Beautiful sunset, but close to twilight'),
                '88' => array('Kun Hexagram', 'Autumn\'s arrival foretells winter', 'Safe to proceed', 'Fairly satisfying, no achievement but a good ending', 'Cautious behavior, neither good nor bad', 'Yellow, great fortune', 'Conflict leads to poverty')
            );
        }
    }
}

class FateFinder_Daily_Luck {
    
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
        add_shortcode('daily_luck', array($this, 'render_shortcode'));
        add_action('wp_ajax_fatefinder_check_divination', array($this, 'ajax_check_divination'));
        add_action('wp_ajax_nopriv_fatefinder_check_divination', array($this, 'ajax_check_divination'));
    }
    
    public function init() {
        // Plugin initialization
    }
    
    public function enqueue_scripts() {
        // Get plugin directory URL - use plugins_url() for better compatibility
        $plugin_url = plugins_url('', __FILE__);
        
        wp_enqueue_style('fatefinder-daily-luck', $plugin_url . '/assets/style.css', array(), '1.0.0');
        wp_enqueue_script('fatefinder-daily-luck', $plugin_url . '/assets/script.js', array('jquery'), '1.0.0', true);
        
        wp_localize_script('fatefinder-daily-luck', 'fatefinderAjax', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('fatefinder_daily_luck_nonce')
        ));
    }
    
    public function render_shortcode($atts) {
        ob_start();
        ?>
        <div class="fatefinder-daily-luck-container">
            <div class="fatefinder-daily-luck-header">
                <h2 class="fatefinder-daily-luck-title">Daily Luck Divination</h2>
                <p class="fatefinder-daily-luck-subtitle">Free Reading - Discover Your Fortune Today</p>
                <p class="fatefinder-daily-luck-description">
                    Focus intently on the question you want to ask and take your time to prepare mentally.<br>
                    When you feel ready, click the button below to receive a result.<br>
                    Sometimes the result may not seem directly related to your question. Take time to reflect and feel the subtle hints of good or bad fortune that the result conveys.<br>
                    Avoid clicking repeatedly, and for the best results, wait at least 1 minute between different questions.
                </p>
            </div>
            
            <div class="fatefinder-luck-button-wrapper">
                <button id="fatefinder-divination-btn" class="fatefinder-neon-button">
                    <span class="button-text">Free Divination</span>
                    <span class="button-glow"></span>
                </button>
            </div>
            
            <div id="fatefinder-result-container" class="fatefinder-result-container" style="display: none;">
                <div class="fatefinder-result-content">
                    <div class="fatefinder-result-text" id="fatefinder-result-text"></div>
                </div>
            </div>
            
            <div id="fatefinder-loading" class="fatefinder-loading" style="display: none;">
                <div class="fatefinder-loading-spinner"></div>
                <div class="fatefinder-loading-text">🔮 Calculating your fortune...</div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    public function ajax_check_divination() {
        check_ajax_referer('fatefinder_daily_luck_nonce', 'nonce');
        
        // Calculate divination result (no login or points required)
        $result = $this->calculate_divination();
        
        // Return success with result
        wp_send_json_success(array(
            'result' => $result
        ));
    }
    
    private function calculate_divination() {
        // Get current time
        $now = new DateTime('now', new DateTimeZone('UTC'));
        $hh = intval($now->format('H'));
        $mm = intval($now->format('i'));
        
        // Calculate hexagram numbers (same logic as qigua.js)
        $shangGua = $hh;
        $shangGuaShu = $shangGua % 8;
        if ($shangGuaShu == 0) {
            $shangGuaShu = 8;
        }
        
        $xiaGua = $mm;
        $xiaGuaShu = $xiaGua % 8;
        if ($xiaGuaShu == 0) {
            $xiaGuaShu = 8;
        }
        
        $dongYao = ($xiaGua + $shangGua) % 6;
        if ($dongYao == 0) {
            $dongYao = 6;
        }
        
        // Get hexagram interpretation
        $gua_key = $shangGuaShu . $xiaGuaShu;
        $gua_jie = $this->get_gua_jie();
        
        if (isset($gua_jie[$gua_key]) && isset($gua_jie[$gua_key][$dongYao])) {
            return $gua_jie[$gua_key][$dongYao];
        }
        
        return 'The stars are silent. Please try again later.';
    }
    
    private function get_gua_jie() {
        // Return all hexagram interpretations from external file
        return fatefinder_get_all_gua_jie();
    }
}

// Initialize the plugin
FateFinder_Daily_Luck::get_instance();

