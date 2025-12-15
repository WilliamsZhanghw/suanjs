<?php
/**
 * Plugin Name: FateFinder Daily Luck
 * Plugin URI: https://www.fatefinder.org
 * Description: A mystical daily luck divination plugin with GamiPress integration
 * Version: 1.0.0
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
require_once plugin_dir_path(__FILE__) . 'includes/gua-data.php';

class FateFinder_Daily_Luck {
    
    private static $instance = null;
    private $points_cost = 1; // Cost per divination
    
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
        wp_enqueue_style('fatefinder-daily-luck', plugin_dir_url(__FILE__) . 'assets/style.css', array(), '1.0.0');
        wp_enqueue_script('fatefinder-daily-luck', plugin_dir_url(__FILE__) . 'assets/script.js', array('jquery'), '1.0.0', true);
        
        wp_localize_script('fatefinder-daily-luck', 'fatefinderAjax', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('fatefinder_daily_luck_nonce'),
            'pointsCost' => $this->points_cost
        ));
    }
    
    public function render_shortcode($atts) {
        $atts = shortcode_atts(array(
            'points_cost' => $this->points_cost
        ), $atts);
        
        $this->points_cost = intval($atts['points_cost']);
        
        ob_start();
        ?>
        <div class="fatefinder-daily-luck-container">
            <div class="fatefinder-luck-button-wrapper">
                <button id="fatefinder-divination-btn" class="fatefinder-neon-button">
                    <span class="button-text">点击占卜</span>
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
                <div class="fatefinder-loading-text">🔮 正在占卜中...</div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    public function ajax_check_divination() {
        check_ajax_referer('fatefinder_daily_luck_nonce', 'nonce');
        
        // Check if user is logged in
        if (!is_user_logged_in()) {
            wp_send_json_error(array(
                'message' => 'Please log in or register to use this feature. <a href="' . wp_login_url(get_permalink()) . '">Login</a> or <a href="' . wp_registration_url() . '">Register</a>'
            ));
        }
        
        $user_id = get_current_user_id();
        
        // Check GamiPress integration
        if (!function_exists('gamipress_get_user_points')) {
            wp_send_json_error(array(
                'message' => 'GamiPress plugin is not active. Please contact administrator.'
            ));
        }
        
        // Get user points (assuming default points type, adjust if needed)
        $points_type = 'points'; // Change this to your GamiPress points type
        
        // Check GamiPress function availability
        if (!function_exists('gamipress_get_user_points')) {
            wp_send_json_error(array(
                'message' => 'GamiPress plugin is not active. Please contact administrator.'
            ));
        }
        
        $user_points = gamipress_get_user_points($user_id, $points_type);
        
        // Check if user has enough points
        if ($user_points < $this->points_cost) {
            wp_send_json_error(array(
                'message' => 'Insufficient points. You need ' . $this->points_cost . ' point(s) to perform divination. You currently have ' . $user_points . ' point(s).'
            ));
        }
        
        // Deduct points using GamiPress function
        // Note: gamipress_deduct_points_to_user might not exist, using alternative method
        if (function_exists('gamipress_deduct_points_to_user')) {
            $deducted = gamipress_deduct_points_to_user($user_id, $this->points_cost, $points_type);
        } else {
            // Alternative: Use gamipress_award_points with negative value
            $deducted = gamipress_award_points_to_user($user_id, -$this->points_cost, $points_type);
        }
        
        if (!$deducted) {
            wp_send_json_error(array(
                'message' => 'Failed to deduct points. Please try again.'
            ));
        }
        
        // Calculate divination result
        $result = $this->calculate_divination();
        
        // Return success with result
        wp_send_json_success(array(
            'result' => $result,
            'points_remaining' => $user_points - $this->points_cost
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

