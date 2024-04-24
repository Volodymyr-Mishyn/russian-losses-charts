import { DynamicIcon } from "@/components/dynamic-icon/dynamic-icon";
import { IconDefinition, faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Paper } from "@mui/material";
import Image from "next/image";

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

const SUPPORT_ELEMENTS: Array<SupportElement> = [
  {
    title: `Armed Forces of Ukraine`,
    shortSummary: `Government, Military`,
    image: "/images/support/mod_logo.png",
    link: `https://bank.gov.ua/en/news/all/natsionalniy-bank-vidkriv-spetsrahunok-dlya-zboru-koshtiv-na-potrebi-armiyi`,
  },
  {
    title: `Come Back Alive`,
    shortSummary: `Military, Non-government, Medical`,
    image: "/images/support/come_back_alive_logo.png",
    link: "https://savelife.in.ua/donate/",
  },
  {
    title: `UNITED24`,
    shortSummary: `Government, Military, Medical, Humanitarian, Education and Science`,
    image: "/images/support/united_24_logo.png",
    link: "https://u24.gov.ua/",
  },
  {
    title: `The Ukraine Humanitarian Fund`,
    shortSummary: `Non-government, Humanitarian, Medical`,
    image: "/images/support/un_logo_big.png",
    link: "https://crisisrelief.un.org/t/ukraine",
  },
  {
    title: `Serhiy Prytula Charity Foundation`,
    shortSummary: `Military, Non-government, Medical`,
    image: "/images/support/sergii_prutyla_foundation_logo.png",
    link: "https://prytulafoundation.org/en",
  },
  {
    title: `Ministry of Healthcare of Ukraine`,
    shortSummary: `Government, Humanitarian, Medical`,
    image: "/images/support/moh_logo.png",
    link: "https://moz.gov.ua/article/news/moz-ta-chervonij-hrest-vidkrivajut-rahunok-dlja-dopomogi-medikam",
  },
];
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
const fullVersionBlock = (
  <div className="text-center">
    Full version, with Oryx data is available at:
    <IconButton href="https://russian-losses.in.ua/en/statistics/ministry-of-defense" target="_blank">
      <DynamicIcon name="personnel" path="/images" size={24} />
    </IconButton>
  </div>
);

const considerSupportBlock = (
  <div className="flex flex-col gap-4">
    <div className="text-center">Consider supporting:</div>
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

export function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center gap-6 p-8 ">
      {fullVersionBlock}
      {considerSupportBlock}
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-center">Developed by Volodymyr Mishyn</div>
        {contactBlock}
      </div>
    </footer>
  );
}
