<?php
/**
 * Plugin Name: FateFinder Name Fortune
 * Plugin URI: https://www.fatefinder.org
 * Description: Name fortune calculator - Analyze your name's fortune based on numerology
 * Version: 1.0.0
 * Author: FateFinder
 * Author URI: https://www.fatefinder.org
 * License: GPL v2 or later
 * Text Domain: fatefinder-name-fortune
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class FateFinder_Name_Fortune {
    
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
        add_shortcode('fatefinder_name_fortune', array($this, 'render_name_fortune_form'));
    }
    
    public function init() {
        // Plugin initialization
    }
    
    public function enqueue_scripts() {
        wp_enqueue_style('fatefinder-name-fortune', plugins_url('', __FILE__) . '/assets/name-fortune-style.css', array(), '1.0.0');
        // Load pinyin-pro from CDN (UMD format)
        wp_enqueue_script('pinyin-pro', 'https://cdn.jsdelivr.net/npm/pinyin-pro@3/dist/index.js', array(), '3.0.0', false);
        wp_enqueue_script('fatefinder-name-fortune', plugins_url('', __FILE__) . '/assets/name-fortune-script.js', array('jquery'), '1.0.0', true);
    }
    
    /**
     * Render the name fortune form shortcode
     */
    public function render_name_fortune_form($atts) {
        ob_start();
        ?>
        <div class="fatefinder-name-fortune-container">
            <div class="fatefinder-name-fortune-form-wrapper">
                <h2 class="fatefinder-name-fortune-title">Name Fortune Calculator</h2>
                <p class="fatefinder-name-fortune-subtitle">Discover Your Name's Hidden Fortune</p>
                <p class="fatefinder-name-fortune-description">
                    Enter your name (English or Chinese) to discover the fortune hidden within your name.<br>
                    Our numerology system analyzes the energy of your name to reveal insights about your destiny, personality, and life path.<br>
                    The calculation is based on ancient numerology principles, converting your name into numerical values.
                </p>
                
                <form id="fatefinder-name-fortune-form" class="fatefinder-name-fortune-form">
                    <div class="fatefinder-form-group">
                        <label for="name-input">Your Name</label>
                        <input type="text" id="name-input" name="name" placeholder="Enter your name (English or Chinese)" required>
                    </div>
                    
                    <button type="submit" id="fatefinder-calculate-btn" class="fatefinder-name-fortune-button">
                        Calculate Fortune
                    </button>
                </form>
                
                <div id="fatefinder-name-fortune-loading" class="fatefinder-name-fortune-loading" style="display: none;">
                    <div class="fatefinder-loading-spinner"></div>
                    <div class="fatefinder-loading-text">🔮 Calculating your name's fortune...</div>
                </div>
                
                <div id="fatefinder-name-fortune-result" class="fatefinder-name-fortune-result" style="display: none;">
                    <!-- Results will be inserted here -->
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}

// Initialize the plugin
FateFinder_Name_Fortune::get_instance();

