import { cn } from "@/lib/utils";

type Direction =
  | /** Top */ "t"
  | /** Right */ "r"
  | /** Bottom */ "b"
  | /** Left */ "l"
  | /** Bottom-left */ "bl"
  | /** Top-left */ "tl"
  | /** Top-right */ "tr"
  | /** Bottom-right */ "br";

type OverlayProps = {
  direction: Direction;
  weight?: "light" | "dark";
};

const directionClasses = {
  t: "bg-linear-to-t",
  r: "bg-linear-to-r",
  b: "bg-linear-to-b",
  l: "bg-linear-to-l",
  bl: "bg-linear-to-bl",
  tl: "bg-linear-to-tl",
  tr: "bg-linear-to-tr",
  br: "bg-linear-to-br",
} as const;

const weightClasses = {
  light: "from-black/5 via-black/25 to-black/45",
  dark: "from-black/10 via-black/40 to-black/60",
} as const;

export default function Overlay(props: OverlayProps) {
  return (
    <div
      className={cn("absolute top-0 left-0 w-full h-full z-5",
        directionClasses[props.direction],
        weightClasses[props.weight ?? "dark"]
      )}
    />
  );
}
