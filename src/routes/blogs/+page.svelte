<script lang="ts">
    import BlogCard from "$lib/components/BlogCard/BlogCard.svelte";
    import {
        BlogControllerApi,
        type BlogDto,
        type OAuthApiPageDtoBlogDto,
    } from "$lib/generated/oauth-api";
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
