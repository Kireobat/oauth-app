<script lang="ts">
    import BlogCard from "$lib/components/BlogCard/BlogCard.svelte";
    import BlogModal from "$lib/components/BlogModal/BlogModal.svelte";
    import {
        BlogControllerApi,
        type BlogDto,
        type OAuthApiPageDtoBlogDto,
    } from "$lib/generated/oauth-api";
    import { P } from "flowbite-svelte";
    import { onMount } from "svelte";

    const blogControllerApi = new BlogControllerApi();

    let pagedBlogResponse: OAuthApiPageDtoBlogDto | undefined = $state();

    onMount(async () => {
        pagedBlogResponse = await blogControllerApi.getBlogs({
            page: 0,
            size: 100,
            sort: ["id,ASC"],
        });
    });
</script>

<div
    class="flex w-full justify-evenly fixed bottom-0 bg-slate-100 py-4 sm:bg-transparent sm:static z-50"
>
    <div class="order-1 sm:order-1">
        <P>Home</P>
    </div>
    <div class="order-2 sm:order-2">
        <P>Communities</P>
    </div>
    <div class="order-3 sm:order-5">
        <BlogModal />
    </div>
    <div class="order-4 sm:order-3">
        <P>Chat</P>
    </div>
    <div class="order-5 sm:order-4">
        <P>Inbox</P>
    </div>
</div>
{#if pagedBlogResponse != undefined && pagedBlogResponse.page != undefined}
    <div class="sm:flex sm:justify-center sm:w-full">
        <div
            class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gray-100 dark:bg-slate-600 sm:bg-transparent dark:sm:bg-transparent"
        >
            {#each pagedBlogResponse.page as blog}
                <BlogCard {blog} />
            {/each}
        </div>
    </div>
{/if}
