# FateFinder Chart Calculator - WordPress Plugin

A free astrology chart calculator that calculates the Big Three (Sun, Moon, Ascendant) and generates AI-powered insights.

## Features

- **Free Big Three Calculation**: Sun Sign, Moon Sign, and Ascendant/Rising Sign
- **Geocoding Integration**: Automatically converts city/country to coordinates using Nominatim API
- **AI-Powered Insights**: Generates personalized "Big Three Snapshot" using Gemini or OpenAI API
- **Beautiful Dark Theme**: Matches FateFinder brand with light blue (#C1D5FF) and cream (#FFFCCB) accents
- **WordPress Shortcode**: Easy integration with `[fatefinder_chart_form]`
- **Responsive Design**: Works on all devices

## Installation

1. Upload the plugin files to `/wp-content/plugins/fatefinder-chart-calculator/`
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Configure API keys (see Configuration section below)

## Usage

### Basic Shortcode

Simply add the shortcode to any page or post:

```
[fatefinder_chart_form]
```

## Configuration

### API Keys Setup

The plugin supports both Gemini and OpenAI APIs. Configure at least one:

#### Option 1: Gemini API (Recommended)

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to WordPress options:
   ```php
   update_option('fatefinder_gemini_api_key', 'YOUR_API_KEY_HERE');
   ```
   Or use a plugin settings page (you can add this to the plugin)

#### Option 2: OpenAI API (Fallback)

1. Get your API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add to WordPress options:
   ```php
   update_option('fatefinder_openai_api_key', 'YOUR_API_KEY_HERE');
   ```

### Adding Settings Page (Optional)

You can add a settings page to the WordPress admin for easier API key management. Here's a quick addition to the plugin:

```php
// Add to the constructor
add_action('admin_menu', array($this, 'add_admin_menu'));
add_action('admin_init', array($this, 'register_settings'));

// Add methods
public function add_admin_menu() {
    add_options_page(
        'FateFinder Chart Calculator Settings',
        'Chart Calculator',
        'manage_options',
        'fatefinder-chart-calculator',
        array($this, 'render_settings_page')
    );
}

public function register_settings() {
    register_setting('fatefinder_chart_settings', 'fatefinder_gemini_api_key');
    register_setting('fatefinder_chart_settings', 'fatefinder_openai_api_key');
}

public function render_settings_page() {
    ?>
    <div class="wrap">
        <h1>FateFinder Chart Calculator Settings</h1>
        <form method="post" action="options.php">
            <?php settings_fields('fatefinder_chart_settings'); ?>
            <table class="form-table">
                <tr>
                    <th><label for="fatefinder_gemini_api_key">Gemini API Key</label></th>
                    <td><input type="text" id="fatefinder_gemini_api_key" name="fatefinder_gemini_api_key" value="<?php echo esc_attr(get_option('fatefinder_gemini_api_key')); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th><label for="fatefinder_openai_api_key">OpenAI API Key</label></th>
                    <td><input type="text" id="fatefinder_openai_api_key" name="fatefinder_openai_api_key" value="<?php echo esc_attr(get_option('fatefinder_openai_api_key')); ?>" class="regular-text" /></td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}
```

## Important Notes

### Calculation Accuracy

⚠️ **Current Implementation**: The plugin uses simplified calculations for demonstration purposes. For production use, you should integrate a proper ephemeris library:

1. **Swiss Ephemeris (Recommended)**: 
   - Download from [Astrodienst](https://www.astro.com/swisseph/swephinfo_e.htm)
   - Use PHP wrapper like `sweph-php` or integrate directly
   - Provides accurate planetary positions

2. **Alternative Libraries**:
   - `php-astrology` (if available)
   - Custom ephemeris calculations

### Improving Calculation Accuracy

To improve accuracy, replace the simplified calculation methods with proper ephemeris data:

```php
// Example: Using Swiss Ephemeris
private function calculate_big_three_accurate($date, $time, $lat, $lon) {
    // Load Swiss Ephemeris library
    require_once $this->sweph_path . 'sweph.php';
    
    // Convert to Julian Day
    $jd = $this->gregorian_to_julian($datetime);
    
    // Calculate planetary positions
    $sun_position = swe_calc_ut($jd, SE_SUN, SEFLG_SWIEPH);
    $moon_position = swe_calc_ut($jd, SE_MOON, SEFLG_SWIEPH);
    
    // Calculate houses/ascendant
    $houses = swe_houses($jd, $lat, $lon, 'P');
    
    // Convert to signs
    $sun_sign = $this->position_to_sign($sun_position[0]);
    $moon_sign = $this->position_to_sign($moon_position[0]);
    $ascendant_sign = $this->position_to_sign($houses[1]); // Ascendant is house 1 cusp
    
    return array(
        'sun_sign' => $sun_sign,
        'moon_sign' => $moon_sign,
        'ascendant_sign' => $ascendant_sign
    );
}
```

## File Structure

```
fatefinder-chart-calculator/
├── fatefinder-chart-calculator.php  # Main plugin file
├── assets/
│   ├── chart-style.css              # Dark theme styles
│   └── chart-script.js               # Frontend JavaScript
├── includes/
│   └── sweph/                        # Swiss Ephemeris files (optional)
└── CHART_CALCULATOR_README.md       # This file
```

## Customization

### Changing CTA Button Link

Edit `assets/chart-script.js` and update the CTA button:

```javascript
html += '<a href="YOUR_FULL_CHART_URL" class="fatefinder-cta-button">';
```

### Modifying AI Prompt

Edit the `build_ai_prompt()` method in the main plugin file to customize the AI-generated text.

### Styling

All styles are in `assets/chart-style.css`. Key color variables:
- Light Blue: `#C1D5FF`
- Cream Yellow: `#FFFCCB`
- Dark Background: `#0a0a0a` to `#1a1a2e`

## Troubleshooting

### "Location not found"

- Ensure location format is "City, Country" (e.g., "New York, USA")
- Check Nominatim API is accessible (it's free but has rate limits)
- Consider caching geocoded results to reduce API calls

### "AI API key not configured"

- Set at least one API key (Gemini or OpenAI)
- Check API key is valid and has credits/quota
- Verify API key format is correct

### Calculation Results Seem Inaccurate

- Current implementation uses simplified calculations
- For accurate results, integrate Swiss Ephemeris library
- Moon sign and Ascendant require precise ephemeris data

## API Rate Limits

- **Nominatim (Geocoding)**: Free, but respect rate limits (1 request per second recommended)
- **Gemini API**: Check your quota at Google AI Studio
- **OpenAI API**: Pay-per-use, check your account limits

## Support

For issues or questions, contact support at https://www.fatefinder.org

## License

GPL v2 or later
