export const infiniteScroll = (fetchFunction: () => Promise<void>, element: HTMLElement | null) => {
    if (element) {
        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    fetchFunction()
                }
            },
            { threshold: 1 }
        );
        observer.observe(element);
    }
};
