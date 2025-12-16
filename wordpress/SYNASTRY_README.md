# FateFinder Synastry Calculator - WordPress Plugin

A relationship compatibility calculator that analyzes energy interactions between two people based on synastry aspects.

## Features

- **Dual Person Input**: Collect birth data for two individuals (Person A and Person B)
- **Automatic Geocoding**: Converts city/country to coordinates using Nominatim API
- **Synastry Aspect Calculation**: Calculates key inter-chart aspects (conjunction, opposition, square, trine, sextile)
- **AI-Powered Analysis**: Generates "Energy Interaction Analysis" using Gemini or OpenAI API
- **Focus on Energy Dynamics**: No compatibility scores, just practical energy interaction insights
- **Dual CTA Buttons**: 
  - "Purchase Energy Harmonizing Crystal" (links to shop)
  - "Book Live Consultation for Conflict Resolution" (links to consultation service)
- **Beautiful Dark Theme**: Matches FateFinder brand with light blue (#C1D5FF) and cream (#FFFCCB) accents
- **WordPress Shortcode**: Easy integration with `[fatefinder_synastry_form]`

## Installation

1. Upload the plugin files to `/wp-content/plugins/fatefinder-synastry/`
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Configure API keys and CTA URLs in Settings > Synastry Calculator

## Usage

### Basic Shortcode

Simply add the shortcode to any page or post:

```
[fatefinder_synastry_form]
```

## Configuration

### API Keys Setup

The plugin supports both Gemini and OpenAI APIs. Configure at least one:

1. Go to **Settings > Synastry Calculator** (or **Synastry Calculator** in the main menu)
2. Enter your API keys:
   - **Gemini API Key** (recommended, free)
   - **OpenAI API Key** (fallback, paid)

### CTA URLs Setup

Configure the URLs for the two CTA buttons:

1. **Crystal Shop URL**: URL for "Purchase Energy Harmonizing Crystal" button
2. **Consultation Service URL**: URL for "Book Live Consultation for Conflict Resolution" button

These can be:
- Internal WordPress pages (e.g., `/shop`, `/consultation`)
- External URLs (e.g., `https://your-shop.com/crystals`)
- Leave empty to use `#` (will show alert on click)

## How It Works

### 1. User Input
- Person A: Birth date, time, and location
- Person B: Birth date, time, and location

### 2. Calculation Process
1. **Geocoding**: Both locations are converted to coordinates
2. **Planetary Positions**: Calculates positions for Sun, Moon, Mercury, Venus, Mars for both persons
3. **Aspect Calculation**: Finds key aspects between the two charts:
   - **Conjunction** (☌): 0° - Strong connection
   - **Opposition** (☍): 180° - Tension/balance
   - **Square** (□): 90° - Challenge/friction
   - **Trine** (△): 120° - Harmony/ease
   - **Sextile** (⚹): 60° - Opportunity/support

### 3. AI Analysis
The AI generates an "Energy Interaction Analysis" that:
- Identifies **harmonious areas** (trine/sextile) with encouraging language
- Points out **conflict areas** (square/opposition) with gentle but firm language
- Uses specific phrasing like: "In communication, you are highly compatible (Mercury Harmony), but in emotional needs, conflict may arise (Moon Square)."
- Focuses on energy interactions, not compatibility scores
- Maximum 300 words

### 4. Results Display
- **Aspect Cards**: Visual display of all calculated aspects, color-coded:
  - Green border: Harmonious aspects (trine, sextile)
  - Red border: Challenging aspects (square, opposition)
  - Blue border: Neutral aspects (conjunction)
- **AI Analysis**: Full energy interaction analysis
- **CTA Buttons**: Two cream-colored buttons for conversion

## Technical Details

### Aspect Calculation
- **Orb Tolerance**: 8 degrees (configurable in code)
- **Planets Analyzed**: Sun, Moon, Mercury, Venus, Mars (5 planets × 5 planets = 25 potential aspects)
- **Aspect Types**: Only major aspects (conjunction, opposition, square, trine, sextile)

### Simplified Calculations
⚠️ **Current Implementation**: Uses simplified calculations for demonstration. For production use:
- Integrate Swiss Ephemeris library for accurate planetary positions
- Use precise ephemeris data for moon and other planets
- Consider time zones and daylight saving time

### AI Prompt Structure
The AI is instructed to:
- Act as a "relationship dynamics astrologer"
- Focus on practical dynamics, not scores
- Identify harmonious and conflict areas clearly
- Use modern, objective language
- Be actionable and practical

## File Structure

```
fatefinder-synastry/
├── fatefinder-synastry.php      # Main plugin file
├── assets/
│   ├── synastry-style.css       # Dark theme styles
│   └── synastry-script.js       # Frontend JavaScript
└── SYNASTRY_README.md           # This file
```

## Customization

### Changing CTA Button Text

Edit `assets/synastry-script.js` and modify the button text:

```javascript
html += 'Purchase Energy Harmonizing Crystal';
html += 'Book Live Consultation for Conflict Resolution';
```

### Modifying AI Prompt

Edit the `build_synastry_prompt()` method in `fatefinder-synastry.php` to customize the AI analysis style.

### Styling

All styles are in `assets/synastry-style.css`. Key color variables:
- Light Blue: `#C1D5FF`
- Cream Yellow: `#FFFCCB`
- Dark Background: `#0a0a0a` to `#1a1a2e`

## Troubleshooting

### "Location not found"
- Ensure location format is "City, Country" (e.g., "New York, USA")
- Check Nominatim API is accessible
- Consider caching geocoded results

### "AI API key not configured"
- Set at least one API key (Gemini or OpenAI) in Settings
- Check API key is valid and has credits/quota

### "Failed to calculate synastry"
- Verify all form fields are filled
- Check date/time formats are correct
- Ensure geocoding succeeded for both locations

## API Rate Limits

- **Nominatim (Geocoding)**: Free, but respect rate limits (1 request per second recommended)
- **Gemini API**: Check your quota at Google AI Studio
- **OpenAI API**: Pay-per-use, check your account limits

## Support

For issues or questions, contact support at https://www.fatefinder.org

## License

GPL v2 or later

