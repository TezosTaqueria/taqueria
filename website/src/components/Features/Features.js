import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Features.module.css";

const FeatureList = [
  {
    title: "Features",
    description:
      "Get has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam minimum ponderum. Et has minim elitr intellegat. Mea aeterno eleifend antiopam minimum ponderum. Et has minim elitr intellegat. Mea aeterno eleifend antiopam",
    button: {
      label: "Quick Start",
      link: "#",
    },
    features: [
      {
        title: "Feature 1",
        icon: require("../../../static/img/briefcase.png").default,
        description:
          "Decism heminas. Örybusa dilar av nysamma. Polig ysade äss. Plangen ungen som lasm. Tiligen antidest klimatdiktatur. Epin lorade, därför att otreng. Gensa.",
        gif: require("../../../static/gif/mp4gifcode.mp4").default,
      },
      {
        title: "Feature 2",
        icon: require("../../../static/img/briefcase.png").default,
        description:
          "Decism heminas. Örybusa dilar av nysamma. Polig ysade äss. Plangen ungen som lasm. Tiligen antidest klimatdiktatur. Epin lorade, därför att otreng. Gensa.",
        gif: require("../../../static/gif/mp4gifcode.mp4").default,
      },
      {
        title: "Feature 3",
        icon: require("../../../static/img/briefcase.png").default,
        description:
          "Decism heminas. Örybusa dilar av nysamma. Polig ysade äss. Plangen ungen som lasm. Tiligen antidest klimatdiktatur. Epin lorade, därför att otreng. Gensa.",
        gif: require("../../../static/gif/mp4gifcode.mp4").default,
      },
      {
        title: "Feature 4",
        icon: require("../../../static/img/briefcase.png").default,
        description:
          "Decism heminas. Örybusa dilar av nysamma. Polig ysade äss. Plangen ungen som lasm. Tiligen antidest klimatdiktatur. Epin lorade, därför att otreng. Gensa.",
        gif: require("../../../static/gif/mp4gifcode.mp4").default,
      },
      {
        title: "Feature 5",
        icon: require("../../../static/img/briefcase.png").default,
        description:
          "Decism heminas. Örybusa dilar av nysamma. Polig ysade äss. Plangen ungen som lasm. Tiligen antidest klimatdiktatur. Epin lorade, därför att otreng. Gensa.",
        gif: require("../../../static/gif/mp4gifcode.mp4").default,
      },
    ],
  },
];

function Feature({ title, description, features, button }) {
  const checkTitle = (e) => {
    isVisible === e.target.id
      ? toggleIsVisible(`${features[0].title}`)
      : toggleIsVisible(e.target.id);
  };

  const [isVisible, toggleIsVisible] = useState(`${features[0].title}`);

  return (
    <div>
      <div className={styles.headlineBlock}>
        <div className={styles.headlineText}>
          <h1 className={styles.headline}>{title}</h1>
          <p className={styles.headlineDescription}>{description}</p>
        </div>
        <a className={styles.headlineButton} href={button.link}>
          {button.label}
        </a>
      </div>

      <div className={styles.featuresBlock}>
        <div className={styles.dotMenu}>
          {features.map((feature, index) => {
            return (
              <div
                key={index}
                className={
                  isVisible === feature.title
                    ? styles.dots
                    : styles.inactivedots
                }
                id={feature.title}
                onClick={(e) => checkTitle(e)}
              ></div>
            );
          })}
        </div>

        {features.map((feature, index) => {
          return (
            isVisible === feature.title && (
              <AnimatePresence key={index}>
                <div className={styles.featuresContentMobile}>
                  <div className={styles.featureTabs}>
                    <img className={styles.briefCase} src={feature.icon} />
                    <h4 className={styles.featureTitle} id={feature.title}>
                      {feature.title}
                    </h4>
                  </div>

                  <motion.p
                    className={styles.featureDescription}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {feature.description}
                  </motion.p>
                </div>
              </AnimatePresence>
            )
          );
        })}

        <div className={styles.videoBlock}>
          <div className={styles.videoBlockHidden}></div>
          {features.map((feature, index) => {
            return (
              isVisible === feature.title && (
                <video key={index} autoplay="true" muted src={feature.gif} />
              )
            );
          })}
        </div>
        <div>
          {features.map((feature, index) => {
            return (
              <div key={index} className={styles.featuresContent}>
                <div
                  className={styles.featureTabs}
                  id={feature.title}
                  onClick={(e) => checkTitle(e)}
                >
                  <img
                    id={feature.title}
                    className={styles.briefCase}
                    src={feature.icon}
                  />
                  <h4 className={styles.featureTitle} id={feature.title}>
                    {feature.title}
                  </h4>
                </div>
                {isVisible === feature.title && (
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section className={styles.features}>
      <div className="container">
        <Feature {...FeatureList[0]} />
      </div>
    </section>
  );
}
