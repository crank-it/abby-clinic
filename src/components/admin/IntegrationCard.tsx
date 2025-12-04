'use client';

import { ReactNode } from 'react';
import { StatusBadge } from './StatusBadge';

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  enabled: boolean;
  updatedAt: string | null;
  children: ReactNode;
  onSave: () => void;
  saving: boolean;
  docsUrl?: string;
}

export function IntegrationCard({
  title,
  description,
  icon,
  enabled,
  updatedAt,
  children,
  onSave,
  saving,
  docsUrl,
}: IntegrationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
          <StatusBadge enabled={enabled} />
        </div>
      </div>

      <div className="p-6 space-y-4">
        {children}
      </div>

      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
        <div className="text-xs text-gray-500">
          {updatedAt ? (
            <>Last updated: {new Date(updatedAt).toLocaleString()}</>
          ) : (
            <>Never configured</>
          )}
        </div>
        <div className="flex items-center gap-3">
          {docsUrl && (
            <a
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Documentation
            </a>
          )}
          <button
            onClick={onSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
