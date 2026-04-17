/* skalvilege.dk — site configuration */

const SITE_CONFIG = {
  // "prelaunch" = waitlist page with email signup (store buttons shown as mockup)
  // "launched"  = app download page with real App Store / Google Play links
  SITE_MODE: "prelaunch",

  // Appwrite — waitlist email signup (prelaunch)
  // Uses the TablesDB API (tables/rows). Falls back to a local "thanks" UI
  // if endpoint/project are empty.
  APPWRITE_ENDPOINT: "https://base.anchorit.dk/v1",
  APPWRITE_PROJECT_ID: "website",
  APPWRITE_DATABASE_ID: "playdate",
  APPWRITE_TABLE_ID: "waitlist",

  // Appwrite — contact form (can share or differ from the signup project)
  APPWRITE_APP_ENDPOINT: "",
  APPWRITE_APP_PROJECT_ID: "",
  APPWRITE_CONTACT_TABLE_ID: "website_contact",

  // App store URLs (launched mode only)
  APP_STORE_URL: "https://apps.apple.com/dk/app/playdate/id000000000",
  PLAY_STORE_URL: "https://play.google.com/store/apps/details?id=dk.skalvilege.playdate",

  // Contact
  SUPPORT_EMAIL: "playdate@skalvilege.dk",
};
