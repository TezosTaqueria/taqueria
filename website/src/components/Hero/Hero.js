import React from "react";
import clsx from "clsx";
import styles from "./Hero.module.css";

const FeatureList = [
	{
		title: "Insert awesome intro title here.",
		Svg: require("../../../static/img/heroSVG.svg").default,
		description: (
			<>
				Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no
				suscipit quaerendum. At nam minimum ponderum.
			</>
		),
		link: {
			title: "Quick Start",
			url: "/blog",
		},
	},
];

function Feature({ Svg, title, description, link }) {
	return (
		<div className={styles.heroCard}>
			<h1 className={styles.heroTitle}>{title}</h1>
			<div className={styles.heroCardContent}>
				<p className={styles.heroCardDescription}>{description}</p>
				<div className={styles.heroButtonContainer}>
					<a className={styles.heroButton} href={link.url}>
						{link.title}
					</a>
				</div>
				{link.tilte}
			</div>
			<Svg className={styles.featureSvg} alt={title} />
		</div>
	);
}

export default function Hero() {
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
