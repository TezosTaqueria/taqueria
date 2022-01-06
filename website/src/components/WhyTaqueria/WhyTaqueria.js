import React from "react";
import clsx from "clsx";
import styles from "./WhyTaqueria.module.css";

const FeatureList = [
	{
		title: "Why Taqueria?",
		Svg: require("../../../static/img/taq_purple.svg").default,
		Briefcase: require("../../../static/img/briefcase.svg").default,
		Key: require("../../../static/img/key.svg").default,
		Box: require("../../../static/img/box.svg").default,
		Credit_Card: require("../../../static/img/credit_card.svg").default,
		description: <>Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum.</>,
	},
];

function Feature({ Svg, Briefcase, Key, Box, Credit_Card, title, description }) {
	return (
		<div>
			<Svg className={styles.featureSvg} alt={title} />
			<div className={styles.features}>
				<div className={styles.left}>
					<img src="http://localhost:3000/img/undraw_docusaurus_react.svg" />
				</div>
				<div className={styles.right}>
					<h1>{title}</h1>
					<div className={styles.feature}>
						<div className={styles.featureText}>
							<Briefcase className={styles.featureSvgs} alt={title} />
							<p>{description}</p>
						</div>
						<div className={styles.featureText}>
							<Key className={styles.featureSvgs} alt={title} />
							<p>{description}</p>
						</div>
						<div className={styles.featureText}>
							<Box className={styles.featureSvgs} alt={title} />
							<p>{description}</p>
						</div>
						<div className={styles.featureText}>
							<Credit_Card className={styles.featureSvgs} alt={title} />
							<p>{description}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function WhyTaqueria() {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					<Feature {...FeatureList[0]} />
				</div>
			</div>
		</section>
	);
}
