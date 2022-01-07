// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: "Taqueria - Developer Tooling for Tezos",
	tagline: "Taqueria - Developer Tooling for Tezos",
	url: "https://tezostaqueria.io",
	baseUrl: "/",
	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",
	favicon: "img/favicon.ico",
	organizationName: "ecadlabs", // Usually your GitHub org/user name.
	projectName: "taqueria", // Usually your repo name.

	presets: [
		[
			"@docusaurus/preset-classic",
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					path: "docs",
					sidebarPath: require.resolve("./sidebars.js"),
					// Please change this to your repo.
					editUrl: "https://github.com/ecadlabs/taqueria/edit/main/website/",
				},
				blog: {
					showReadingTime: true,
					// Please change this to your repo.
					editUrl:
						"https://github.com/ecadlabs/taqueria/edit/main/website/blog/",
				},
				theme: {
					customCss: require.resolve("./src/css/custom.css"),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				logo: {
					alt: "Tezos Taqueria Logo",
					src: "img/logoSVG.svg",
				},
				items: [
					{
						to: "/blog",
						label: " Get Started",
						position: "right",
						className: "header-link",
					},
					{
						type: "doc",
						docId: "intro",
						position: "right",
						label: "Docs",
						className: "header-link",
					},
					{
						to: "/blog",
						label: "Plugins",
						position: "right",
						className: "header-link",
					},
					{
						href: "https://discord.com/",
						position: "right",
						className: "header-discord-link",
						"aria-label": "Discord",
					},
					{
						href: "https://twitter.com/",
						position: "right",
						className: "header-twitter-link",
						"aria-label": "Twitter",
					},
					{
						href: "https://github.com/facebook/docusaurus",
						position: "right",
						className: "header-github-link",
						"aria-label": "GitHub repository",
					},
				],
			},
			footer: {
				links: [
					{
						title: "Contact",
						items: [
							{
								label: "Report Issues",
								to: "/blog",
							},
							{
								label: "Contribute",
								to: "/blog",
							},
						],
					},

					{
						title: "Community",
						items: [
							{
								label: "Stack Exchange",
								to: "https://stackoverflow.com",
							},
							{
								label: "Discord",
								to: "https://discord.com",
							},
							{
								label: "Twitter",
								to: "https://twitter.com",
							},
							{
								label: "Code of Conduct",
								to: "/docs/intro",
							},
							{
								label: "GitHub",
								to: "https://github.com",
							},
						],
					},
					{
						title: "Docs",
						items: [
							{
								label: "Quick Start",
								to: "/docs/intro",
							},
							{
								label: "TypeDoc Reference",
								to: "/docs/intro",
							},
							{
								label: "Roadmap",
								to: "/docs/intro",
							},
						],
					},
					{
						items: [
							{
								html: `
									<a href="/" target="_blank" rel="noreferrer noopener" aria-label="">
									  <img src="img/footerLogoSVG.svg" alt="" />
									</a>
								  `,
							},
							{
								html: `
									<p class='footerDescription'>
									Faplaren krorar whataboutism. Krorat kroligen. 
									</p>
								  `,
							},
							{
								html: `
								<a class='footerButton' href='https://github.com'>
								<img class='footerGihubLogoButton' src="img/githubSVG.svg" alt="" />
								GITHUB
							  	</a>
								  `,
							},
							{
								html: `
								<form class='footerForm'>
									<h5>Register for updates</h5>
									<div class='footerInputContainer'>
									<input class='footerImail' type="email" id="email" name="email" placeholder='Your email address'>
									<input class='signupButton' type="submit" value="Sign Up">
									</div>
								</form>
								  `,
							},
							{
								label: `Copyright © 2021 ECAD Labs - This project is licensed under Apache License, Version 2.0`,
								to: "/",
								className: "copyright",
							},
						],
					},
				],
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;
