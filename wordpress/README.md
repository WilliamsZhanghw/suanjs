# FateFinder Daily Luck WordPress Plugin

A mystical daily luck divination plugin with GamiPress integration, featuring a dark tech neon-styled interface.

## Features

- **Shortcode Support**: Use `[daily_luck]` to display the divination interface
- **User Authentication**: Checks if user is logged in before allowing divination
- **GamiPress Integration**: Automatically deducts points (default: 1 point) per divination
- **Dark Tech Neon Style**: Beautiful cyberpunk-inspired UI with neon glow effects
- **Smooth Animations**: Ritualistic CSS animations for a mystical experience
- **Complete Hexagram System**: All 64 hexagrams from I Ching included

## Installation

1. Upload the plugin folder to `/wp-content/plugins/`
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Ensure GamiPress plugin is installed and activated
4. Configure your GamiPress points type (default: 'points')

## Usage

### Basic Shortcode

```
[daily_luck]
```

### Shortcode with Custom Points Cost

```
[daily_luck points_cost="2"]
```

## Requirements

- WordPress 5.0 or higher
- PHP 7.0 or higher
- GamiPress plugin (for points system)
- jQuery (included with WordPress)

## File Structure

```
fatefinder-daily-luck/
├── fatefinder-daily-luck.php    # Main plugin file
├── includes/
│   └── gua-data.php              # All 64 hexagram data
├── assets/
│   ├── style.css                 # Dark tech neon styles
│   └── script.js                 # Frontend JavaScript
└── README.md                     # This file
```

## GamiPress Configuration

The plugin uses GamiPress to manage user points. Make sure:

1. GamiPress plugin is installed and activated
2. A points type is created (default: 'points')
3. Users have sufficient points to perform divination

### Points Type Configuration

If your GamiPress points type is different from 'points', you can modify it in the plugin code:

```php
$points_type = 'your_points_type'; // In ajax_check_divination() method
```

## Customization

### Changing Points Cost

You can change the default points cost by modifying the shortcode:

```
[daily_luck points_cost="5"]
```

Or modify the default in the plugin code:

```php
private $points_cost = 1; // Change this value
```

### Styling

All styles are in `assets/style.css`. The plugin uses:
- Dark background (#0a0a0a to #1a1a2e gradient)
- Cyan neon color (#00ffff)
- Smooth animations and transitions

### Calculation Logic

The divination calculation is based on the current time (hour and minute) and uses the same logic as `luckyTest/js/qigua.js`:

- **Upper Hexagram (上卦)**: Based on current hour (hour % 8)
- **Lower Hexagram (下卦)**: Based on current minute (minute % 8)
- **Moving Line (动爻)**: Based on (hour + minute) % 6

## Troubleshooting

### "GamiPress plugin is not active"

- Ensure GamiPress plugin is installed and activated
- Check that GamiPress functions are available

### "Failed to deduct points"

- Verify GamiPress points type is correct
- Check user has sufficient points
- Ensure GamiPress functions are working properly

### Points not deducting

The plugin tries multiple methods to deduct points:
1. `gamipress_deduct_points_to_user()` (if available)
2. `gamipress_award_points_to_user()` with negative value (if available)
3. GamiPress log system (fallback)

If none work, check your GamiPress version and available functions.

## Support

For issues or questions, please contact the plugin author or visit https://www.fatefinder.org

## License

GPL v2 or later
