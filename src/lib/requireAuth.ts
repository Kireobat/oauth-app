import { PrivateControllerApi } from "./generated/oauth-api"

const privateApi = new PrivateControllerApi()

export const requireAuth = async (): Promise<boolean> => {
    return privateApi.checkAuth({ credentials: "include" }).then((res) => {
        console.log("res: " + res)
        return res
    })
}