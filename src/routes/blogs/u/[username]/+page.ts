import type { PageLoad } from "./$types"
import type { OAuthResponseDto } from "$lib/generated/oauth-api/"
import { getUserByUsername } from "$lib/functions/getUserByUsername"

export const load: PageLoad = async ({ params }) => {
    try {
        return await getUserByUsername(params.username)
    } catch (error: any) {
        const text = await error.response.text();
        const oAuthResponseDto: OAuthResponseDto = JSON.parse(text);
        console.error(oAuthResponseDto.message)
        error(404, "Not found")
    }
}