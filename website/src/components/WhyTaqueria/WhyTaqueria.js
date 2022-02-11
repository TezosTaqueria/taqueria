import React from "react";
import clsx from "clsx";
import styles from "./WhyTaqueria.module.css";

const FeatureList = [
  {
    title: "Why Taqueria?",
    gif: require("../../../static/gif/taq_hero.mp4").default,
    features: [
      {
        icon: require("../../../static/img/briefcase.svg").default,
        description: (
          <>
						<strong>Getting started is easier</strong><br></br>Taqueria makes getting started with a Tezos project easier than ever by removing the complexity of setting up a development environment so you can get to building sooner.
          </>
        ),
      },
      {
        icon: require("../../../static/img/key.svg").default,
        description: (
          <>
						<strong>Efficient end-to-end development cycle</strong><br></br>Development doesn't stop when you launch your application. Taqueria supports the entire blockchain application development life cycle, from initial testing to deployment, maintenance of applications and smart contracts.
          </>
        ),
      },
      {
        icon: require("../../../static/img/box.svg").default,
        description: (
          <>
<strong>Built-in processes for quality applications</strong><br></br>When we build better applications, the entire Tezos ecosystem wins. Taqueria improves the quality of your applications through easy scaffolding and an improved development workflow.          </>
        ),
      },
      {
        icon: require("../../../static/img/credit_card.svg").default,
        description: (
          <>
						<strong>From the creators of Taquito</strong><br></br>
						Taqueria is built by ECAD Labs, the team behind the popular Taquito Typescript library. ECAD Labs has been working in the Tezos ecosystem since 2019 and brings extensive experience building and supporting developer tools.
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
