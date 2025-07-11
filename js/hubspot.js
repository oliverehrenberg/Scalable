// HubSpot Integration för Scalable
(function() {
    'use strict';

    // HubSpot Configuration
    const HUBSPOT_CONFIG = {
        portalId: '146532562', 
        formId: '1629d47d-3d57-4ee6-bf46-6422a6a81bec', 
        
        region: 'eu1', // Ändra till 'na1' för Nordamerika eller 'ap1' för Asien-Stillahavet om nödvändigt
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
        script.src = 'https://js-eu1.hsforms.net/forms/embed/v2.js';
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

        // Sätt en timeout för att automatiskt falla tillbaka till fallback-formuläret
        const formTimeout = setTimeout(() => {
            console.log('HubSpot form timeout - using fallback form');
            setupFallbackForm();
        }, 10000); // 10 sekunder timeout

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
                    // Rensa timeout
                    clearTimeout(formTimeout);
                    // Dölj fallback-formuläret när HubSpot-formuläret är redo
                    hideFallbackForm();
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
                },

                onFormError: function(form) {
                    console.error('HubSpot form error:', form);
                    clearTimeout(formTimeout);
                    setupFallbackForm();
                }
            });

        } catch (error) {
            console.error('Error creating HubSpot form:', error);
            clearTimeout(formTimeout);
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
                field.classList.add('custom-field');
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
            submitBtn.classList.add('btn', 'btn-primary', 'form-submit');
        }

        // Lägg till layout-struktur som matchar originalet
        const formFields = form.querySelectorAll('.hs-form-field');
        const firstNameField = form.querySelector('.hs-form-field input[name="firstname"]')?.closest('.hs-form-field');
        const lastNameField = form.querySelector('.hs-form-field input[name="lastname"]')?.closest('.hs-form-field');
        if (firstNameField && lastNameField) {
            const nameRow = document.createElement('div');
            nameRow.classList.add('form-row');
            firstNameField.parentNode.insertBefore(nameRow, firstNameField);
            nameRow.appendChild(firstNameField);
            nameRow.appendChild(lastNameField);
        }
        // INGEN CSS-injektion här! Styling styrs av SCSS.
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

    function hideFallbackForm() {
        const fallbackForm = document.getElementById('fallback-form');
        if (fallbackForm) {
            fallbackForm.style.display = 'none';
            
            // Ta bort alla event listeners från fallback-formuläret
            const newForm = fallbackForm.cloneNode(true);
            fallbackForm.parentNode.replaceChild(newForm, fallbackForm);
            newForm.style.display = 'none';
            
            console.log('Fallback form hidden - using HubSpot form');
        }
    }

    function showFormLoading() {
        const form = document.querySelector(`${HUBSPOT_CONFIG.target} form`) || 
                    document.getElementById('fallback-form');
        
        if (form && window.ScalableWebsite) {
            window.ScalableWebsite.showFormLoading(form);
        }
    }

    function hideFormLoading() {
        const form = document.querySelector(`${HUBSPOT_CONFIG.target} form`) || 
                    document.getElementById('fallback-form');
        
        if (form && window.ScalableWebsite) {
            window.ScalableWebsite.hideFormLoading(form);
        }
    }

    function showSuccessMessage() {
        if (window.ScalableWebsite) {
            window.ScalableWebsite.showFormSuccess();
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

    // HubSpot Chat Widget Setup med mobilstöd
    function setupHubSpotChat() {
        // Konfiguration för HubSpot Chat med mobilstöd
        window.hsConversationsSettings = {
            loadImmediately: true,
            enableWelcomeMessage: true,
            portalId: 146532562,
            hublet: 'eu1',
            environment: 'prod'
        };

        // Mobildetektering och konfiguration
        function isMobileDevice() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
        }

        // Sätt mobilspecifik chat flow om det är en mobil enhet
        if (isMobileDevice()) {
            window.hsConversationsSettings.defaultChatFlow = 'scalable-mobile';
            
            // Mobiloptimerade inställningar
            window.hsConversationsSettings.widget = {
                position: 'bottom-right',
                offset: {
                    x: 16,
                    y: 16
                }
            };
        }

        console.log('HubSpot chat konfigurerad för:', isMobileDevice() ? 'Mobil' : 'Desktop');
        
        // Kontrollera om HubSpot Conversations API redan finns
        if (window.HubSpotConversations) {
            console.log('HubSpot Conversations API redan tillgänglig');
            initializeChat();
        } else {
            // Vänta på att API:t ska laddas
            let attempts = 0;
            const maxAttempts = 10;
            
            const checkForHubSpotAPI = setInterval(() => {
                attempts++;
                if (window.HubSpotConversations) {
                    console.log('HubSpot Conversations API laddat efter', attempts, 'försök');
                    clearInterval(checkForHubSpotAPI);
                    initializeChat();
                } else if (attempts >= maxAttempts) {
                    console.log('HubSpot Conversations API kunde inte laddas');
                    clearInterval(checkForHubSpotAPI);
                }
            }, 500);
        }
    }

    function initializeChat() {
        if (window.HubSpotConversations) {
            try {
                window.HubSpotConversations.widget.load({
                    widgetOpen: false,
                    enableWelcomeMessage: true,
                    welcomeMessage: 'Hej! Hur kan vi hjälpa dig idag?'
                });
                console.log('HubSpot chat widget laddad');
            } catch (error) {
                console.error('Fel vid laddning av HubSpot chat widget:', error);
            }
        } else {
            console.log('HubSpot Conversations API inte tillgänglig');
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
    window.ScalableHubSpot = {
        init,
        trackButtonClick,
        trackFormSubmission,
        setupFallbackForm,
        isHubSpotFormLoaded: function() {
            return hubspotLoaded && document.querySelector('#hubspot-contact-form .hs-form');
        },
        isFallbackFormHidden: function() {
            const fallbackForm = document.getElementById('fallback-form');
            return fallbackForm && fallbackForm.style.display === 'none';
        }
    };

    // Auto-initialize
    init();

})(); 