# Version Notes for Firefox Add-on Store Submission

## Version 1.0.4 - Mozilla Add-on Compliance & Validation Fixes

### Overview
Critical update to ensure full compliance with Firefox Add-on Store requirements and resolve all validation warnings.

### Key Changes in Version 1.0.4
- **Updated Manifest Standards**: Migrated from deprecated "applications" to "browser_specific_settings" for Manifest V3 compatibility
- **Privacy Compliance**: Added proper data collection permissions object structure for transparency
- **Extension ID**: Added proper extension ID for future AMO requirements compliance
- **Validation Fix**: Corrected data_collection_permissions format from string to required object structure

### Technical Implementation in Version 1.0.4
- **Data Collection Declaration**: Properly structured object with `required: ["none"]` per Mozilla specification
- **Future Compatibility**: Full preparation for Manifest V3 migration requirements
- **AMO Compliance**: Addressed all Firefox Add-on Store validation requirements including proper data collection format
- **Mozilla Specification**: Updated to match exact MDN documentation requirements with array-based permissions structure
- **No Data Collection**: Array with "none" value explicitly indicates no data collection permissions are required by this extension
- **AMO ID Synchronization**: Manifest ID now matches the official AMO-registered extension ID

## Version 1.0.3 - Enhanced Button Detection & Expanded Coverage

### Overview
This update significantly improves the reliability and accuracy of poke button detection while expanding Facebook page coverage for better user experience.

### Key Improvements in Version 1.0.3
- **Enhanced Button Detection**: Added `role="button"` attribute validation for more precise poke button identification
- **Expanded Facebook Coverage**: Extended content script to run on all Facebook pages, not just pokes-specific URLs
- **Improved Accessibility Compliance**: Now respects proper ARIA button roles for better accessibility
- **Reduced False Positives**: More sophisticated element filtering prevents clicks on non-interactive elements
- **Better Facebook Integration**: Works seamlessly across Facebook's dynamic navigation system

### Technical Changes in Version 1.0.3
- **ARIA Role Validation**: Both vanilla JavaScript and jQuery implementations now check for `role="button"` attribute
- **Broader URL Matching**: Content script matches all Facebook pages (`*://www.facebook.com/*`) for seamless operation
- **Enhanced Element Filtering**: Triple-layer validation (text content + button role + visibility) for maximum accuracy
- **Future-Proof Design**: Aligns with Facebook's accessibility standards and modern web practices

### Bug Fixes in Version 1.0.3
- Fixed potential false positive clicks on decorative elements containing "Poke Back" text
- Improved reliability when Facebook updates their DOM structure
- Enhanced compatibility with Facebook's accessibility improvements
- Resolved AMO validation warnings by updating manifest structure
- Added missing data collection permissions declaration
- Included proper extension ID for future Firefox requirements

### AMO Compliance Updates in Version 1.0.3
- **Manifest V3 Preparation**: Updated to use "browser_specific_settings" instead of deprecated "applications" property
- **Data Collection Declaration**: Explicitly declared "no_collection" to confirm no user data is collected
- **Extension Identity**: Added unique extension ID for proper AMO identification and future requirements
- **Warning Resolution**: Addressed all AMO validation warnings for clean submission

---

## Version 1.0.0 - Initial Release

### Overview
Facebook Auto Poke Back is a Firefox extension that automates the process of "poking back" on Facebook's pokes page. This extension helps users automatically respond to pokes without manual intervention.

### Features
- **Automatic Poke Detection**: Scans the Facebook pokes page for "Poke Back" buttons every 5 seconds
- **Smart Duplicate Prevention**: Advanced algorithm prevents clicking multiple nested elements for the same person
- **Safe Operation**: Only operates on Facebook pokes pages with comprehensive URL pattern matching
- **jQuery Integration**: Uses jQuery 3.6.0 for enhanced DOM manipulation and compatibility
- **Intelligent Console Logging**: Provides detailed, emoji-enhanced logging for debugging and transparency
- **SPA Navigation Support**: Handles Facebook's single-page application navigation changes seamlessly
- **Visibility Checks**: Only clicks visible and interactive buttons to ensure proper functionality
- **Flexible URL Matching**: Works with various Facebook pokes URL patterns (with/without www, trailing slashes)

### Technical Implementation
- **Advanced Content Script**: Runs only on Facebook pokes pages with intelligent URL detection
- **Manifest V2**: Uses standard Firefox extension manifest format with comprehensive URL patterns
- **Minimal Permissions**: Only requires access to Facebook domains - no excessive permissions
- **No Background Scripts**: Lightweight implementation using only content scripts for better performance
- **Smart Element Filtering**: Sophisticated algorithm to identify unique poke buttons and prevent duplicates
- **DOM Mutation Observer**: Handles dynamic content loading and single-page application navigation
- **Cross-Browser Ready**: Code structure allows for easy Chrome extension conversion
- **Interval Management**: Proper cleanup and management of timers to prevent memory leaks

### Security & Privacy
- **Limited Scope**: Extension only operates on Facebook pokes page
- **No Data Collection**: Extension does not collect, store, or transmit any user data
- **Local Processing**: All operations happen locally in the browser
- **Transparent Operation**: All actions logged to console for user visibility

### Code Quality
- **Error Handling**: Includes proper error handling and validation
- **Performance Optimized**: Efficient DOM querying with minimal resource usage
- **Clean Code**: Well-commented, maintainable JavaScript code
- **Standards Compliant**: Follows Firefox extension development best practices

### User Experience
- **Zero Configuration**: Works immediately upon installation
- **Non-Intrusive**: Does not modify Facebook's interface or other pages
- **Reliable Operation**: Handles dynamic content loading and page changes
- **Debug Friendly**: Console output helps users understand extension activity

### Changes in Version 1.0.0
- **Core Functionality**: Initial implementation of automatic poke back functionality
- **jQuery Integration**: Added jQuery 3.6.0 for enhanced DOM manipulation and compatibility
- **Smart Timing**: Implemented 5-second interval for automatic checking with proper interval cleanup
- **Duplicate Prevention**: Advanced algorithm to prevent clicking nested elements for the same person
- **Enhanced URL Matching**: Comprehensive URL pattern matching for various Facebook pokes page formats
- **Intelligent Logging**: Emoji-enhanced console logging with detailed operation feedback
- **Safety Checks**: Multiple layers of validation for visible and clickable elements
- **Manifest Optimization**: Proper manifest with minimal required permissions and comprehensive URL patterns
- **SPA Navigation**: Full support for Facebook's single-page application navigation patterns
- **Performance Optimization**: Efficient DOM querying with smart element filtering
- **Error Handling**: Robust error handling and DOM ready state checking
- **Memory Management**: Proper cleanup of intervals and observers to prevent memory leaks

### Testing Performed
- **Browser Compatibility**: Tested on Firefox versions 90+ (latest stable and developer editions)
- **Facebook Integration**: Verified functionality on various Facebook pokes page URL formats
- **Isolation Testing**: Confirmed no interference with other Facebook pages or extensions
- **Security Validation**: Validated permission scope and security boundaries
- **Performance Testing**: Extensive testing with multiple pokes scenarios and DOM structures
- **Cross-Platform Testing**: Verified on Windows, macOS, and Linux environments
- **URL Pattern Testing**: Tested all supported URL variations (with/without www, trailing slashes)
- **Duplicate Prevention Testing**: Verified smart filtering prevents multiple clicks per person
- **Navigation Testing**: Confirmed proper handling of Facebook's single-page application navigation
- **Memory Leak Testing**: Validated proper cleanup of intervals and observers

### Known Limitations
- Requires active Facebook session to function
- Only works on desktop version of Facebook
- Depends on Facebook's current DOM structure for "Poke Back" buttons
- Will stop working if Facebook changes the pokes page structure significantly

### Future Enhancements (Planned)
- **Configurable Settings**: User-configurable interval timing (1-30 seconds)
- **Notification System**: Optional desktop notifications when pokes are sent
- **Enhanced Reporting**: Detailed statistics and activity reports
- **Mobile Support**: Support for mobile Facebook interface and responsive design
- **Advanced Filtering**: Custom filters for specific friends or poke frequency
- **Sound Alerts**: Optional audio feedback for successful pokes
- **Backup/Restore**: Settings backup and restore functionality
- **Multi-Language**: Internationalization for non-English Facebook interfaces

### Compatibility
- **Firefox Version**: 57.0 and later (Quantum and newer)
- **Platform**: Windows, macOS, Linux
- **Facebook**: Current desktop interface
- **Dependencies**: None (jQuery bundled)

### Installation Requirements
- Active Firefox browser
- Facebook account with access to pokes feature
- Internet connection for Facebook access

### Support Information
- Extension operates independently without external servers
- No user account or registration required
- Minimal system resource usage
- Compatible with other Facebook extensions