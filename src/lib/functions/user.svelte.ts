import type { UserDto } from "$lib/generated/oauth-api";

export const user: { current: UserDto | undefined } = $state({ current: undefined })