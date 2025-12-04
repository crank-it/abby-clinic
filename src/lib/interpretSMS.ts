export interface InterpretationResult {
  status: 'waiting' | 'confirmed' | 'cancelled' | 'reschedule' | 'review' | 'unclear';
  label: string;
  icon: string;
  colorClass: string;
  badgeClass: string;
  hasRedUnderline: boolean;
}

export function interpretSMS(message: string): InterpretationResult {
  const lower = message.toLowerCase().trim();

  if (!lower) {
    return {
      status: 'waiting',
      label: 'Awaiting response...',
      icon: '',
      colorClass: 'bg-teal-100 border-teal-400',
      badgeClass: 'bg-teal-100 text-teal-700',
      hasRedUnderline: false
    };
  }

  const confirmTriggers = [
    'yes', 'yep', 'yeah', 'yea', 'yup', 'confirm', 'confirmed',
    'ok', 'okay', 'sure', 'will be there', 'see you', 'sounds good',
    'perfect', 'great', 'thanks', 'thank you', 'thankyou', 'ta',
    'absolutely', 'definitely', 'coming', "i'll be there", "ill be there",
    'on my way', 'no worries', 'no problem', 'all good', 'sorted',
    '👍', '✓', '✔', '👌', '🙂', '😊', '👋', '✅'
  ];

  const cancelTriggers = [
    'cancel', "can't make it", 'cannot make it', "won't be able",
    'need to cancel', 'have to cancel', 'not coming', "can't come",
    'cannot come', 'no longer', 'unable to', 'unfortunately no',
    "won't make it", 'wont make it', 'not going to make'
  ];

  const rescheduleTriggers = [
    'reschedule', 'rebook', 'change', 'different time', 'different day',
    'move', 'postpone', 'another time', 'another day', 'can we change',
    'is it possible to', 'switch', 'later', 'earlier', 'next week'
  ];

  const negativeTriggers = ['no', 'nope', 'nah', "can't", 'cannot', "won't", 'unable'];

  const hasConfirm = confirmTriggers.some(t => lower.includes(t));
  const hasCancel = cancelTriggers.some(t => lower.includes(t));
  const hasReschedule = rescheduleTriggers.some(t => lower.includes(t));
  const hasNegative = negativeTriggers.some(t => lower.split(/\s+/).includes(t));
  const hasBut = lower.includes(' but ') || lower.includes(' however ');

  // Mixed intent detection
  const hasConflict =
    (hasConfirm && hasCancel) ||
    (hasConfirm && hasReschedule) ||
    (hasConfirm && hasBut) ||
    (hasConfirm && hasNegative && !lower.startsWith('no worries') && !lower.startsWith('no problem'));

  if (hasConflict) {
    return {
      status: 'review',
      label: 'Call to discuss',
      icon: '⚠️',
      colorClass: 'bg-gray-100 border-slate-300',
      badgeClass: 'bg-red-100 text-red-700',
      hasRedUnderline: true
    };
  }

  if (hasCancel || (hasNegative && !hasConfirm)) {
    return {
      status: 'cancelled',
      label: 'Cancellation request',
      icon: '✗',
      colorClass: 'bg-gray-100 border-slate-300',
      badgeClass: 'bg-red-100 text-red-700',
      hasRedUnderline: true
    };
  }

  if (hasReschedule) {
    return {
      status: 'reschedule',
      label: 'Reschedule request',
      icon: '↻',
      colorClass: 'bg-gray-100 border-slate-300',
      badgeClass: 'bg-red-100 text-red-700',
      hasRedUnderline: true
    };
  }

  if (hasConfirm) {
    return {
      status: 'confirmed',
      label: 'Confirmed',
      icon: '✓',
      colorClass: 'bg-white border-slate-300',
      badgeClass: 'bg-slate-100 text-slate-700',
      hasRedUnderline: false
    };
  }

  // Unclear but not empty
  if (lower.length >= 1) {
    return {
      status: 'unclear',
      label: 'Needs review',
      icon: '?',
      colorClass: 'bg-gray-100 border-slate-300',
      badgeClass: 'bg-red-100 text-red-700',
      hasRedUnderline: true
    };
  }

  return {
    status: 'waiting',
    label: 'Awaiting response...',
    icon: '',
    colorClass: 'bg-teal-100 border-teal-400',
    badgeClass: 'bg-teal-100 text-teal-700',
    hasRedUnderline: false
  };
}
