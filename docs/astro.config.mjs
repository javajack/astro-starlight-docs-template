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
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/javajack/astro-starlight-docs-template' },
				{ icon: 'x.com', label: 'X', href: 'https://x.com/webiyo' },
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
