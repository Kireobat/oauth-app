import { BlogControllerApi } from "$lib/generated/oauth-api"

const blogApi = new BlogControllerApi()

export const getBlog = async (id: number) => {
    return await blogApi.getBlogById({ id: id })
}