# Facebook Auto Poke Back Extension

A simple Firefox extension that automatically pokes back on Facebook with configurable check intervals.

## Files Structure
```
auto-poke/
├── manifest.json       # Extension configuration
├── content.js         # Main script that handles auto-poking
├── popup.html         # Settings popup interface
├── popup.js           # Settings popup functionality
├── icon.svg           # Extension icon
└── README.md          # This file
```

## Installation Instructions

### Method 1: Temporary Installation (for testing)
1. Open Firefox
2. Type `about:debugging` in the address bar
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on..."
5. Navigate to the `auto-poke` folder and select `manifest.json`
6. The extension will be loaded temporarily (until Firefox restart)

### Method 2: Permanent Installation (requires signing)
For permanent installation, you would need to:
1. Package the extension as a .xpi file
2. Submit it to Mozilla for signing
3. Install the signed .xpi file

For development/personal use, Method 1 is sufficient.

## Usage

1. Install the extension using the instructions above
2. Click the extension icon in the browser toolbar to open settings
3. Configure your preferred check interval (default: 5 seconds)
4. Navigate to `https://www.facebook.com/pokes/`
5. The extension will automatically start looking for "Poke Back" buttons at your configured interval
6. Check the browser console (F12) to see logging output

## Settings

- **Check Interval**: Set how often the extension checks for new pokes (1-300 seconds)
- **Status Indicator**: Shows if the extension is active on the current page
- **Real-time Updates**: Changes apply immediately without needing to refresh the page

## Features

- Automatically clicks "Poke Back" buttons with configurable intervals (1-300 seconds)
- Settings popup accessible via browser toolbar button
- Only works on the Facebook pokes page for safety
- Uses vanilla JavaScript for lightweight performance
- Includes console logging for debugging
- Handles Facebook's single-page application navigation
- Real-time settings updates without page refresh

## Notes

- This extension only works on `https://www.facebook.com/pokes/*`
- It includes safety checks to ensure buttons are visible before clicking
- The extension respects Facebook's page structure and doesn't interfere with other pages
- All activity is logged to the browser console for transparency

## Troubleshooting

If the extension isn't working:
1. Check that you're on the correct Facebook pokes page
2. Open Developer Tools (F12) and check the Console tab for any error messages
3. Make sure the extension is loaded and active in `about:debugging`
4. Try refreshing the page after a few seconds

## Disclaimer

Use this extension responsibly and in accordance with Facebook's Terms of Service. This is for educational/personal use only.