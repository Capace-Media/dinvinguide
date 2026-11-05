"use client";
import { type FC, Suspense, memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { componentsMap, extractComponentKey } from "./component-config";

interface Section {
  fieldGroupName: string;
}

interface BlocksProps {
  blocks: Section[];
}

const Blocks: FC<BlocksProps> = ({ blocks }) => (
  <>
    {blocks?.map((section, index) => (
      <Block
        section={section}
        // biome-ignore lint/suspicious/noArrayIndexKey: CMS blocks have no id and the same block type can repeat
        key={section.fieldGroupName + index}
      />
    ))}
  </>
);

interface ComponentProps {
  content: Section;
}

interface BlockProps {
  section: Section;
}

const Block: FC<BlockProps> = memo(({ section }) => {
  const componentKey: any = extractComponentKey(section.fieldGroupName);
  const Component: any = componentsMap[componentKey] as
    | FC<ComponentProps>
    | undefined;

  return Component ? (
    <Suspense fallback={<Skeleton className="h-40 w-full" />}>
      <Component content={section} />
    </Suspense>
  ) : (
    <p>{section.fieldGroupName}</p>
  );
});
Block.displayName = "Block"; // Add display name

export default Blocks;
