// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://javajack.github.io',
	base: '/astro-starlight-docs-template',
	integrations: [
		starlight({
			title: 'Astro Starlight Docs Template',
			description: 'Production-ready documentation with Google Analytics, GDPR compliance, SEO, and LLM optimization',
			components: {
				Footer: './src/components/Footer.astro',
			},
			head: [
				// Google Consent Mode v2 - MUST load BEFORE gtag.js (synchronous)
				{
					tag: 'script',
					content: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}

						function isGDPRRegion() {
							const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
							const euTimezones = ['Europe/', 'Atlantic/Reykjavik', 'Atlantic/Azores', 'Atlantic/Madeira'];
							return euTimezones.some(zone => tz.startsWith(zone));
						}

						const isGDPR = isGDPRRegion();

						gtag('consent', 'default', {
							'ad_storage': 'denied',
							'ad_user_data': 'denied',
							'ad_personalization': 'denied',
							'analytics_storage': isGDPR ? 'denied' : 'granted',
							'functionality_storage': 'granted',
							'personalization_storage': 'denied',
							'security_storage': 'granted',
							'wait_for_update': 500,
						});

						window.__isGDPRRegion = isGDPR;
					`,
				},
				// Google Analytics 4 - Load gtag.js (async, after consent default)
				{
					tag: 'script',
					attrs: { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-G986QLPFZ1' },
				},
				{
					tag: 'script',
					content: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-G986QLPFZ1', {
							'anonymize_ip': true,
							'cookie_flags': 'SameSite=None;Secure'
						});
					`,
				},
				// Yandex Webmaster verification
				{ tag: 'meta', attrs: { name: 'yandex-verification', content: '5281e40eca9463d2' } },
				// Open Graph image
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://javajack.github.io/astro-starlight-docs-template/og-image.svg' } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
				{ tag: 'meta', attrs: { property: 'og:image:type', content: 'image/svg+xml' } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: 'https://javajack.github.io/astro-starlight-docs-template/og-image.svg' } },
				{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
				{ tag: 'meta', attrs: { name: 'twitter:site', content: '@webiyo' } },
				// SEO meta tags
				{
					tag: 'meta',
					attrs: {
						name: 'keywords',
						content: 'astro, starlight, documentation, template, google analytics, gdpr, seo, llm optimization',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'author',
						content: 'Rakesh Waghela',
					},
				},
				// Cloudflare Web Analytics
				{ tag: 'script', attrs: { defer: true, src: 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "7ce325bb227e4b42a8406f369ff4e788"}' } },
				// Cookie Consent Banner
				{ tag: 'script', attrs: { defer: true, src: '/astro-starlight-docs-template/cookie-consent.js' } },
				// Structured Data (JSON-LD)
				{
					tag: 'script',
					attrs: { type: 'application/ld+json' },
					content: JSON.stringify({
						'@context': 'https://schema.org',
						'@graph': [
							{
								'@type': 'WebSite',
								name: 'Astro Starlight Docs Template',
								url: 'https://javajack.github.io/astro-starlight-docs-template/',
								description: 'Production-ready documentation with Google Analytics, GDPR compliance, SEO, and LLM optimization.',
								author: { '@id': '#rakesh' },
							},
							{
								'@type': 'Person',
								'@id': '#rakesh',
								name: 'Rakesh Waghela',
								url: 'https://www.linkedin.com/in/rakeshwaghela',
								sameAs: [
									'https://x.com/webiyo',
									'https://www.linkedin.com/in/rakeshwaghela',
									'https://topmate.io/rakeshwaghela',
								],
							},
						],
					}),
				},
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/javajack/astro-starlight-docs-template' },
				{ icon: 'x.com', label: 'X', href: 'https://x.com/webiyo' },
				{ icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/rakeshwaghela' },
				{ icon: 'external', label: 'Book a Consultation', href: 'https://topmate.io/rakeshwaghela' },
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'index' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
						{ label: 'Installation', slug: 'getting-started/installation' },
					],
				},
				{
					label: 'Why Astro & Starlight?',
					items: [
						{ label: 'Astro Benefits', slug: 'why/astro-benefits' },
						{ label: 'Starlight Advantages', slug: 'why/starlight-advantages' },
						{ label: 'Why This Optimizer?', slug: 'why/why-optimizer' },
					],
				},
				{
					label: 'Features',
					items: [
						{ label: 'Overview', slug: 'features/overview' },
						{ label: 'Google Analytics', slug: 'features/analytics' },
						{ label: 'GDPR Compliance', slug: 'features/gdpr' },
						{ label: 'SEO Optimization', slug: 'features/seo' },
						{ label: 'LLM Optimization', slug: 'features/llm' },
					],
				},
				{
					label: 'Implementation',
					items: [
						{ label: 'Technical Details', slug: 'implementation/technical' },
						{ label: 'Subtle Enhancements', slug: 'implementation/enhancements' },
						{ label: 'No Component Overrides', slug: 'implementation/no-overrides' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Configuration', slug: 'guides/configuration' },
						{ label: 'Customization', slug: 'guides/customization' },
						{ label: 'Troubleshooting', slug: 'guides/troubleshooting' },
					],
				},
			],
		}),
	],
});
