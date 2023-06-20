import styles from "./styles.module.scss";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  EmailShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import { useMediaQuery } from "react-responsive";

export default function Share() {
  const isSmall = useMediaQuery({ query: "(max-width: 518px)" });
  const isSuperSmall = useMediaQuery({ query: "(max-width:481px)" });
  const isExtraSuperSmall = useMediaQuery({ query: "(max-width:443px)" });

  let size = 35;

  if (isSmall) {
    size = 30;
  }

  if (isSuperSmall) {
    size = 25;
  }

  return (
    <div className={styles.share}>
      <FacebookShareButton url={window?.location.href}>
        <FacebookIcon size={size} />
      </FacebookShareButton>
      <FacebookMessengerShareButton url={window?.location.href}>
        <FacebookMessengerIcon size={size} />
      </FacebookMessengerShareButton>
      <TwitterShareButton url={window?.location.href}>
        <TwitterIcon size={size} />
      </TwitterShareButton>
      <LinkedinShareButton url={window?.location.href}>
        <LinkedinIcon size={size} />
      </LinkedinShareButton>
      <RedditShareButton url={window?.location.href}>
        <RedditIcon size={size} />
      </RedditShareButton>
      <TelegramShareButton url={window?.location.href}>
        <TelegramIcon size={size} />
      </TelegramShareButton>
      {!isExtraSuperSmall && (
        <>
          <WhatsappShareButton url={window?.location.href}>
            <WhatsappIcon size={size} />
          </WhatsappShareButton>
          <PinterestShareButton url={window?.location.href}>
            <PinterestIcon size={size} />
          </PinterestShareButton>
          <EmailShareButton url={window?.location.href}>
            <EmailIcon size={size} />
          </EmailShareButton>
        </>
      )}
    </div>
  );
}
