/* skalvilege.dk — site configuration */

const SITE_CONFIG = {
  // "prelaunch" = waitlist page with email signup (store buttons shown as mockup)
  // "launched"  = app download page with real App Store / Google Play links
  SITE_MODE: "prelaunch",

  // Appwrite — waitlist email signup (prelaunch)
  // Fill these in when the Appwrite project is ready; until then the form
  // gracefully falls back to a local "thanks" UI.
  APPWRITE_ENDPOINT: "",
  APPWRITE_PROJECT_ID: "",
  APPWRITE_DATABASE_ID: "playdate",
  APPWRITE_COLLECTION_ID: "waitlist",

  // Appwrite — contact form (can share or differ from the signup project)
  APPWRITE_APP_ENDPOINT: "",
  APPWRITE_APP_PROJECT_ID: "",
  APPWRITE_CONTACT_COLLECTION_ID: "website_contact",

  // App store URLs (launched mode only)
  APP_STORE_URL: "https://apps.apple.com/dk/app/playdate/id000000000",
  PLAY_STORE_URL: "https://play.google.com/store/apps/details?id=dk.skalvilege.playdate",

  // Contact
  SUPPORT_EMAIL: "playdate@skalvilege.dk",
};
