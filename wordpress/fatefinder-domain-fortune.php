<?php
/**
 * Plugin Name: FateFinder Domain Fortune
 * Plugin URI: https://www.fatefinder.org
 * Description: Domain and number fortune calculator - Analyze domain names and numbers based on numerology
 * Version: 1.0.0
 * Author: FateFinder
 * Author URI: https://www.fatefinder.org
 * License: GPL v2 or later
 * Text Domain: fatefinder-domain-fortune
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class FateFinder_Domain_Fortune {
    
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
        add_shortcode('fatefinder_domain_fortune', array($this, 'render_domain_fortune_form'));
    }
    
    public function init() {
        // Plugin initialization
    }
    
    public function enqueue_scripts() {
        wp_enqueue_style('fatefinder-domain-fortune', plugins_url('', __FILE__) . '/assets/domain-fortune-style.css', array(), '1.0.0');
        wp_enqueue_script('fatefinder-domain-fortune', plugins_url('', __FILE__) . '/assets/domain-fortune-script.js', array('jquery'), '1.0.0', true);
    }
    
    /**
     * Render the domain fortune form shortcode
     */
    public function render_domain_fortune_form($atts) {
        ob_start();
        ?>
        <div class="fatefinder-domain-fortune-container">
            <div class="fatefinder-domain-fortune-header">
                <h2 class="fatefinder-domain-fortune-title">Domain & Number Fortune Calculator</h2>
                <p class="fatefinder-domain-fortune-subtitle">Free Reading - Discover the Fortune Hidden in Your Domain or Number</p>
                <p class="fatefinder-domain-fortune-description">
                    Enter a domain name or any number to discover its fortune based on ancient numerology principles.<br>
                    Our system analyzes the energy of your domain or number to reveal insights about its potential, success, and destiny.<br>
                    The calculation uses advanced numerology methods to convert your input into meaningful fortune interpretations.
                </p>
            </div>
            
            <div class="fatefinder-domain-fortune-form-wrapper">
                <!-- Domain Name Section -->
                <div class="fatefinder-fortune-section">
                    <h3 class="fatefinder-section-title">Domain Name Fortune</h3>
                    <form id="fatefinder-domain-form" class="fatefinder-domain-form">
                        <div class="fatefinder-form-group">
                            <label for="domain-input">Domain Name</label>
                            <input type="text" id="domain-input" name="domain" placeholder="Enter domain name (e.g., example.com)" required>
                        </div>
                        <button type="submit" id="fatefinder-domain-btn" class="fatefinder-domain-button">
                            Calculate Domain Fortune
                        </button>
                    </form>
                    
                    <div id="fatefinder-domain-loading" class="fatefinder-loading" style="display: none;">
                        <div class="fatefinder-loading-spinner"></div>
                        <div class="fatefinder-loading-text">🔮 Calculating domain fortune...</div>
                    </div>
                    
                    <div id="fatefinder-domain-result" class="fatefinder-result" style="display: none;">
                        <!-- Domain results will be inserted here -->
                    </div>
                </div>
                
                <!-- Divider -->
                <div class="fatefinder-section-divider"></div>
                
                <!-- Any Number Section -->
                <div class="fatefinder-fortune-section">
                    <h3 class="fatefinder-section-title">Any Number Fortune</h3>
                    <form id="fatefinder-number-form" class="fatefinder-number-form">
                        <div class="fatefinder-form-group">
                            <label for="number-input">Any Number</label>
                            <input type="text" id="number-input" name="number" placeholder="Enter any number" required>
                        </div>
                        <button type="submit" id="fatefinder-number-btn" class="fatefinder-number-button">
                            Calculate Number Fortune
                        </button>
                    </form>
                    
                    <div id="fatefinder-number-loading" class="fatefinder-loading" style="display: none;">
                        <div class="fatefinder-loading-spinner"></div>
                        <div class="fatefinder-loading-text">🔮 Calculating number fortune...</div>
                    </div>
                    
                    <div id="fatefinder-number-result" class="fatefinder-result" style="display: none;">
                        <!-- Number results will be inserted here -->
                    </div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}

// Initialize the plugin
FateFinder_Domain_Fortune::get_instance();

