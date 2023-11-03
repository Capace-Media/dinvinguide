import {
  FbPrimary,
  FbWhite,
  IgPrimary,
  IgWhite,
  MailPrimary,
  MailWhite,
} from "@/components/icons";

interface SocialMediaProps {
  index: number;
  social: any;
}

const SocialMedia = ({ index, social }: SocialMediaProps) => {
  const isEven = index % 2 === 0;

  const FacebookIcon = isEven ? FbPrimary : FbWhite;
  const InstagramIcon = isEven ? IgPrimary : IgWhite;
  const MailIcon = isEven ? MailPrimary : MailWhite;

  return (
    <div className="flex items-center gap-3">
      {social?.facebook && (
        <a
          target="_blank"
          rel="noreferrer"
          aria-label="gå till facebook"
          className="h-10 w-6 flex justify-center items-center"
          href={social.facebook}
        >
          <FacebookIcon />
        </a>
      )}
      {social?.instagram && (
        <a
          target="_blank"
          rel="noreferrer"
          aria-label="gå till instagram"
          className="h-10 w-6 flex justify-center items-center"
          href={social.instagram}
        >
          <InstagramIcon />
        </a>
      )}
      {social?.email && (
        <a
          target="_blank"
          rel="noreferrer"
          aria-label="skicka mail"
          className="h-10 w-6 flex justify-center items-center"
          href={`mailto:${social.email}`}
        >
          <MailIcon />
        </a>
      )}
    </div>
  );
};

export default SocialMedia;
