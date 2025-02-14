<script lang="ts">
    import { user } from "$lib/functions/user.svelte";
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

    const getUser = async () => {
        user.current = await authApi.getUser({ credentials: "include" });
    };

    onMount(() => {
        getUser();
    });
</script>

<Navbar class="border-b-2 sm:border-b-0 border-slate-300 h-16 sm:h-20">
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
            <Avatar src={user.current?.avatarUrl} />
        </NavLi>
        <Dropdown>
            {#if user.current?.username}
                <DropdownItem href={"/u/" + user.current.username}
                    >Your Profile</DropdownItem
                >
                <DropdownItem href="/dashboard/settings">Settings</DropdownItem>
                <DropdownItem href="/logout">Sign out</DropdownItem>
            {:else}
                <DropdownItem href="/login?ref={window.location.href}"
                    >Sign in</DropdownItem
                >
            {/if}
        </Dropdown>
    </NavUl>
</Navbar>
