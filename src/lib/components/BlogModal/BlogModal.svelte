<script lang="ts">
    import { Button, Modal, Label, Input, Checkbox } from "flowbite-svelte";
    import { CirclePlusOutline } from "flowbite-svelte-icons";
    let formModal = false;
</script>

<Button on:click={() => (formModal = true)}>
    <span class="hidden sm:block">New blog</span>
    <CirclePlusOutline class="block sm:hidden" size="xl" />
</Button>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" action="#">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Write a new blog post
        </h3>
        <Label class="space-y-2">
            <span>Title</span>
            <Input type="text" name="title" placeholder="blog title" required />
        </Label>
        <Label class="space-y-2">
            <span>Text</span>
            <Input type="text" name="body" required />
        </Label>
        <Button type="submit" class="w-full1">Post</Button>
    </form>
</Modal>
