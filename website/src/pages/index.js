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
import FooterTop from "../components/FooterTop/FooterTop";
//TODO: Add back <LogoGrid /> under WhyTaqueria when we have user logos
export default function Home() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={`Taqueria`}
			description="A Better Way to Build on Tezos"
		>
			<main>
				<Hero />
				<Features />
				<WhyTaqueria />
				<LogoGrid />
				<FooterTop />
			</main>
		</Layout>
	);
}
