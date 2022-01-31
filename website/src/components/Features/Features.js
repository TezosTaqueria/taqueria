import React, { useState, useEffect } from "react";
import styles from "./Features.module.css";

const FeatureList = [
  {
    title: "Want a better Tezos development experience?",
    description:
      "Don’t know where to start building on Tezos? Want a smarter way to integrate your tools? If so, Taqueria is for you. This flexible framework will help you to start faster and build better applications.",
    button: {
      label: "Try the Taqueria Beta",
      link: "/docs/intro",
    },
    features: [
      {
        title: "Everything in one place",
        icon: require("../../../static/img/briefcase.png").default,
        description:
          "The Taqueria CLI and VS Code plugin bring your development tools to you. Stop moving your code jumping between IDEs. With Taqueria’s plugin infrastructure you can use the tools you need all in one place.",
        gif: require("../../../static/gif/mp4gifcode.mp4").default,
      },
      {
        title: "Deploy with ease",
        icon: require("../../../static/img/briefcase.png").default,
        description:
          "Remove the complexity of deploying to different networks using Taqueria. Deploy smart contracts directly to a sandbox, testnet or the Tezos network.",
        gif: require("../../../static/gif/mp4gifcode.mp4").default,
      },
      {
        title: "Effortlessly compile",
        icon: require("../../../static/img/briefcase.png").default,
        description:
          "Taqueria compiles smart contracts written in Ligo.  SmartPy and Michelson compilation is coming soon.",
        gif: require("../../../static/gif/mp4gifcode.mp4").default,
      },
      {
        title: "Simplify testing",
        icon: require("../../../static/img/briefcase.png").default,
        description:
          "Taqueria supports local sandboxes and testing out of the box. Build better and safer applications with less effort.",
        gif: require("../../../static/gif/mp4gifcode.mp4").default,
      },
      {
        title: "Fully customizable",
        icon: require("../../../static/img/briefcase.png").default,
        description:
          "Use Taqueria the way you want to. Taqueria has the flexibility to fit into your workflow the way you need it.",
        gif: require("../../../static/gif/mp4gifcode.mp4").default,
      },
    ],
  },
];

function Feature({ title, description, features, button }) {
  const checkTitle = (e) => {
    setUserAction(true);
    isVisible === e.target.id
      ? toggleIsVisible(`${features[0].title}`)
      : toggleIsVisible(e.target.id);
  };

  const [isVisible, toggleIsVisible] = useState(`${features[0].title}`);
  const [userAction, setUserAction] = useState(false);

  const featuresIndex = features.findIndex((object) => {
    return object.title === isVisible;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const checkEnd = (index) => {
        return features.length - 1 === index ? index * 0 : index + 1;
      };

      !userAction &&
        toggleIsVisible(`${features[checkEnd(featuresIndex)].title}`);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible, userAction]);

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
              <div key={index} className={styles.featuresContentMobile}>
                <div className={styles.featureTabs}>
                  <img className={styles.briefCase} src={feature.icon} />
                  <h4 className={styles.featureTitle} id={feature.title}>
                    {feature.title}
                  </h4>
                </div>

                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            )
          );
        })}

        <div className={styles.videoBlock}>
          <div className={styles.videoBlockHidden}></div>
          {features.map((feature, index) => {
            return (
              isVisible === feature.title && (
                <video key={index} autoPlay={true} muted src={feature.gif} />
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
