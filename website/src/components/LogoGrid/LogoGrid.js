import React from "react";
import clsx from "clsx";
import styles from "./LogoGrid.module.css";

const FeatureList = [
	{
		title: "Use your favorite tools with Taqueria",
		//Svg: require("../../../static/img/taq_orange.svg").default,
		images: [
			{
				Image: require("../../../static/img/ligolang.png").default,
			},
			{
				Image: require("../../../static/img/archetype.png").default,
			},
			{
				Image: require("../../../static/img/smartpy.png").default,
			},
			{
				Image: require("../../../static/img/taquito.png").default,
			},
			{
				Image: require("../../../static/img/pinata.png").default,
			},
		],
	},
];

function Feature({ Svg, images, title }) {
	return (
		<div className={styles.wrapper}>
			
			<div className={styles.logos}>
				<h1 className={styles.headine}>{title}</h1>
				<div className={styles.images}>
					{images.map((image, i) => (
						<span key={i} className={styles.image}>
							<img src={image.Image} alt="" />
						</span>
					))}
				</div>
			</div>
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
