import type { SearchResults } from "@/lib/search/search-index";
import { SEARCH_TYPES, type SearchType } from "@/lib/search/search-types";
import { cn } from "@/lib/utils";
import { SEARCH_TYPE_LABELS } from "./search-query";

interface SearchTypeFilterProps {
  readonly counts: SearchResults["countsByType"];
  readonly total: number;
  readonly value: SearchType | undefined;
  readonly onChange: (type: SearchType | undefined) => void;
}

interface FilterChipProps {
  readonly label: string;
  readonly count: number;
  readonly isActive: boolean;
  readonly onClick: () => void;
}

function FilterChip({ label, count, isActive, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        isActive
          ? "border-brand-primary bg-brand-primary text-white"
          : "border-brand-light bg-white text-brand-dark hover:border-brand-primary"
      )}
    >
      {label}
      <span className={isActive ? "text-white/90" : "text-brand-gray"}>{count}</span>
    </button>
  );
}

// Types without hits are hidden rather than disabled, so the row stays short.
export function SearchTypeFilter({ counts, total, value, onChange }: SearchTypeFilterProps) {
  const visibleTypes = SEARCH_TYPES.filter((type) => counts[type] > 0 || type === value);

  return (
    <div
      role="group"
      aria-label="Filtrera på innehållstyp"
      className="flex flex-wrap gap-2"
    >
      <FilterChip
        label="Alla"
        count={total}
        isActive={!value}
        onClick={() => onChange(undefined)}
      />
      {visibleTypes.map((type) => (
        <FilterChip
          key={type}
          label={SEARCH_TYPE_LABELS[type]}
          count={counts[type]}
          isActive={type === value}
          onClick={() => onChange(type)}
        />
      ))}
    </div>
  );
}
