import React from "react";
import clsx from "clsx";
import styles from "./WhyTaqueria.module.css";

const FeatureList = [
  {
    title: "Why Taqueria?",
    gif: require("../../../static/gif/mp4gifcode.mp4").default,
    features: [
      {
        icon: require("../../../static/img/briefcase.svg").default,
        description: (
          <>
            ET has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
            no suscipit quaerendum.
          </>
        ),
      },
      {
        icon: require("../../../static/img/key.svg").default,
        description: (
          <>
            TE has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
            no suscipit quaerendum.
          </>
        ),
      },
      {
        icon: require("../../../static/img/box.svg").default,
        description: (
          <>
            Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
            no suscipit quaerendum.
          </>
        ),
      },
      {
        icon: require("../../../static/img/credit_card.svg").default,
        description: (
          <>
            Te has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
            no suscipit quaerendum.
          </>
        ),
      },
    ],
  },
];

function Feature({ gif, title, features }) {
  return (
    <div>
      <div className={styles.features}>
        <div className={styles.left}>
          <video autoPlay={true} muted src={gif} />
        </div>
        <div className={styles.right}>
          <h1>{title}</h1>
          <div className={styles.feature}>
            {features.map((feature, i) => (
              <div className={styles.featureText} key={i}>
                <feature.icon className={styles.featureSvgs} alt={title} />
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhyTaqueria() {
  const SvgLogo = require("../../../static/img/taq_purple.svg").default;

  return (
    <section className={styles.wrapper}>
      <SvgLogo className={styles.logoSvg} alt={"logo"} />
      <div className={styles.content}>
        <div className="container">
          <div className="row">
            <Feature {...FeatureList[0]} />
          </div>
        </div>
      </div>
    </section>
  );
}
