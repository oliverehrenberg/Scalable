// Scalable Website JavaScript
(function() {
    'use strict';

    // DOM Elements
    const header = document.querySelector('.header');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const chatWidget = document.getElementById('chatWidget');
    const fallbackForm = document.getElementById('fallback-form');

    // State
    let isScrolled = false;
    let isMobileMenuOpen = false;

    // --- HEADER HIDE ON SCROLL ---
    let lastScrollTop = 0;
    let headerHidden = false;

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        initSystemTheme();
        initNavigation();
        initScrollEffects();
        initAnimations();
        initForms();
        initChatWidget();
        initMobileMenu();
        initReadMoreButtons();
        // Uppdatera sidfötens årtal automatiskt
        updateFooterYear();
    });

    // System Theme Management
    function initSystemTheme() {
        // Använd systemets färgpreferenser
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (prefersDark) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        
        // Lyssna på ändringar i systempreferenser
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (e.matches) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        });
    }

    // Navigation
    function initNavigation() {
        // Smooth scroll för navigation länkar
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Stäng mobile menu om öppen
                    if (isMobileMenuOpen) {
                        closeMobileMenu();
                    }
                    
                    // Smooth scroll
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Uppdatera aktiv länk
                    updateActiveNavLink(this);
                }
            });
        });

        // Uppdatera aktiv länk vid scroll
        window.addEventListener('scroll', updateActiveNavOnScroll);
    }

    function updateActiveNavLink(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100; // Offset för header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    updateActiveNavLink(activeLink);
                }
            }
        });
    }

    // Mobile Menu
    function initMobileMenu() {
        if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', toggleMobileMenu);
        }

        // Stäng menu vid klick utanför
        document.addEventListener('click', function(e) {
            if (isMobileMenuOpen && 
                !mobileMenu.contains(e.target) && 
                !mobileMenuButton.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Stäng menu vid ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                closeMobileMenu();
            }
        });
    }

    function toggleMobileMenu() {
        if (isMobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        isMobileMenuOpen = true;
        mobileMenuButton.classList.add('active');
        mobileMenu.classList.add('open');
        document.body.classList.add('no-scroll');
    }

    function closeMobileMenu() {
        isMobileMenuOpen = false;
        mobileMenuButton.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
    }

    // Scroll Effects
    function initScrollEffects() {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Kör en gång för initial state
    }

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header scroll effect
        if (scrollTop > 50 && !isScrolled) {
            isScrolled = true;
            if (header) header.classList.add('scrolled');
        } else if (scrollTop <= 50 && isScrolled) {
            isScrolled = false;
            if (header) header.classList.remove('scrolled');
        }

        // Header hide/show on scroll direction
        if (header) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Skrollar nedåt
                if (!headerHidden) {
                    header.classList.add('header-hidden');
                    headerHidden = true;
                }
            } else {
                // Skrollar uppåt
                if (headerHidden) {
                    header.classList.remove('header-hidden');
                    headerHidden = false;
                }
            }
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        // Scroll reveal animations
        revealElementsOnScroll();
    }

    // Animations
    function initAnimations() {
        // Lägg till scroll-reveal klass till element
        const elementsToReveal = document.querySelectorAll(
            '.solution-item, .service-card, .expert-text, .about-description'
        );
        
        elementsToReveal.forEach(el => {
            el.classList.add('scroll-reveal');
        });

        // Första reveal check
        revealElementsOnScroll();
    }

    function revealElementsOnScroll() {
        const elementsToReveal = document.querySelectorAll('.scroll-reveal:not(.revealed)');
        
        elementsToReveal.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    }

    // Form Handling
    function initForms() {
        // Endast lägg till fallback form handling om HubSpot inte har tagit över
        if (fallbackForm) {
            // Vänta lite för att ge HubSpot tid att ladda
            setTimeout(() => {
                // Kontrollera om HubSpot-formuläret har ersatt fallback-formuläret
                const hubspotTookOver = window.ScalableHubSpot && 
                                       (window.ScalableHubSpot.isHubSpotFormLoaded() || 
                                        window.ScalableHubSpot.isFallbackFormHidden());
                
                if (!hubspotTookOver && fallbackForm.style.display !== 'none') {
                    // HubSpot har inte tagit över, använd fallback med riktig HubSpot API
                    fallbackForm.addEventListener('submit', handleHubSpotFormSubmit);
                    console.log('Using fallback form with HubSpot API integration');
                } else {
                    console.log('HubSpot form is active, fallback form disabled');
                }
            }, 3000);
        }

        // Input animations
        const inputs = document.querySelectorAll('.custom-field, .custom-field-text');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                if (!this.value) {
                    this.parentElement.classList.remove('filled');
                } else {
                    this.parentElement.classList.add('filled');
                }
            });
        });
    }

    function handleHubSpotFormSubmit(e) {
        e.preventDefault();
        
        // Validera formulär
        const isValid = validateForm(fallbackForm);
        
        if (isValid) {
            // Visa loading state
            showFormLoading(fallbackForm);
            
            // Skicka till HubSpot via API
            submitToHubSpot(fallbackForm)
                .then(() => {
                    hideFormLoading(fallbackForm);
                    showFormSuccess();
                })
                .catch((error) => {
                    hideFormLoading(fallbackForm);
                    showFormError('Ett fel uppstod vid skickandet. Försök igen eller kontakta oss direkt.');
                    console.error('HubSpot submission error:', error);
                });
        }
    }

    function submitToHubSpot(form) {
        const formData = new FormData(form);
        
        // HubSpot Forms API endpoint
        const hubspotPortalId = '146532562';
        const hubspotFormId = '1629d47d-3d57-4ee6-bf46-6422a6a81bec';
        const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`;
        
        // Skapa HubSpot-kompatibel data
        const hubspotData = {
            fields: [
                {
                    name: 'firstname',
                    value: formData.get('firstName') || ''
                },
                {
                    name: 'lastname', 
                    value: formData.get('lastName') || ''
                },
                {
                    name: 'email',
                    value: formData.get('email') || ''
                },
                {
                    name: 'message',
                    value: formData.get('message') || ''
                }
            ],
            context: {
                pageUri: window.location.href,
                pageName: document.title,
                hutk: getCookie('hubspotutk') // HubSpot tracking cookie
            }
        };

        return fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hubspotData)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return '';
    }

    function showFormError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-message';
        errorDiv.innerHTML = `
            <div style="background: var(--secondary-red); color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                ❌ ${message}
            </div>
        `;
        
        const formContainer = document.querySelector('.contact-form-container');
        if (formContainer) {
            // Ta bort eventuellt tidigare felmeddelande
            const existingError = formContainer.querySelector('.form-error-message');
            if (existingError) existingError.remove();
            
            formContainer.appendChild(errorDiv);
            
            // Ta bort efter 8 sekunder
            setTimeout(() => {
                errorDiv.remove();
            }, 8000);
        }
    }

    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            const errorElement = field.parentElement.querySelector('.form-error');
            
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('custom-field-required');
                
                if (!errorElement) {
                    const error = document.createElement('div');
                    error.className = 'form-error';
                    error.textContent = 'Detta fält är obligatoriskt';
                    field.parentElement.appendChild(error);
                }
            } else {
                field.classList.remove('custom-field-required');
                if (errorElement) {
                    errorElement.remove();
                }
            }
        });
        
        return isValid;
    }

    function showFormLoading(form) {
        form.classList.add('form-loading');
        const submitBtn = form.querySelector('.form-submit');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('btn-loading');
        }
    }

    function hideFormLoading(form) {
        form.classList.remove('form-loading');
        const submitBtn = form.querySelector('.form-submit');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-loading');
        }
    }

    function showFormSuccess() {
        // Skapa success meddelande
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success-message';
        successDiv.innerHTML = `
            <div style="background: var(--secondary-green); color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                ✅ Tack för ditt meddelande! Vi återkommer så snart som möjligt.
            </div>
        `;
        
        const formContainer = document.querySelector('.contact-form-container');
        if (formContainer) {
            formContainer.appendChild(successDiv);
            
            // Ta bort efter 5 sekunder
            setTimeout(() => {
                successDiv.remove();
                // Återställ formulär
                if (fallbackForm) fallbackForm.reset();
            }, 5000);
        }
    }

    // Chat Widget
    function initChatWidget() {
        if (chatWidget) {
            chatWidget.addEventListener('click', function() {
                // Här kan HubSpot chat integreras
                alert('Chat-funktionen kommer snart! Använd kontaktformuläret för att komma i kontakt med oss.');
            });
        }
    }

    // Read More Buttons
    function initReadMoreButtons() {
        const readMoreButtons = document.querySelectorAll('.read-more-btn');
        
        readMoreButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetIndex = this.getAttribute('data-target');
                const serviceCard = this.closest('.service-card');
                const description = serviceCard.querySelector('.service-description');
                
                if (description.classList.contains('expanded')) {
                    // Kollapsa texten
                    description.classList.remove('expanded');
                    this.classList.remove('expanded');
                    this.textContent = 'Läs mer';
                } else {
                    // Expandera texten
                    description.classList.add('expanded');
                    this.classList.add('expanded');
                    this.textContent = 'Visa mindre';
                }
                
                // Smooth scroll till knappen om den inte är synlig
                if (!isElementInViewport(button)) {
                    button.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            });
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Number Field Stepper
    function initNumberSteppers() {
        const numberFields = document.querySelectorAll('.custom-field-number');
        
        numberFields.forEach(field => {
            const input = field.querySelector('input');
            const stepperUp = field.querySelector('.input-stepper-up');
            const stepperDown = field.querySelector('.input-stepper-down');
            
            if (stepperUp) {
                stepperUp.addEventListener('click', () => {
                    const currentValue = parseFloat(input.value) || 0;
                    input.value = currentValue + 1;
                    input.dispatchEvent(new Event('change'));
                });
            }
            
            if (stepperDown) {
                stepperDown.addEventListener('click', () => {
                    const currentValue = parseFloat(input.value) || 0;
                    input.value = Math.max(0, currentValue - 1);
                    input.dispatchEvent(new Event('change'));
                });
            }
        });
    }

    // Utility Functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Resize handler
    window.addEventListener('resize', debounce(() => {
        // Stäng mobile menu vid resize till desktop
        if (window.innerWidth > 768 && isMobileMenuOpen) {
            closeMobileMenu();
        }
    }, 250));

    // Initialize number steppers när DOM är redo
    document.addEventListener('DOMContentLoaded', initNumberSteppers);

    // Exponera funktioner globalt för HubSpot integration
    window.ScalableWebsite = {
        showFormLoading,
        hideFormLoading,
        showFormSuccess,
        showFormError,
        closeMobileMenu
    };

    // Lägg till funktion för att uppdatera sidfötens årtal automatiskt
    function updateFooterYear() {
        const el = document.querySelector('.footer-copyright');
        if (el) {
            const year = new Date().getFullYear();
            el.textContent = `© ${year} Scalable. Alla rättigheter förbehållna.`;
        }
    }

    // Dölj fallback-formuläret om HubSpot-formuläret laddas via embed
    function autoHideFallbackOnHubSpotEmbed() {
        const container = document.getElementById('hubspot-contact-form');
        if (!container) return;

        const observer = new MutationObserver(() => {
            const hubspotForm = container.querySelector('form');
            const fallbackForm = document.getElementById('fallback-form');
            if (hubspotForm && fallbackForm && fallbackForm.style.display !== 'none') {
                fallbackForm.style.display = 'none';
                // Ta bort eventuella event listeners genom att ersätta noden
                const newForm = fallbackForm.cloneNode(true);
                fallbackForm.parentNode.replaceChild(newForm, fallbackForm);
                newForm.style.display = 'none';
                observer.disconnect();
            }
        });
        observer.observe(container, { childList: true, subtree: true });
    }

    document.addEventListener('DOMContentLoaded', autoHideFallbackOnHubSpotEmbed);

})(); 