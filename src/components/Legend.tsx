export function Legend() {
  const items = [
    {
      color: 'bg-white border-slate-300',
      label: "They're coming",
      customStyle: ''
    },
    {
      color: 'bg-gray-100 border-slate-300',
      label: 'Needs attention',
      customStyle: 'border-b-red-500 border-b-2'
    },
    {
      color: 'bg-teal-100 border-[#7b93db]',
      label: 'No reply yet',
      customStyle: ''
    }
  ];

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
      <p className="text-slate-400 text-sm font-medium mb-3">
        What the colours mean:
      </p>
      <div className="flex flex-wrap gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-4 h-4 ${item.color} border rounded ${item.customStyle}`} />
            <span className="text-slate-300 text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
