import { Avbrytare, BcTopNav, DlTopNav } from "@/components/icons";
import Link from "next/link";

interface TopNavProps {}

const TopNav = ({}: TopNavProps) => {
  return (
    <div className="bg-brand-primary flex justify-center gap-2 items-center p-4">
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
  );
};

export default TopNav;
