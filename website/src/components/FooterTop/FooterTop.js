import React from "react";
import clsx from "clsx";
import styles from "./FooterTop.module.css";

// TODO: Adjust for Taqueria
const FeatureList = [];

function Feature({ Svg, title, url }) {
	return (
		<div className={styles.Contentcontainer}>
			<h5 className={styles.headline}>{title}</h5>
			<a href={url}>
				<Svg className={styles.featureSvg} alt={title} />
			</a>
		</div>
	);
}

export default function FooterTop() {
	return (
		<section className={styles.features}>
			<div className={styles.container}>
				<Feature {...FeatureList[0]} />
			</div>
			<div className={styles.leftPurpleLine}></div>
			<div className={styles.rightPurpleLine}></div>
		</section>
	);
}
