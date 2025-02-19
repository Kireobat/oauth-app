<script lang="ts">
    import { page } from "$app/state";
    import { getBlogs } from "$lib/functions/getBlogs";
    import type { OAuthApiPageDtoBlogDto } from "$lib/generated/oauth-api";
    import { P, Search, TabItem, Tabs } from "flowbite-svelte";

    let searchText: string = $state("");
    let blogSearchResults: OAuthApiPageDtoBlogDto | undefined = $state();

    const handleSearch = async () => {
        if (searchText === "") {
            blogSearchResults = undefined;
            return;
        }
        blogSearchResults = await getBlogs(
            0,
            5,
            ["id,DESC"],
            undefined,
            undefined,
            searchText,
        );
    };
</script>

<Search bind:value={searchText} on:input={handleSearch} />

<div>
    <Tabs>
        <TabItem open title="Blogs">
            {#if blogSearchResults != undefined && blogSearchResults.page != undefined}
                {#each blogSearchResults.page as blog}
                    <a href="/blogs/{blog.id}"><P>{blog.title}</P></a>
                {/each}
            {:else}
                <P>No results</P>
            {/if}
        </TabItem>
        <TabItem title="Users">
            <P>No results</P>
        </TabItem>
    </Tabs>
</div>
