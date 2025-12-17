# Changelog

All notable changes to this project will be documented in this file.

## [V23] - 2025-12-07

### Added
- **FateFinder Name Fortune WordPress Plugin**:
  - Name fortune calculator based on numerology principles
  - Supports both English and Chinese name input
  - Automatic Chinese to Pinyin conversion using pinyin-pro library (via CDN)
  - Dual calculation methods:
    - With spaces (includes spaces in calculation)
    - Without spaces (removes spaces before calculation)
  - ASCII sum calculation and Mod 81 operation
  - Fortune interpretation based on Mod 81 results (9 predefined fortune messages)
  - Dark tech theme UI matching other plugins:
    - Primary color: Light blue #C1D5FF
    - Accent color: Cream yellow #FFFCCB
    - Dark background gradient: #0a0a0a to #1a1a2e
  - WordPress shortcode support: `[fatefinder_name_fortune]`
  - Completely free, no login or points required
  - Frontend calculation (no backend processing needed)
  - Responsive design for mobile devices
  - Smooth animations and user-friendly error handling

- **WordPress Plugin Assets**:
  - `name-fortune-style.css` for styling
  - `name-fortune-script.js` for calculation logic

### Technical Details
- Uses pinyin-pro library from CDN for Chinese name conversion
- Client-side calculation for instant results
- Graceful fallback if pinyin library fails to load
- Error handling and input validation

## [V21] - 2025-12-07

### Changed
- **FateFinder Daily Luck Plugin Updates**:
  - **Removed points system**: Plugin is now completely free for all users, no login or points required
  - **Removed GamiPress integration**: No longer checks user points or deducts points
  - **Added English guidance text**: 
    - Title: "Daily Luck Divination"
    - Subtitle: "Free Reading - Discover Your Fortune Today"
    - Detailed usage instructions in English
  - **Button text updated**: Changed to "Free Divination"
  - **Unified color scheme**: Matched with other plugins for consistency
    - Primary color: Light blue #C1D5FF (replaced cyan #00ffff)
    - Accent color: Cream yellow #FFFCCB
    - Dark background gradient: #0a0a0a to #1a1a2e
  - **Improved file path handling**: Better compatibility with different WordPress setups
  - **Added file existence checks**: Prevents activation failures
  - **Enhanced UI**: Added header section with title, subtitle, and description

### Fixed
- Fixed plugin activation issues by improving file path resolution
- Fixed resource file loading by using `plugins_url()` instead of `plugin_dir_url()`
- Added fallback function for hexagram data if file doesn't exist

## [V20] - 2025-12-07

### Added
- **FateFinder Synastry Calculator WordPress Plugin**:
  - Relationship compatibility calculator for analyzing energy interactions between two people
  - Dual person input form (Person A and Person B) with birth date, time, and location
  - Integrated Nominatim API for automatic geocoding (city/country to coordinates)
  - Synastry aspect calculation between two charts:
    - Conjunction (☌), Opposition (☍), Square (□), Trine (△), Sextile (⚹)
    - Analyzes 5 major planets: Sun, Moon, Mercury, Venus, Mars
    - Color-coded aspect cards (green=harmonious, red=challenging)
  - AI-powered "Energy Interaction Analysis" using Gemini/OpenAI API:
    - Identifies harmonious areas (trine/sextile) with encouraging language
    - Points out conflict areas (square/opposition) with gentle but firm language
    - Uses specific phrasing like: "In communication, you are highly compatible (Mercury Harmony), but in emotional needs, conflict may arise (Moon Square)."
    - Focuses on energy interactions, not compatibility scores
    - Maximum 300 words
  - Dual CTA buttons for conversion:
    - "Purchase Energy Harmonizing Crystal" (links to shop)
    - "Book Live Consultation for Conflict Resolution" (links to consultation service)
  - Dark tech theme UI matching FateFinder brand (light blue #C1D5FF, cream #FFFCCB)
  - WordPress shortcode support: `[fatefinder_synastry_form]`
  - Admin settings page for API key and CTA URL configuration

- **WordPress Plugin Assets**:
  - `synastry-style.css` and `synastry-script.js` for synastry calculator
  - `SYNASTRY_README.md` with comprehensive documentation

### Technical Details
- Aspect calculation with 8-degree orb tolerance
- Simplified planetary position calculations (can be upgraded with Swiss Ephemeris)
- Automatic model fallback for Gemini API compatibility
- Error handling and logging for debugging
- Plugin action links and menu items for easy settings access

## [V19] - 2025-12-07

### Added
- **FateFinder Chart Calculator WordPress Plugin**:
  - Free astrology chart calculator for calculating Big Three (Sun, Moon, Ascendant)
  - Integrated Nominatim API for automatic geocoding (city/country to coordinates)
  - Integrated Gemini/OpenAI API for AI-powered personalized insights
  - Dark tech theme UI matching FateFinder brand (light blue #C1D5FF, cream #FFFCCB)
  - WordPress shortcode support: `[fatefinder_chart_form]`
  - Admin settings page for API key configuration
  - Responsive design with smooth animations
  - Multiple Gemini model fallback support (gemini-2.0-flash, gemini-1.5-flash, etc.)

- **FateFinder Daily Luck WordPress Plugin**:
  - Daily fortune divination feature
  - GamiPress points system integration (default: 1 point per divination)
  - Complete 64 hexagram data from I Ching
  - Dark tech neon-styled interface with cyan glow effects
  - WordPress shortcode support: `[daily_luck]`
  - Admin settings page for configuration

- **WordPress Plugin Assets**:
  - `chart-style.css` and `chart-script.js` for chart calculator
  - `style.css` and `script.js` for daily luck plugin
  - `gua-data.php` with complete 64 hexagram interpretations
  - Comprehensive documentation (CHART_CALCULATOR_README.md, README.md)

### Technical Details
- Chart Calculator uses simplified astrology calculations (can be upgraded with Swiss Ephemeris)
- Automatic model fallback for Gemini API compatibility
- Error handling and logging for debugging
- Plugin action links and menu items for easy settings access

## [V18] - 2025-12-07

### Removed
- **Removed DeepSeek integration from index.html**:
  - Removed "🔮 Fate Free Inquiry" button from category list
  - Removed DeepSeek chat interface HTML elements (`deepseek-chat-group`)
  - Removed all DeepSeek-related event listeners
  - Removed `toggleDeepSeekChat()` function
  - Removed `formatBaziString()` and `formatGender()` helper functions
  - Removed `callDeepSeekAPI()` and `sendDeepSeekMessage()` functions
  - Removed `DEEPSEEK_API_PROXY` constant

### Changed
- **Restored chat container height**: Changed from 800px back to 600px in `index.html`
- Cleaned up unused DeepSeek-related code from `script.js`

## [V16] - 2025-12-07

### Changed
- **Updated Wix HTTP Function URL path**: Changed from `/_functions/deepseek-chat` to `/functions/deepseek-chat` in `script.js`
  - Fixed 404 Not Found error by using correct Wix HTTP Function URL format
  - Updated `DEEPSEEK_API_PROXY` constant to match actual Wix endpoint

### Added
- **Enhanced WIX_SETUP.md documentation**:
  - Added detailed instructions for finding actual Wix HTTP Function URL
  - Added multiple methods to locate Function URL in Wix Studio
  - Added troubleshooting guide for CORS errors
  - Added instructions for handling OPTIONS preflight requests
  - Added alternative URL format testing methods

### Fixed
- Fixed Wix HTTP Function URL path mismatch issue
- Improved CORS error handling documentation

## [V15] - 2025-12-06

### Added
- **Wix Integration Support**:
  - Created `WIX_SETUP.md` documentation for Wix HTTP Functions and Secrets Manager integration
  - Added DeepSeek API proxy support for Wix backend using Web Modules or HTTP Functions
  - Detailed instructions for storing API keys securely in Wix Secrets Manager
  - Code examples for both Web Module and HTTP Function implementations
  - Troubleshooting guide for common Wix integration issues

- **DeepSeek Integration in index.html**:
  - Added "🔮 Fate Free Inquiry" button and chat interface
  - Added `formatBaziString()` and `formatGender()` helper functions
  - Added `callDeepSeekAPI()` and `sendDeepSeekMessage()` functions
  - Added word limit functionality with intelligent truncation (120 English words)

### Changed
- **Updated index.html to match index1.html features**:
  - Updated Bazi calculation method: Changed from using lunar month to using solar terms (节气) for accurate year and month pillar calculations
  - Increased dialog height: Changed chat container height to 800px for better content visibility
  - Added word limit for DeepSeek responses: Limited DeepSeek AI responses to maximum 120 English words
  - Updated `bazi.js`: Modified `getYearGanZhi()` method to use precise solar term calculations
  - Updated `Luna.js`: Added `getSolarTermTime()` method for precise solar term time calculation
- **Updated script.js for Wix integration**:
  - Configured `DEEPSEEK_API_PROXY` to use Wix HTTP Function endpoint (`https://www.fatefinder.org/_functions/deepseek-chat`)

### Fixed
- Fixed Bazi calculation accuracy in `index.html` to match `index1.html` implementation
- Fixed month pillar calculation to use solar terms instead of lunar months
- Fixed import statements in Wix setup documentation (changed from `Secret` to `secrets`)

## [V14] - 2025-12-06

### Changed
- **Increased dialog height**: Changed chat container height from 600px to 800px for better content visibility
- **Added word limit for DeepSeek responses**: Limited DeepSeek AI responses to maximum 120 English words
  - Added word limit instruction in system prompt
  - Implemented `limitWords()` function to truncate responses intelligently
  - Smart truncation attempts to end at sentence boundaries when possible

### Fixed
- **Fixed Bazi month pillar calculation**: Changed from using lunar month to using solar terms (节气)
  - Year pillar: Now correctly determines year based on 立春 (Spring Begins) time
  - Month pillar: Now uses solar terms to determine month branch instead of lunar month
    - 正月(寅月): 立春 -> 惊蛰之前
    - 二月(卯月): 惊蛰 -> 清明之前
    - And so on for all 12 months
  - Month stem: Uses 五虎遁 (Five Tiger Escape) method based on year stem and month branch
  - Day and hour pillars remain unchanged (already correct)

### Added
- Added `getSolarTermTime()` method to Lunar class for precise solar term time calculation
- Added `getSolarTermDay()` method for compatibility
- Created `test_bazi_calculation.html` test page for Bazi calculation verification
- Created `BAZI_CALCULATION_ANALYSIS.md` documentation analyzing the calculation issues
- Enhanced debug logging in `getYearGanZhi()` method for troubleshooting
- Added word limit functionality to ensure concise AI responses

## [V13] - 2025-12-06

### Added
- Added prompt display in DeepSeek response for manual verification
- Added `SHOW_PROMPT_IN_RESPONSE` flag to control prompt visibility (for production release)

### Changed
- Changed thinking indicator from "🤔 Thinking..." to "🔮 Consulting the stars and reading your fate..."
- Updated thinking icon from 🤔 to 🔮 for better alignment with fortune-telling theme
- Modified DeepSeek response format to include sent prompt for verification purposes
- Added "🔮" icon to "Fate Free Inquiry" button

### Fixed
- Fixed `determineConfidence` function error handling to prevent undefined property access
- Added validation checks in `handleConfidentQuestion` function

## [V12] - 2025-12-05

### Changed
- Changed DeepSeek chat button text from "💬 Chat with DeepSeek" to "Fate Free Inquiry"
- Updated button label for better user experience and clarity

## [V11] - 2025-12-05

### Added
- Added `formatBaziString()` function to format Bazi data for DeepSeek prompts
- Added `formatGender()` function to convert gender to Chinese format
- Implemented dynamic prompt generation with user's Bazi and gender information

### Changed
- Modified DeepSeek prompt to include dynamic Bazi and gender information
- Updated `callDeepSeekAPI()` to check for Bazi and gender before making API calls
- Changed prompt format: "My question is: {question}. You are a Bazi master, help me answer this question based on this Bazi chart. The Bazi information is: {formattedBazi}, Gender: {formattedGender}..."
- Removed fixed system prompt from WordPress plugin (frontend now builds complete prompt)
- DeepSeek now uses personalized prompts based on user's calculated Bazi and gender

### Fixed
- Added validation to ensure Bazi and gender are available before calling DeepSeek API
- Improved error messages when Bazi or gender information is missing

## [V10] - 2025-12-02

### Added
- Created WordPress plugin `deepseek-api-proxy.php` for secure API Key storage
- Added WordPress REST API endpoint `/wp-json/deepseek/v1/chat` for DeepSeek API calls
- Added WordPress admin settings page for API Key configuration
- Created comprehensive WordPress integration documentation
- Added Hostinger-specific installation guide
- Added security guide for WordPress implementation

### Changed
- Modified `index1.html` to use WordPress REST API instead of requiring user API Key input
- Removed API Key input field from frontend - users no longer need to enter API Key
- Updated `DEEPSEEK_API_PROXY` to use WordPress REST API endpoint
- Removed all independent backend server code and documentation
- Simplified architecture to use WordPress backend only

### Removed
- Removed `api/` directory and all Node.js backend server code
- Removed independent backend deployment documentation
- Removed CORS configuration requirements (no longer needed with WordPress backend)

## [V8] - 2025-12-01

### Added
- Integrated DeepSeek API for AI-powered chat functionality
- Added "Chat with DeepSeek" button in category selection
- Added DeepSeek API Key input and storage (localStorage)
- Added DeepSeek chat interface with message input and send functionality
- Implemented `callDeepSeekAPI()` function for API communication
- Added user-friendly error handling for common API errors (401, 402, 429, 500)
- Added thinking indicator during API calls

### Changed
- Modified domainTest/index.html: Changed "Phone Number" to "Any Number" for testing any number
- Removed SSN (Social Security Number) functionality
- Removed Driver's License Number functionality
- Simplified number prediction interface to focus on general number testing and domain name testing

## [V7] - 2025-12-01

### Fixed
- Fixed birthday global persistence issue - birthday now persists across all categories (Self, Wealth, Love)
- Added `ensureBaziDataAvailable()` helper function to automatically restore birthday from localStorage
- Fixed all analysis functions in Wealth and Love categories (analyzeWealth, analyzePurpose, analyzeOpinion, analyzeSupport, analyzeSexPopular, analyzeIdealPartner)
- Added complete implementation of all dealBazi.js functions
- Fixed `displayResponseGradually` to handle undefined responses gracefully
- Improved error handling in all question handler functions

### Changed
- Birthday is now automatically loaded from localStorage on page load
- All question handlers now check and restore birthday before processing
- Enhanced logging for debugging birthday and Bazi data issues

## [V5] - 2025-11-25

### Added
- Created `index1.html` - WordPress compatible standalone version
- Complete implementation of `PaiPanFinal` class for Bazi calculations
- Complete implementation of `BaZi` class for lunar calendar calculations
- All question handler functions exposed to global scope
- Dark theme UI optimized for WordPress iframe embedding

### Changed
- Fixed Bazi calculation to properly convert array to string format
- Improved error handling for missing dependencies
- Enhanced compatibility with WordPress iframe environment
- Fixed window size to 600px height for consistent layout
- Optimized chat box scrolling with automatic scroll to bottom
- Fixed input group and options area to prevent compression

## [V3] - 2025-11-22

### Changed
- Modified opening prompt message in conversation

## [V2] - 2025-11-22

### Changed
- Modified background transparency: Added semi-transparent overlay to reduce background image visibility
- Increased chat container opacity from 0.9 to 0.95 for better content readability

