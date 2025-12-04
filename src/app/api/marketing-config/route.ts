import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { isAuthenticated } from '@/lib/auth';

const CONFIG_PATH = path.join(process.cwd(), 'data', 'marketing-config.json');

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');
}

// Validate GA4 Measurement ID format
function isValidGA4Id(id: string): boolean {
  return /^G-[A-Z0-9]+$/.test(id) || id === '';
}

// Validate Meta Pixel ID format
function isValidPixelId(id: string): boolean {
  return /^\d+$/.test(id) || id === '';
}

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const configData = await readFile(CONFIG_PATH, 'utf-8');
    const config = JSON.parse(configData);

    return NextResponse.json(config);
  } catch (error) {
    console.error('Error reading config:', error);
    return NextResponse.json({ error: 'Failed to read config' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { integration, data } = body;

    // Read current config
    const configData = await readFile(CONFIG_PATH, 'utf-8');
    const config = JSON.parse(configData);

    // Validate and update based on integration type
    const timestamp = new Date().toISOString();
    const changes: string[] = [];

    switch (integration) {
      case 'ga4':
        if (data.measurementId && !isValidGA4Id(data.measurementId)) {
          return NextResponse.json({ error: 'Invalid GA4 Measurement ID format' }, { status: 400 });
        }
        const oldGa4 = { ...config.ga4 };
        config.ga4 = {
          enabled: Boolean(data.enabled),
          measurementId: sanitizeInput(data.measurementId || ''),
          snippet: sanitizeInput(data.snippet || ''),
          updatedAt: timestamp,
        };
        if (oldGa4.enabled !== config.ga4.enabled) changes.push(`GA4 ${config.ga4.enabled ? 'enabled' : 'disabled'}`);
        if (oldGa4.measurementId !== config.ga4.measurementId) changes.push('GA4 Measurement ID updated');
        break;

      case 'googleSearchConsole':
        const oldGsc = { ...config.googleSearchConsole };
        config.googleSearchConsole = {
          enabled: Boolean(data.enabled),
          verificationTag: sanitizeInput(data.verificationTag || ''),
          updatedAt: timestamp,
        };
        if (oldGsc.enabled !== config.googleSearchConsole.enabled) changes.push(`Google Search Console ${config.googleSearchConsole.enabled ? 'enabled' : 'disabled'}`);
        if (oldGsc.verificationTag !== config.googleSearchConsole.verificationTag) changes.push('Search Console verification tag updated');
        break;

      case 'googleAds':
        const oldGads = { ...config.googleAds };
        config.googleAds = {
          enabled: Boolean(data.enabled),
          conversionId: sanitizeInput(data.conversionId || ''),
          conversionLabel: sanitizeInput(data.conversionLabel || ''),
          remarketingTag: sanitizeInput(data.remarketingTag || ''),
          updatedAt: timestamp,
        };
        if (oldGads.enabled !== config.googleAds.enabled) changes.push(`Google Ads ${config.googleAds.enabled ? 'enabled' : 'disabled'}`);
        if (oldGads.conversionId !== config.googleAds.conversionId) changes.push('Google Ads Conversion ID updated');
        break;

      case 'metaPixel':
        if (data.pixelId && !isValidPixelId(data.pixelId)) {
          return NextResponse.json({ error: 'Invalid Meta Pixel ID format' }, { status: 400 });
        }
        const oldMeta = { ...config.metaPixel };
        config.metaPixel = {
          enabled: Boolean(data.enabled),
          pixelId: sanitizeInput(data.pixelId || ''),
          snippet: sanitizeInput(data.snippet || ''),
          advancedMatching: Boolean(data.advancedMatching),
          updatedAt: timestamp,
        };
        if (oldMeta.enabled !== config.metaPixel.enabled) changes.push(`Meta Pixel ${config.metaPixel.enabled ? 'enabled' : 'disabled'}`);
        if (oldMeta.pixelId !== config.metaPixel.pixelId) changes.push('Meta Pixel ID updated');
        break;

      default:
        return NextResponse.json({ error: 'Invalid integration type' }, { status: 400 });
    }

    // Add to changelog if there were changes
    if (changes.length > 0) {
      config.changelog = config.changelog || [];
      config.changelog.unshift({
        timestamp,
        userId: 'admin',
        changes,
      });
      // Keep only last 50 changelog entries
      config.changelog = config.changelog.slice(0, 50);
    }

    // Write updated config
    await writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));

    return NextResponse.json({ success: true, config });
  } catch (error) {
    console.error('Error updating config:', error);
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }
}
