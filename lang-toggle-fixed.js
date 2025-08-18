// Enhanced Language Toggle System - Professional Implementation
(function() {
    'use strict';

    let langToggle = null;
    let currentLang = localStorage.getItem("lang") || "en";

    // Enhanced mapping for English <-> Arabic counterpart files
    const langPairs = {
        'index.html': 'index-ar.html',
        'index-ar.html': 'index.html',
        'ai.html': 'ai-ar.html',
        'ai-ar.html': 'ai.html',
        'cybersecurity.html': 'cybersecurity-ar.html',
        'cybersecurity-ar.html': 'cybersecurity.html',
        'programming_development.html': 'programming-ar.html',
        'programming-ar.html': 'programming_development.html',
        'graphic_design_content_creation.html': 'graphic-design-ar.html',
        'graphic-design-ar.html': 'graphic_design_content_creation.html',
        'audio_photo_lighting.html': 'audio-photo-ar.html',
        'audio-photo-ar.html': 'audio_photo_lighting.html',
        'content_writing_translation.html': 'content-writing-ar.html',
        'content-writing-ar.html': 'content_writing_translation.html',
        'emarketing.html': 'emarketing-ar.html',
        'emarketing-ar.html': 'emarketing.html',
        'science_research.html': 'science-research-ar.html',
        'science-research-ar.html': 'science_research.html',
        'vfx_editing.html': 'vfx-editing-ar.html',
        'vfx-editing-ar.html': 'vfx_editing.html'
    };

    // Language labels for professional display
    const langLabels = {
        'en': { text: 'العربية', icon: 'fas fa-globe' },
        'ar': { text: 'English', icon: 'fas fa-globe' }
    };

    function createLanguageToggle() {
        const navControls = document.querySelector(".nav-controls");
        if (!navControls) {
            console.error("Nav controls not found");
            return;
        }
        
        // Check if language toggle already exists
        const existingToggle = document.getElementById("langToggle");
        if (existingToggle) {
            langToggle = existingToggle;
            updateToggleDisplay();
            attachToggleBehavior();
            return;
        }
        
        // Create new toggle button with enhanced styling
        langToggle = document.createElement("button");
        langToggle.className = "lang-toggle";
        langToggle.id = "langToggle";
        langToggle.setAttribute('aria-label', 'Toggle Language');
        langToggle.setAttribute('title', 'Switch Language / تبديل اللغة');
        
        // Insert before theme toggle or at the beginning
        const themeToggle = navControls.querySelector('.theme-toggle');
        if (themeToggle) {
            navControls.insertBefore(langToggle, themeToggle);
        } else {
            navControls.insertBefore(langToggle, navControls.firstChild);
        }

        updateToggleDisplay();
        attachToggleBehavior();
    }

    function updateToggleDisplay() {
        if (!langToggle) return;
        
        // Determine current page language
        const currentFile = getCurrentFileName();
        const isArabicPage = currentFile.endsWith('-ar.html');
        const displayLang = isArabicPage ? 'ar' : 'en';
        
        // Update button content
        const label = langLabels[displayLang];
        langToggle.innerHTML = `${label.text} <i class="${label.icon}"></i>`;
        
        // Set document direction
        document.documentElement.setAttribute('dir', isArabicPage ? 'rtl' : 'ltr');
        
        // Update localStorage
        localStorage.setItem('lang', displayLang);
        currentLang = displayLang;
    }

    function getCurrentFileName() {
        const path = window.location.pathname;
        return path.split('/').pop() || 'index.html';
    }

    function attachToggleBehavior() {
        if (!langToggle) return;
        
        // Remove any existing event listeners
        langToggle.onclick = null;
        
        const currentFile = getCurrentFileName();
        const targetFile = langPairs[currentFile];
        
        if (targetFile) {
            // Professional page switching with smooth transition
            langToggle.onclick = function(e) {
                e.preventDefault();
                
                // Add loading state
                const originalContent = langToggle.innerHTML;
                langToggle.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                langToggle.disabled = true;
                
                // Smooth transition effect
                document.body.style.opacity = '0.8';
                document.body.style.transition = 'opacity 0.3s ease';
                
                // Navigate after brief delay for smooth UX
                setTimeout(() => {
                    // Check if target file exists by attempting to navigate
                    const targetUrl = new URL(targetFile, window.location.origin + window.location.pathname.replace(currentFile, ''));
                    window.location.href = targetUrl.href;
                }, 200);
                
                // Fallback: Reset button state if navigation fails
                setTimeout(() => {
                    langToggle.innerHTML = originalContent;
                    langToggle.disabled = false;
                    document.body.style.opacity = '1';
                }, 2000);
            };
        } else {
            // Fallback for pages without counterparts
            langToggle.onclick = function(e) {
                e.preventDefault();
                showLanguageNotification();
            };
        }
    }

    function showLanguageNotification() {
        // Create a professional notification for pages without translations
        const notification = document.createElement('div');
        notification.className = 'lang-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-info-circle"></i>
                <span>Translation for this page is not available yet / الترجمة لهذه الصفحة غير متوفرة حالياً</span>
            </div>
        `;
        
        // Add notification styles
        const style = document.createElement('style');
        style.textContent = `
            .lang-notification {
                position: fixed;
                top: 80px;
                right: 20px;
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 1rem;
                box-shadow: var(--shadow-hover);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 350px;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-color);
                font-size: 0.9rem;
            }
            
            .notification-content i {
                color: var(--primary-color);
                font-size: 1.1rem;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(notification);
        
        // Auto-remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            }, 300);
        }, 3000);
    }

    function loadTranslations() {
        // Enhanced translation loading for fallback scenarios
        fetch("translations.js")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Translations not found');
                }
                return response.text();
            })
            .then(text => {
                const translationsScript = document.createElement("script");
                translationsScript.innerHTML = text;
                document.head.appendChild(translationsScript);
                
                // Apply translations after loading
                setTimeout(() => {
                    if (typeof translations !== 'undefined') {
                        applyTranslations();
                    }
                }, 100);
            })
            .catch(error => {
                console.log("Translations not available for this page");
            });
    }

    function applyTranslations() {
        if (typeof translations === 'undefined') return;
        
        document.querySelectorAll("[data-translate]").forEach(element => {
            const key = element.getAttribute("data-translate");
            const translatedText = getTranslation(key);
            if (translatedText) {
                element.innerHTML = translatedText;
            }
        });
    }

    function getTranslation(key) {
        if (typeof translations === 'undefined') return null;
        
        const keys = key.split(".");
        let result = translations[currentLang];
        
        for (const k of keys) {
            if (result && result[k] !== undefined) {
                result = result[k];
            } else {
                return null;
            }
        }
        return result;
    }

    // Enhanced initialization
    function initializeLangToggle() {
        createLanguageToggle();
        
        // Load translations for pages that support inline translation
        const currentFile = getCurrentFileName();
        if (!langPairs[currentFile] || currentFile === 'index.html' || currentFile === 'index-ar.html') {
            loadTranslations();
        }
        
        // Set initial document direction and language
        updateToggleDisplay();
        
        // Add smooth transitions for language switching
        document.documentElement.style.transition = 'all 0.3s ease';
    }

    // Multiple initialization points for reliability
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeLangToggle);
    } else {
        initializeLangToggle();
    }

    // Backup initialization
    window.addEventListener('load', () => {
        if (!langToggle) {
            console.log('Reinitializing language toggle...');
            initializeLangToggle();
        }
    });

    // Handle browser back/forward navigation
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            // Page was loaded from cache, reinitialize
            setTimeout(initializeLangToggle, 100);
        }
    });

    // Export for external access if needed
    window.LanguageToggle = {
        getCurrentLanguage: () => currentLang,
        switchLanguage: () => {
            if (langToggle && langToggle.onclick) {
                langToggle.onclick();
            }
        },
        reinitialize: initializeLangToggle
    };

})();

