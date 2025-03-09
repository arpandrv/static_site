/**
 * Mango Surveillance Website - Main JavaScript
 * This file contains all JavaScript functionality for the Mango Surveillance website
 */

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all common functionalities
    initializeResponsiveNavigation();
    initializeSmoothScrolling();
    enhanceUIElements();
    initializeDisclaimerHandling();
    setupResourceLinks();
    
    // Page-specific initializations based on current page
    initializePageSpecificFeatures();
});

/**
 * Sets up responsive navigation for mobile devices
 */
function initializeResponsiveNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    const header = document.querySelector('.header-container');
    
    // Create mobile navigation toggle button if it doesn't exist
    if (!document.querySelector('.mobile-nav-toggle')) {
        const mobileNavToggle = document.createElement('button');
        mobileNavToggle.classList.add('mobile-nav-toggle');
        mobileNavToggle.setAttribute('aria-label', 'Toggle navigation menu');
        mobileNavToggle.innerHTML = '☰';
        
        header.insertBefore(mobileNavToggle, nav);
        
        // Toggle navigation when button is clicked
        mobileNavToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Handle window resize for responsive navigation
    function handleResize() {
        const toggle = document.querySelector('.mobile-nav-toggle');
        if (!toggle) return;
        
        if (window.innerWidth < 768) {
            toggle.style.display = 'block';
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                toggle.innerHTML = '☰';
            }
        } else {
            toggle.style.display = 'none';
            nav.classList.add('active');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    // Highlight current page in navigation
    highlightCurrentPageInNav();
}

/**
 * Highlights the current page in the navigation menu
 */
function highlightCurrentPageInNav() {
    // Get current page name from URL
    const path = window.location.pathname;
    const currentPage = path.substring(path.lastIndexOf('/') + 1);
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        // Get page name from href attribute
        const href = link.getAttribute('href');
        
        // Check if this link corresponds to current page
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (href.includes(currentPage))) {
            link.classList.add('active');
        }
    });
}

/**
 * Initializes smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process actual anchors, not "#" placeholders
            if (href !== '#') {
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL hash without jumping
                    history.pushState(null, '', href);
                }
            }
        });
    });
}

/**
 * Enhances various UI elements across the site
 */
function enhanceUIElements() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.details-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Calendar item highlighting
    const calendarItems = document.querySelectorAll('.calendar-item');
    calendarItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.backgroundColor = 'rgba(46, 125, 50, 0.1)';
            setTimeout(() => {
                this.style.backgroundColor = '';
                this.style.transition = 'background-color 0.5s ease';
            }, 300);
        });
    });
    
    // Show Details button functionality
    document.querySelectorAll('.details-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get parent card and item name
            const parentCard = this.closest('.pest-card, .disease-card, .feature-card');
            if (!parentCard) return;
            
            const title = parentCard.querySelector('h3').textContent;
            
            // Create modal dialog
            showDetailsModal(title);
        });
    });
}

/**
 * Creates and shows a modal dialog for item details
 */
function showDetailsModal(title) {
    // Create modal container if it doesn't exist
    let modal = document.getElementById('details-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'details-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = 'white';
        modalContent.style.padding = '20px';
        modalContent.style.borderRadius = '5px';
        modalContent.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        modalContent.style.maxWidth = '80%';
        modalContent.style.width = '500px';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.overflow = 'auto';
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '✕';
        closeButton.style.float = 'right';
        closeButton.style.border = 'none';
        closeButton.style.background = 'none';
        closeButton.style.fontSize = '1.5em';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = function() {
            document.body.removeChild(modal);
        };
        
        // Create title
        const modalTitle = document.createElement('h2');
        modalTitle.style.color = '#2e7d32';
        modalTitle.style.marginTop = '0';
        modalTitle.textContent = title;
        
        // Create content
        const modalBody = document.createElement('div');
        modalBody.innerHTML = `<p>Detailed information about ${title} would be displayed here in a full implementation.</p>
                              <p>This would include comprehensive information about identification, life cycle, symptoms, impacts, and management strategies.</p>`;
        
        // Assemble modal
        modalContent.appendChild(closeButton);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalBody);
        modal.appendChild(modalContent);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        document.body.appendChild(modal);
    }
}

/**
 * Handles the disclaimer acknowledgment functionality
 */
function initializeDisclaimerHandling() {
    const disclaimer = document.getElementById('disclaimer');
    if (!disclaimer) return;
    
    // Check if disclaimer acknowledgment button exists or needs to be created
    let acknowledgeBtn = document.getElementById('acknowledge-btn');
    
    if (!acknowledgeBtn && disclaimer) {
        // Create acknowledgment controls div if it doesn't exist
        let disclaimerControls = disclaimer.querySelector('.disclaimer-controls');
        
        if (!disclaimerControls) {
            disclaimerControls = document.createElement('div');
            disclaimerControls.classList.add('disclaimer-controls');
            disclaimerControls.style.marginTop = '15px';
            disclaimer.appendChild(disclaimerControls);
        }
        
        // Create the button
        acknowledgeBtn = document.createElement('button');
        acknowledgeBtn.id = 'acknowledge-btn';
        acknowledgeBtn.textContent = 'I acknowledge';
        disclaimerControls.appendChild(acknowledgeBtn);
    }
    
    if (acknowledgeBtn) {
        // Add event listener to the button
        acknowledgeBtn.addEventListener('click', function() {
            this.textContent = 'Acknowledged';
            this.disabled = true;
            
            // Save acknowledgment to localStorage
            localStorage.setItem('disclaimerAcknowledged', 'true');
            
            // Add fade effect to disclaimer
            disclaimer.classList.add('acknowledged');
            
            // Show thank you message if it doesn't exist
            if (!document.querySelector('.acknowledgment-message')) {
                const thankYou = document.createElement('p');
                thankYou.classList.add('acknowledgment-message');
                thankYou.textContent = 'Thank you for acknowledging our disclaimer.';
                this.parentNode.appendChild(thankYou);
            }
        });
        
        // Check if already acknowledged
        if (localStorage.getItem('disclaimerAcknowledged') === 'true') {
            acknowledgeBtn.textContent = 'Acknowledged';
            acknowledgeBtn.disabled = true;
            disclaimer.classList.add('acknowledged');
        }
    }
}

/**
 * Sets up interactive resource links with info panels
 */
function setupResourceLinks() {
    const resourceLinks = document.querySelectorAll('.resource-link');
    if (resourceLinks.length === 0) return;
    
    // Resource descriptions - used if data-description attribute is not set
    const defaultResourceDescriptions = {
        'resource-1': 'The Department provides biosecurity services to protect Australia\'s agricultural industry and environment from pests and diseases.',
        'resource-2': 'The peak industry body for Australian mango growers, providing research, development, and marketing support for the industry.',
        'resource-3': 'A national organization dedicated to plant biosecurity in Australia, coordinating plant health surveillance nationwide.'
    };
    
    // Create resource info panel if it doesn't exist
    let resourceInfoPanel = document.getElementById('resource-info-panel');
    if (!resourceInfoPanel) {
        const resourcesContainer = resourceLinks[0].parentNode;
        
        resourceInfoPanel = document.createElement('div');
        resourceInfoPanel.id = 'resource-info-panel';
        resourceInfoPanel.style.display = 'none';
        
        const resourceDescription = document.createElement('p');
        resourceDescription.id = 'resource-description';
        resourceDescription.textContent = 'Select a resource to see more information.';
        
        resourceInfoPanel.appendChild(resourceDescription);
        resourcesContainer.appendChild(resourceInfoPanel);
    }
    
    // Add click effects to resource links
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show info panel
            resourceInfoPanel.style.display = 'block';
            
            // Get description from data attribute or default descriptions
            let description;
            if (this.dataset.description) {
                description = this.dataset.description;
            } else if (this.id && defaultResourceDescriptions[this.id]) {
                description = defaultResourceDescriptions[this.id];
            } else {
                description = 'Information about this resource is not available.';
            }
            
            // Update description
            document.getElementById('resource-description').textContent = description;
            
            // Highlight active resource
            resourceLinks.forEach(l => {
                l.style.fontWeight = 'normal';
            });
            this.style.fontWeight = 'bold';
        });
    });
}

/**
 * Initializes page-specific features based on current page
 */
function initializePageSpecificFeatures() {
    // Get current page
    const path = window.location.pathname;
    const currentPage = path.substring(path.lastIndexOf('/') + 1);
    
    // Home page
    if (currentPage === '' || currentPage === 'index.html') {
        initializeHomePage();
    }
    // Pest page
    else if (currentPage === 'pests.html') {
        initializePestPage();
    }
    // Disease page
    else if (currentPage === 'diseases.html') {
        initializeDiseasePage();
    }
    // Surveillance page
    else if (currentPage === 'surveillance.html') {
        initializeSurveillancePage();
    }
    // About page
    else if (currentPage === 'about.html') {
        initializeAboutPage();
    }
}

/**
 * Initialize Home page specific features
 */
function initializeHomePage() {
    console.log('Home page initialized');
    // Additional home page-specific functionality can be added here
}

/**
 * Initialize Pest page specific features
 */
function initializePestPage() {
    console.log('Pest page initialized');
    // Additional pest page-specific functionality can be added here
}

/**
 * Initialize Disease page specific features
 */
function initializeDiseasePage() {
    console.log('Disease page initialized');
    
    // Environmental factors table row highlighting
    const tableRows = document.querySelectorAll('.env-factors tr');
    if (tableRows.length > 0) {
        tableRows.forEach(row => {
            if (!row.closest('thead')) { // Skip header row
                row.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = 'rgba(46, 125, 50, 0.1)';
                });
                
                row.addEventListener('mouseleave', function() {
                    if (this.rowIndex % 2 === 0) {
                        this.style.backgroundColor = '#f9f9f9';
                    } else {
                        this.style.backgroundColor = '';
                    }
                });
            }
        });
    }
}

/**
 * Initialize Surveillance page specific features
 */
function initializeSurveillancePage() {
    console.log('Surveillance page initialized');
    
    // Add interactivity to surveillance method cards
    document.querySelectorAll('.section-content').forEach(section => {
        section.addEventListener('click', function() {
            this.style.borderColor = '#2e7d32';
            setTimeout(() => {
                this.style.borderColor = '#ddd';
                this.style.transition = 'border-color 0.5s ease';
            }, 500);
        });
    });
    
    // Make monitoring table rows interactive
    const tableRows = document.querySelectorAll('.monitoring-table tr');
    if (tableRows.length > 0) {
        tableRows.forEach(row => {
            if (!row.closest('thead')) { // Skip header row
                row.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = 'rgba(46, 125, 50, 0.1)';
                });
                
                row.addEventListener('mouseleave', function() {
                    if (this.rowIndex % 2 === 0) {
                        this.style.backgroundColor = '#f9f9f9';
                    } else {
                        this.style.backgroundColor = '';
                    }
                });
            }
        });
    }
}

/**
 * Initialize About page specific features
 */
function initializeAboutPage() {
    console.log('About page initialized');
    
    // Make contact information interactive
    const contactInfo = document.querySelector('.sidebar-content p:nth-of-type(3)');
    if (contactInfo) {
        contactInfo.addEventListener('click', function() {
            // Display a message about contacting
            const message = document.createElement('div');
            message.textContent = 'Email address copied!';
            message.style.color = '#2e7d32';
            message.style.padding = '5px';
            message.style.marginTop = '10px';
            message.style.fontWeight = 'bold';
            message.style.backgroundColor = '#f0f9f0';
            message.style.borderRadius = '4px';
            message.style.textAlign = 'center';
            
            // Check if message already exists
            if (!this.nextElementSibling || !this.nextElementSibling.textContent.includes('copied')) {
                this.parentNode.insertBefore(message, this.nextSibling);
                
                // Remove the message after 3 seconds
                setTimeout(() => {
                    if (message.parentNode) {
                        message.parentNode.removeChild(message);
                    }
                }, 3000);
                
                // Simulate copying to clipboard
                if (navigator.clipboard) {
                    navigator.clipboard.writeText('hit237@cdu.edu.au');
                }
            }
        });
    }
}

/**
 * Image loading error handler
 * Provides a fallback for images that fail to load
 */
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Set a default error handler for all images
        img.addEventListener('error', function() {
            // Don't replace logo image
            if (!this.src.includes('mango-logo')) {
                this.src = 'images/placeholder.jpg';
                this.alt = 'Image unavailable';
            }
        });
    });
});

/**
 * Theme toggle functionality
 * Creates a theme toggle button in the top right corner
 */
function createThemeToggle() {
    // Create toggle button
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '🌓';
    themeToggle.title = 'Toggle dark/light mode';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.backgroundColor = '#2e7d32';
    themeToggle.style.color = 'white';
    themeToggle.style.border = 'none';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.width = '40px';
    themeToggle.style.height = '40px';
    themeToggle.style.fontSize = '1.2em';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    themeToggle.style.zIndex = '999';
    
    // Add event listener
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Save preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Append to body
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// Add dark mode styles
function addDarkModeStyles() {
    const style = document.createElement('style');
    style.textContent = `
        body.dark-mode {
            background-color: #222;
            color: #eee;
        }
        
        body.dark-mode .card,
        body.dark-mode .section-content,
        body.dark-mode .sidebar-content {
            background-color: #333;
            color: #eee;
        }
        
        body.dark-mode .card h2,
        body.dark-mode .card h3 {
            color: #4caf50;
        }
        
        body.dark-mode .feature-card,
        body.dark-mode .pest-card,
        body.dark-mode .disease-card {
            background-color: #333;
        }
        
        body.dark-mode .feature-content,
        body.dark-mode .pest-content,
        body.dark-mode .disease-content {
            color: #eee;
        }
        
        body.dark-mode .resource-link {
            color: #8bc34a;
            border-bottom-color: #444;
        }
        
        body.dark-mode #resource-info-panel {
            background-color: #444;
            border-left-color: #8bc34a;
        }
        
        body.dark-mode .disclaimer {
            background-color: #333;
            border-color: #444;
        }
        
        body.dark-mode table {
            border-color: #444;
        }
        
        body.dark-mode th {
            background-color: #444;
        }
        
        body.dark-mode td {
            border-color: #444;
        }
        
        body.dark-mode tr:nth-child(even) {
            background-color: #2d2d2d;
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize theme toggle
addDarkModeStyles();
createThemeToggle();