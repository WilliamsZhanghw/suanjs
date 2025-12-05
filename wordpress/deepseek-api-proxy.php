<?php
/**
 * Plugin Name: DeepSeek API Proxy
 * Description: Secure proxy for DeepSeek API calls. Stores API key in WordPress database.
 * Version: 1.0.0
 * Author: Your Name
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register REST API endpoint for DeepSeek chat
 */
add_action('rest_api_init', function () {
    register_rest_route('deepseek/v1', '/chat', array(
        'methods' => 'POST',
        'callback' => 'deepseek_chat_handler',
        'permission_callback' => '__return_true', // Allow public access, or use custom permission check
    ));
});

/**
 * Handle DeepSeek chat API request
 */
function deepseek_chat_handler($request) {
    // Get message from request
    $message = $request->get_param('message');
    
    if (empty($message)) {
        return new WP_Error('missing_message', 'Message is required', array('status' => 400));
    }
    
    // Get API key from WordPress options
    $api_key = get_option('deepseek_api_key');
    
    if (empty($api_key)) {
        return new WP_Error('api_key_not_set', 'DeepSeek API key is not configured. Please set it in WordPress admin.', array('status' => 500));
    }
    
    // Call DeepSeek API
    $response = wp_remote_post('https://api.deepseek.com/v1/chat/completions', array(
        'headers' => array(
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $api_key,
        ),
        'body' => json_encode(array(
            'model' => 'deepseek-chat',
            'messages' => array(
                array(
                    'role' => 'system',
                    'content' => 'You are a helpful AI assistant specializing in Chinese numerology, Bazi (八字), and fortune telling. Provide thoughtful and insightful responses.'
                ),
                array(
                    'role' => 'user',
                    'content' => $message
                )
            ),
            'stream' => false,
            'temperature' => 0.7
        )),
        'timeout' => 30,
    ));
    
    // Check for errors
    if (is_wp_error($response)) {
        return new WP_Error('api_error', $response->get_error_message(), array('status' => 500));
    }
    
    $status_code = wp_remote_retrieve_response_code($response);
    $body = wp_remote_retrieve_body($response);
    $data = json_decode($body, true);
    
    if ($status_code !== 200) {
        $error_message = isset($data['error']['message']) ? $data['error']['message'] : 'Unknown error';
        
        // User-friendly error messages
        if ($status_code === 401) {
            $error_message = 'Invalid API Key. Please check the API key configuration.';
        } else if ($status_code === 402) {
            $error_message = 'Insufficient Balance. The DeepSeek account has insufficient credits.';
        } else if ($status_code === 429) {
            $error_message = 'Rate limit exceeded. Please wait a moment and try again.';
        }
        
        return new WP_Error('deepseek_error', $error_message, array('status' => $status_code));
    }
    
    // Return success response
    return array(
        'success' => true,
        'content' => isset($data['choices'][0]['message']['content']) 
            ? $data['choices'][0]['message']['content'] 
            : 'No response from DeepSeek.'
    );
}

/**
 * Add admin menu for API key configuration
 */
add_action('admin_menu', 'deepseek_add_admin_menu');

function deepseek_add_admin_menu() {
    add_options_page(
        'DeepSeek API Settings',
        'DeepSeek API',
        'manage_options',
        'deepseek-api-settings',
        'deepseek_admin_page'
    );
}

/**
 * Admin settings page
 */
function deepseek_admin_page() {
    // Handle form submission
    if (isset($_POST['deepseek_save_api_key']) && check_admin_referer('deepseek_save_key')) {
        $api_key = sanitize_text_field($_POST['deepseek_api_key']);
        update_option('deepseek_api_key', $api_key);
        echo '<div class="notice notice-success"><p>API Key saved successfully!</p></div>';
    }
    
    $current_key = get_option('deepseek_api_key', '');
    $masked_key = !empty($current_key) ? substr($current_key, 0, 7) . '...' . substr($current_key, -4) : '';
    ?>
    <div class="wrap">
        <h1>DeepSeek API Settings</h1>
        <form method="post" action="">
            <?php wp_nonce_field('deepseek_save_key'); ?>
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="deepseek_api_key">DeepSeek API Key</label>
                    </th>
                    <td>
                        <input 
                            type="password" 
                            id="deepseek_api_key" 
                            name="deepseek_api_key" 
                            value="<?php echo esc_attr($current_key); ?>" 
                            class="regular-text"
                            placeholder="sk-..."
                        />
                        <?php if (!empty($current_key)): ?>
                            <p class="description">Current key: <?php echo esc_html($masked_key); ?></p>
                        <?php else: ?>
                            <p class="description">Get your API key from <a href="https://platform.deepseek.com/" target="_blank">DeepSeek Platform</a></p>
                        <?php endif; ?>
                    </td>
                </tr>
            </table>
            <?php submit_button('Save API Key', 'primary', 'deepseek_save_api_key'); ?>
        </form>
        
        <hr>
        
        <h2>API Endpoint</h2>
        <p>The API endpoint is available at:</p>
        <code><?php echo rest_url('deepseek/v1/chat'); ?></code>
        
        <h2>Usage in Frontend</h2>
        <p>In your <code>index1.html</code>, set the API proxy URL to:</p>
        <code><?php echo rest_url('deepseek/v1/chat'); ?></code>
    </div>
    <?php
}

/**
 * Add settings link on plugin page
 */
add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'deepseek_add_settings_link');

function deepseek_add_settings_link($links) {
    $settings_link = '<a href="' . admin_url('options-general.php?page=deepseek-api-settings') . '">Settings</a>';
    array_unshift($links, $settings_link);
    return $links;
}

