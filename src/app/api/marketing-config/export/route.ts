import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { isAuthenticated } from '@/lib/auth';

const CONFIG_PATH = path.join(process.cwd(), 'data', 'marketing-config.json');

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const configData = await readFile(CONFIG_PATH, 'utf-8');
    const config = JSON.parse(configData);

    // Add export metadata
    const exportData = {
      exportedAt: new Date().toISOString(),
      exportedBy: 'admin',
      config,
    };

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="marketing-config-${new Date().toISOString().split('T')[0]}.json"`,
      },
    });
  } catch (error) {
    console.error('Error exporting config:', error);
    return NextResponse.json({ error: 'Failed to export config' }, { status: 500 });
  }
}
