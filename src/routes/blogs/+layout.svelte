<script lang="ts">
    import BlogModal from "$lib/components/BlogModal/BlogModal.svelte";
    import { user } from "$lib/functions/user.svelte";
    import { Avatar, Button, P } from "flowbite-svelte";
    import {
        CirclePlusOutline,
        EnvelopeOutline,
        HomeOutline,
        MessagesOutline,
        SearchOutline,
    } from "flowbite-svelte-icons";
    import { onMount } from "svelte";

    let openModal: boolean = $state(false);

    let { children } = $props();

    let href = $state("");

    onMount(() => {
        href = window.location.href;
    });
</script>

{@render children()}

<div
    class="flex w-full justify-evenly fixed bottom-0 bg-white dark:bg-slate-800 py-2 sm:static z-50 border-t-2 dark:border-slate-700 sm:border-t-0"
>
    <a
        href="/blogs"
        class="order-1 sm:order-1 flex flex-col items-center hover:dark:bg-slate-700 hover:bg-slate-100 px-4 py-2 rounded-md"
    >
        <HomeOutline size="xl" class="dark:text-slate-100" />
        <P size="sm">Home</P>
    </a>
    <a
        href="/blogs/discover"
        class="order-2 sm:order-2 flex flex-col items-center hover:dark:bg-slate-700 hover:bg-slate-100 px-4 py-2 rounded-md"
    >
        <SearchOutline size="xl" class="dark:text-slate-100" />
        <P size="sm">Search</P>
    </a>
    <div class="order-3 sm:order-5 flex justify-center">
        <BlogModal bind:open={openModal}>
            <Button on:click={() => (openModal = true)} class="hidden sm:block">
                <span>New blog</span>
            </Button>
            <button
                onclick={() => (openModal = true)}
                class="sm:hidden flex flex-col items-center hover:dark:bg-slate-700 hover:bg-slate-100 px-4 py-2 rounded-md"
            >
                <CirclePlusOutline size="xl" class="dark:text-slate-100" />
                <P size="sm">Create</P>
            </button>
        </BlogModal>
    </div>
    <div
        class="order-4 sm:order-3 flex flex-col items-center hover:dark:bg-slate-700 hover:bg-slate-100 px-4 py-2 rounded-md"
    >
        <MessagesOutline size="xl" class="dark:text-slate-100" />
        <P size="sm">Chat</P>
    </div>
    {#if user.current?.avatarUrl}
        <a
            href="/blogs/u/{user.current.username}"
            class="order-5 sm:order-4 flex flex-col items-center hover:dark:bg-slate-700 hover:bg-slate-100 px-4 py-2 rounded-md"
        >
            <Avatar src={user.current.avatarUrl} size="sm" />
            <P size="sm">Profile</P>
        </a>
    {:else}
        <a
            href="/login?ref={href}"
            class="order-5 sm:order-4 flex flex-col items-center hover:dark:bg-slate-700 hover:bg-slate-100 px-4 py-2 rounded-md"
        >
            <EnvelopeOutline size="xl" class="dark:text-slate-100" />
            <P size="sm">Log in</P>
        </a>
    {/if}
</div>
