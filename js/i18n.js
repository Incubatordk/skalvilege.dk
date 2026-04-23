/* ==========================================================================
   skalvilege.dk / Playdate — i18n (Danish + English)
   Auto-detects browser language, toggles via header button, persists to localStorage.
   ========================================================================== */

var I18N = (function () {
  "use strict";

  var DEFAULT_LANG = "da";
  var SUPPORTED = ["da", "en"];
  var STORAGE_KEY = "playdate-lang";

  var translations = {
    da: {
      // Meta
      "meta.title": "Playdate — Din landsby i lommen",
      "meta.description": "Playdate er en ny app til danske og internationale familier, der gør det nemt at finde legekammerater og koordinere legeaftaler.",

      // Header
      "nav.features": "Funktioner",
      "nav.how": "Sådan virker det",
      "nav.about": "Om os",
      "nav.blog": "Blog",
      "nav.cta": "Tilmeld venteliste →",
      "nav.ctaShort": "Tilmeld",
      "nav.ctaLaunched": "Download →",
      "nav.menu": "Åbn menu",
      "lang.toggle": "EN",

      // Hero
      "hero.badge": "Lancerer i Danmark · 0–10 år",
      "hero.title1": "Den trygge måde at",
      "hero.title2": "arrangere legeaftaler.",
      "hero.sub": "Match med nærliggende eller forbundne familier ud fra fritid, alder, interesser og afstand — og arranger en legeaftale med ét klik.",
      "hero.body": "Playdate er en ny app til forældre, der vil have en enklere og mere tryg måde at koordinere børnenes sociale liv. I stedet for at jonglere med chats, kalendere og skoleapps kan familier finde bedre match og omsætte interesse til aftaler nemmere.",
      "hero.ctaWaitlist": "Tilmeld venteliste →",
      "hero.ctaSee": "Se hvordan det virker",
      "trust.verified": "Verificerede profiler",
      "trust.built": "Bygget af forældre",
      "trust.free": "Gratis at tilmelde",

      // Features
      "features.title": "Alt, din familie har brug for",
      "features.sub": "Én app til at finde legekammerater, koordinere kalendere og bygge varige venskaber.",
      "feature.schedule.title": "Smart planlægning",
      "feature.schedule.text": "Se hvornår jeres forbundne familier er ledige, og foreslå legeaftaler der faktisk passer i alles kalender.",
      "feature.nearby.title": "Find nærliggende familier",
      "feature.nearby.text": "Find familier i nærheden på et interaktivt kort. Filtrer efter alder, sprog og interesser.",
      "feature.safe.title": "Verificeret og trygt",
      "feature.safe.text": "Alle profiler er verificeret. Børns billeder er privatlivsbeskyttet, indtil familier er forbundet — sikkerhed fra dag ét.",
      "feature.holiday.title": "Ferietilstand",
      "feature.holiday.text": "I Lalandia, Center Parcs eller hvor som helst i Danmark — find legekammerater til børnene, uanset hvor I er.",
      "feature.chat.title": "Enkel beskedfunktion",
      "feature.chat.text": "Koordiner med forbundne familier direkte i appen — ingen grund til at dele telefonnumre, før I er klar.",
      "feature.lang.title": "Dansk og engelsk",
      "feature.lang.text": "Fuldt tosproget — både for danske familier og for internationale, der slår sig ned i Danmark.",

      // How it works
      "how.title": "Sådan virker det",
      "how.sub": "I gang på få minutter.",
      "how.step1.title": "Opret jeres familieprofil",
      "how.step1.text": "Tilmeld med e-mail eller Google/Apple. Tilføj familien, børnenes alder, interesser og tilgængelighed.",
      "how.step2.title": "Find og forbind",
      "how.step2.text": "Udforsk familier på kortet eller søg efter skole, aldersgruppe og interesser. Send en invitation.",
      "how.step3.title": "Leg!",
      "how.step3.text": "Invitationen godkendes → legeaftalen er bekræftet → påmindelser sendes automatisk. Børnene leger, forældrene slapper af.",

      // Stats
      "stats.age": "Aldersgruppe",
      "stats.verified": "Verificerede profiler",
      "stats.launch": "Lancerer i Danmark",

      // Testimonials
      "test.title": "Hvad forældre siger",
      "test.sub": "Fra vores tidlige adgangsfamilier",
      "test.1": "\"Endelig en app, der faktisk gør det nemt at arrangere legeaftaler. Min søn Leo har nu tre faste legekammerater, vi fandt gennem Playdate.\"",
      "test.1.name": "Sarah M.",
      "test.1.meta": "København · 2 børn",
      "test.2": "\"Vi flyttede fra Storbritannien for to år siden og kæmpede med at opbygge et socialt netværk for vores datter. Playdate har ændret alt for os.\"",
      "test.2.name": "James T.",
      "test.2.meta": "Aarhus · Expat-familie",
      "test.3": "\"De verificerede profiler giver mig ro i sindet. Jeg ved præcis, hvem mine børn leger med, før vi mødes.\"",
      "test.3.name": "Mette R.",
      "test.3.meta": "Odense · 3 børn",

      // Founders
      "founders.title": "Mød grundlæggerne",
      "founders.sub": "Bygget af forældre, der har levet kampen med at koordinere legeaftaler.",
      "founder.jinhong.role": "Grundlægger, Bitecloud · Cloud-Native Executive",
      "founder.jinhong.bio": "Engineering-executive og platform-leder med dybe cloud-native rødder inden for Kubernetes, GitOps og hybrid cloud siden 2016. Tidligere Chief Cloud Architect og Global Head of Cloud and Container Platforms i Saxo Bank. Kubestronaut, Azure Solutions Architect Expert og international keynote-taler. Arrangør for Cloud Native Copenhagen og Cloud Native Denmark. Som forælder kender Jinhong de særlige udfordringer ved at bygge sociale relationer for børn i Danmark.",
      "founder.jimmi.role": "Principal Engineer · Azure og Kubernetes",
      "founder.jimmi.bio": "Med 15+ års erfaring i softwareudvikling fra Saxo Bank og tidligere startups — inklusive flere Tech Lead-roller — bringer Jimmi både enterprise-dybde og startup-pragmatisme til teamet. Han har en evne til at bygge systemer der virker, uden at gøre dem tungere end nødvendigt: præcis hvad en teknisk medstifter i en to-personers startup skal kunne. Som forælder, der i årevis har koordineret børnenes sociale liv gennem fragmenterede gruppechats ved siden af et krævende job, har Jimmi ikke brug for markedsundersøgelser for at forstå problemet. Han har levet det de fleste hverdagsaftener.",
      "founder.robert.role": "DevOps-konsulent og platform engineer",
      "founder.robert.bio": "Med 15+ års erfaring i cloud- og platform engineering bringer Robert dyb DevOps-ekspertise til teamet — fra CI/CD og Kubernetes til Terraform og multi-cloud arkitektur. Arrangør af Copenhagen Cloud Native meetups (2.000 medlemmer) og KCD Denmark, han er lige så engageret i community som i kode. Som far til to piger ved Robert på egen krop, at det sværeste ved en legeaftale ikke er at finde tiden — det er at opbygge nok tillid til en anden familie til at sige ja. Det problem er personligt for ham, og det er præcis hvad Playdate er bygget til at løse.",
      "mission.title": "Vores mission",
      "mission.text": "Hvert barn fortjener at opbygge meningsfulde venskaber gennem leg. Vi gør koordinering af legeaftaler ubesværet — om du er dansker eller international, hjemme eller på ferie. Teknologi bør bringe familier sammen, ikke gøre forældrerollen mere kompleks.",

      // Blog teaser
      "bloghome.eyebrow": "Blog",
      "bloghome.title": "Fra bloggen",
      "bloghome.sub": "Små fortællinger om børneliv, forældretøven og de aftaler, der gerne må blive lidt lettere at få til at ske.",
      "bloghome.date": "20. april 2026 · Playdate",
      "bloghome.postTitle": "Lørdag formiddag, og ingen har spurgt endnu",
      "bloghome.excerpt": "Barnet spørger, om man skal lege med nogen i dag. Numrene ligger i telefonen. Alligevel bliver der ikke skrevet.",
      "bloghome.read": "Læs artiklen →",
      "bloghome.viewAll": "Se alle artikler →",
      "bloghome.cardAria": "Læs Lørdag formiddag, og ingen har spurgt endnu",
      "bloghome.imageAlt": "Et barn bygger LEGO lørdag formiddag, mens en forælder overvejer en legeaftale",

      // CTA / Waitlist
      "cta.badge": "🚀 Kommer snart",
      "cta.title1": "Klar til at få legeaftaler til",
      "cta.title2": "faktisk at ske?",
      "cta.sub": "Tilmeld dig ventelisten — tidlige medlemmer får prioriteret adgang og eksklusive fordele, når vi lancerer i Danmark.",
      "signup.placeholder": "Indtast din e-mailadresse",
      "signup.button": "Tilmeld →",
      "signup.note": "Ingen spam. Kun en besked når vi er klar til lancering.",
      "signup.success": "Tak fordi du tilmelder dig! Vi sender dig en besked, så snart Playdate er klar. 🎉",

      // Launched hero
      "launched.title1": "Legeaftaler,",
      "launched.title2": "gjort enkle.",
      "launched.sub": "Download Playdate og find legekammerater til dine børn — hvor som helst i Danmark.",
      "store.download": "Download fra",
      "store.appstore": "App Store",
      "store.getiton": "Hent den på",
      "store.playstore": "Google Play",

      // Footer
      "footer.about": "Gør koordinering af legeaftaler ubesværet for danske og internationale familier med børn i alderen 0–10.",
      "footer.quick": "Hurtige links",
      "footer.home": "Hjem",
      "footer.features": "Funktioner",
      "footer.how": "Sådan virker det",
      "footer.about2": "Om os",
      "footer.blog": "Blog",
      "footer.featuresTitle": "Funktioner",
      "footer.smart": "Smart planlægning",
      "footer.holiday": "Ferietilstand",
      "footer.verified": "Verificerede profiler",
      "footer.bilingual": "Tosproget support",
      "footer.contactTitle": "Kontakt",
      "footer.based": "Baseret i Danmark",
      "footer.cta": "Tilmeld venteliste →",
      "footer.copy": "© 2026 Playdate. Alle rettigheder forbeholdes.",
      "footer.built": "Bygget med ❤️ af forældre, for forældre.",
      "footer.privacy": "Privatlivspolitik",
      "footer.terms": "Vilkår og betingelser",

      // Contact modal
      "contact.open": "Kontakt",
      "contact.openAria": "Åbn kontaktformular",
      "contact.title": "Kontakt os",
      "contact.text": "Har du spørgsmål eller feedback? Send os en besked.",
      "contact.close": "Luk",
      "contact.name": "Navn",
      "contact.namePlaceholder": "Dit navn",
      "contact.email": "E-mail",
      "contact.emailPlaceholder": "Din e-mail",
      "contact.subject": "Emne",
      "contact.subjectPlaceholder": "Hvad handler det om?",
      "contact.message": "Besked",
      "contact.messagePlaceholder": "Skriv din besked",
      "contact.submit": "Send besked",
      "contact.success": "Tak! Vi vender tilbage så hurtigt som muligt.",
      "contact.error": "Noget gik galt. Prøv igen eller skriv til playdate@skalvilege.dk.",
    },

    en: {
      // Meta
      "meta.title": "Playdate — Your Village, In Your Pocket",
      "meta.description": "Playdate is a new app for Danish and international families — the simpler, safer way to find playmates and coordinate playdates.",

      // Header
      "nav.features": "Features",
      "nav.how": "How It Works",
      "nav.about": "About Us",
      "nav.blog": "Blog",
      "nav.cta": "Join Waitlist →",
      "nav.ctaShort": "Join",
      "nav.ctaLaunched": "Download →",
      "nav.menu": "Open menu",
      "lang.toggle": "DA",

      // Hero
      "hero.badge": "Launching in Denmark · Ages 0–10",
      "hero.title1": "The trusted way to",
      "hero.title2": "organize playdates.",
      "hero.sub": "Match with connected or nearby families based on free time, age, interests and distance — then schedule a playdate in just one click.",
      "hero.body": "Playdate is a new app for parents who want a simpler, safer way to coordinate children's social lives. Instead of juggling chats, calendars and school apps, families can discover better matches and turn interest into real plans more easily.",
      "hero.ctaWaitlist": "Join the Waitlist →",
      "hero.ctaSee": "See How It Works",
      "trust.verified": "Verified profiles",
      "trust.built": "Built by parents",
      "trust.free": "Free to join",

      // Features
      "features.title": "Everything your family needs",
      "features.sub": "One app to find playmates, coordinate schedules and build lasting friendships.",
      "feature.schedule.title": "Smart Scheduling",
      "feature.schedule.text": "See when your connected families are free and suggest playdates that actually fit everyone's calendar.",
      "feature.nearby.title": "Nearby Discovery",
      "feature.nearby.text": "Find families nearby on an interactive map. Filter by age, language and interests.",
      "feature.safe.title": "Verified & Safe",
      "feature.safe.text": "Every profile is verified. Child photos are privacy-protected until families connect — safety built in from day one.",
      "feature.holiday.title": "Holiday Mode",
      "feature.holiday.text": "At Lalandia, Center Parcs or anywhere in Denmark — find playmates for your kids wherever you go.",
      "feature.chat.title": "Simple Messaging",
      "feature.chat.text": "Coordinate with connected families through in-app chat — no phone numbers needed until you're ready.",
      "feature.lang.title": "Danish & English",
      "feature.lang.text": "Fully bilingual for both local Danish families and international expat communities settling in Denmark.",

      // How it works
      "how.title": "How it works",
      "how.sub": "Up and running in minutes.",
      "how.step1.title": "Create your family profile",
      "how.step1.text": "Sign up with email or Google/Apple. Add your family, children's ages, interests and availability.",
      "how.step2.title": "Discover & connect",
      "how.step2.text": "Browse families on the map or search by school, age range and interests. Send a playdate invitation.",
      "how.step3.title": "Play!",
      "how.step3.text": "Invitation accepted → playdate confirmed → reminders sent automatically. Kids play, parents relax.",

      // Stats
      "stats.age": "Age range",
      "stats.verified": "Verified profiles",
      "stats.launch": "Launching in Denmark",

      // Testimonials
      "test.title": "What parents are saying",
      "test.sub": "From our early-access families",
      "test.1": "\"Finally an app that actually makes it easy to organise playdates. My son Leo now has three regular playmates we found through Playdate.\"",
      "test.1.name": "Sarah M.",
      "test.1.meta": "Copenhagen · 2 kids",
      "test.2": "\"We moved from the UK two years ago and struggled to build a social circle for our daughter. Playdate changed everything for us.\"",
      "test.2.name": "James T.",
      "test.2.meta": "Aarhus · Expat family",
      "test.3": "\"The verified profiles give me real peace of mind. I know exactly who my kids are playing with before we ever meet.\"",
      "test.3.name": "Mette R.",
      "test.3.meta": "Odense · 3 kids",

      // Founders
      "founders.title": "Meet the founders",
      "founders.sub": "Built by parents who've lived the playdate coordination struggle.",
      "founder.jinhong.role": "Founder, Bitecloud · Cloud-Native Executive",
      "founder.jinhong.bio": "Engineering executive and platform leader with deep cloud-native roots across Kubernetes, GitOps and hybrid cloud since 2016. Former Chief Cloud Architect & Global Head of Cloud and Container Platforms at Saxo Bank. Kubestronaut, Azure Solutions Architect Expert and regular international keynote speaker. Organiser for Cloud Native Copenhagen and Cloud Native Denmark. As a parent, Jinhong understands the unique challenges of building social connections for children in Denmark.",
      "founder.jimmi.role": "Principal Engineer · Azure & Kubernetes",
      "founder.jimmi.bio": "With 15+ years in software development across Saxo Bank and earlier startups — including several Tech Lead roles — Jimmi brings both enterprise depth and startup pragmatism to the team. He has a gift for building systems that work without making them heavier than they need to be: exactly what a technical co-founder of a two-person startup requires. As a parent who has spent years coordinating his kid's social life through fragmented group chats while holding down a demanding job, Jimmi doesn't need market research to understand the problem. He has lived it most weeknights.",
      "founder.robert.role": "DevOps Consultant & Platform Engineer",
      "founder.robert.bio": "With 15+ years in cloud and platform engineering, Robert brings deep DevOps expertise to the team — from CI/CD pipelines and Kubernetes to Terraform and multi-cloud architecture. Organiser of Copenhagen Cloud Native meetups (2,000 members) and KCD Denmark, he's as committed to community as he is to code. As a father of two girls, Robert knows first-hand that the hardest part of setting up a playdate isn't finding the time — it's building enough trust with another family to feel comfortable saying yes. That problem is personal to him, and it's exactly what Playdate is designed to solve.",
      "mission.title": "Our Mission",
      "mission.text": "Every child deserves the opportunity to build meaningful friendships through play. We're making playdate coordination effortless — whether you're a Danish native or an international expat, whether you're at home or on holiday. Technology should bring families together, not add complexity to parenting.",

      // Blog teaser
      "bloghome.eyebrow": "Blog",
      "bloghome.title": "From the blog",
      "bloghome.sub": "Small stories about children's friendships, parental hesitation, and the plans that should be easier to make happen.",
      "bloghome.date": "April 20, 2026 · Playdate",
      "bloghome.postTitle": "Saturday morning, and no one's asked yet",
      "bloghome.excerpt": "The child asks if they can play with someone today. The numbers are in the phone. No one gets a message.",
      "bloghome.read": "Read the article →",
      "bloghome.viewAll": "See all articles →",
      "bloghome.cardAria": "Read Saturday morning, and no one's asked yet",
      "bloghome.imageAlt": "A child building LEGO on a Saturday morning while a parent considers arranging a playdate",

      // CTA / Waitlist
      "cta.badge": "🚀 Coming soon",
      "cta.title1": "Ready to make playdates",
      "cta.title2": "actually happen?",
      "cta.sub": "Join our waitlist — early members get priority access and exclusive perks when we launch in Denmark.",
      "signup.placeholder": "Enter your email address",
      "signup.button": "Join Waitlist →",
      "signup.note": "No spam. Just a launch notification when we're ready.",
      "signup.success": "Thanks for joining! We'll let you know as soon as Playdate is ready to launch. 🎉",

      // Launched hero
      "launched.title1": "Playdates,",
      "launched.title2": "made simple.",
      "launched.sub": "Download Playdate and find playmates for your kids — anywhere in Denmark.",
      "store.download": "Download on the",
      "store.appstore": "App Store",
      "store.getiton": "Get it on",
      "store.playstore": "Google Play",

      // Footer
      "footer.about": "Making playdate coordination effortless for Danish and expat families with kids aged 0–10.",
      "footer.quick": "Quick Links",
      "footer.home": "Home",
      "footer.features": "Features",
      "footer.how": "How It Works",
      "footer.about2": "About Us",
      "footer.blog": "Blog",
      "footer.featuresTitle": "Features",
      "footer.smart": "Smart Scheduling",
      "footer.holiday": "Holiday Mode",
      "footer.verified": "Verified Profiles",
      "footer.bilingual": "Bilingual Support",
      "footer.contactTitle": "Contact",
      "footer.based": "Based in Denmark",
      "footer.cta": "Join Waitlist →",
      "footer.copy": "© 2026 Playdate. All rights reserved.",
      "footer.built": "Built with ❤️ by parents, for parents.",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms & Conditions",

      // Contact modal
      "contact.open": "Contact",
      "contact.openAria": "Open contact form",
      "contact.title": "Get in touch",
      "contact.text": "Got a question or some feedback? Send us a message.",
      "contact.close": "Close",
      "contact.name": "Name",
      "contact.namePlaceholder": "Your name",
      "contact.email": "Email",
      "contact.emailPlaceholder": "Your email",
      "contact.subject": "Subject",
      "contact.subjectPlaceholder": "What's it about?",
      "contact.message": "Message",
      "contact.messagePlaceholder": "Write your message",
      "contact.submit": "Send message",
      "contact.success": "Thanks! We'll get back to you as soon as possible.",
      "contact.error": "Something went wrong. Please try again or email playdate@skalvilege.dk.",
    },
  };

  function detect() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;

    var browserLang = (navigator.language || navigator.userLanguage || "").toLowerCase();
    if (browserLang.indexOf("da") === 0) return "da";
    if (browserLang.indexOf("en") === 0) return "en";

    return DEFAULT_LANG;
  }

  function t(key, lang) {
    var dict = translations[lang] || translations[DEFAULT_LANG];
    return dict[key] || translations[DEFAULT_LANG][key] || key;
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.title = t("meta.title", lang);

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("meta.description", lang));

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"), lang);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder"), lang));
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"), lang));
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      el.setAttribute("alt", t(el.getAttribute("data-i18n-alt"), lang));
    });

    localStorage.setItem(STORAGE_KEY, lang);
  }

  function toggle() {
    var current = document.documentElement.lang || DEFAULT_LANG;
    var next = current === "da" ? "en" : "da";
    apply(next);
    return next;
  }

  return { detect: detect, apply: apply, toggle: toggle, t: t };
})();
