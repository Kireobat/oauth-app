import { AuthControllerApi } from "./generated/oauth-api"
import { user } from "./functions/user.svelte"

const authApi = new AuthControllerApi()

export const requireAuth = async (): Promise<boolean> => {
    return authApi.getUser({ credentials: "include" }).then((res) => {
        return res.id == user.current?.id
    })
}