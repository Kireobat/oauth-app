<script lang="ts">
    import { requireAuth } from "$lib/requireAuth";
    import { onMount } from "svelte";

    let authenticated = $state(false);

    onMount(async () => {
        try {
            authenticated = await requireAuth();
        } catch (error) {
            console.error(error);
            window.location.href = "/login?ref=" + window.location.href;
        }
    });

    let { children } = $props();
</script>

{#if authenticated === true}
    {@render children()}
{/if}
