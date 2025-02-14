import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import type { BlogDto, OAuthResponseDto } from "$lib/generated/oauth-api/"
import { getBlog } from "$lib/functions/getBlog"

export const load: PageLoad = async ({ params }) => {
    let blogDto: BlogDto

    if (isNaN(Number(params.id))) {
        error(404, "Not found")
    }

    try {
        return await getBlog(Number(params.id))
    } catch (error: any) {
        const text = await error.response.text();
        const oAuthResponseDto: OAuthResponseDto = JSON.parse(text);
        console.error(oAuthResponseDto.message)
        error(404, "Not found")
    }
}