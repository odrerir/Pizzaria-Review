function RatingBar({ label, value }) {
  const percentage = (value / 5) * 100;

  return (
    <div className="flex items-center gap-4">
      <span className="w-20 font-medium">{label}</span>
      <div className="flex-1 bg-gray-200 h-4 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-12 text-right font-bold">{value.toFixed(1)}</span>
    </div>
  );
}

export default RatingBar;