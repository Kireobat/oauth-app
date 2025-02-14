<script lang="ts">
    import {
        BlogControllerApi,
        type CreateBlogDto,
    } from "$lib/generated/oauth-api";
    import { Button, Modal, Label, Input } from "flowbite-svelte";
    import type { Snippet } from "svelte";

    interface BlogModalProps {
        children: Snippet<[]>;
        open: boolean;
    }

    let { children, open = $bindable(false) }: BlogModalProps = $props();
    let createBlogDto: CreateBlogDto = $state({});

    const blogApi = new BlogControllerApi();

    const handleBlogCreation = async () => {
        try {
            if (
                createBlogDto.title === undefined ||
                createBlogDto.description === undefined
            ) {
                alert("undefined not allowed");
                return;
            }

            const res = await blogApi.createBlog(
                { createBlogDto: createBlogDto },
                { credentials: "include" },
            );
            alert(JSON.stringify(res));
        } catch (error) {
            console.error(error);
        }
    };
</script>

{@render children()}

<Modal bind:open size="xs" autoclose={true} class="w-full">
    <form class="flex flex-col space-y-6" action="#">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Write a new blog post
        </h3>
        <Label class="space-y-2">
            <span>Title</span>
            <Input
                type="text"
                name="title"
                placeholder="blog title"
                required
                bind:value={createBlogDto.title}
            />
        </Label>
        <Label class="space-y-2">
            <span>Text</span>
            <Input
                type="text"
                name="body"
                required
                bind:value={createBlogDto.description}
            />
        </Label>
        <Button type="submit" class="w-full1" onclick={handleBlogCreation}
            >Post</Button
        >
    </form>
</Modal>
