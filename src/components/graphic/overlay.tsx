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

export default function Overlay(props: OverlayProps) {
  return (
    <div
      className={`absolute top-0 bg-linear-to left-0 w-full h-full from-black/10 via-black/40 to-black/60 z-5 ${
        directionClasses[props.direction]
      }`}
    />
  );
}
