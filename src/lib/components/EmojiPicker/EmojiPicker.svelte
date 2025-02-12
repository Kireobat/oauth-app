<script lang="ts">
    import { browser } from "$app/environment";

    import { clickOutside } from "$lib/functions/clickOutside";
    import { Button } from "flowbite-svelte";
    import { onDestroy, onMount } from "svelte";

    let { emoji = $bindable() } = $props();
    let emojiPickerVisible = $state(false);
    let pickerContainer: HTMLElement | undefined = $state();
    let emojiPicker: HTMLElement;

    onMount(() => {
        initEmojiPicker();
    });

    async function initEmojiPicker() {
        if (browser) {
            await import("emoji-picker-element");
            emojiPicker = document.createElement("emoji-picker");
            emojiPicker.addEventListener("emoji-click", (event: Event) => {
                const customEvent = event as CustomEvent;
                emoji = customEvent.detail.unicode;
            });
        }
    }

    onDestroy(() => {
        emojiPicker?.remove();
    });

    function toggleEmojiPicker() {
        emojiPickerVisible = !emojiPickerVisible;
    }

    $effect(() => {
        if (pickerContainer && emojiPickerVisible) {
            pickerContainer.appendChild(emojiPicker);
        } else if (pickerContainer) {
            pickerContainer.innerHTML = "";
        }
    });
</script>

<Button class="editor-btn relative" on:click={toggleEmojiPicker}>React</Button>

{#if emojiPickerVisible}
    <div
        class="absolute z-50 mt-10"
        bind:this={pickerContainer}
        use:clickOutside={() => (emojiPickerVisible = false)}
    ></div>
{/if}
