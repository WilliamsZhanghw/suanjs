# Changelog

All notable changes to this project will be documented in this file.

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

