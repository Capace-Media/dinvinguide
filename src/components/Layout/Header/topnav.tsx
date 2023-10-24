import { Avbrytare, BcTopNav, DlTopNav } from "@/components/icons";
import Link from "next/link";

interface TopNavProps {}

const TopNav = ({}: TopNavProps) => {
  return (
    <div className="relative h-[60px] layout">
      <div className="bg-brand-primary absolute center-x flex justify-center gap-2 items-center py-4 w-full">
        <figure>
          <a href="https://bestchampagne.se/" target="_blank">
            <BcTopNav />
          </a>
        </figure>
        <figure>
          <Avbrytare />
        </figure>
        <figure>
          <Link href="/dryckeslistan">
            <DlTopNav />
          </Link>
        </figure>
      </div>
    </div>
  );
};

export default TopNav;
