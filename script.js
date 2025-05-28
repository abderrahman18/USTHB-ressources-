// Immediately Invoked Function Expression to avoid global conflicts
;(() => {
  // Local scope variables to avoid any global conflicts
  const APP_PREFIX = "acad_"
  const STORAGE_PREFIX = "acad-app-"

  // Utility functions in local scope
  const utils = {
    formatNumber: (num) => {
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + "k"
      }
      return num.toString()
    },

    debounce: (func, wait) => {
      let timeout
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout)
          func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
      }
    },
    
    throttle: (func, limit) => {
      let inThrottle
      return function () {
        const args = arguments
        if (!inThrottle) {
          func.apply(this, args)
          inThrottle = true
          setTimeout(() => (inThrottle = false), limit)
        }
      }
    },

    safeLocalStorage: {
      getItem: (key) => {
        try {
          return localStorage.getItem(STORAGE_PREFIX + key)
        } catch (e) {
          return null
        }
      },
      setItem: (key, value) => {
        try {
          localStorage.setItem(STORAGE_PREFIX + key, value)
          return true
        } catch (e) {
          return false
        }
      },
    },
  }

  // Translation data in local scope
  const translationData = {
    en: {
      "nav-home": "Home",
      "nav-search": "Search",
      "nav-upload": "Upload",
      "nav-dashboard": "Dashboard",
      welcome: "Welcome to",
      "hero-description":
        "Your centralized hub for academic materials. Find textbooks, lecture notes, exams, and study guides shared by students worldwide.",
      "search-placeholder": "Search by subject, file name, or type...",
      "upload-resources": "Upload Resources",
      "browse-materials": "Browse Materials",
      "total-resources": "Total Resources",
      "downloads-month": "Downloads This Month",
      "active-students": "Active Students",
      "average-rating": "Average Rating",
      "featured-resources": "Featured Resources",
      "popular-subjects": "Popular Subjects",
      "cta-title": "Ready to Share Your Knowledge?",
      "cta-description":
        "Join thousands of students helping each other succeed. Upload your resources and make a difference.",
      search: "Search",
      go: "Go",
    },
    fr: {
      "nav-home": "Accueil",
      "nav-search": "Rechercher",
      "nav-upload": "Téléverser",
      "nav-dashboard": "Tableau de bord",
      welcome: "Bienvenue sur",
      "hero-description":
        "Votre hub centralisé pour les ressources académiques. Trouvez des manuels, notes de cours, examens et guides d'étude partagés par des étudiants du monde entier.",
      "search-placeholder": "Rechercher par matière, nom de fichier ou type...",
      "upload-resources": "Téléverser des Ressources",
      "browse-materials": "Parcourir les Matériaux",
      "total-resources": "Total des Ressources",
      "downloads-month": "Téléchargements ce Mois",
      "active-students": "Étudiants Actifs",
      "average-rating": "Note Moyenne",
      "featured-resources": "Ressources en Vedette",
      "popular-subjects": "Matières Populaires",
      "cta-title": "Prêt à Partager vos Connaissances ?",
      "cta-description":
        "Rejoignez des milliers d'étudiants qui s'entraident pour réussir. Téléversez vos ressources et faites la différence.",
      search: "Rechercher",
      go: "Aller",
    },
  }

  // Theme management
  function initTheme() {
    const savedTheme = utils.safeLocalStorage.getItem("theme") || "light"

    function applyTheme(theme) {
      if (document.documentElement) {
        document.documentElement.setAttribute("data-theme", theme)
        utils.safeLocalStorage.setItem("theme", theme)
      }
    }

    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light"
      const newTheme = currentTheme === "light" ? "dark" : "light"
      applyTheme(newTheme)
    }

    // Apply initial theme
    applyTheme(savedTheme)

    // Bind theme toggle
    const themeToggle = document.getElementById("themeToggle")
    if (themeToggle) {
      themeToggle.addEventListener("click", toggleTheme)
    }
  }

  // Language management
  function initLanguage() {
    const savedLang = utils.safeLocalStorage.getItem("language") || "en"
    let dropdownOpen = false

    function translateElements(lang) {
      const translations = translationData[lang] || translationData.en

      // Translate elements with data-translate attribute
      document.querySelectorAll("[data-translate]").forEach((element) => {
        const key = element.getAttribute("data-translate")
        if (translations[key]) {
          element.textContent = translations[key]
        }
      })

      // Translate placeholders
      document.querySelectorAll("[data-translate-placeholder]").forEach((element) => {
        const key = element.getAttribute("data-translate-placeholder")
        if (translations[key]) {
          element.placeholder = translations[key]
        }
      })
    }

    function applyLanguage(lang) {
      if (!translationData[lang]) {
        lang = "en"
      }

      // Update document language
      if (document.documentElement) {
        document.documentElement.lang = lang
      }

      // Update current language display
      const currentLangElement = document.getElementById("currentLang")
      if (currentLangElement) {
        currentLangElement.textContent = lang.toUpperCase()
      }

      // Translate elements
      translateElements(lang)

      // Update active language option
      document.querySelectorAll(".language-option").forEach((option) => {
        const optionLang = option.getAttribute("data-lang")
        if (optionLang === lang) {
          option.classList.add("active")
        } else {
          option.classList.remove("active")
        }
      })

      // Save language preference
      utils.safeLocalStorage.setItem("language", lang)
    }

    function toggleDropdown() {
      const dropdown = document.getElementById("languageDropdown")
      if (dropdown) {
        dropdownOpen = !dropdownOpen
        if (dropdownOpen) {
          dropdown.classList.add("open")
        } else {
          dropdown.classList.remove("open")
        }
      }
    }

    function closeDropdown() {
      const dropdown = document.getElementById("languageDropdown")
      if (dropdown) {
        dropdown.classList.remove("open")
        dropdownOpen = false
      }
    }

    // Apply initial language
    applyLanguage(savedLang)

    // Bind language toggle
    const languageToggle = document.getElementById("languageToggle")
    if (languageToggle) {
      languageToggle.addEventListener("click", (e) => {
        e.stopPropagation()
        toggleDropdown()
      })
    }

    // Bind language options
    document.querySelectorAll(".language-option").forEach((option) => {
      option.addEventListener("click", function (e) {
        e.stopPropagation()
        const lang = this.getAttribute("data-lang")
        if (lang) {
          applyLanguage(lang)
          closeDropdown()
        }
      })
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".language-switcher") && dropdownOpen) {
        closeDropdown()
      }
    })

    // Close dropdown on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && dropdownOpen) {
        closeDropdown()
      }
    })
  }

  // Navigation management
  function initNavigation() {
    let mobileMenuOpen = false
    let overlay = null

    function createOverlay() {
      if (!overlay) {
        overlay = document.createElement("div")
        overlay.className = "mobile-menu-overlay"
        overlay.style.cssText = `
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 55;
        `
        document.body.appendChild(overlay)
      }
    }

    function openMobileMenu() {
      const mobileMenu = document.getElementById("mobileMenu")
      if (mobileMenu && overlay) {
        mobileMenu.classList.add("open")
        overlay.style.opacity = "1"
        overlay.style.visibility = "visible"
        document.body.style.overflow = "hidden"
        mobileMenuOpen = true
      }
    }

    function closeMobileMenu() {
      const mobileMenu = document.getElementById("mobileMenu")
      if (mobileMenu && overlay) {
        mobileMenu.classList.remove("open")
        overlay.style.opacity = "0"
        overlay.style.visibility = "hidden"
        document.body.style.overflow = ""
        mobileMenuOpen = false
      }
    }

    function toggleMobileMenu() {
      if (mobileMenuOpen) {
        closeMobileMenu()
      } else {
        openMobileMenu()
      }
    }

    function handleScroll() {
      const navbar = document.getElementById("navbar")
      if (navbar) {
        if (window.scrollY > 10) {
          navbar.classList.add("scrolled")
        } else {
          navbar.classList.remove("scrolled")
        }
      }
    }

    // Create overlay
    createOverlay()

    // Bind events
    const mobileMenuToggle = document.getElementById("mobileMenuToggle")
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener("click", toggleMobileMenu)
    }

    const mobileMenuClose = document.getElementById("mobileMenuClose")
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener("click", closeMobileMenu)
    }

    if (overlay) {
      overlay.addEventListener("click", closeMobileMenu)
    }

    // Close menu when clicking nav links
    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", closeMobileMenu)
    })

    // Handle scroll
    window.addEventListener("scroll", utils.throttle(handleScroll, 16))

    // Handle escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        closeMobileMenu()
      }
    })
  }

  // Animation management
  function initAnimations() {
    if (!window.IntersectionObserver) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running"
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    const animatedElements = document.querySelectorAll(".animate-fade-in-up, .animate-fade-in-left, .animate-scale-in")
    animatedElements.forEach((element) => {
      element.style.animationPlayState = "paused"
      observer.observe(element)
    })
  }

  // Search functionality
  function initSearch() {
    function performSearch() {
      const searchInput = document.querySelector(".search-input")
      const query = searchInput ? searchInput.value.trim() : ""
      if (query) {
        window.location.href = "search.html?q=" + encodeURIComponent(query)
      }
    }

    const searchInput = document.querySelector(".search-input")
    if (searchInput) {
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          performSearch()
        }
      })
    }

    const searchButton = document.querySelector(".search-btn")
    if (searchButton) {
      searchButton.addEventListener("click", (e) => {
        e.preventDefault()
        performSearch()
      })
    }
  }

  // Analytics (placeholder)
  function initAnalytics() {
    function trackEvent(category, action, label) {
      // Placeholder for analytics
      console.log("Event:", category, action, label)
    }

    // Track button clicks
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const text = this.textContent.trim()
        trackEvent("Button", "Click", text)
      })
    })

    // Track navigation clicks
    document.querySelectorAll(".nav-link, .mobile-nav-link").forEach((link) => {
      link.addEventListener("click", function () {
        const text = this.textContent.trim()
        trackEvent("Navigation", "Click", text)
      })
    })
  }

  // Performance monitoring
  function initPerformance() {
    if (!window.performance) {
      return
    }

    window.addEventListener("load", () => {
      setTimeout(() => {
        try {
          const navigation = performance.getEntriesByType("navigation")[0]
          const paint = performance.getEntriesByType("paint")

          console.log("Performance Metrics:", {
            "DOM Content Loaded": navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            "Load Complete": navigation.loadEventEnd - navigation.loadEventStart,
            "First Paint": paint.find((p) => p.name === "first-paint")?.startTime,
            "First Contentful Paint": paint.find((p) => p.name === "first-contentful-paint")?.startTime,
          })
        } catch (error) {
          console.log("Performance monitoring not available")
        }
      }, 0)
    })
  }

  // Main initialization function
  function initializeApp() {
    try {
      initTheme()
      initLanguage()
      initNavigation()
      initAnimations()
      initSearch()
      initAnalytics()
      initPerformance()

      console.log("ACAD Ressources app initialized successfully")
    } catch (error) {
      console.error("Error initializing app:", error)
    }
  }

  // Safe initialization
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp)
  } else {
    initializeApp()
  }
})()
function showPDF() {
    window.open('files/BDvues.pdf', '_blank');
}
const dropArea = document.getElementById("drop-area");
  const fileInput = document.getElementById("fileElem");
  const dropText = document.getElementById("drop-text");

  let selectedFile = null;

  // Click to open file dialog
  dropArea.addEventListener("click", () => fileInput.click());

  // Dragover styling
  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.style.borderColor = "#007bff";
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.style.borderColor = "#ccc";
  });

  // Drop handler
  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.style.borderColor = "#ccc";

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      selectedFile = files[0];
      dropText.textContent = `📄 ${selectedFile.name}`;
    }
  });

  // File dialog handler
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      selectedFile = fileInput.files[0];
      dropText.textContent = `📄 ${selectedFile.name}`;
    }
  });
  // Toggle dropdown
const selected = document.querySelector('.selected');
const options = document.querySelector('.options');

selected.addEventListener('click', () => {
  options.style.display = options.style.display === 'block' ? 'none' : 'block';
});

// Set selected
document.querySelectorAll('.option').forEach(option => {
  option.addEventListener('click', () => {
    selected.textContent = option.textContent;
    options.style.display = 'none';
  });
});
