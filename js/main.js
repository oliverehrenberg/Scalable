// Scaleble Website JavaScript
(function() {
    'use strict';

    // DOM Elements
    const header = document.querySelector('.header');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
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
        initMobileMenu();
        initReadMoreButtons();
        initDynamicContent();
        initCalculatorPresets();
        initCaseStudyFilter();
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
            '.solution-item, .service-card, .expert-text, .about-description, .testimonial-card, .case-study-card, .team-member'
        );
        
        elementsToReveal.forEach(el => {
            el.classList.add('scroll-reveal');
        });
    }

    function revealElementsOnScroll() {
        const elements = document.querySelectorAll('.scroll-reveal');
        
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('revealed');
            }
        });
    }

    // Forms
    function initForms() {
        if (fallbackForm) {
            fallbackForm.addEventListener('submit', handleFormSubmit);
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        
        if (validateForm(form)) {
            showFormLoading(form);
            
            // Simulate form submission
            setTimeout(() => {
                hideFormLoading(form);
                showFormSuccess();
                form.reset();
            }, 2000);
        }
    }

    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    }

    function showFormLoading(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = 'Skickar...';
            submitBtn.disabled = true;
        }
    }

    function hideFormLoading(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = 'Submit';
            submitBtn.disabled = false;
        }
    }

    function showFormSuccess() {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <div class="success-content">
                <div class="success-icon">✓</div>
                <h3>Tack för ditt meddelande!</h3>
                <p>Vi återkommer till dig inom 24 timmar.</p>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(successMessage);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
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
                    description.classList.remove('expanded');
                    this.textContent = 'Läs mer';
                } else {
                    description.classList.add('expanded');
                    this.textContent = 'Visa mindre';
                }
            });
        });
    }

    // Dynamic Content Loading
    function initDynamicContent() {
        loadTestimonials();
        loadCaseStudies();
        loadTeamData();
        loadSuccessMetrics();
        loadClientLogos();
    }

    function loadTestimonials() {
        const testimonialsGrid = document.getElementById('testimonialsGrid');
        if (!testimonialsGrid || !window.testimonialsData) return;

        const featuredTestimonials = window.testimonialsData.filter(t => t.featured).slice(0, 3);
        
        testimonialsGrid.innerHTML = featuredTestimonials.map(testimonial => `
            <div class="testimonial-card">
                <div class="testimonial-rating">
                    ${'★'.repeat(testimonial.rating)}
                </div>
                <div class="testimonial-content">${testimonial.content}</div>
                <div class="testimonial-author">
                    <img src="${testimonial.avatar}" alt="${testimonial.name}" class="author-avatar">
                    <div class="author-info">
                        <div class="author-name">${testimonial.name}</div>
                        <div class="author-title">${testimonial.title}</div>
                        <div class="author-company">${testimonial.company}</div>
                    </div>
                </div>
                <div class="testimonial-results">
                    <div class="result-title">Resultat</div>
                    <div class="results-grid">
                        <div class="result-item">
                            <div class="result-value">${testimonial.results.salesIncrease}</div>
                            <div class="result-label">Försäljningsökning</div>
                        </div>
                        <div class="result-item">
                            <div class="result-value">${testimonial.results.leadGeneration}</div>
                            <div class="result-label">Lead generation</div>
                        </div>
                        <div class="result-item">
                            <div class="result-value">${testimonial.results.conversionRate}</div>
                            <div class="result-label">Konverteringsgrad</div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function loadCaseStudies() {
        const caseStudiesGrid = document.getElementById('caseStudiesGrid');
        if (!caseStudiesGrid || !window.caseStudiesData) return;

        const featuredCaseStudies = window.caseStudiesData.filter(cs => cs.featured).slice(0, 3);
        
        caseStudiesGrid.innerHTML = featuredCaseStudies.map(caseStudy => `
            <div class="case-study-card">
                <div class="case-study-image">
                    <img src="${caseStudy.image}" alt="${caseStudy.title}">
                    <div class="case-study-overlay">
                        <div class="overlay-content">
                            <div class="overlay-title">${caseStudy.title}</div>
                            <div class="overlay-subtitle">${caseStudy.subtitle}</div>
                        </div>
                    </div>
                </div>
                <div class="case-study-content">
                    <div class="case-study-header">
                        <h3 class="case-study-title">${caseStudy.title}</h3>
                        <p class="case-study-subtitle">${caseStudy.subtitle}</p>
                        <div class="case-study-tags">
                            ${caseStudy.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="case-study-challenge">
                        <h4 class="challenge-title">${caseStudy.challenge.title}</h4>
                        <p class="challenge-description">${caseStudy.challenge.description}</p>
                    </div>
                    <div class="case-study-solution">
                        <h4 class="solution-title">${caseStudy.solution.title}</h4>
                        <ul class="solution-steps">
                            ${caseStudy.solution.steps.map(step => `<li>${step}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="case-study-results">
                        <div class="results-title">${caseStudy.results.title}</div>
                        <div class="results-grid">
                            ${caseStudy.results.metrics.map(metric => `
                                <div class="result-item">
                                    <div class="result-value">${metric.value}</div>
                                    <div class="result-label">${metric.label}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="case-study-cta">
                        <button class="btn btn-primary">Läs mer</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function loadTeamData() {
        const teamGrid = document.getElementById('teamGrid');
        if (!teamGrid || !window.teamData) return;

        const featuredTeamMembers = window.teamData.filter(member => member.featured).slice(0, 3);
        
        teamGrid.innerHTML = featuredTeamMembers.map(member => `
            <div class="team-member">
                <div class="member-image">
                    <img src="${member.avatar}" alt="${member.name}">
                    <div class="member-overlay">
                        <div class="overlay-content">
                            <div class="overlay-title">${member.name}</div>
                            <div class="overlay-expertise">${member.expertise.join(', ')}</div>
                            <div class="overlay-description">${member.bio}</div>
                        </div>
                    </div>
                </div>
                <div class="member-content">
                    <div class="member-header">
                        <h3 class="member-name">${member.name}</h3>
                        <div class="member-title">${member.title}</div>
                        <div class="member-company">${member.company}</div>
                    </div>
                    <p class="member-bio">${member.bio}</p>
                    <div class="member-expertise">
                        <h4 class="expertise-title">Expertområden</h4>
                        <div class="expertise-tags">
                            ${member.expertise.map(exp => `<span class="expertise-tag">${exp}</span>`).join('')}
                        </div>
                    </div>
                    <div class="member-certifications">
                        <h4 class="certifications-title">Certifieringar</h4>
                        <div class="certifications-list">
                            ${member.certifications.map(cert => `
                                <span class="certification">
                                    <span class="cert-icon">${cert.icon}</span>
                                    ${cert.name}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                    <div class="member-social">
                        <a href="${member.social.linkedin}" class="social-link" target="_blank">in</a>
                        <a href="${member.social.twitter}" class="social-link" target="_blank">X</a>
                        <a href="mailto:${member.social.email}" class="social-link">@</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function loadSuccessMetrics() {
        const successMetricsGrid = document.getElementById('successMetricsGrid');
        if (!successMetricsGrid || !window.successMetricsData) return;

        successMetricsGrid.innerHTML = window.successMetricsData.map(metric => `
            <div class="metric-item">
                <span class="metric-value">${metric.value}</span>
                <div class="metric-label">${metric.label}</div>
                <div class="metric-description">${metric.description}</div>
            </div>
        `).join('');
    }

    function loadClientLogos() {
        const clientLogosGrid = document.getElementById('clientLogosGrid');
        if (!clientLogosGrid || !window.clientLogosData) return;

        clientLogosGrid.innerHTML = window.clientLogosData.map(client => `
            <img src="${client.logo}" alt="${client.name}" class="client-logo">
        `).join('');
    }

    // Calculator Presets
    function initCalculatorPresets() {
        const presetCards = document.querySelectorAll('.preset-card');
        
        presetCards.forEach(card => {
            card.addEventListener('click', function() {
                const preset = this.getAttribute('data-preset');
                applyCalculatorPreset(preset);
            });
        });
    }

    function applyCalculatorPreset(preset) {
        if (!window.scalebleCalculator) return;

        const presets = {
            startup: {
                monthlyRevenue: 200000,
                salesTeamSize: 2,
                averageDealSize: 25000,
                conversionRate: 10,
                salesCycleLength: 120,
                marketingBudget: 50000
            },
            scaleup: {
                monthlyRevenue: 800000,
                salesTeamSize: 8,
                averageDealSize: 75000,
                conversionRate: 15,
                salesCycleLength: 90,
                marketingBudget: 200000
            },
            enterprise: {
                monthlyRevenue: 2000000,
                salesTeamSize: 15,
                averageDealSize: 150000,
                conversionRate: 20,
                salesCycleLength: 60,
                marketingBudget: 500000
            }
        };

        const presetData = presets[preset];
        if (presetData) {
            Object.assign(window.scalebleCalculator.currentValues, presetData);
            window.scalebleCalculator.updateResults();
        }
    }

    // Case Study Filter
    function initCaseStudyFilter() {
        const filterContainer = document.getElementById('caseStudyFilter');
        if (!filterContainer || !window.caseStudyCategories) return;

        filterContainer.innerHTML = window.caseStudyCategories.map(category => `
            <div class="filter-tab ${category.id === 'all' ? 'active' : ''}" data-category="${category.id}">
                ${category.name} (${category.count})
            </div>
        `).join('');

        // Bind filter events
        const filterTabs = filterContainer.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                filterCaseStudies(category);
                
                // Update active tab
                filterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    function filterCaseStudies(category) {
        const caseStudiesGrid = document.getElementById('caseStudiesGrid');
        if (!caseStudiesGrid || !window.caseStudiesData) return;

        let filteredCaseStudies = window.caseStudiesData;
        
        if (category !== 'all') {
            filteredCaseStudies = window.caseStudiesData.filter(cs => cs.industry.toLowerCase() === category);
        }

        // Re-render case studies
        caseStudiesGrid.innerHTML = filteredCaseStudies.map(caseStudy => `
            <div class="case-study-card">
                <div class="case-study-image">
                    <img src="${caseStudy.image}" alt="${caseStudy.title}">
                    <div class="case-study-overlay">
                        <div class="overlay-content">
                            <div class="overlay-title">${caseStudy.title}</div>
                            <div class="overlay-subtitle">${caseStudy.subtitle}</div>
                        </div>
                    </div>
                </div>
                <div class="case-study-content">
                    <div class="case-study-header">
                        <h3 class="case-study-title">${caseStudy.title}</h3>
                        <p class="case-study-subtitle">${caseStudy.subtitle}</p>
                        <div class="case-study-tags">
                            ${caseStudy.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="case-study-challenge">
                        <h4 class="challenge-title">${caseStudy.challenge.title}</h4>
                        <p class="challenge-description">${caseStudy.challenge.description}</p>
                    </div>
                    <div class="case-study-solution">
                        <h4 class="solution-title">${caseStudy.solution.title}</h4>
                        <ul class="solution-steps">
                            ${caseStudy.solution.steps.map(step => `<li>${step}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="case-study-results">
                        <div class="results-title">${caseStudy.results.title}</div>
                        <div class="results-grid">
                            ${caseStudy.results.metrics.map(metric => `
                                <div class="result-item">
                                    <div class="result-value">${metric.value}</div>
                                    <div class="result-label">${metric.label}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="case-study-cta">
                        <button class="btn btn-primary">Läs mer</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Utility functions
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

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

})(); 