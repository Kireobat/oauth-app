import { UserControllerApi } from "$lib/generated/oauth-api"

const userApi = new UserControllerApi()

export const getUsers = async (page: number, size: number, sort: string[], searchQuery?: string) => {
    return await userApi.getUsers({ page: page, size: size, sort: sort, searchQuery: searchQuery })
}