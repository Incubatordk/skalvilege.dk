/* ==========================================================================
   skalvilege.dk / Playdate — Main JavaScript
   Mode switching (prelaunch/launched), i18n bootstrap, Appwrite signup,
   contact modal, scroll effects, scroll-triggered animations.
   ========================================================================== */

(function () {
  "use strict";

  // ---- i18n ----
  I18N.apply(I18N.detect());

  var langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.addEventListener("click", function () { I18N.toggle(); });
  }

  // ---- Site mode ----
  // URL ?mode=launched / ?mode=prelaunch overrides config (useful for testing).

  var urlMode = new URLSearchParams(window.location.search).get("mode");
  var mode = (urlMode === "launched" || urlMode === "prelaunch") ? urlMode : SITE_CONFIG.SITE_MODE;
  document.body.setAttribute("data-mode", mode);

  function applyModeVisibility() {
    document.querySelectorAll("[data-mode-only]").forEach(function (el) {
      var required = el.getAttribute("data-mode-only");
      if (required !== mode) {
        el.classList.add("hidden");
      } else {
        el.classList.remove("hidden");
      }
    });
  }
  applyModeVisibility();

  // ---- Store button URLs (launched mode) ----

  if (mode === "launched") {
    document.querySelectorAll("[data-store='appstore']").forEach(function (el) {
      if (SITE_CONFIG.APP_STORE_URL) el.setAttribute("href", SITE_CONFIG.APP_STORE_URL);
      el.removeAttribute("aria-disabled");
    });
    document.querySelectorAll("[data-store='playstore']").forEach(function (el) {
      if (SITE_CONFIG.PLAY_STORE_URL) el.setAttribute("href", SITE_CONFIG.PLAY_STORE_URL);
      el.removeAttribute("aria-disabled");
    });
  }

  // ---- Waitlist email signup (prelaunch mode) ----

  var signupForm = document.getElementById("signup-form");
  var signupSuccess = document.getElementById("signup-success");

  if (signupForm && mode === "prelaunch") {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var emailInput = signupForm.querySelector('input[type="email"]');
      var email = emailInput.value.trim();
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        emailInput.focus();
        return;
      }

      var endpoint = SITE_CONFIG.APPWRITE_ENDPOINT;
      var projectId = SITE_CONFIG.APPWRITE_PROJECT_ID;
      var databaseId = SITE_CONFIG.APPWRITE_DATABASE_ID;
      var collectionId = SITE_CONFIG.APPWRITE_COLLECTION_ID;

      function showSuccess() {
        signupForm.classList.add("hidden");
        if (signupSuccess) signupSuccess.classList.add("visible");
        emailInput.value = "";
      }

      if (!endpoint || !projectId) {
        // Appwrite not yet configured — just show the success UI.
        showSuccess();
        return;
      }

      var url = endpoint + "/databases/" + databaseId + "/collections/" + collectionId + "/documents";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Project": projectId,
        },
        body: JSON.stringify({
          documentId: "unique()",
          data: { email: email },
        }),
      })
        .then(function (response) {
          if (!response.ok) {
            response.json().then(function (err) { console.error("Appwrite error:", err); });
          }
          showSuccess();
        })
        .catch(function (err) {
          console.error("Signup network error:", err);
          showSuccess();
        });
    });
  }

  // ---- Contact modal ----

  var contactModal = document.getElementById("contact-modal");
  var contactOpeners = document.querySelectorAll("[data-contact-open]");
  var contactForm = document.getElementById("contact-form");
  var contactSuccess = document.getElementById("contact-success");
  var contactError = document.getElementById("contact-error");
  var lastFocused = null;

  function openContactModal() {
    if (!contactModal) return;
    lastFocused = document.activeElement;
    contactModal.hidden = false;
    contactModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var firstInput = contactModal.querySelector("input, textarea");
    if (firstInput) firstInput.focus();
  }

  function closeContactModal() {
    if (!contactModal) return;
    contactModal.hidden = true;
    contactModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  contactOpeners.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openContactModal();
    });
  });

  if (contactModal) {
    contactModal.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-modal-close")) closeContactModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !contactModal.hidden) closeContactModal();
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var data = {
        name: contactForm.elements.name.value.trim(),
        email: contactForm.elements.email.value.trim(),
        subject: contactForm.elements.subject.value.trim(),
        message: contactForm.elements.message.value.trim(),
      };
      if (!data.name || !data.email || !data.subject || !data.message) return;

      var endpoint = SITE_CONFIG.APPWRITE_APP_ENDPOINT;
      var projectId = SITE_CONFIG.APPWRITE_APP_PROJECT_ID;
      var databaseId = SITE_CONFIG.APPWRITE_DATABASE_ID;
      var collectionId = SITE_CONFIG.APPWRITE_CONTACT_COLLECTION_ID;

      function showSuccess() {
        contactForm.classList.add("hidden");
        if (contactError) contactError.hidden = true;
        if (contactSuccess) contactSuccess.classList.add("visible");
      }

      if (!endpoint || !projectId) {
        // Fallback: open the user's mail client so we never silently drop a message.
        var mailto = "mailto:" + (SITE_CONFIG.SUPPORT_EMAIL || "playdate@skalvilege.dk")
          + "?subject=" + encodeURIComponent(data.subject)
          + "&body=" + encodeURIComponent(data.message + "\n\n— " + data.name + " <" + data.email + ">");
        window.location.href = mailto;
        showSuccess();
        return;
      }

      var url = endpoint + "/databases/" + databaseId + "/collections/" + collectionId + "/documents";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Project": projectId,
        },
        body: JSON.stringify({ documentId: "unique()", data: data }),
      })
        .then(function (response) {
          if (!response.ok) {
            return response.json().then(function (err) {
              throw new Error(err && err.message ? err.message : "HTTP " + response.status);
            });
          }
          showSuccess();
        })
        .catch(function (err) {
          console.error("Contact submit failed:", err);
          if (contactError) contactError.hidden = false;
        });
    });
  }

  // ---- Nav scroll effect ----

  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 10) nav.classList.add("nav--scrolled");
      else nav.classList.remove("nav--scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---- Scroll-triggered animations ----

  var animated = document.querySelectorAll("[data-animate]");
  if (animated.length > 0 && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animated.forEach(function (el) { observer.observe(el); });
  } else {
    animated.forEach(function (el) { el.classList.add("visible"); });
  }
})();
