<script lang="ts">
    import { AuthControllerApi, type UserDto } from "$lib/generated/oauth-api";
    import {
        Avatar,
        DarkMode,
        Dropdown,
        DropdownItem,
        Navbar,
        NavBrand,
        NavHamburger,
        NavLi,
        NavUl,
        P,
    } from "flowbite-svelte";
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

<Navbar>
    <NavBrand href="/">
        <img src="/logo.png" class="me-3 h-8 sm:h-10" alt="Flowbite Logo" />
        <span
            class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
            >TwoJaws</span
        >
    </NavBrand>
    <NavHamburger />
    <NavUl>
        <NavLi href="/dashboard">
            <p class="self-center whitespace-nowrap">Dashboard</p>
        </NavLi>
        <NavLi href="/pricing">Pricing</NavLi>
        <NavLi href="/contact">Contact</NavLi>
        <NavLi>
            <DarkMode />
        </NavLi>
        <NavLi>
            <Avatar src={user?.avatarUrl} />
        </NavLi>
        <Dropdown>
            {#if user?.username}
                <DropdownItem href={"/u/" + user.username}
                    >Your Profile</DropdownItem
                >
                <DropdownItem href="/dashboard/settings">Settings</DropdownItem>
                <DropdownItem href="/logout">Sign out</DropdownItem>
            {:else}
                <DropdownItem href="/login">Sign in</DropdownItem>
            {/if}
        </Dropdown>
    </NavUl>
</Navbar>
