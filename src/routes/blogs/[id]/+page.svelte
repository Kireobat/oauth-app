<script lang="ts">
    import type { BlogDto } from "$lib/generated/oauth-api";
    import { Avatar, Heading, P } from "flowbite-svelte";
    import type { PageProps } from "../$types";

    let { data }: PageProps = $props();

    let blogDto: BlogDto = $state(data as BlogDto);

    const estimateReadingTime = (): string => {
        const wordCount = Number(blogDto.description?.split(" ").length);
        if (isNaN(wordCount)) return "0 min";
        const avgWPM = 238;

        const readingTimeMinutesRaw = wordCount / avgWPM;

        return readingTimeMinutesRaw + " min";
    };
</script>

<div>
    <div class="text-center">
        <Heading tag="h1" class="font-normal text-4xl mb-4"
            >{blogDto.title}</Heading
        >
        <div class="flex justify-evenly mb-4 items-center">
            <Avatar src={blogDto.createdBy?.avatarUrl} />

            <P>{blogDto.createdBy?.username}</P>
            <P
                >{blogDto.createdTime?.toLocaleString("default", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}</P
            >
            <P>{estimateReadingTime()}</P>
        </div>
    </div>

    <div class="flex justify-center">
        <img
            src="https://picsum.photos/seed/{blogDto.id}/400/300"
            alt="randomImage"
            class="sm:rounded-t-md"
        />
    </div>

    <div>
        <P>{blogDto.description}</P>
    </div>
</div>
