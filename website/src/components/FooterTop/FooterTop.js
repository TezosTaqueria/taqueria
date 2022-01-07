import React from "react";
import clsx from "clsx";
import styles from "./FooterTop.module.css";

const FeatureList = [
	{
		title: "Built By",
		Svg: require("../../../static/img/ECAD_logo.svg").default,
	},
	,
];

function Feature({ Svg, title, description }) {
	return (
		<div className={styles.container}>
			<h5 className={styles.headline}>{title}</h5>
			<div className="styles.svgContainer">
				<Svg className={styles.featureSvg} alt={title} />
			</div>
		</div>
	);
}

export default function FooterTop() {
	return (
		<section className={styles.features}>
			<Feature {...FeatureList[0]} />
		</section>
	);
}
