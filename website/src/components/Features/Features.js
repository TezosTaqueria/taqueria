import React, { useState } from "react";
import styles from "./Features.module.css";

const FeatureList = [
  {
    title: "Finally all of your tools in one place",
    description:
      "Stitching all of the development tools needed to build great applications into a cohesive, consistent and safe workflow can be incredibly frustrating and time-consuming. Taqueria is designed to help solve this problem while keeping control in your handss. Less barriers, more time creating!",
    button: {
      label: "Quick Start",
      link: "#",
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
