/**
 * Central site-wide constants.
 * Update business info here — it flows to Footer, Home CTA, Contact page, etc.
 */
export const SITE = {
  name: "Chhaya Awning",
  tagline: "Bespoke awnings, canopies & shade systems",

  contact: {
    phone: "+91 99712 18638",
    phoneHref: "tel:+919971218638",
    whatsapp: "+91 99712 18638",
    whatsappHref: "https://wa.me/919971218638",
    email: "gopalnayak8939@gmail.com",
    emailHref: "mailto:gopalnayak8939@gmail.com",
  },

  address: {
    line1: "B - 155, Street No. 7",
    line2: "Sushila Garden, Saboli Extension",
    city: "Delhi",
    pincode: "110093",
    full: "B - 155, Street No. 7, Sushila Garden, Saboli Extension, Delhi 110093",
    mapsHref:
      "https://maps.google.com/?q=B-155+Street+No.7+Sushila+Garden+Saboli+Extension+Delhi+110093",
  },

  hours: {
    weekdays: "Mon–Sat · 10am–7pm",
    sunday: "Closed",
    list: [
      { day: "Monday", time: "10:00 — 19:00" },
      { day: "Tuesday", time: "10:00 — 19:00" },
      { day: "Wednesday", time: "10:00 — 19:00" },
      { day: "Thursday", time: "10:00 — 19:00" },
      { day: "Friday", time: "10:00 — 19:00" },
      { day: "Saturday", time: "10:00 — 19:00" },
      { day: "Sunday", time: "Closed" },
    ],
  },

  socials: {
    instagram: "https://www.instagram.com/gopalnayak8939?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
  },
} as const