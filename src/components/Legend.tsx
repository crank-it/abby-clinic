export function Legend() {
  const items = [
    {
      color: 'bg-white border-slate-300',
      label: "They're coming",
      description: 'All appointments interpreted as confirmed will turn grey',
      time: '2:30 PM',
      customStyle: ''
    },
    {
      color: 'bg-gray-100 border-slate-300',
      label: 'Needs attention',
      description: 'Appointments that need your attention or have cancelled will turn grey with a red underline',
      time: '3:15 PM',
      customStyle: 'border-b-red-500 border-b-2'
    },
    {
      color: 'bg-teal-100 border-[#7b93db]',
      label: 'No reply yet',
      description: 'Appointments that have not received a reply will remain their original colour',
      time: '4:00 PM',
      customStyle: ''
    }
  ];

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
      <p className="text-slate-400 text-base font-medium mb-4 text-center">
        What do the colours mean?
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((item, i) => (
          <div 
            key={i} 
            className="relative"
          >
            <div className={`${item.color} border ${item.customStyle} rounded-lg p-3 shadow-sm transition-transform hover:scale-105 hover:shadow-md`}>
              <div className="flex items-start justify-between mb-1">
                <span className="text-xs font-semibold text-slate-700">
                  {item.time}
                </span>
                <div className="w-2 h-2 rounded-full bg-slate-400" />
              </div>
              <p className="text-sm font-semibold text-slate-800 mb-0.5">
                {item.label}
              </p>
              <p className="text-xs text-slate-600 leading-snug">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
