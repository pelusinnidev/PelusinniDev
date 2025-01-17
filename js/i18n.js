// Import translations
import enTranslations from './translations/en.js';
import esTranslations from './translations/es.js';
import caTranslations from './translations/ca.js';

class I18n {
    constructor() {
        this.translations = {
            en: enTranslations,
            es: esTranslations,
            ca: caTranslations
        };
        this.currentLang = localStorage.getItem('lang') || 'en';
        this.observers = new Set();
    }

    // Get translation by key (supports nested keys like 'nav.home')
    t(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (value === undefined) return key;
            value = value[k];
        }
        
        return value || key;
    }

    // Change language
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('lang', lang);
            document.documentElement.lang = lang;
            this.notifyObservers();
        }
    }

    // Add observer for language changes
    addObserver(callback) {
        this.observers.add(callback);
    }

    // Remove observer
    removeObserver(callback) {
        this.observers.delete(callback);
    }

    // Notify all observers of language change
    notifyObservers() {
        this.observers.forEach(callback => callback(this.currentLang));
    }

    // Initialize translations on the page
    translatePage() {
        // Translate all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            element.textContent = this.t(key);
        });

        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
        });

        // Update current language display
        const currentLangDisplay = document.querySelector('.current-lang span');
        if (currentLangDisplay) {
            currentLangDisplay.textContent = this.currentLang.toUpperCase();
        }

        // Special handling for typing text
        const typingTexts = this.t('hero.roles');
        if (Array.isArray(typingTexts)) {
            window.typingTexts = typingTexts;
        }
    }
}

// Create and export singleton instance
const i18n = new I18n();
export default i18n; 