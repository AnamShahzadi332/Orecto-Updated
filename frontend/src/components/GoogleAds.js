import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class GoogleAds extends PureComponent {
  static propTypes = {
    client: PropTypes.string.isRequired,
    slot: PropTypes.string.isRequired,
    format: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    format: "auto",
    className: "",
    style: { display: "block" },
  };

  componentDidMount() {
    ((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;

      js = d.createElement(s);
      js.id = id;
      js.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1558863166168778";
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = cb;
    })(document, "script", "google-ads-sdk", () => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
  }

  render() {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1558863166168778"
        data-ad-slot="7106302581"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    );
  }
}
