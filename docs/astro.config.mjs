// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	// TODO: Replace with your GitHub Pages URL (e.g., 'https://yourusername.github.io')
	site: 'https://yourusername.github.io',
	// TODO: Replace with your repository name
	base: '/your-repo-name',
	integrations: [
		starlight({
			title: 'My Documentation',
			description: 'Your project description here',
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
				// Google Analytics 4 - TODO: Replace G-XXXXXXXXXX with your GA4 Measurement ID
				{
					tag: 'script',
					attrs: { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX' },
				},
				{
					tag: 'script',
					content: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-XXXXXXXXXX', {
							'anonymize_ip': true,
							'cookie_flags': 'SameSite=None;Secure'
						});
					`,
				},
				// Yandex Webmaster - TODO: Replace with your Yandex verification code
				{ tag: 'meta', attrs: { name: 'yandex-verification', content: 'YOUR_YANDEX_VERIFICATION_CODE' } },
				// Open Graph image - TODO: Update URLs to match your site
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://yourusername.github.io/your-repo-name/og-image.svg' } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
				{ tag: 'meta', attrs: { property: 'og:image:type', content: 'image/svg+xml' } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: 'https://yourusername.github.io/your-repo-name/og-image.svg' } },
				{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
				// TODO: Replace with your Twitter handle
				{ tag: 'meta', attrs: { name: 'twitter:site', content: '@your_twitter_handle' } },
				// SEO meta tags - TODO: Update keywords for your project
				{
					tag: 'meta',
					attrs: {
						name: 'keywords',
						content: 'your, project, keywords, here',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'author',
						// TODO: Replace with your name
						content: 'Your Name',
					},
				},
				// Cloudflare Web Analytics - TODO: Replace with your Cloudflare token
				{ tag: 'script', attrs: { defer: true, src: 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "YOUR_CLOUDFLARE_TOKEN"}' } },
				// Cookie Consent Banner - TODO: Update path to match your base
				{ tag: 'script', attrs: { defer: true, src: '/your-repo-name/cookie-consent.js' } },
				// Structured Data (JSON-LD) - TODO: Update with your details
				{
					tag: 'script',
					attrs: { type: 'application/ld+json' },
					content: JSON.stringify({
						'@context': 'https://schema.org',
						'@graph': [
							{
								'@type': 'WebSite',
								name: 'My Documentation',
								url: 'https://yourusername.github.io/your-repo-name/',
								description: 'Your project description here.',
								author: { '@id': '#author' },
							},
							{
								'@type': 'Person',
								'@id': '#author',
								name: 'Your Name',
								url: 'https://www.linkedin.com/in/yourprofile',
								sameAs: [
									'https://x.com/your_handle',
									'https://www.linkedin.com/in/yourprofile',
								],
							},
						],
					}),
				},
			],
			social: [
				// TODO: Replace with your social links
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/yourusername/your-repo-name' },
				{ icon: 'x.com', label: 'X', href: 'https://x.com/your_handle' },
				{ icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/yourprofile' },
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
