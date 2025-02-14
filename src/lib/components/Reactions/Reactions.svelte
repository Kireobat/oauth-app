<script lang="ts">
    import {
        BlogControllerApi,
        ReactionControllerApi,
        type ReactionDto,
        type UserDto,
    } from "$lib/generated/oauth-api";
    import { Dropdown, DropdownItem, P } from "flowbite-svelte";
    import { user } from "$lib/functions/user.svelte";
    import { DotsHorizontalOutline } from "flowbite-svelte-icons";

    interface ReactionsProps {
        reactions: ReactionDto[];
    }

    interface FormatedReaction {
        reaction: string;
        users: UserDto[];
    }

    let props: ReactionsProps = $props();
    let reactions: ReactionDto[] | undefined = $state(props.reactions);

    const reactionApi = new ReactionControllerApi();
    const blogApi = new BlogControllerApi();

    const formatReactions = (
        reactionList: ReactionDto[] | undefined,
    ): FormatedReaction[] => {
        const tempReactionList: FormatedReaction[] = [];

        if (reactionList === undefined) return tempReactionList;

        reactionList.forEach((reactionDto) => {
            if (
                reactionDto.reaction === undefined ||
                reactionDto.user === undefined
            )
                return;

            const addToIndex = tempReactionList.findIndex((e) => {
                return e.reaction === reactionDto.reaction;
            });

            if (addToIndex === -1) {
                tempReactionList.push({
                    reaction: reactionDto.reaction,
                    users: [reactionDto.user],
                });
            } else {
                tempReactionList[addToIndex].users.push(reactionDto.user);
            }
        });

        return tempReactionList;
    };

    let formatedReactions: FormatedReaction[] = $state(
        formatReactions(props.reactions),
    );

    const hasReacted = (users: UserDto[]): boolean => {
        const userHasReacted = users.findIndex((e) => {
            return e.id === user.current?.id;
        });

        if (userHasReacted === -1) {
            return false;
        }
        return true;
    };

    const handleReactionClick = async (
        reaction: string,
        hasReacted: boolean,
    ) => {
        if (!hasReacted) {
            await reactionApi.addReaction(
                {
                    createReactionDto: {
                        blogId: props.reactions[0].blogId,
                        reaction: reaction,
                    },
                },
                { credentials: "include" },
            );
            reactions = (
                await blogApi.getBlogById({
                    id: props.reactions[0].blogId as number,
                })
            ).reactions;
        } else {
            const index = props.reactions.findIndex((e) => {
                return (
                    e.reaction === reaction && e.user?.id === user.current?.id
                );
            });

            const reactionId = props.reactions[index].id;

            if (reactionId === undefined) {
                console.error("unable to dertermine reactionId");
                return;
            }

            await reactionApi.removeReaction(
                { reactionId: reactionId },
                { credentials: "include" },
            );
            reactions = (
                await blogApi.getBlogById({
                    id: props.reactions[0].blogId as number,
                })
            ).reactions;
        }
    };

    $effect(() => {
        reactions = props.reactions;
    });

    $effect(() => {
        formatedReactions = formatReactions(reactions);
    });
</script>

{#each formatedReactions as formatedReaction, index}
    {#if index < 3}
        <button
            class="flex px-2 py-1 rounded-md {hasReacted(formatedReaction.users)
                ? 'bg-primary-300'
                : 'bg-slate-300'}"
            onclick={() =>
                handleReactionClick(
                    formatedReaction.reaction,
                    hasReacted(formatedReaction.users),
                )}
        >
            <P>{formatedReaction.reaction}</P>
            <P class="dark:text-black">{formatedReaction.users.length}</P>
        </button>
    {/if}
{/each}

{#if formatedReactions.length > 3}
    <div class="flex flex-col justify-center">
        <DotsHorizontalOutline class="dots-menu dark:text-white" />
    </div>
    <Dropdown>
        {#each formatedReactions as formatedReaction, index}
            {#if index > 2}
                <DropdownItem>
                    <button
                        class="flex px-2 py-1 rounded-md {hasReacted(
                            formatedReaction.users,
                        )
                            ? 'bg-primary-300'
                            : 'bg-slate-300'}"
                        onclick={() =>
                            handleReactionClick(
                                formatedReaction.reaction,
                                hasReacted(formatedReaction.users),
                            )}
                    >
                        <P>{formatedReaction.reaction}</P>
                        <P class="dark:text-black"
                            >{formatedReaction.users.length}</P
                        >
                    </button>
                </DropdownItem>
            {/if}
        {/each}
    </Dropdown>
{/if}
