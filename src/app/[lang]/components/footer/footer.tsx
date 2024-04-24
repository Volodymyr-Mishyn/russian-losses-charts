import { DynamicIcon } from "@/components/dynamic-icon/dynamic-icon";
import { DictionaryElement } from "@/i18n-config";
import { IconDefinition, faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Paper } from "@mui/material";
import Image from "next/image";
import { memo } from "react";

export interface SocialOption {
  name: string;
  icon: IconDefinition;
  link: string;
}

interface SupportElement {
  title: string;
  shortSummary: string;
  image: string;
  link: string;
}

interface SupportOptionTranslation {
  title: string;
  shortSummary: string;
}

const SOCIAL_SHARE_OPTIONS: Record<string, SocialOption> = {
  gitHub: {
    name: "GitHub",
    icon: faGithub,
    link: "https://github.com/Volodymyr-Mishyn",
  },
  linkedIn: {
    name: "LinkedIn",
    icon: faLinkedin,
    link: "https://linkedin.com/in/volodymyr-mishyn-b9929398",
  },
  twitter: {
    name: "Twitter",
    icon: faTwitter,
    link: "https://twitter.com/Mishyn_V",
  },
};

const contactBlock = (
  <div className="flex flex-row gap-2">
    {Object.keys(SOCIAL_SHARE_OPTIONS).map((key) => {
      const option = SOCIAL_SHARE_OPTIONS[key];
      return (
        <IconButton key={key} href={option.link} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={option.icon} />
        </IconButton>
      );
    })}
  </div>
);

function createFullVersionBlock(dictionary: DictionaryElement) {
  return (
    <div className="text-center">
      {dictionary.fullVersion as string}
      <IconButton href="https://russian-losses.in.ua" target="_blank">
        <DynamicIcon name="personnel" path="/images" size={24} />
      </IconButton>
    </div>
  );
}

function createSupportBlock(dictionary: DictionaryElement) {
  const supportOptions = dictionary.supportOptions as unknown as Record<string, SupportOptionTranslation>;
  const SUPPORT_ELEMENTS: Array<SupportElement> = [
    {
      title: supportOptions.armedForces.title,
      shortSummary: supportOptions.armedForces.shortSummary,
      image: "/images/support/mod_logo.png",
      link: `https://bank.gov.ua/en/news/all/natsionalniy-bank-vidkriv-spetsrahunok-dlya-zboru-koshtiv-na-potrebi-armiyi`,
    },
    {
      title: supportOptions.comeBackAlive.title,
      shortSummary: supportOptions.comeBackAlive.shortSummary,
      image: "/images/support/come_back_alive_logo.png",
      link: "https://savelife.in.ua/donate/",
    },
    {
      title: supportOptions.united24.title,
      shortSummary: supportOptions.united24.shortSummary,
      image: "/images/support/united_24_logo.png",
      link: "https://u24.gov.ua/",
    },
    {
      title: supportOptions.ukrainianHumanitarianFund.title,
      shortSummary: supportOptions.ukrainianHumanitarianFund.shortSummary,
      image: "/images/support/un_logo_big.png",
      link: "https://crisisrelief.un.org/t/ukraine",
    },
    {
      title: supportOptions.prytulaFoundation.title,
      shortSummary: supportOptions.prytulaFoundation.shortSummary,
      image: "/images/support/sergii_prutyla_foundation_logo.png",
      link: "https://prytulafoundation.org/en",
    },
    {
      title: supportOptions.ministryOfHealthcare.title,
      shortSummary: supportOptions.ministryOfHealthcare.shortSummary,
      image: "/images/support/moh_logo.png",
      link: "https://moz.gov.ua/article/news/moz-ta-chervonij-hrest-vidkrivajut-rahunok-dlja-dopomogi-medikam",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">{dictionary.considerSupporting as string}</div>
      <div className="flex flex-row flex-wrap  justify-center items-stretch gap-4">
        {SUPPORT_ELEMENTS.map((element, index) => (
          <Paper key={index} className="flex flex-col gap-2 items-center p-4 w-36">
            <a href={element.link} target="_blank" rel="noreferrer">
              <div className="flex flex-col gap-2 items-center">
                <div className="h-8">
                  <Image src={element.image} alt={element.title} width={64} height={32} />
                </div>
                <div className="text-sm">{element.title}</div>
                <div className="text-xs">{element.shortSummary}</div>
              </div>
            </a>
          </Paper>
        ))}
      </div>
    </div>
  );
}

export const Footer = memo(function Footer({ dictionary }: { dictionary: DictionaryElement }) {
  const considerSupportBlock = createSupportBlock(dictionary);
  const fullVersionBlock = createFullVersionBlock(dictionary);
  return (
    <footer className="flex flex-col justify-center items-center gap-6 p-8 ">
      {fullVersionBlock}
      {considerSupportBlock}
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-center">{dictionary.developedBy as string} Volodymyr Mishyn</div>
        {contactBlock}
      </div>
    </footer>
  );
});
