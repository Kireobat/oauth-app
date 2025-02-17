import { AuthControllerApi } from "$lib/generated/oauth-api"

const authApi = new AuthControllerApi()

export const getUserByUsername = async (username: string) => {
    return await authApi.getUserByUsername({ username: username })
}