'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IntegrationCard } from '@/components/admin/IntegrationCard';
import { ChangeLog } from '@/components/admin/ChangeLog';

interface MarketingConfig {
  ga4: {
    enabled: boolean;
    measurementId: string;
    snippet: string;
    updatedAt: string | null;
  };
  googleSearchConsole: {
    enabled: boolean;
    verificationTag: string;
    updatedAt: string | null;
  };
  googleAds: {
    enabled: boolean;
    conversionId: string;
    conversionLabel: string;
    remarketingTag: string;
    updatedAt: string | null;
  };
  metaPixel: {
    enabled: boolean;
    pixelId: string;
    snippet: string;
    advancedMatching: boolean;
    updatedAt: string | null;
  };
  changelog: Array<{
    timestamp: string;
    userId: string;
    changes: string[];
  }>;
}

const defaultConfig: MarketingConfig = {
  ga4: { enabled: false, measurementId: '', snippet: '', updatedAt: null },
  googleSearchConsole: { enabled: false, verificationTag: '', updatedAt: null },
  googleAds: { enabled: false, conversionId: '', conversionLabel: '', remarketingTag: '', updatedAt: null },
  metaPixel: { enabled: false, pixelId: '', snippet: '', advancedMatching: false, updatedAt: null },
  changelog: [],
};

export default function AdminDashboard() {
  const [config, setConfig] = useState<MarketingConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'integrations' | 'changelog'>('integrations');
  const router = useRouter();

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/marketing-config');
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      } else if (res.status === 401) {
        router.push('/admin-mktg-8472/sign-in');
      }
    } catch (error) {
      console.error('Error fetching config:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveIntegration = async (integration: string, data: Record<string, unknown>) => {
    setSaving(integration);
    setMessage(null);

    try {
      const res = await fetch('/api/marketing-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ integration, data }),
      });

      if (res.ok) {
        const result = await res.json();
        setConfig(result.config);
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
      } else if (res.status === 401) {
        router.push('/admin-mktg-8472/sign-in');
      } else {
        const error = await res.json();
        setMessage({ type: 'error', text: error.error || 'Failed to save settings' });
      }
    } catch (error) {
      console.error('Error saving:', error);
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setSaving(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const exportConfig = () => {
    window.location.href = '/api/marketing-config/export';
  };

  const handleSignOut = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin-mktg-8472/sign-in');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Marketing Integrations</h1>
            <p className="text-sm text-gray-500">Manage tracking codes and analytics</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={exportConfig}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Export Config
            </button>
            <button
              onClick={handleSignOut}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Message Toast */}
      {message && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
          message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-4 mt-6">
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('integrations')}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'integrations'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Integrations
          </button>
          <button
            onClick={() => setActiveTab('changelog')}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'changelog'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Change Log
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {activeTab === 'integrations' ? (
          <div className="space-y-6">
            {/* Google Analytics 4 */}
            <IntegrationCard
              title="Google Analytics 4"
              description="Track website traffic and user behavior"
              icon={<GA4Icon />}
              enabled={config.ga4.enabled}
              updatedAt={config.ga4.updatedAt}
              onSave={() => saveIntegration('ga4', config.ga4)}
              saving={saving === 'ga4'}
              docsUrl="https://support.google.com/analytics/answer/9304153"
            >
              <div className="space-y-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.ga4.enabled}
                    onChange={(e) => setConfig({ ...config, ga4: { ...config.ga4, enabled: e.target.checked } })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Enable Google Analytics 4</span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Measurement ID
                  </label>
                  <input
                    type="text"
                    value={config.ga4.measurementId}
                    onChange={(e) => setConfig({ ...config, ga4: { ...config.ga4, measurementId: e.target.value } })}
                    placeholder="G-XXXXXXXXXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">Found in GA4 Admin &gt; Data Streams</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Snippet (optional)
                  </label>
                  <textarea
                    value={config.ga4.snippet}
                    onChange={(e) => setConfig({ ...config, ga4: { ...config.ga4, snippet: e.target.value } })}
                    placeholder="Paste custom gtag configuration here..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </IntegrationCard>

            {/* Google Search Console */}
            <IntegrationCard
              title="Google Search Console"
              description="Verify site ownership for search performance data"
              icon={<SearchConsoleIcon />}
              enabled={config.googleSearchConsole.enabled}
              updatedAt={config.googleSearchConsole.updatedAt}
              onSave={() => saveIntegration('googleSearchConsole', config.googleSearchConsole)}
              saving={saving === 'googleSearchConsole'}
              docsUrl="https://support.google.com/webmasters/answer/9008080"
            >
              <div className="space-y-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.googleSearchConsole.enabled}
                    onChange={(e) => setConfig({ ...config, googleSearchConsole: { ...config.googleSearchConsole, enabled: e.target.checked } })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Enable Search Console verification</span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    HTML Verification Tag
                  </label>
                  <textarea
                    value={config.googleSearchConsole.verificationTag}
                    onChange={(e) => setConfig({ ...config, googleSearchConsole: { ...config.googleSearchConsole, verificationTag: e.target.value } })}
                    placeholder='<meta name="google-site-verification" content="..." />'
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Copy the full meta tag from Search Console verification page
                  </p>
                </div>
              </div>
            </IntegrationCard>

            {/* Google Ads */}
            <IntegrationCard
              title="Google Ads"
              description="Track conversions and enable remarketing"
              icon={<GoogleAdsIcon />}
              enabled={config.googleAds.enabled}
              updatedAt={config.googleAds.updatedAt}
              onSave={() => saveIntegration('googleAds', config.googleAds)}
              saving={saving === 'googleAds'}
              docsUrl="https://support.google.com/google-ads/answer/6095821"
            >
              <div className="space-y-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.googleAds.enabled}
                    onChange={(e) => setConfig({ ...config, googleAds: { ...config.googleAds, enabled: e.target.checked } })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Enable Google Ads tracking</span>
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Conversion ID
                    </label>
                    <input
                      type="text"
                      value={config.googleAds.conversionId}
                      onChange={(e) => setConfig({ ...config, googleAds: { ...config.googleAds, conversionId: e.target.value } })}
                      placeholder="AW-XXXXXXXXX"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Conversion Label
                    </label>
                    <input
                      type="text"
                      value={config.googleAds.conversionLabel}
                      onChange={(e) => setConfig({ ...config, googleAds: { ...config.googleAds, conversionLabel: e.target.value } })}
                      placeholder="xxxxxxxx"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Remarketing Tag (optional)
                  </label>
                  <textarea
                    value={config.googleAds.remarketingTag}
                    onChange={(e) => setConfig({ ...config, googleAds: { ...config.googleAds, remarketingTag: e.target.value } })}
                    placeholder="Paste remarketing tag code here..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </IntegrationCard>

            {/* Meta Pixel */}
            <IntegrationCard
              title="Meta Pixel"
              description="Track conversions from Facebook and Instagram ads"
              icon={<MetaIcon />}
              enabled={config.metaPixel.enabled}
              updatedAt={config.metaPixel.updatedAt}
              onSave={() => saveIntegration('metaPixel', config.metaPixel)}
              saving={saving === 'metaPixel'}
              docsUrl="https://www.facebook.com/business/help/952192354843755"
            >
              <div className="space-y-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.metaPixel.enabled}
                    onChange={(e) => setConfig({ ...config, metaPixel: { ...config.metaPixel, enabled: e.target.checked } })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Enable Meta Pixel</span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pixel ID
                  </label>
                  <input
                    type="text"
                    value={config.metaPixel.pixelId}
                    onChange={(e) => setConfig({ ...config, metaPixel: { ...config.metaPixel, pixelId: e.target.value } })}
                    placeholder="123456789012345"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Found in Meta Events Manager &gt; Data Sources
                  </p>
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.metaPixel.advancedMatching}
                    onChange={(e) => setConfig({ ...config, metaPixel: { ...config.metaPixel, advancedMatching: e.target.checked } })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Enable Advanced Matching</span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Snippet (optional)
                  </label>
                  <textarea
                    value={config.metaPixel.snippet}
                    onChange={(e) => setConfig({ ...config, metaPixel: { ...config.metaPixel, snippet: e.target.value } })}
                    placeholder="Paste custom pixel configuration here..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </IntegrationCard>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Changes</h2>
            <ChangeLog entries={config.changelog} />
          </div>
        )}
      </main>
    </div>
  );
}

// Icon Components
function GA4Icon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#F9AB00"/>
    </svg>
  );
}

function SearchConsoleIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#4285F4"/>
    </svg>
  );
}

function GoogleAdsIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#FBBC04"/>
      <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MetaIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" fill="#1877F2"/>
    </svg>
  );
}
