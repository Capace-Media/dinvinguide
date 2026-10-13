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
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition-colors",
        isActive
          ? "border-brand-primary bg-brand-primary text-white"
          : "border-brand-light bg-white text-brand-dark hover:border-brand-primary"
      )}
    >
      {label}
      <span className={isActive ? "text-white/70" : "text-brand-gray"}>{count}</span>
    </button>
  );
}

// Types without hits are hidden rather than disabled, so the row stays short.
export function SearchTypeFilter({ counts, total, value, onChange }: SearchTypeFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filtrera på innehållstyp"
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
    >
      <FilterChip
        label="Alla"
        count={total}
        isActive={!value}
        onClick={() => onChange(undefined)}
      />
      {SEARCH_TYPES.filter((type) => counts[type] > 0 || type === value).map((type) => (
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
