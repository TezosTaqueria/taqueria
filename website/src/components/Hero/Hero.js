import React from "react";
import clsx from "clsx";
import styles from "./Hero.module.css";

const FeatureList = [
	{
		title: "Easy to Use",
		Svg: require("../../../static/img/taq_pink.svg").default,
		description: (
			<>
				Taqueria is designed with Tezos developer productivity in mind. Scaffold
				a brand new Tezos app complete with Smart Contracts, Wallet Integration,
				Integration Tests, and deployment actions.
			</>
		),
	},
	{
		title: "Focus on What Matters",
		Svg: require("../../../static/img/taq_orange.svg").default,
		description: (
			<>
				Taqueria pulls together the best tools from the Tezos Blockchain
				development ecosystem so you can focus on building your vision.
			</>
		),
	},
	{
		title: "Open to extension",
		Svg: require("../../../static/img/taq_purple.svg").default,
		description: (
			<>
				Taqueria is open to extension. Devlope your own Taqueria plugin or bring
				Taqueria into your development environment of choice. Taqueria ships
				with a robust CLI and a VSCode Plugin.
			</>
		),
	},
];

function Feature({ Svg, title, description }) {
	return (
		<div className={clsx("col col--4")}>
			<div className="text--center">
				<Svg className={styles.featureSvg} alt={title} />
			</div>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function Hero() {
	return (
		<section className={styles.features}>
			<div className={styles.container}></div>
			<div className={styles.leftPurpleLine}></div>
			<div className={styles.rightPurpleLine}></div>
		</section>
	);
}
