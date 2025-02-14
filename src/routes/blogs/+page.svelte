<script lang="ts">
    import BlogCard from "$lib/components/BlogCard/BlogCard.svelte";
    import {
        BlogControllerApi,
        type BlogDto,
        type OAuthApiPageDtoBlogDto,
    } from "$lib/generated/oauth-api";
    import { Spinner } from "flowbite-svelte";
    import { onMount } from "svelte";
    import { infiniteScroll } from "$lib/functions/infiniteScroll";
    import { windowWidth } from "$lib/functions/window.svelte";

    const blogControllerApi = new BlogControllerApi();

    let pagedBlogResponse: OAuthApiPageDtoBlogDto | undefined = $state();
    let loadedBlogs: BlogDto[] = $state([]);
    let pageNumber: number = $state(0);
    let pageSize: number = $state(0);
    let loading: boolean = $state(false);
    let elementRef: HTMLElement | null = $state(null);

    const calculatePageSize = () => {
        switch (true) {
            // smaller than sm
            case windowWidth.current < 640:
                return 1;
            // sm
            case windowWidth.current < 768:
                return 2;
            // md
            case windowWidth.current < 1024:
                return 3;
            // lg+
            default:
                return 4;
        }
    };

    const getBlogs = async () => {
        if (
            pagedBlogResponse?.totalPages &&
            pageNumber >= pagedBlogResponse.totalPages
        ) {
            return;
        }
        try {
            loading = true;

            pagedBlogResponse = await blogControllerApi.getBlogs({
                page: pageNumber,
                size: pageSize,
                sort: ["id,ASC"],
            });

            if (pagedBlogResponse.page === undefined) return;

            loadedBlogs = loadedBlogs.concat(
                pagedBlogResponse.page.filter((filterEl) => {
                    return !loadedBlogs.some((el) => el.id === filterEl.id);
                }),
            );

            if (
                pagedBlogResponse.totalPages &&
                pageNumber < pagedBlogResponse.totalPages
            ) {
                pageNumber = pageNumber + 1;
            }

            loading = false;
        } catch (error) {}
    };

    onMount(async () => {
        pageSize = calculatePageSize();
        await getBlogs();
    });

    $effect(() => {
        if (elementRef) {
            infiniteScroll(getBlogs, elementRef);
        }
    });

    $effect(() => {
        if (windowWidth.current > -1) {
            pageSize = calculatePageSize();
            pageNumber = 0;
        }
    });
</script>

{#if loadedBlogs.length > 0}
    <div class="pb-24 sm:pb-4 sm:bg-transparent dark:sm:bg-transparent">
        <div class="sm:flex sm:justify-center sm:w-full">
            <div
                class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
                {#each loadedBlogs as blog}
                    <BlogCard {blog} />
                {/each}
            </div>
        </div>
        {#if loading}
            <div class="w-full flex justify-center py-2">
                <Spinner size="16" />
            </div>
        {/if}
        {#if loading === false}
            <li bind:this={elementRef}></li>
        {/if}
    </div>
{/if}
