<script lang="ts">
    import type { BlogDto } from "$lib/generated/oauth-api";
    import { Heading, P } from "flowbite-svelte";
    import EmojiPicker from "../EmojiPicker/EmojiPicker.svelte";

    interface BlogCardProps {
        blog: BlogDto;
    }

    let props: BlogCardProps = $props();
    let emoji = $state();

    $inspect(emoji);

    const limitedBody = props.blog.body?.substring(0, 50);
</script>

<div>
    <h1>Selected Emoji: {emoji}</h1>
</div>

<div
    class="dark:bg-slate-600 bg-gray-100 sm:rounded-md w-full sm:w-min flex justify-center"
>
    <div>
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
            <P>👍3 ❤5 😍2</P>
            <EmojiPicker bind:emoji />
        </div>
    </div>
</div>
