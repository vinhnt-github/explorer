import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

interface HistoryEntry {
    from: string | null;
    to: string;
}

export function useRouteHistory() {
    const router = useRouter();
    const historyRef = useRef<HistoryEntry[]>([]);
    const [current, setCurrent] = useState<string | null>(null);
    const [previous, setPrevious] = useState<string | null>(null);

    useEffect(() => {
        // Initialize current path
        setCurrent(router.asPath);

        const handleRouteChange = (url: string) => {
            console.log('handleRouteChange : history >> ', history);
            // setPrevious(router.asPath);
            // setCurrent(url);

            // historyRef.current.push({
            //     from: router.asPath,
            //     to: url,
            // });
        };

        // Internal navigation tracking
        router.events.on('routeChangeStart', handleRouteChange);

        // Browser back/forward tracking
        const handlePopState = () => {
            // setPrevious(router.asPath);
            // setCurrent(window.location.pathname + window.location.search);
            // historyRef.current.push({
            //     from: router.asPath,
            //     to: window.location.pathname + window.location.search,
            // });
        };
        window.addEventListener('popstate', handlePopState);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [router]);

    return {
        previous,
        current,
        history: historyRef.current,
    };
}
