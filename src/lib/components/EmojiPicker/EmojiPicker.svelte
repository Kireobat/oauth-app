<script lang="ts">
    import { browser } from "$app/environment";
    import { clickOutside } from "$lib/functions/clickOutside";
    import { Button, P } from "flowbite-svelte";
    import { FaceLaughOutline } from "flowbite-svelte-icons";
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

<Button class="editor-btn relative w-10 h-8" on:click={toggleEmojiPicker}
    ><FaceLaughOutline />
    <span class="absolute translate-x-[0.6rem] -translate-y-[0.6rem]">+</span>
</Button>

{#if emojiPickerVisible}
    <div
        class="absolute z-50 mt-10"
        bind:this={pickerContainer}
        use:clickOutside={() => (emojiPickerVisible = false)}
    ></div>
{/if}
