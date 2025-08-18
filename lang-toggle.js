// Language Toggle System - Unified for all pages
(function() {
    'use strict';

    let langToggle = null;
    let currentLang = localStorage.getItem("lang") || "en";

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
            return;
        }
        
        langToggle = document.createElement("button");
        langToggle.className = "lang-toggle";
        langToggle.id = "langToggle";
        langToggle.innerHTML = "English <i class=\"fas fa-globe\"></i>";
        navControls.insertBefore(langToggle, navControls.firstChild);
        
        // Add event listener
        langToggle.addEventListener("click", toggleLanguage);
        
        // Update initial state
        updateLangToggleText();
    }

    function loadTranslations() {
        fetch("translations.js")
            .then(response => response.text())
            .then(text => {
                const translationsScript = document.createElement("script");
                translationsScript.innerHTML = text;
                document.head.appendChild(translationsScript);
                translationsScript.onload = () => {
                    applyTranslations();
                };
            })
            .catch(error => console.error("Error loading translations.js:", error));
    }

    function applyTranslations() {
        document.querySelectorAll("[data-translate]").forEach(element => {
            const key = element.getAttribute("data-translate");
            const translatedText = getTranslation(key);
            if (translatedText) {
                element.innerHTML = translatedText;
            }
        });
        updateLangToggleText();
    }

    function getTranslation(key) {
        if (typeof translations === 'undefined') {
            console.warn('Translations not loaded yet');
            return null;
        }
        
        const keys = key.split(".");
        let result = translations[currentLang];
        for (const k of keys) {
            if (result && result[k] !== undefined) {
                result = result[k];
            } else {
                console.warn(`Translation key not found: ${key} for language ${currentLang}`);
                return null;
            }
        }
        return result;
    }

    function updateLangToggleText() {
        if (!langToggle) return;
        
        if (currentLang === "en") {
            langToggle.innerHTML = "العربية <i class=\"fas fa-globe\"></i>";
            document.documentElement.setAttribute('dir', 'ltr');
        } else {
            langToggle.innerHTML = "English <i class=\"fas fa-globe\"></i>";
            document.documentElement.setAttribute('dir', 'rtl');
        }
    }

    function toggleLanguage() {
        currentLang = currentLang === "en" ? "ar" : "en";
        localStorage.setItem("lang", currentLang);
        applyTranslations();
        updateLangToggleText();
    }

    // Initialize when DOM is ready
    function initializeLangToggle() {
        createLanguageToggle();
        loadTranslations();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeLangToggle);
    } else {
        initializeLangToggle();
    }

    // Also initialize on window load as backup
    window.addEventListener('load', () => {
        if (!langToggle) {
            console.log('Reinitializing language toggle...');
            initializeLangToggle();
        }
    });

})();

