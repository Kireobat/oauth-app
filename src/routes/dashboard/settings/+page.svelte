<script lang="ts">
    import { AuthControllerApi, type UserDto } from "$lib/generated/oauth-api";
    import { P } from "flowbite-svelte";
    import { onMount } from "svelte";

    const authApi = new AuthControllerApi();
    let user: UserDto | undefined = $state();

    const getUser = async () => {
        user = await authApi.getUser({ credentials: "include" });
    };

    onMount(() => {
        getUser();
    });
</script>

<P>{user?.username}</P>
<P>{user?.email}</P>
