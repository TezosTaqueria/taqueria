import React from "react";
import clsx from "clsx";
import styles from "./WhyTaqueria.module.css";

const FeatureList = [
	{
		title: "WhyTaqueria Module",
		Svg: require("../../../static/img/taq_pink.svg").default,
		description: <>This is WhyTaqueria component</>,
	},
];

function Feature({ Svg, title, description }) {
	return (
		<div>
			<h3>{title}</h3>
			<p>{description}</p>
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
