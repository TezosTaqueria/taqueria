import React from "react";
import clsx from "clsx";
import styles from "./WhyTaqueria.module.css";

const FeatureList = [
	{
		title: "Why Taqueria?",
		gif: require("../../../static/gif/mp4gifcode.mp4").default,
		Briefcase: require("../../../static/img/briefcase.svg").default,
		Key: require("../../../static/img/key.svg").default,
		Box: require("../../../static/img/box.svg").default,
		Credit_Card: require("../../../static/img/credit_card.svg").default,
		description: (
			<>
				Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no
				suscipit quaerendum.
			</>
		),
	},
];

function Feature({
	gif,
	Briefcase,
	Key,
	Box,
	Credit_Card,
	title,
	description,
}) {
	return (
		<div>
			<div className={styles.features}>
				<div className={styles.left}>
					<video autoplay="true" muted src={gif} />
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
