import { BlogControllerApi } from "$lib/generated/oauth-api"

const blogApi = new BlogControllerApi()

export const getBlogs = async (page: number, size: number, sort: string[], topicId?: number, userId?: number, searchQuery?: string) => {
    return await blogApi.getBlogs({ page: page, size: size, sort: sort, topicId: topicId, userId: userId, searchQuery: searchQuery })
}