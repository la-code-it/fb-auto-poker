// Popup script for Facebook Auto Poke Back extension settings
(function() {
    'use strict';
    
    const DEFAULT_DELAY = 5; // Default delay in seconds
    
    // DOM elements
    const delayInput = document.getElementById('delayInput');
    const saveBtn = document.getElementById('saveBtn');
    const statusMessage = document.getElementById('statusMessage');
    const currentStatus = document.getElementById('currentStatus');
    
    // Load saved settings on popup open
    function loadSettings() {
        browser.storage.sync.get({
            pokeDelay: DEFAULT_DELAY
        }).then((result) => {
            delayInput.value = result.pokeDelay;
        }).catch((error) => {
            console.error('Error loading settings:', error);
            delayInput.value = DEFAULT_DELAY;
        });
    }
    
    // Save settings
    function saveSettings() {
        const delay = parseInt(delayInput.value);
        
        // Validate input
        if (isNaN(delay) || delay < 1 || delay > 300) {
            showMessage('Please enter a valid delay between 1 and 300 seconds.', false);
            return;
        }
        
        // Save to storage
        browser.storage.sync.set({
            pokeDelay: delay
        }).then(() => {
            showMessage('Settings saved successfully!', true);
            
            // Notify content script of the change
            browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
                if (tabs[0]) {
                    browser.tabs.sendMessage(tabs[0].id, {
                        action: 'updateDelay',
                        delay: delay * 1000 // Convert to milliseconds
                    }).catch(() => {
                        // Ignore errors if content script isn't running
                    });
                }
            });
        }).catch((error) => {
            console.error('Error saving settings:', error);
            showMessage('Failed to save settings. Please try again.', false);
        });
    }
    
    // Show status message
    function showMessage(message, isSuccess) {
        statusMessage.textContent = message;
        statusMessage.className = `status-message ${isSuccess ? 'status-success' : 'status-error'}`;
        statusMessage.style.display = 'block';
        
        // Hide message after 3 seconds
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 3000);
    }
    
    // Check current page status
    function checkCurrentStatus() {
        browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
            if (tabs[0]) {
                const url = tabs[0].url;
                const isOnPokesPage = url && (
                    url.includes('facebook.com/pokes') || 
                    url.includes('www.facebook.com/pokes')
                );
                
                if (isOnPokesPage) {
                    currentStatus.innerHTML = '<span class="active-status">✓ Active on Facebook Pokes page</span>';
                } else if (url && url.includes('facebook.com')) {
                    currentStatus.innerHTML = '<span class="inactive-status">○ On Facebook (navigate to pokes page to activate)</span>';
                } else {
                    currentStatus.innerHTML = '<span class="inactive-status">○ Not on Facebook</span>';
                }
            } else {
                currentStatus.textContent = 'Unable to check current page';
            }
        }).catch(() => {
            currentStatus.textContent = 'Unable to check current page';
        });
    }
    
    // Event listeners
    saveBtn.addEventListener('click', saveSettings);
    
    // Allow saving with Enter key
    delayInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveSettings();
        }
    });
    
    // Auto-validate input
    delayInput.addEventListener('input', () => {
        const delay = parseInt(delayInput.value);
        if (isNaN(delay) || delay < 1 || delay > 300) {
            delayInput.style.borderColor = '#dc3545';
        } else {
            delayInput.style.borderColor = '#ddd';
        }
    });
    
    // Initialize popup
    document.addEventListener('DOMContentLoaded', () => {
        loadSettings();
        checkCurrentStatus();
    });
    
})();