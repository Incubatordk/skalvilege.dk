/* ==========================================================================
   skalvilege.dk — Blog i18n
   Uses the same language preference as the main Playdate site.
   ========================================================================== */

(function () {
  "use strict";

  var DEFAULT_LANG = "da";
  var SUPPORTED = ["da", "en"];
  var STORAGE_KEY = "playdate-lang";

  var pageMeta = {
    index: {
      da: {
        title: "Blog — Playdate",
        description: "Fortællinger og noter om legeaftaler, børneliv og de små sociale tærskler i familielivet.",
        ogTitle: "Blog — Playdate",
        ogDescription: "Fortællinger og noter om legeaftaler, børneliv og de små sociale tærskler i familielivet.",
        locale: "da_DK",
      },
      en: {
        title: "Blog — Playdate",
        description: "Stories and notes about playdates, family life, and the small social thresholds around children's friendships.",
        ogTitle: "Blog — Playdate",
        ogDescription: "Stories and notes about playdates, family life, and the small social thresholds around children's friendships.",
        locale: "en_GB",
      },
    },
    post: {
      da: {
        title: "Lørdag formiddag, og ingen har spurgt endnu — Playdate",
        description: "Barnet spørger, om man skal lege med nogen i dag. Numrene ligger i telefonen. Alligevel bliver der ikke skrevet.",
        ogTitle: "Lørdag formiddag, og ingen har spurgt endnu — Playdate",
        ogDescription: "Barnet spørger, om man skal lege med nogen i dag. Numrene ligger i telefonen. Alligevel bliver der ikke skrevet.",
        locale: "da_DK",
      },
      en: {
        title: "Saturday morning, and no one's asked yet — Playdate",
        description: "The child asks if they can play with someone today. The numbers are in the phone. No one gets a message.",
        ogTitle: "Saturday morning, and no one's asked yet — Playdate",
        ogDescription: "The child asks if they can play with someone today. The numbers are in the phone. No one gets a message.",
        locale: "en_GB",
      },
    },
  };

  var strings = {
    da: {
      "lang.toggle": "EN",
      "nav.features": "Funktioner",
      "nav.how": "Sådan virker det",
      "nav.about": "Om os",
      "nav.blog": "Blog",
      "nav.cta": "Tilmeld venteliste →",
      "nav.menu": "Åbn menu",
      "footer.privacy": "Privatlivspolitik",
      "footer.terms": "Vilkår og betingelser",
      "footer.copy": "© 2026 Playdate. Alle rettigheder forbeholdes.",
      "blog.index.eyebrow": "Blog",
      "blog.index.title": "Noter om legeaftaler",
      "blog.index.text": "Små fortællinger om børneliv, forældretøven og de aftaler, der gerne må blive lidt lettere at få til at ske.",
      "blog.card.aria": "Læs Lørdag formiddag, og ingen har spurgt endnu",
      "blog.image.alt": "Et barn bygger LEGO lørdag formiddag, mens en forælder overvejer en legeaftale",
      "blog.post.date": "20. april 2026 · Playdate",
      "blog.post.title": "Lørdag formiddag, og ingen har spurgt endnu",
      "blog.post.dek": "Om tærsklen for en lørdags-playdate, og hvorfor den er højere end den fortjener.",
      "blog.post.excerpt": "Barnet spørger, om man skal lege med nogen i dag. Numrene ligger i telefonen. Alligevel bliver der ikke skrevet.",
      "blog.read": "Læs artiklen",
      "blog.back": "Blog",
    },
    en: {
      "lang.toggle": "DA",
      "nav.features": "Features",
      "nav.how": "How It Works",
      "nav.about": "About Us",
      "nav.blog": "Blog",
      "nav.cta": "Join Waitlist →",
      "nav.menu": "Open menu",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms & Conditions",
      "footer.copy": "© 2026 Playdate. All rights reserved.",
      "blog.index.eyebrow": "Blog",
      "blog.index.title": "Notes on playdates",
      "blog.index.text": "Small stories about children's friendships, parental hesitation, and the plans that should be easier to make happen.",
      "blog.card.aria": "Read Saturday morning, and no one's asked yet",
      "blog.image.alt": "A child building LEGO on a Saturday morning while a parent considers arranging a playdate",
      "blog.post.date": "April 20, 2026 · Playdate",
      "blog.post.title": "Saturday morning, and no one's asked yet",
      "blog.post.dek": "On the threshold for a Saturday-morning playdate, and why it's higher than it deserves to be.",
      "blog.post.excerpt": "The child asks if they can play with someone today. The numbers are in the phone. No one gets a message.",
      "blog.read": "Read the article",
      "blog.back": "Blog",
    },
  };

  function detect() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;

    var browserLang = (navigator.language || navigator.userLanguage || "").toLowerCase();
    if (browserLang.indexOf("en") === 0) return "en";
    return DEFAULT_LANG;
  }

  function t(key, lang) {
    var dict = strings[lang] || strings[DEFAULT_LANG];
    return dict[key] || strings[DEFAULT_LANG][key] || key;
  }

  function setMeta(selector, attr, value) {
    var el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  function apply(lang) {
    var selected = SUPPORTED.indexOf(lang) !== -1 ? lang : DEFAULT_LANG;
    var page = document.body.getAttribute("data-blog-page") || "index";
    var meta = pageMeta[page] && pageMeta[page][selected];

    document.documentElement.lang = selected;
    document.body.setAttribute("data-lang", selected);
    localStorage.setItem(STORAGE_KEY, selected);

    if (meta) {
      document.title = meta.title;
      setMeta('meta[name="description"]', "content", meta.description);
      setMeta('meta[property="og:title"]', "content", meta.ogTitle);
      setMeta('meta[property="og:description"]', "content", meta.ogDescription);
      setMeta('meta[property="og:locale"]', "content", meta.locale);
      setMeta('meta[name="twitter:title"]', "content", meta.ogTitle);
      setMeta('meta[name="twitter:description"]', "content", meta.ogDescription);
    }

    document.querySelectorAll("[data-blog-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-blog-i18n"), selected);
    });

    document.querySelectorAll("[data-blog-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-blog-i18n-aria"), selected));
    });

    document.querySelectorAll("[data-blog-i18n-alt]").forEach(function (el) {
      el.setAttribute("alt", t(el.getAttribute("data-blog-i18n-alt"), selected));
    });

    document.querySelectorAll("[data-blog-lang]").forEach(function (el) {
      el.hidden = el.getAttribute("data-blog-lang") !== selected;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(detect());

    var langBtn = document.getElementById("lang-toggle");
    if (langBtn) {
      langBtn.addEventListener("click", function () {
        apply((document.documentElement.lang || DEFAULT_LANG) === "da" ? "en" : "da");
      });
    }

    var nav = document.querySelector(".nav");
    var navToggle = document.getElementById("nav-toggle");
    var navMenu = document.getElementById("nav-menu");
    if (nav && navToggle && navMenu) {
      var setMenu = function (open) {
        nav.setAttribute("data-menu-open", open ? "true" : "false");
        navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      };

      navToggle.addEventListener("click", function () {
        setMenu(nav.getAttribute("data-menu-open") !== "true");
      });

      navMenu.addEventListener("click", function (e) {
        if (e.target.tagName === "A") setMenu(false);
      });

      document.addEventListener("click", function (e) {
        if (nav.getAttribute("data-menu-open") !== "true") return;
        if (nav.contains(e.target)) return;
        setMenu(false);
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.getAttribute("data-menu-open") === "true") {
          setMenu(false);
          navToggle.focus();
        }
      });
    }
  });
})();
