<script lang="ts">
    import type {
        OAuthApiPageDtoBlogDto,
        UserDto,
    } from "$lib/generated/oauth-api";
    import { Avatar, Button, P, TabItem, Tabs } from "flowbite-svelte";
    import type { PageProps } from "./$types";
    import { getBlogs } from "$lib/functions/getBlogs";
    import { onMount } from "svelte";
    import { UserAddOutline, UserAddSolid } from "flowbite-svelte-icons";
    import BlogCard from "$lib/components/BlogCard/BlogCard.svelte";

    let { data }: PageProps = $props();

    let userDto: UserDto = $state(data as UserDto);

    let blogsPageResponse: OAuthApiPageDtoBlogDto | undefined = $state();

    let discoverOtherUsers: boolean = $state(true);

    onMount(async () => {
        blogsPageResponse = await getBlogs(
            0,
            1000,
            ["id,DESC"],
            undefined,
            userDto.id,
        );
    });
</script>

<div>
    <div class="mb-4">
        <div class="flex gap-4">
            <Avatar src={userDto.avatarUrl} size="lg" />
            <div class="flex flex-col">
                <P>{userDto.username}</P>
                <div class="flex gap-4">
                    <div>
                        <P weight="bold">{blogsPageResponse?.totalItems}</P>
                        <P>blogs</P>
                    </div>
                    <div>
                        <P weight="bold">45</P>
                        <P>followers</P>
                    </div>
                    <div>
                        <P weight="bold">12</P>
                        <P>following</P>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex gap-2">
            <Button outline color="dark">
                <P>Edit profile</P>
            </Button>
            <Button outline color="dark">
                <P>Share profile</P>
            </Button>
            <Button
                outline
                color="dark"
                onclick={() => (discoverOtherUsers = !discoverOtherUsers)}
            >
                {#if discoverOtherUsers}
                    <UserAddSolid size="lg" />
                {:else}
                    <UserAddOutline size="lg" />
                {/if}
            </Button>
        </div>
    </div>

    {#if discoverOtherUsers}
        <div class="mb-4">
            <P>Discover</P>
            <div class="flex">
                <div>
                    <P>User 1</P>
                </div>
                <div>
                    <P>User 2</P>
                </div>
                <div>
                    <P>User 3</P>
                </div>
            </div>
        </div>
    {/if}
    <div>
        <Tabs>
            <TabItem open title="Blogs">
                {#if blogsPageResponse?.page}
                    {#each blogsPageResponse.page as blogDto}
                        <BlogCard blog={blogDto} />
                    {/each}
                {/if}
            </TabItem>
            <TabItem title="Other"></TabItem>
        </Tabs>
    </div>
</div>
