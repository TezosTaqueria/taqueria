import React from "react";
import clsx from "clsx";
import styles from "./LogoGrid.module.css";
 
const FeatureList = [
	{
		title: "Teams building with Taqueria",
		Svg: require("../../../static/img/taq_pink.svg").default,
		images: [
			{
				Image: require("../../../static/img/image.png").default,
			},
			{
				Image: require("../../../static/img/image.png").default,
			},
			{
				Image: require("../../../static/img/image.png").default,
			},
			{
				Image: require("../../../static/img/image.png").default,
			},
			{
				Image: require("../../../static/img/image.png").default,
			},
			{
				Image: require("../../../static/img/image.png").default,
			},
			{
				Image: require("../../../static/img/image.png").default,
			},
			{
				Image: require("../../../static/img/image.png").default,
			},
			{
				Image: require("../../../static/img/image.png").default,
			},
			{
				Image: require("../../../static/img/image.png").default,
			},
		],
	},
];

function Feature({ Svg, images, title }) {
	return (
		<div>
			<h1>{title}</h1>
			<div className={styles.images}>
				{images.map((image, i) => (
					<span key={i} className={styles.image}>
						<img src={image.Image} alt="" />
					</span>
				))}
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
