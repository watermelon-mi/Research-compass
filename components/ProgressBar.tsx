interface ProgressBarProps {
  label: string;
  description?: string;
  value: number;
  max?: number;
}

export function ProgressBar({
  label,
  description,
  value,
  max = 100,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <span className="text-sm font-medium text-stone-800">{label}</span>
          {description && (
            <p className="mt-0.5 text-xs text-stone-500">{description}</p>
          )}
        </div>
        <span className="text-sm tabular-nums text-stone-400">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-stone-100">
        <div
          className="h-full rounded-full bg-stone-700 transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
        />
      </div>
    </div>
  );
}
