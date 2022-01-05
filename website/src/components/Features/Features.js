import React from "react";
import clsx from "clsx";
import styles from "./Features.module.css";

const FeatureList = [
	{
		title: "Feature Module",
		Svg: require("../../../static/img/taq_pink.svg").default,
		description: <>This is Feature component</>,
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

export default function Features() {
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
