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
			colorMode: {
				defaultMode: "light",
				disableSwitch: true,
				respectPrefersColorScheme: false,
				switchConfig: {
					darkIcon: "🌙",
					darkIconStyle: {
						marginLeft: "2px",
					},
					// Unicode icons such as '\u2600' will work
					// Unicode with 5 chars require brackets: '\u{1F602}'
					lightIcon: "\u{1F602}",
					lightIconStyle: {
						marginLeft: "1px",
					},
				},
			},
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
								<!-- Begin Mailchimp Signup Form -->
								<div id="mc_embed_signup">
								<form class='footerForm' action="https://ecadlabs.us20.list-manage.com/subscribe/post?u=8fdd00e1ab81d5f5550fadb32&amp;id=de1bfb4af9" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
									<h5>Register for updates</h5>
									<div class="footerInputContainer" id="mc_embed_signup_scroll">
										<div>
											<input type="email" value="" name="EMAIL" class="required email footerEmail" id="mce-EMAIL" placeholder='Your email address'>
										</div>
										<div id="mce-responses" class="clear">
											<div class="response" id="mce-error-response" style="display:none"></div>
											<div class="response" id="mce-success-response" style="display:none"></div>
										</div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
										<div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_8fdd00e1ab81d5f5550fadb32_de1bfb4af9" tabindex="-1" value=""></div>

										<div class="clear"><input type="submit" value="Sign Up" name="subscribe" id="mc-embedded-subscribe" class="button signupButton"></div>
									</div>
								</form>
								</div>

								<!--End mc_embed_signup-->
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
