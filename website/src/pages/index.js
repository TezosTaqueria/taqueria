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

export default function Home() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={`Hello from ${siteConfig.title}`}
			description="Description will go into a meta tag in <head />"
		>
			<main>
				<Hero />
				<Features />
				<WhyTaqueria />
				<LogoGrid />
			</main>
		</Layout>
	);
}
