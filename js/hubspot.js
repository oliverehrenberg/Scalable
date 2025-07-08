// HubSpot Integration för Scaleble
(function() {
    'use strict';

    // HubSpot Configuration
    const HUBSPOT_CONFIG = {
        portalId: 'YOUR_HUBSPOT_PORTAL_ID', // Ersätt med riktig Portal ID
        formId: 'YOUR_HUBSPOT_FORM_ID', // Ersätt med riktig Form ID
        region: 'eu1', // Ändra om annat region
        css: '',
        cssClass: 'hubspot-form',
        submitButtonClass: 'btn btn-primary',
        errorClass: 'form-error',
        target: '#hubspot-contact-form'
    };

    // Globala variabler
    let hubspotLoaded = false;
    let formSubmitted = false;

    // Initialize HubSpot
    function initHubSpot() {
        // Ladda HubSpot script om det inte redan är laddat
        if (!window.hbspt) {
            loadHubSpotScript();
        } else {
            setupHubSpotForm();
        }
    }

    function loadHubSpotScript() {
        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/embed/v2.js';
        script.async = true;
        script.onload = function() {
            hubspotLoaded = true;
            setupHubSpotForm();
            console.log('HubSpot script loaded successfully');
        };
        script.onerror = function() {
            console.error('Failed to load HubSpot script, falling back to custom form');
            setupFallbackForm();
        };
        document.head.appendChild(script);
    }

    function setupHubSpotForm() {
        if (!window.hbspt || !window.hbspt.forms) {
            console.error('HubSpot forms not available');
            setupFallbackForm();
            return;
        }

        // Kolla om form target existerar
        const target = document.querySelector(HUBSPOT_CONFIG.target);
        if (!target) {
            console.error('HubSpot form target not found');
            setupFallbackForm();
            return;
        }

        try {
            window.hbspt.forms.create({
                region: HUBSPOT_CONFIG.region,
                portalId: HUBSPOT_CONFIG.portalId,
                formId: HUBSPOT_CONFIG.formId,
                target: HUBSPOT_CONFIG.target,
                css: HUBSPOT_CONFIG.css,
                cssClass: HUBSPOT_CONFIG.cssClass,
                submitButtonClass: HUBSPOT_CONFIG.submitButtonClass,
                errorClass: HUBSPOT_CONFIG.errorClass,
                
                // Anpassade meddelanden
                translations: {
                    sv: {
                        required: 'Detta fält är obligatoriskt',
                        invalidEmail: 'Ange en giltig e-postadress',
                        submit: 'Skicka meddelande',
                        thankYou: 'Tack för ditt meddelande! Vi återkommer så snart som möjligt.'
                    }
                },

                // Callbacks
                onFormReady: function() {
                    console.log('HubSpot form is ready');
                    customizeHubSpotForm();
                    hideLoader();
                },

                onFormSubmit: function(form) {
                    console.log('HubSpot form submitted');
                    formSubmitted = true;
                    showFormLoading();
                    
                    // Tracking event
                    trackFormSubmission('contact', form);
                },

                onFormSubmitted: function() {
                    console.log('HubSpot form submission confirmed');
                    hideFormLoading();
                    showSuccessMessage();
                    
                    // Google Analytics tracking om tillgängligt
                    if (window.gtag) {
                        gtag('event', 'form_submit', {
                            event_category: 'Contact',
                            event_label: 'Main Contact Form',
                            value: 1
                        });
                    }
                }
            });

        } catch (error) {
            console.error('Error creating HubSpot form:', error);
            setupFallbackForm();
        }
    }

    function customizeHubSpotForm() {
        const form = document.querySelector(`${HUBSPOT_CONFIG.target} form`);
        if (!form) return;

        // Lägg till svenska labels och placeholders
        const fieldMappings = {
            'firstname': { label: 'Förnamn', placeholder: 'Ditt förnamn' },
            'lastname': { label: 'Efternamn', placeholder: 'Ditt efternamn' },
            'email': { label: 'E-post', placeholder: 'din@email.se' },
            'company': { label: 'Företag', placeholder: 'Ditt företag' },
            'phone': { label: 'Telefon', placeholder: '+46 70 123 45 67' },
            'message': { label: 'Meddelande', placeholder: 'Berätta hur vi kan hjälpa dig...' }
        };

        Object.keys(fieldMappings).forEach(fieldName => {
            const field = form.querySelector(`input[name="${fieldName}"], textarea[name="${fieldName}"]`);
            const label = form.querySelector(`label[for*="${fieldName}"]`);
            
            if (field) {
                field.placeholder = fieldMappings[fieldName].placeholder;
                
                // Lägg till focus/blur events för animationer
                field.addEventListener('focus', function() {
                    this.closest('.hs-form-field').classList.add('focused');
                });
                
                field.addEventListener('blur', function() {
                    this.closest('.hs-form-field').classList.remove('focused');
                    if (this.value) {
                        this.closest('.hs-form-field').classList.add('filled');
                    } else {
                        this.closest('.hs-form-field').classList.remove('filled');
                    }
                });
            }
            
            if (label) {
                label.textContent = fieldMappings[fieldName].label;
            }
        });

        // Anpassa submit button
        const submitBtn = form.querySelector('input[type="submit"]');
        if (submitBtn) {
            submitBtn.value = 'Skicka meddelande';
            submitBtn.classList.add('btn', 'btn-primary');
        }

        // Lägg till CSS klasser för styling
        form.classList.add('custom-hubspot-form');
    }

    function setupFallbackForm() {
        const fallbackForm = document.getElementById('fallback-form');
        const hubspotContainer = document.querySelector(HUBSPOT_CONFIG.target);
        
        if (fallbackForm && hubspotContainer) {
            // Visa fallback form istället för HubSpot container
            hubspotContainer.style.display = 'none';
            fallbackForm.style.display = 'block';
            
            console.log('Using fallback form instead of HubSpot');
            hideLoader();
        }
    }

    function showFormLoading() {
        const form = document.querySelector(`${HUBSPOT_CONFIG.target} form`) || 
                    document.getElementById('fallback-form');
        
        if (form && window.ScalebleWebsite) {
            window.ScalebleWebsite.showFormLoading(form);
        }
    }

    function hideFormLoading() {
        const form = document.querySelector(`${HUBSPOT_CONFIG.target} form`) || 
                    document.getElementById('fallback-form');
        
        if (form && window.ScalebleWebsite) {
            window.ScalebleWebsite.hideFormLoading(form);
        }
    }

    function showSuccessMessage() {
        if (window.ScalebleWebsite) {
            window.ScalebleWebsite.showFormSuccess();
        }
    }

    function hideLoader() {
        const loader = document.querySelector('.form-loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }

    function trackFormSubmission(formType, formData) {
        // HubSpot Analytics tracking
        if (window._hsq) {
            window._hsq.push(['trackEvent', {
                id: 'contact_form_submission',
                value: formType
            }]);
        }

        // Custom tracking event
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'form_submission',
                form_type: formType,
                timestamp: new Date().toISOString()
            });
        }

        console.log('Form submission tracked:', formType);
    }

    // HubSpot Chat Widget Setup
    function setupHubSpotChat() {
        // Kolla om chat widget ska laddas
        const chatWidget = document.getElementById('chatWidget');
        if (!chatWidget) return;

        // Ladda HubSpot chat script
        if (!window.HubSpotConversations) {
            const script = document.createElement('script');
            script.src = `https://js.usemessages.com/conversations-embed.js`;
            script.async = true;
            script.onload = function() {
                console.log('HubSpot chat loaded');
                initializeChat();
            };
            document.head.appendChild(script);
        }
    }

    function initializeChat() {
        if (window.HubSpotConversations) {
            window.HubSpotConversations.widget.load({
                widgetOpen: false,
                enableWelcomeMessage: true,
                welcomeMessage: 'Hej! Hur kan vi hjälpa dig idag?'
            });
        }
    }

    // Tracking functions
    function trackPageView() {
        if (window._hsq) {
            window._hsq.push(['setPath', window.location.pathname]);
            window._hsq.push(['trackPageView']);
        }
    }

    function trackButtonClick(buttonName, section) {
        if (window._hsq) {
            window._hsq.push(['trackEvent', {
                id: 'button_click',
                value: buttonName,
                section: section
            }]);
        }

        if (window.gtag) {
            gtag('event', 'click', {
                event_category: 'Button',
                event_label: `${section} - ${buttonName}`,
                value: 1
            });
        }
    }

    // Setup tracking för CTAs
    function setupCTATracking() {
        const ctaButtons = document.querySelectorAll('[data-track-cta]');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', function() {
                const ctaName = this.getAttribute('data-track-cta');
                const section = this.closest('section')?.id || 'unknown';
                trackButtonClick(ctaName, section);
            });
        });
    }

    // Initialize allt
    function init() {
        // Vänta tills DOM är redo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initHubSpot();
                setupHubSpotChat();
                setupCTATracking();
                trackPageView();
            });
        } else {
            initHubSpot();
            setupHubSpotChat();
            setupCTATracking();
            trackPageView();
        }
    }

    // Exponera funktioner globalt
    window.ScalebleHubSpot = {
        init,
        trackButtonClick,
        trackFormSubmission,
        setupFallbackForm
    };

    // Auto-initialize
    init();

})(); 