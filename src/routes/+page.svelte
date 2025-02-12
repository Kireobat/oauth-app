<script lang="ts">
    import {
        Button,
        Heading,
        ImagePlaceholder,
        P,
        Skeleton,
    } from "flowbite-svelte";
    import { ArrowRightOutline } from "flowbite-svelte-icons";
</script>

<div class="text-center">
    <Heading
        tag="h1"
        class="mb-4"
        customSize="text-4xl font-bold  md:text-5xl lg:text-6xl"
        >We invest in the world’s potential</Heading
    >
    <P class="mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Here at Flowbite we focus on markets where technology, innovation, and
        capital can unlock long-term value and drive economic growth.
    </P>
    <Button href="/">
        Learn more
        <ArrowRightOutline class="w-6 h-6 ms-2" />
    </Button>
</div>

<Button href="/blogs">Blogs</Button>
