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
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.heroCardContainer}>
						<Feature {...FeatureList[0]} />
					</div>
					<div className={styles.carousel}></div>
				</div>
			</div>
			<div className={styles.leftPurpleLine}></div>
			<div className={styles.rightPurpleLine}></div>
		</section>
	);
}
