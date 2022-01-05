import React from "react";
import clsx from "clsx";
import styles from "./LogoGrid.module.css";

const FeatureList = [
	{
		title: "LogoGrid Module",
		Svg: require("../../../static/img/taq_pink.svg").default,
		description: <>This is LogoGrid component</>,
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

export default function LogoGrid() {
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
