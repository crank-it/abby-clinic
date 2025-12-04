export interface ChatOption {
  label: string;
  value: string;
  nextNode: string;
  isPrimary?: boolean;
}

export interface ChatNode {
  id: string;
  messages: string[];
  options?: ChatOption[];
  isQualified?: boolean;
  isDisqualified?: boolean;
  disqualifyReason?: 'cliniko' | 'sms' | 'browser';
  action?: {
    type: 'link' | 'close' | 'calendly';
    url?: string;
  };
}

export const chatbotFlow: Record<string, ChatNode> = {
  // Start
  start: {
    id: 'start',
    messages: [
      "Hey there! 👋",
      "I'm here to help you figure out if Abby's the right fit for your clinic."
    ],
    options: [
      { label: "Let's find out", value: 'qualify', nextNode: 'cliniko_check', isPrimary: true },
      { label: "I have a question", value: 'questions', nextNode: 'questions_menu' },
      { label: "Just browsing", value: 'browse', nextNode: 'soft_close' }
    ]
  },

  // Questions menu
  questions_menu: {
    id: 'questions_menu',
    messages: ["No problem! What would you like to know?"],
    options: [
      { label: "Is it worth the cost?", value: 'roi', nextNode: 'roi_answer' },
      { label: "Is my data secure?", value: 'security', nextNode: 'security_answer' },
      { label: "How does it actually work?", value: 'how', nextNode: 'how_answer' },
      { label: "I'd like to talk to someone", value: 'contact', nextNode: 'contact_answer' }
    ]
  },

  roi_answer: {
    id: 'roi_answer',
    messages: [
      "Great question! Most clinics save 5-10 hours per week on SMS admin.",
      "We've got a calculator that shows your potential savings based on your clinic size."
    ],
    options: [
      { label: "Open the calculator", value: 'calc', nextNode: 'link_calculator', isPrimary: true },
      { label: "Check if I'm eligible first", value: 'qualify', nextNode: 'cliniko_check' },
      { label: "Back to questions", value: 'back', nextNode: 'questions_menu' }
    ]
  },

  security_answer: {
    id: 'security_answer',
    messages: [
      "Your data security is our top priority. Here's the short version:",
      "• Australian AWS servers (Sydney)\n• SMS content deleted immediately after interpretation\n• We don't store patient names or health info\n• Our AI is built in-house — your data never trains external models"
    ],
    options: [
      { label: "That's reassuring, let's continue", value: 'qualify', nextNode: 'cliniko_check', isPrimary: true },
      { label: "I have more questions", value: 'back', nextNode: 'questions_menu' }
    ]
  },

  how_answer: {
    id: 'how_answer',
    messages: [
      "Abby watches for patient replies to your Cliniko SMS reminders.",
      "When someone texts back, our AI figures out if they're confirming, cancelling, or need a callback — then colour-codes your calendar automatically."
    ],
    options: [
      { label: "Try the interactive demo", value: 'demo', nextNode: 'link_demo', isPrimary: true },
      { label: "Check if I'm eligible", value: 'qualify', nextNode: 'cliniko_check' },
      { label: "Back to questions", value: 'back', nextNode: 'questions_menu' }
    ]
  },

  contact_answer: {
    id: 'contact_answer',
    messages: [
      "Of course! Ben or Gav would be happy to chat.",
      "You can book a quick 15-minute call, or email us at support@abby.clinic"
    ],
    options: [
      { label: "Book a call", value: 'calendly', nextNode: 'link_calendly', isPrimary: true },
      { label: "I'll email instead", value: 'email', nextNode: 'email_close' },
      { label: "Back to questions", value: 'back', nextNode: 'questions_menu' }
    ]
  },

  // Qualification flow
  cliniko_check: {
    id: 'cliniko_check',
    messages: ["First up — do you use Cliniko for your practice management?"],
    options: [
      { label: "Yes, we use Cliniko", value: 'yes', nextNode: 'sms_check', isPrimary: true },
      { label: "No, we use something else", value: 'no', nextNode: 'disqualify_cliniko' },
      { label: "We're considering Cliniko", value: 'considering', nextNode: 'considering_cliniko' }
    ]
  },

  disqualify_cliniko: {
    id: 'disqualify_cliniko',
    messages: [
      "Ah, that's a shame — Abby only works with Cliniko at the moment.",
      "We'd love to support other systems in the future though! Want us to let you know if that changes?"
    ],
    options: [
      { label: "Yes, keep me posted", value: 'notify', nextNode: 'notify_signup' },
      { label: "No thanks", value: 'close', nextNode: 'graceful_close' }
    ],
    isDisqualified: true,
    disqualifyReason: 'cliniko'
  },

  considering_cliniko: {
    id: 'considering_cliniko',
    messages: [
      "Nice! Cliniko's a great choice for allied health clinics.",
      "Once you're set up with them, come back and we'll get you sorted with Abby. No rush!"
    ],
    options: [
      { label: "Thanks, I'll be back", value: 'close', nextNode: 'graceful_close' },
      { label: "Tell me more about Abby anyway", value: 'demo', nextNode: 'link_demo' }
    ]
  },

  sms_check: {
    id: 'sms_check',
    messages: [
      "Perfect! Next question —",
      "How do you send appointment reminders to patients?"
    ],
    options: [
      { label: "Cliniko's built-in SMS", value: 'cliniko_sms', nextNode: 'browser_check', isPrimary: true },
      { label: "A third-party SMS service", value: 'third_party', nextNode: 'disqualify_sms' },
      { label: "We only use email", value: 'email_only', nextNode: 'disqualify_email' }
    ]
  },

  disqualify_sms: {
    id: 'disqualify_sms',
    messages: [
      "Ah, Abby currently only works with Cliniko's native SMS system.",
      "If you ever switch to Cliniko SMS, we'll be here! It's actually quite good and integrates seamlessly."
    ],
    options: [
      { label: "Good to know, thanks", value: 'close', nextNode: 'graceful_close' },
      { label: "I might switch — tell me more", value: 'more', nextNode: 'sms_switch_info' }
    ],
    isDisqualified: true,
    disqualifyReason: 'sms'
  },

  disqualify_email: {
    id: 'disqualify_email',
    messages: [
      "Got it! Abby's specifically built for SMS responses.",
      "If you add SMS reminders to your workflow in the future, Abby can help automate the response handling."
    ],
    options: [
      { label: "Thanks for letting me know", value: 'close', nextNode: 'graceful_close' },
      { label: "How do I add SMS?", value: 'more', nextNode: 'sms_switch_info' }
    ],
    isDisqualified: true,
    disqualifyReason: 'sms'
  },

  sms_switch_info: {
    id: 'sms_switch_info',
    messages: [
      "Cliniko has built-in SMS you can enable in your settings.",
      "Once it's set up, patient replies come straight into Cliniko — and that's where Abby picks them up!"
    ],
    options: [
      { label: "Sounds good, I'll look into it", value: 'close', nextNode: 'graceful_close' },
      { label: "Book a call to discuss", value: 'calendly', nextNode: 'link_calendly' }
    ]
  },

  browser_check: {
    id: 'browser_check',
    messages: [
      "Excellent! Last one —",
      "Abby uses a Chrome extension to colour-code your calendar. Do you use Chrome on desktop?"
    ],
    options: [
      { label: "Yes, Chrome on desktop", value: 'chrome', nextNode: 'qualified', isPrimary: true },
      { label: "Safari or Firefox", value: 'other_browser', nextNode: 'soft_disqualify_browser' },
      { label: "Mostly mobile/tablet", value: 'mobile', nextNode: 'disqualify_mobile' }
    ]
  },

  soft_disqualify_browser: {
    id: 'soft_disqualify_browser',
    messages: [
      "The Chrome extension is how Abby displays the colour-coded statuses on your calendar.",
      "If you can use Chrome for your Cliniko work, Abby will work great! Many of our users switched just for this."
    ],
    options: [
      { label: "I can use Chrome", value: 'chrome', nextNode: 'qualified', isPrimary: true },
      { label: "That's a dealbreaker for me", value: 'close', nextNode: 'graceful_close' }
    ]
  },

  disqualify_mobile: {
    id: 'disqualify_mobile',
    messages: [
      "Ah, the Chrome extension needs a desktop browser to work.",
      "If you ever use Cliniko on a desktop computer, Abby can help there. The colour-coding is pretty satisfying to see!"
    ],
    options: [
      { label: "I sometimes use desktop too", value: 'chrome', nextNode: 'qualified' },
      { label: "Mobile only for me", value: 'close', nextNode: 'graceful_close' }
    ],
    isDisqualified: true,
    disqualifyReason: 'browser'
  },

  // Qualified!
  qualified: {
    id: 'qualified',
    messages: [
      "✓ Looks like Abby's a great fit for your clinic!",
      "You can try it free for 14 days — no credit card needed."
    ],
    options: [
      { label: "Start my free trial", value: 'trial', nextNode: 'link_trial', isPrimary: true },
      { label: "Show me the pricing first", value: 'pricing', nextNode: 'pricing_info' },
      { label: "I'd like to see the ROI calculator", value: 'roi', nextNode: 'link_calculator' },
      { label: "I need to discuss with my team", value: 'later', nextNode: 'team_discuss' }
    ],
    isQualified: true
  },

  pricing_info: {
    id: 'pricing_info',
    messages: [
      "Simple pricing — $14.95/month or $160/year (save ~12%).",
      "That covers all your locations, unlimited admin users, and up to 24 practitioners."
    ],
    options: [
      { label: "Start my free trial", value: 'trial', nextNode: 'link_trial', isPrimary: true },
      { label: "Calculate my ROI", value: 'roi', nextNode: 'link_calculator' },
      { label: "I need to think about it", value: 'later', nextNode: 'team_discuss' }
    ]
  },

  team_discuss: {
    id: 'team_discuss',
    messages: [
      "No rush at all! Chat with your team.",
      "The trial's always here when you're ready. Or book a quick call if you'd like to discuss anything."
    ],
    options: [
      { label: "Book a call with the team", value: 'calendly', nextNode: 'link_calendly' },
      { label: "I'll come back later", value: 'close', nextNode: 'graceful_close' }
    ]
  },

  // Links and actions
  link_trial: {
    id: 'link_trial',
    messages: ["Taking you to sign up now..."],
    action: { type: 'link', url: '/pricing' }
  },

  link_calculator: {
    id: 'link_calculator',
    messages: ["Opening the ROI calculator..."],
    action: { type: 'link', url: '/pricing' }
  },

  link_demo: {
    id: 'link_demo',
    messages: ["Let me show you the interactive demo..."],
    action: { type: 'link', url: '/#demo' }
  },

  link_calendly: {
    id: 'link_calendly',
    messages: ["Opening the booking page..."],
    action: { type: 'calendly', url: 'https://calendly.com' }
  },

  notify_signup: {
    id: 'notify_signup',
    messages: [
      "Brilliant! Drop your email and we'll let you know when we expand.",
      "(You can do this on our pricing page — there's a form for non-Cliniko users)"
    ],
    options: [
      { label: "Go to pricing page", value: 'pricing', nextNode: 'link_calculator' },
      { label: "Maybe later", value: 'close', nextNode: 'graceful_close' }
    ]
  },

  email_close: {
    id: 'email_close',
    messages: [
      "Perfect! Reach out anytime at support@abby.clinic",
      "We usually respond within a business day. Chat soon!"
    ],
    options: [
      { label: "Thanks!", value: 'close', nextNode: 'final_close' }
    ]
  },

  soft_close: {
    id: 'soft_close',
    messages: [
      "No worries! Have a look around.",
      "I'll be here if you have any questions. 👋"
    ],
    options: [
      { label: "Actually, I do have a question", value: 'questions', nextNode: 'questions_menu' },
      { label: "Thanks!", value: 'close', nextNode: 'final_close' }
    ]
  },

  graceful_close: {
    id: 'graceful_close',
    messages: [
      "Thanks for chatting! Feel free to explore the site.",
      "If anything changes or you have questions, I'm just a click away. 👋"
    ],
    options: [
      { label: "Close chat", value: 'close', nextNode: 'final_close' }
    ]
  },

  final_close: {
    id: 'final_close',
    messages: [],
    action: { type: 'close' }
  }
};
