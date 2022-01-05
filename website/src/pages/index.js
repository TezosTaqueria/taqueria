import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import WhyTaqueria from "../components/WhyTaqueria/WhyTaqueria";
import LogoGrid from "../components/LogoGrid/LogoGrid";
import Header from "../components/Header/Header";

// function HomepageHeader() {
// 	const { siteConfig } = useDocusaurusContext();
// 	return (
// 		<header className={clsx("hero hero--primary", styles.heroBanner)}>
// 			<div className="container">
// 				<h1 className="hero__title">{siteConfig.title}</h1>
// 				<p className="hero__subtitle">{siteConfig.tagline}</p>
// 				<div className={styles.buttons}>
// 					<Link
// 						className="button button--secondary button--lg"
// 						to="/docs/intro"
// 					>
// 						Docusaurus Tutorial - 5min ⏱️
// 					</Link>
// 				</div>
// 			</div>
// 		</header>
// 	);
// }

export default function Home() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={`Hello from ${siteConfig.title}`}
			description="Description will go into a meta tag in <head />"
		>
			<Header />
			<main>
				<Hero />
				<Features />
				<WhyTaqueria />
				<LogoGrid />
			</main>
		</Layout>
	);
}
