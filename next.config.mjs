/** @type {import('next').NextConfig} */
import { config } from 'dotenv';

const env = config({ path: '.env.local' });

const nextConfig = {
	env: env.parsed,
	//baseUrl: process.env.NEXT_PUBLiC_API_BASE_URL,

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.clerk.com',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
		],
	},
};

export default nextConfig;
