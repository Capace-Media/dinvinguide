"use client"

import { Search } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

interface SearchInputProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  total?: number
  className?: string
  hitLabel?: { singular: string; plural: string }
}

export function SearchInput({
  placeholder = "Sök...",
  value,
  onChange,
  total,
  className,
  hitLabel = { singular: "träff", plural: "träffar" },
}: SearchInputProps) {
  return (
    <InputGroup className={cn("w-full sm:max-w-xs", className)}>
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {total !== undefined && (
        <InputGroupAddon align="inline-end">
          {total} {total === 1 ? hitLabel.singular : hitLabel.plural}
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}
