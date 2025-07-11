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

    // Form fallback timeout (10 sekunder)
    const FORM_TIMEOUT = 10000;

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
            // Vänta lite innan vi försöker skapa formuläret
            setTimeout(() => {
                setupHubSpotForm();
            }, 1000);
            console.log('HubSpot script loaded successfully');
        };
        script.onerror = function() {
            console.error('Failed to load HubSpot script, falling back to custom form');
            setupFallbackForm();
        };
        document.head.appendChild(script);
    }

    function setupHubSpotForm() {
        // Försök först med den nya embed-approachen
        const target = document.querySelector(HUBSPOT_CONFIG.target);
        if (!target) {
            console.error('HubSpot form target not found');
            setupFallbackForm();
            return;
        }

        // Skapa form frame baserat på din HubSpot embed-kod
        const formFrame = document.createElement('div');
        formFrame.className = 'hs-form-frame';
        formFrame.setAttribute('data-region', HUBSPOT_CONFIG.region);
        formFrame.setAttribute('data-form-id', HUBSPOT_CONFIG.formId);
        formFrame.setAttribute('data-portal-id', HUBSPOT_CONFIG.portalId);
        
        // Rensa target och lägg till form frame
        target.innerHTML = '';
        target.appendChild(formFrame);
        
        // Ladda HubSpot forms script om det inte redan finns
        if (!window.hbspt || !window.hbspt.forms) {
            const script = document.createElement('script');
            script.src = `https://js-eu1.hsforms.net/forms/embed/${HUBSPOT_CONFIG.portalId}.js`;
            script.defer = true;
            script.onload = function() {
                console.log('HubSpot forms script loaded via embed approach');
                // Vänta lite för att formuläret ska laddas
                setTimeout(() => {
                    if (target.querySelector('.hs-form')) {
                        console.log('HubSpot form loaded successfully via embed approach');
                        hideFallbackForm();
                        customizeHubSpotForm();
                        hideLoader();
                    } else {
                        console.log('HubSpot form embed failed - using fallback');
                        setupFallbackForm();
                    }
                }, 3000);
            };
            script.onerror = function() {
                console.error('Failed to load HubSpot forms script via embed approach');
                setupFallbackForm();
            };
            document.head.appendChild(script);
        } else {
            // Använd befintlig hbspt.forms.create approach
            setupHubSpotFormLegacy();
        }
    }

    function setupHubSpotFormLegacy() {
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

        // Sätt en kortare timeout för snabbare fallback
        const formTimeout = setTimeout(() => {
            console.log('HubSpot form timeout - using fallback form');
            setupFallbackForm();
        }, 5000); // Minska till 5 sekunder

        // Lägg till en global error handler för HubSpot form-fel
        const errorHandler = function(e) {
            if (e.message && e.message.includes('403') && e.filename && e.filename.includes('hsforms')) {
                console.log('HubSpot form 403 error detected - using fallback form');
                clearTimeout(formTimeout);
                window.removeEventListener('error', errorHandler);
                setupFallbackForm();
            }
        };
        window.addEventListener('error', errorHandler);

        // Lägg till en fetch error handler för att fånga 403-fel
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
            return originalFetch.apply(this, args).then(response => {
                if (response.status === 403 && args[0] && args[0].includes('hsforms')) {
                    console.log('HubSpot form 403 error detected via fetch - using fallback form');
                    clearTimeout(formTimeout);
                    window.removeEventListener('error', errorHandler);
                    setupFallbackForm();
                }
                return response;
            });
        };

        try {
            // Försök först med den ursprungliga konfigurationen
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
                    // Rensa timeout och error handler
                    clearTimeout(formTimeout);
                    window.removeEventListener('error', errorHandler);
                    // Återställ original fetch
                    window.fetch = originalFetch;
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
                    window.removeEventListener('error', errorHandler);
                    window.fetch = originalFetch;
                    setupFallbackForm();
                }
            });

        } catch (error) {
            console.error('Error creating HubSpot form:', error);
            clearTimeout(formTimeout);
            window.removeEventListener('error', errorHandler);
            window.fetch = originalFetch;
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
            
            // Lägg till submit handler för fallback form
            fallbackForm.addEventListener('submit', handleFallbackFormSubmit);
            
            console.log('Using fallback form instead of HubSpot');
            hideLoader();
        }
    }

    function handleFallbackFormSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        
        // Visa loading state
        showFormLoading();
        
        // Simulera form submission (i verkligheten skulle detta skickas till en server)
        setTimeout(() => {
            hideFormLoading();
            showSuccessMessage();
            
            // Track submission
            trackFormSubmission('fallback_contact', {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                message: formData.get('message')
            });
            
            // Reset form
            form.reset();
            
            console.log('Fallback form submitted successfully');
        }, 2000);
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
        // Kontrollera om chat redan är konfigurerad för att undvika duplicering
        if (window.hsConversationsSettings) {
            console.log('HubSpot chat redan konfigurerad');
            return;
        }

        // Kontrollera om chat script redan är markerat som laddat
        const chatScript = document.getElementById('hs-chat-loader');
        if (chatScript && chatScript.getAttribute('data-hubspot-loaded') === 'true') {
            console.log('HubSpot chat script redan laddat');
            return;
        }

        // Mobildetektering och konfiguration
        function isMobileDevice() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
        }

        // Enkel konfiguration för HubSpot Chat
        window.hsConversationsSettings = {
            loadImmediately: true, // Sätt till true för att visa chat-widgeten
            enableWelcomeMessage: true,
            portalId: 146532562,
            hublet: 'eu1',
            environment: 'prod',
            // Lägg till explicit widget-konfiguration
            widget: {
                position: 'bottom-right',
                offset: {
                    x: 16,
                    y: 16
                }
            }
        };

        // Sätt mobilspecifik chat flow om det är en mobil enhet
        if (isMobileDevice()) {
            window.hsConversationsSettings.defaultChatFlow = 'scalable-mobile';
        }

        console.log('HubSpot chat konfigurerad för:', isMobileDevice() ? 'Mobil' : 'Desktop');
        
        // Kontrollera om chat script redan är laddat
        if (window.HubSpotConversations) {
            console.log('HubSpot chat redan tillgänglig');
            if (chatScript) {
                chatScript.setAttribute('data-hubspot-loaded', 'true');
            }
            
            // Explicit ladda chat-widgeten om den redan finns
            try {
                if (window.HubSpotConversations.widget && typeof window.HubSpotConversations.widget.load === 'function') {
                    window.HubSpotConversations.widget.load();
                    console.log('HubSpot chat widget explicit laddad (redan tillgänglig)');
                    
                    // Kontrollera om widget visas efter en kort paus
                    setTimeout(() => {
                        const chatWidget = document.querySelector('[data-test-id="chat-widget"]') || 
                                         document.querySelector('.hubspot-conversations-widget') ||
                                         document.querySelector('[data-testid="chat-widget"]') ||
                                         document.querySelector('.hubspot-conversations-widget-container') ||
                                         document.querySelector('[data-testid="conversations-widget"]') ||
                                         document.querySelector('.conversations-widget');
                        if (chatWidget) {
                            console.log('HubSpot chat widget synlig på sidan (redan tillgänglig)');
                        } else {
                            console.log('HubSpot chat widget inte synlig - kontrollera CSS eller konfiguration (redan tillgänglig)');
                            // Försök att ladda widget igen
                            try {
                                if (window.HubSpotConversations.widget && typeof window.HubSpotConversations.widget.load === 'function') {
                                    window.HubSpotConversations.widget.load();
                                    console.log('Försöker ladda chat widget igen (redan tillgänglig)...');
                                }
                            } catch (retryError) {
                                console.error('Fel vid andra försöket att ladda chat widget (redan tillgänglig):', retryError);
                            }
                        }
                    }, 2000);
                }
            } catch (error) {
                console.error('Fel vid explicit laddning av chat widget (redan tillgänglig):', error);
            }
            
            return;
        }
        
        // Enkel polling för att kontrollera när chat är redo
        let attempts = 0;
        const maxAttempts = 20;
        
        const checkForChat = setInterval(() => {
            attempts++;
            console.log('Kontrollerar HubSpot chat...', attempts);
            
            if (window.HubSpotConversations) {
                console.log('HubSpot chat redo efter', attempts, 'försök');
                if (chatScript) {
                    chatScript.setAttribute('data-hubspot-loaded', 'true');
                }
                
                // Explicit ladda chat-widgeten
                try {
                    if (window.HubSpotConversations.widget && typeof window.HubSpotConversations.widget.load === 'function') {
                        window.HubSpotConversations.widget.load();
                        console.log('HubSpot chat widget explicit laddad');
                        
                        // Kontrollera om widget visas efter en kort paus
                        setTimeout(() => {
                            const chatWidget = document.querySelector('[data-test-id="chat-widget"]') || 
                                             document.querySelector('.hubspot-conversations-widget') ||
                                             document.querySelector('[data-testid="chat-widget"]') ||
                                             document.querySelector('.hubspot-conversations-widget-container') ||
                                             document.querySelector('[data-testid="conversations-widget"]') ||
                                             document.querySelector('.conversations-widget');
                            if (chatWidget) {
                                console.log('HubSpot chat widget synlig på sidan');
                            } else {
                                console.log('HubSpot chat widget inte synlig - kontrollera CSS eller konfiguration');
                                // Försök att ladda widget igen
                                try {
                                    if (window.HubSpotConversations.widget && typeof window.HubSpotConversations.widget.load === 'function') {
                                        window.HubSpotConversations.widget.load();
                                        console.log('Försöker ladda chat widget igen...');
                                    }
                                } catch (retryError) {
                                    console.error('Fel vid andra försöket att ladda chat widget:', retryError);
                                }
                            }
                        }, 2000);
                    }
                } catch (error) {
                    console.error('Fel vid explicit laddning av chat widget:', error);
                }
                
                clearInterval(checkForChat);
            } else if (attempts >= maxAttempts) {
                console.log('HubSpot chat kunde inte laddas efter', maxAttempts, 'försök');
                clearInterval(checkForChat);
            }
        }, 1000);
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
        // Kontrollera om redan initialiserat för att undvika duplicering
        if (window.ScalableHubSpot && window.ScalableHubSpot.initialized) {
            console.log('ScalableHubSpot redan initialiserat');
            return;
        }

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
        },
        initialized: false
    };

    // Auto-initialize
    init();
    window.ScalableHubSpot.initialized = true;

})(); 