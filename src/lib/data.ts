// Journey scenarios for the animated hero
export const journeyScenarios = [
  {
    id: 'confirm',
    sms: "Yes, see you tomorrow! 👍",
    result: 'confirmed' as const,
    label: 'Confirmed',
    icon: '✓',
    calendarClass: 'bg-white border-slate-300',
    hasRedUnderline: false
  },
  {
    id: 'cancel',
    sms: "Sorry, I need to cancel",
    result: 'cancelled' as const,
    label: 'Cancellation request',
    icon: '✗',
    calendarClass: 'bg-gray-100 border-slate-300',
    hasRedUnderline: true
  },
  {
    id: 'mixed',
    sms: "Yes but can we make it 10 mins later?",
    result: 'review' as const,
    label: 'Call to discuss',
    icon: '⚠️',
    calendarClass: 'bg-gray-100 border-slate-300',
    hasRedUnderline: true
  }
];

// Suggested SMS responses for the interactive demo
export const suggestedResponses = [
  { text: "Yes, see you then!", category: 'confirm' },
  { text: "I need to cancel please", category: 'cancel' },
  { text: "Can we reschedule to Thursday?", category: 'reschedule' },
  { text: "Yes but I might be 10 mins late", category: 'mixed' },
  { text: "👍", category: 'emoji' },
  { text: "huh?", category: 'unclear' }
];

// ROI Calculator questions
export const calculatorQuestions = [
  {
    id: 'cliniko',
    question: "Do you use Cliniko?",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ],
    exitOnFalse: true,
    exitMessage: "Abby works exclusively with Cliniko. We'd love to support other systems in the future – leave your email and we'll let you know."
  },
  {
    id: 'appointments',
    question: "Roughly how many appointments does your clinic have per week?",
    options: [
      { label: "Under 50", value: 30 },
      { label: "50-150", value: 100 },
      { label: "150-300", value: 225 },
      { label: "300+", value: 400 }
    ]
  },
  {
    id: 'responseRate',
    question: "What percentage of patients reply to appointment reminders?",
    options: [
      { label: "Most (70%+)", value: 0.75 },
      { label: "About half", value: 0.50 },
      { label: "Some (30%)", value: 0.30 },
      { label: "Not many", value: 0.15 }
    ]
  },
  {
    id: 'timePerResponse',
    question: "How long does it take staff to check and action each SMS reply?",
    options: [
      { label: "Under 1 minute", value: 0.75 },
      { label: "1-2 minutes", value: 1.5 },
      { label: "2-3 minutes", value: 2.5 },
      { label: "3+ minutes", value: 4 }
    ]
  }
];

// FAQ content
export const faqContent = {
  setup: [
    {
      q: "How long does setup take?",
      a: "About 5 minutes of your time, plus 1-2 business days for full activation."
    },
    {
      q: "Do I need to install software?",
      a: "Just a Chrome browser extension. No desktop software required."
    },
    {
      q: "Does Abby work with Safari or Firefox?",
      a: "Not currently. Chrome is required for the calendar overlay."
    }
  ],
  howItWorks: [
    {
      q: "Does Abby send SMS messages?",
      a: "No. Abby only reads and interprets responses to Cliniko's SMS reminders. It never sends messages."
    },
    {
      q: "What if a patient sends an unrelated SMS?",
      a: "Abby only processes replies to appointment reminders. Random or unrelated SMS won't be captured."
    },
    {
      q: "How accurate is the AI?",
      a: "98% accurate on single-intent messages. Complex or contradictory messages get flagged for manual review."
    }
  ],
  security: [
    {
      q: "What data does Abby access?",
      a: "Appointment IDs and SMS response text only. No patient names, phone numbers, or health information."
    },
    {
      q: "Where is my data stored?",
      a: "Australian AWS servers with encryption at rest and in transit."
    },
    {
      q: "How long do you keep data?",
      a: "SMS content is deleted immediately after interpretation. Appointment IDs are purged after 48 hours."
    }
  ],
  billing: [
    {
      q: "How does the free trial work?",
      a: "14 days, full access, no credit card required. Cancel anytime."
    },
    {
      q: "What payment methods do you accept?",
      a: "Credit/debit cards processed securely via Stripe."
    },
    {
      q: "Can I get a refund?",
      a: "We don't pro-rate refunds after payment. That's why we offer the free trial – test thoroughly before committing."
    }
  ]
};

// Pricing FAQ
export const pricingFAQ = [
  {
    q: "Is there a setup fee?",
    a: "No. Setup takes about 5 minutes and there are no additional costs."
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel whenever you like, effective immediately. No lock-in contracts."
  },
  {
    q: "Do you offer refunds?",
    a: "We don't pro-rate refunds, but you can trial free for 14 days before committing."
  },
  {
    q: "What if I have multiple clinics?",
    a: "One Abby account covers all locations within your Cliniko account."
  }
];

// Trust signals
export const trustSignals = [
  {
    icon: "🇦🇺",
    title: "Australian hosted",
    description: "AWS Sydney servers. Your data stays onshore."
  },
  {
    icon: "🔒",
    title: "Privacy first",
    description: "We store appointment IDs only. No patient names, numbers, or health information."
  },
  {
    icon: "🗑️",
    title: "Auto-delete",
    description: "SMS content deleted immediately after interpretation. IDs purged after 48 hours."
  },
  {
    icon: "🤖",
    title: "Our own AI",
    description: "Proprietary model. No OpenAI, no Google. Your data doesn't train anyone else's AI."
  }
];

// Social proof
export const testimonial = {
  quote: "Reduced time spent confirming appointments by 90%",
  author: "Teegan",
  role: "Practice Manager",
  clinic: "Optimise Health"
};

export const stats = [
  { number: "98%", label: "Interpretation accuracy" },
  { number: "15min", label: "Calendar sync frequency" },
  { number: "5min", label: "Setup time" }
];

// How it connects steps (homepage summary)
export const connectSteps = [
  {
    icon: "🔑",
    title: "Connect your Cliniko",
    description: "One API key, read-only access"
  },
  {
    icon: "🧠",
    title: "Abby interprets replies",
    description: "AI reads patient SMS every 15 mins"
  },
  {
    icon: "🧩",
    title: "Click the extension",
    description: "One click in your Chrome toolbar"
  },
  {
    icon: "🎨",
    title: "See who's coming",
    description: "Calendar lights up with status"
  }
];

// Quick start guide
export const quickStart = [
  {
    step: 1,
    title: "Create your Abby account",
    instruction: "Sign up at abby.clinic – just email and password."
  },
  {
    step: 2,
    title: "Generate your Cliniko API key",
    instruction: "In Cliniko: My Info → Manage API Keys → Add API Key. Name it 'Abby'."
  },
  {
    step: 3,
    title: "Paste the key into Abby",
    instruction: "Copy the key from Cliniko, paste into Abby's setup screen."
  },
  {
    step: 4,
    title: "Install the Chrome extension",
    instruction: "We'll email you the link. Click, install, pin to toolbar."
  },
  {
    step: 5,
    title: "Wait for activation",
    instruction: "Allow 1-2 business days for full sync. You'll see colours appear!"
  }
];

// Pricing included features
export const pricingIncluded = [
  "All clinic locations",
  "Unlimited admin users",
  "Up to 24 practitioners",
  "Chrome extension included",
  "14-day free trial"
];

// Requirements for using Abby
export const requirements = [
  { label: "Chrome browser", description: "Desktop only", icon: "chrome" },
  { label: "Cliniko account", description: "With SMS reminders enabled", icon: "cliniko" },
  { label: "API key access", description: "Admin or Power Receptionist role", icon: "key" }
];

// How the extension works - data flow (6 steps)
export const extensionFlow = [
  {
    step: 1,
    title: "Cliniko sends reminder",
    description: "Your existing SMS reminders go out as normal",
    icon: "📱"
  },
  {
    step: 2,
    title: "Patient replies",
    description: "Their response arrives in Cliniko",
    icon: "💬"
  },
  {
    step: 3,
    title: "Abby interprets",
    description: "Our AI reads the intent every 15 minutes",
    icon: "🧠"
  },
  {
    step: 4,
    title: "Logged to notes",
    description: "Response added to appointment notes in Cliniko",
    icon: "📝"
  },
  {
    step: 5,
    title: "You click the extension",
    description: "Click the Abby icon in your Chrome toolbar",
    icon: "🖱️"
  },
  {
    step: 6,
    title: "Calendar shows status",
    description: "Appointments light up with colour-coded status",
    icon: "🎨"
  }
];

// Chrome extension details
export const chromeExtension = {
  name: "Abby for Cliniko",
  storeId: "cppckmcdmapbonkfmlfgkhflfjfnhoio",
  version: "1.3",
  size: "180 KiB",
  permissions: ["tabs", "scripting", "storage"],
  features: [
    "Visual calendar overlay on Cliniko",
    "Colour-coded appointment status",
    "Manual confirmation option",
    "Add notes directly from extension"
  ]
};

// Comprehensive FAQ for dedicated page
export const comprehensiveFAQ = {
  setup: [
    {
      q: "What do I need to use Abby?",
      a: "Google Chrome browser (desktop only), an active Cliniko subscription with SMS reminders enabled, and admin access to Cliniko to generate an API key."
    },
    {
      q: "How long does setup take?",
      a: "About 5 minutes to connect your account. However, full functionality requires 1-2 working days as Abby only processes SMS sent after activation."
    },
    {
      q: "How do I generate the Cliniko API key?",
      a: "In Cliniko, click 'My Info' (bottom left) → 'Manage API Keys' → 'Add an API Key' → name it 'Abby' → click 'Create' → copy the key immediately (it's only shown once)."
    },
    {
      q: "Why isn't Abby working right after setup?",
      a: "Abby only interprets SMS replies sent after account creation. Depending on your reminder schedule (24-72 hours before appointments), allow 1-2 working days before expecting results."
    },
    {
      q: "What is the Clinic Pin?",
      a: "A single PIN set during onboarding that authenticates the Chrome extension. All staff in your clinic share this PIN—no individual logins needed."
    }
  ],
  extension: [
    {
      q: "Why do the colours disappear when I click an appointment?",
      a: "Abby overlays colours on Cliniko's calendar without modifying underlying data. Clicking an appointment refreshes Cliniko's display, clearing the overlay. Click the Abby extension icon to reapply colours."
    },
    {
      q: "Why is there a 15-minute delay before SMS responses appear?",
      a: "Abby polls Cliniko's API every 15 minutes (Cliniko doesn't support real-time webhooks). New SMS replies won't appear until the next polling cycle."
    },
    {
      q: "How do I manage multiple Cliniko accounts?",
      a: "Create separate Chrome browser profiles for each clinic. Install the Abby extension in each profile with the respective Clinic Pin. You cannot manage multiple clinics in a single Chrome instance."
    },
    {
      q: "Does Abby work on Safari, Firefox, or Edge?",
      a: "No—Chrome desktop browser only. The extension architecture requires Chrome's APIs."
    },
    {
      q: "Does Abby work on mobile devices or tablets?",
      a: "No—desktop Chrome only. There is no mobile app."
    }
  ],
  ai: [
    {
      q: "What AI does Abby use?",
      a: "A proprietary language model developed specifically for healthcare appointment confirmations—not OpenAI, ChatGPT, Google, or any third-party AI. Your SMS data never leaves Abby's systems."
    },
    {
      q: "What does 98% accuracy mean?",
      a: "Approximately 98 out of 100 SMS replies are correctly categorized as confirmed, cancelled, or reschedule. The remaining ~2% with unclear intent are flagged RED for manual review."
    },
    {
      q: "How does Abby handle confusing messages?",
      a: "Conflicting intents (like 'Yep sorry I can't come') trigger a RED flag with 'Call to discuss' note—Abby doesn't guess when intent is ambiguous."
    },
    {
      q: "Can Abby understand emojis?",
      a: "Yes, most common emojis work. Our AI is continuously trained on real-world responses including emoji-only replies like 👍."
    }
  ],
  limitations: [
    {
      q: "Does Abby send SMS to patients?",
      a: "No—Abby is read-only. It only interprets replies to SMS that Cliniko sends. You must have Cliniko SMS reminders configured."
    },
    {
      q: "Why didn't Abby capture my manual SMS conversation?",
      a: "Abby only captures replies to standard Cliniko appointment reminder SMS. Manual messages, one-off communications, and patient-initiated SMS are not captured."
    },
    {
      q: "Can I use Abby with practice management software other than Cliniko?",
      a: "No—Abby integrates exclusively with Cliniko. We may support other systems in the future."
    },
    {
      q: "What's the maximum number of practitioners?",
      a: "One Abby account supports up to 24 practitioners. Contact us if you need more."
    },
    {
      q: "Does Abby modify my Cliniko data?",
      a: "Only the appointment notes field. Abby cannot change appointment status, modify patient records, or alter any other data."
    }
  ],
  privacy: [
    {
      q: "What patient data does Abby store?",
      a: "Only Cliniko appointment IDs (deleted 48 hours after appointment) and SMS text (deleted immediately after posting to Cliniko notes). Abby does NOT store patient names, phone numbers, dates of birth, or personal information."
    },
    {
      q: "Where is my data stored?",
      a: "On Amazon Web Services (AWS) servers located in Australia."
    },
    {
      q: "Is my data shared with AI companies like OpenAI?",
      a: "No—Abby uses a proprietary AI model. No patient data is shared with third-party AI providers."
    },
    {
      q: "How is my Cliniko API key protected?",
      a: "API keys are stored with encryption at rest. We use HTTPS for all data transmission."
    }
  ],
  billing: [
    {
      q: "How does the free trial work?",
      a: "14 days, full access, no credit card required. Cancel anytime during the trial with no charge."
    },
    {
      q: "What payment methods do you accept?",
      a: "Credit and debit cards processed securely via Stripe."
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. Cancel whenever you like, effective immediately. No lock-in contracts."
    },
    {
      q: "Do you offer refunds?",
      a: "We don't pro-rate refunds after payment. That's why we offer the 14-day free trial—test thoroughly before committing."
    },
    {
      q: "What if I have multiple clinic locations?",
      a: "One Abby account covers all locations within your Cliniko account at no extra cost."
    }
  ]
};

// Colour coding explanation
export const colourCoding = [
  {
    colour: "White",
    status: "They're coming",
    meaning: "Abby has interpreted their reply as a confirmation",
    action: "No action needed",
    bgClass: "bg-white border-slate-300",
    textClass: "text-slate-800",
    hasRedUnderline: false
  },
  {
    colour: "Grey + red underline",
    status: "Needs attention",
    meaning: "Abby detected a cancellation, reschedule, or something unclear",
    action: "Give them a call",
    bgClass: "bg-gray-100 border-slate-300",
    textClass: "text-slate-800",
    hasRedUnderline: true
  },
  {
    colour: "Coloured",
    status: "No reply yet",
    meaning: "They haven't responded—the appointment stays its original colour",
    action: "Chase up if needed",
    bgClass: "bg-teal-100 border-teal-400",
    textClass: "text-slate-800",
    hasRedUnderline: false
  }
];

// What Abby is and isn't
export const whatAbbyIs = [
  "A Chrome browser extension providing visual calendar overlay",
  "An AI interpretation layer for patient SMS replies",
  "A read-only system that writes only to appointment notes",
  "Built on proprietary AI (not OpenAI/Google)",
  "Designed exclusively for Cliniko users"
];

export const whatAbbyIsNot = [
  "An SMS sending service",
  "A mobile application",
  "Compatible with browsers other than Chrome",
  "Compatible with practice management systems other than Cliniko",
  "A real-time system (15-minute polling cycle)"
];
