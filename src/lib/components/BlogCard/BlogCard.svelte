<script lang="ts">
    import {
        BlogControllerApi,
        ReactionControllerApi,
        type BlogDto,
        type ReactionDto,
    } from "$lib/generated/oauth-api";
    import { Heading, P } from "flowbite-svelte";
    import EmojiPicker from "../EmojiPicker/EmojiPicker.svelte";
    import Reactions from "../Reactions/Reactions.svelte";

    interface BlogCardProps {
        blog: BlogDto;
    }

    let props: BlogCardProps = $props();
    let emoji: string | undefined = $state();
    let reactions: ReactionDto[] | undefined = $state(props.blog.reactions);
    const reactionApi = new ReactionControllerApi();
    const blogApi = new BlogControllerApi();

    const limitedBody = props.blog.body?.substring(0, 50);

    $effect(() => {
        const updateReactions = async () => {
            if (emoji === "" || emoji === undefined) return;
            await reactionApi.addReaction(
                {
                    createReactionDto: {
                        blogId: props.blog.id,
                        reaction: emoji,
                    },
                },
                { credentials: "include" },
            );
            reactions = (
                await blogApi.getBlogById({ id: props.blog.id as number })
            ).reactions;
        };
        updateReactions();
    });
</script>

<div
    class="sm:dark:bg-slate-600 sm:bg-gray-100 sm:rounded-md w-full sm:w-min flex justify-center sm:pb-2"
>
    <div class="flex flex-col justify-between">
        <a href="/blogs/{props.blog.id}" class="w-full">
            <div class="flex justify-center">
                <img
                    src="https://picsum.photos/seed/{props.blog.id}/400/300"
                    alt="randomImage"
                    class="sm:rounded-t-md"
                />
            </div>
            <div class="mt-2 px-3 pb-2">
                <P size="sm" weight="light" italic>
                    {props.blog.createdTime?.toLocaleString("default", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </P>
                <Heading tag="h4" class=" w-56">{props.blog.title}</Heading>
                <P>{limitedBody?.trimEnd()}...</P>
            </div>
        </a>
        <div class="flex justify-end mx-4 gap-3">
            {#if reactions != undefined}
                <Reactions {reactions} />
            {/if}
            <EmojiPicker bind:emoji />
        </div>
    </div>
</div>
