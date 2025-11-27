// Facebook Auto Poke Back Content Script
(function() {
    'use strict';
    
    console.log('Facebook Auto Poke Back extension loaded on:', window.location.href);
    console.log('Document ready state:', document.readyState);
    
    let intervalId = null;
    let currentDelay = 5000; // Default 5 seconds in milliseconds
    
    // Function to find and click "Poke Back" buttons
    function pokeBack() {
        // Your original code with improvements
        const divs = document.querySelectorAll("div");
        let pokedCount = 0;
        
        // console.log(`📊 Found ${divs.length} div elements to check`);
        
        // Find all potential "Poke Back" buttons
        const pokeBackCandidates = [];
        
        divs.forEach((div, index) => {
            const text = div.textContent ? div.textContent.trim() : '';
            const hasButtonRole = div.getAttribute('role') === 'button';
            
            // Check for exact text match, button role, and make sure the element is visible
            if (text === "Poke Back" && hasButtonRole && div.offsetParent !== null) {
                pokeBackCandidates.push({ element: div, index: index + 1 });
            }
        });
        
        
        // Filter out nested elements - only keep the outermost ones
        const uniquePokeButtons = pokeBackCandidates.filter(candidate => {
            // Check if this element is contained within any other candidate
            return !pokeBackCandidates.some(otherCandidate => {
                return otherCandidate.element !== candidate.element && 
                       otherCandidate.element.contains(candidate.element);
            });
        });
        console.log(`Found ${uniquePokeButtons.length} out of ${pokeBackCandidates.length}  "Poke Back" buttons`);

        // Click only the unique, outermost buttons
        uniquePokeButtons.forEach(button => {
            console.log(`Clicking unique "Poke Back" button (element ${button.index})`);
            button.element.click();
            pokedCount++;
        });
        
        if (pokedCount > 0) {
            console.log(`Successfully poked back ${pokedCount} time(s)!`);
        }
    }
    
    // Load delay setting from storage
    function loadDelaySettings() {
        return new Promise((resolve) => {
            if (typeof browser !== 'undefined' && browser.storage) {
                browser.storage.sync.get({ pokeDelay: 5 }).then((result) => {
                    currentDelay = result.pokeDelay * 1000; // Convert seconds to milliseconds
                    console.log('Loaded delay setting:', currentDelay + 'ms');
                    resolve(currentDelay);
                }).catch((error) => {
                    console.error('Error loading delay settings:', error);
                    currentDelay = 5000; // Default fallback
                    resolve(currentDelay);
                });
            } else {
                console.log('Storage API not available, using default delay');
                currentDelay = 5000;
                resolve(currentDelay);
            }
        });
    }

    // Wait for page to fully load before starting
    function startAutoPoking() {
        // Load settings first, then start poking
        loadDelaySettings().then(() => {
            // Clear any existing interval
            if (intervalId) {
                console.log('Clearing previous interval');
                clearInterval(intervalId);
            }

            // Run immediately once
            pokeBack();
            
            // Then run at the configured interval
            console.log('Starting auto-poke with', currentDelay + 'ms interval');
            intervalId = setInterval(pokeBack, currentDelay);
        });
    }
    
    // Check if we're on the pokes page
    function isOnPokesPage() {
        const url = window.location.href.toLowerCase();
        const pokesPatterns = [
            'facebook.com/pokes',
            'www.facebook.com/pokes'
        ];
        
        return pokesPatterns.some(pattern => url.includes(pattern));
    }
    
    if (isOnPokesPage()) {
        console.log('On Facebook pokes page, initializing...');
        // Wait a bit for the page to fully load
        setTimeout(startAutoPoking, 2000);
    } else {
        console.log('Not on pokes page:', window.location.href);
    }
    
    // Also handle navigation changes (Facebook is a SPA)
    let currentUrl = window.location.href;
    const observer = new MutationObserver(() => {
        if (currentUrl !== window.location.href) {
            console.log('URL changed from:', currentUrl);
            console.log('URL changed to:', window.location.href);
            currentUrl = window.location.href;
            
            if (isOnPokesPage()) {
                console.log('Navigated to pokes page, restarting auto-poke...');
                setTimeout(startAutoPoking, 2000);
            } else {
                console.log('Navigated away from pokes page, stopping auto-poke');
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            }
        }
    });
    
    // Start observing DOM changes
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        console.log('Started observing DOM changes');
    } else {
        console.log('Document body not ready, waiting...');
        document.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            console.log('Started observing DOM changes after DOMContentLoaded');
        });
    }
    
    // Listen for messages from popup (settings updates)
    if (typeof browser !== 'undefined' && browser.runtime) {
        browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'updateDelay') {
                console.log('Received delay update:', request.delay + 'ms');
                currentDelay = request.delay;
                
                // Restart auto-poking with new delay if we're on the pokes page
                if (isOnPokesPage() && intervalId) {
                    console.log('Restarting auto-poke with new delay');
                    clearInterval(intervalId);
                    intervalId = setInterval(pokeBack, currentDelay);
                }
                
                sendResponse({ success: true });
            }
        });
    }
    
})();