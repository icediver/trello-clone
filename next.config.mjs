/** @type {import('next').NextConfig} */
import { config } from 'dotenv';

const env = config({ path: '.env.local' });

const nextConfig = {
	env: env.parsed,

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.clerk.com',
			},
		],
	},
};

export default nextConfig;
