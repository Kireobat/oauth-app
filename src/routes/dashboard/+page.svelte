<script lang="ts">
    import {
        PrivateControllerApi,
        PublicControllerApi,
        type CreateReviewDto,
        type CreateReviewRequest,
        type GithubUserDto,
        type ReviewEntity,
    } from "$lib/generated/oauth-api";
    import { Button, Heading, Input, Skeleton } from "flowbite-svelte";
    import { onMount } from "svelte";

    const privateApi = new PrivateControllerApi();
    const publicApi = new PublicControllerApi();
    let user: GithubUserDto | undefined = $state();
    let reviews: ReviewEntity[] = $state([]);

    let title = $state("");
    let description = $state("");
    let rating = $state(0);

    const getUser = async () => {
        user = await privateApi.getUser({ credentials: "include" });
    };

    const createReview = async () => {
        const createReviewDto: CreateReviewDto = {
            title: title,
            description: description,
            rating: rating,
        };

        await privateApi.createReview(
            {
                createReviewDto: createReviewDto,
            },
            { credentials: "include" },
        );
    };

    const getReviews = async () => {
        reviews = await publicApi.getReviews();
    };

    onMount(() => {
        getUser();
        getReviews();
    });
</script>

<Heading
    tag="h1"
    class="mb-4"
    customSize="text-4xl font-bold  md:text-5xl lg:text-6xl"
>
    Welcome, {user?.username}
</Heading>

<div>
    <Input type="text" id="title" bind:value={title} />
    <Input type="text" id="description" bind:value={description} />
    <Input type="number" id="rating" bind:value={rating} />
    <Button onclick={createReview}>Create review</Button>
</div>

<div>
    {#each reviews as review}
        <br />
        <h1>{review.title}</h1>
        <h1>{review.description}</h1>
        <h1>{review.rating}</h1>
        <h1>{review.user?.username}</h1>
        <h1>{review.createdTime}</h1>
    {/each}
</div>

<Skeleton />
<Skeleton />
<Skeleton />
<Skeleton />
<Skeleton />
<Skeleton />
<Skeleton />
<Skeleton />
<Skeleton />
<Skeleton />
<Skeleton />
<Skeleton />
<Skeleton />
<Skeleton />
