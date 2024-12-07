import PropTypes from "prop-types";
import { creditsStyle } from "./utils/utils";

const CreditItem = ({ name, spanContent, link, linkName }) => (
  <div className={creditsStyle.creditsDiv}>
    <h1 className={creditsStyle.creditsTitle}>{name}</h1>
    {link ? (
      <a className={creditsStyle.linkStyle} target="anchor" href={link}>
        {linkName}
      </a>
    ) : (
      <span className={creditsStyle.creditsSpan}>{spanContent}</span>
    )}
  </div>
);

CreditItem.propTypes = {
  name: PropTypes.string.isRequired,
  spanContent: PropTypes.string,
  link: PropTypes.string,
  linkName: PropTypes.string,
};

export default CreditItem;
