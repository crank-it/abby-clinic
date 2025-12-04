'use client';

interface ChangeLogEntry {
  timestamp: string;
  userId: string;
  changes: string[];
}

interface ChangeLogProps {
  entries: ChangeLogEntry[];
}

export function ChangeLog({ entries }: ChangeLogProps) {
  if (!entries || entries.length === 0) {
    return (
      <div className="text-gray-500 text-sm text-center py-4">
        No changes recorded yet
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-64 overflow-y-auto">
      {entries.slice(0, 10).map((entry, index) => (
        <div
          key={index}
          className="border-l-2 border-gray-200 pl-3 py-1"
        >
          <div className="text-xs text-gray-500">
            {new Date(entry.timestamp).toLocaleString()}
          </div>
          <ul className="text-sm text-gray-700 mt-1">
            {entry.changes.map((change, i) => (
              <li key={i}>{change}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
