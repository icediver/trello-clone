import {
	authMiddleware,
	redirectToSignIn,
} from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

//const isPublicRoute = createRouteMatcher([
//	'/',
//	'/sign-in(.*)',
//	'/sign-up(.*)',
//	'/api/webhooks/stripe',
//]);
//
//export default clerkMiddleware((auth, request) => {
//	if (!isPublicRoute(request)) {
//		auth().protect();
//	}
//});

export default authMiddleware({
	publicRoutes: ['/'],
	afterAuth: (auth, req) => {
		if (auth.userId && auth.isPublicRoute) {
			let path = '/select-org';

			if (auth.orgId) {
				path = `/organization/${auth.orgId}`;
			}

			const orgSelection = new URL(path, req.url);

			return NextResponse.redirect(orgSelection);
		}
		if (!auth.userId && !auth.isPublicRoute) {
			return redirectToSignIn({ returnBackUrl: req.url });
		}

		if (
			auth.userId &&
			!auth.orgId &&
			req.nextUrl.pathname !== '/select-org'
		) {
			const orgSelection = new URL('/select-org', req.url);
			return NextResponse.redirect(orgSelection);
		}
	},
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
};
