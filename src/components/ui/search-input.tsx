"use client"

import { Search } from "lucide-react"
import { useRef } from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

interface SearchInputProps {
  id?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  type?: "text" | "search"
  clearable?: boolean
  total?: number
  className?: string
  hitLabel?: { singular: string; plural: string }
}

export function SearchInput({
  id,
  placeholder = "Sök...",
  value,
  onChange,
  type = "text",
  clearable = false,
  total,
  className,
  hitLabel = { singular: "träff", plural: "träffar" },
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <InputGroup className={cn("w-full sm:max-w-xs", className)}>
      <InputGroupAddon aria-hidden="true">
        <Search />
      </InputGroupAddon>
      <InputGroupInput
        ref={inputRef}
        id={id}
        type={type}
        enterKeyHint={type === "search" ? "search" : undefined}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clearable ? "[&::-webkit-search-cancel-button]:hidden" : undefined}
      />
      {clearable && value && (
        <InputGroupAddon align="inline-end" className="py-0">
          <InputGroupButton
            aria-label="Rensa sökning"
            className="min-h-11 min-w-11"
            onClick={() => {
              onChange("")
              inputRef.current?.focus()
            }}
          >
            Rensa
          </InputGroupButton>
        </InputGroupAddon>
      )}
      {total !== undefined && (
        <InputGroupAddon align="inline-end">
          {total} {total === 1 ? hitLabel.singular : hitLabel.plural}
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}
