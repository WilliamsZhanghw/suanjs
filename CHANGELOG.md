# Changelog

All notable changes to this project will be documented in this file.

## [V8] - 2025-12-01

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

