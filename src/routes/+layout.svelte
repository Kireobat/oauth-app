<script>
    import "../app.css";
    import Navbar from "$lib/components/Navbar/Navbar.svelte";
    let { children, data } = $props();
</script>

<div class="dark:bg-slate-800">
    <Navbar />
    {@render children()}
</div>
