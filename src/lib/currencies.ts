export type CurrencyCode = 'AUD' | 'NZD' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  flag: string;
  locale: string;
  monthly: number;
  annual: number;
  hourlyWage: number;
}

export const currencies: Record<CurrencyCode, CurrencyConfig> = {
  AUD: {
    code: 'AUD',
    symbol: '$',
    flag: '🇦🇺',
    locale: 'en-AU',
    monthly: 14.95,
    annual: 160,
    hourlyWage: 35
  },
  NZD: {
    code: 'NZD',
    symbol: '$',
    flag: '🇳🇿',
    locale: 'en-NZ',
    monthly: 16.20,
    annual: 172,
    hourlyWage: 32
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    flag: '🇬🇧',
    locale: 'en-GB',
    monthly: 8.00,
    annual: 83,
    hourlyWage: 14
  }
};

export function detectCurrency(): CurrencyCode {
  if (typeof window === 'undefined') return 'AUD';

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const locale = navigator.language;

  if (timezone.includes('London') || locale.startsWith('en-GB')) return 'GBP';
  if (timezone.includes('Auckland') || locale.startsWith('en-NZ')) return 'NZD';
  return 'AUD';
}

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  const config = currencies[currency];
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
