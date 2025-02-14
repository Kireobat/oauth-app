<script lang="ts">
    import "../app.css";
    import Navbar from "$lib/components/Navbar/Navbar.svelte";
    import { windowHeight, windowWidth } from "$lib/functions/window.svelte";
    let { children, data } = $props();
</script>

<svelte:window
    bind:innerWidth={windowWidth.current}
    bind:innerHeight={windowHeight.current}
/>

<div class="dark:bg-slate-800">
    <div class="fixed w-full">
        <Navbar />
    </div>
    <div class="pt-20 sm:pt-24">
        {@render children()}
    </div>
</div>
