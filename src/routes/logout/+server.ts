import { redirect } from '@sveltejs/kit';

export async function GET() {
    // Redirect to the logout URL
    throw redirect(302, 'http://localhost:8080/oauth-api/logout');
}
