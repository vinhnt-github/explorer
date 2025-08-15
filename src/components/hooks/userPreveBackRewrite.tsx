import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface UsePreventBackProps {
    shouldPreventBack?: boolean;
    backUrl?: string;
}

export function usePreventBack({ shouldPreventBack = true, backUrl }: UsePreventBackProps) {
    const router = useRouter();

    useEffect(() => {
        if (!shouldPreventBack) return;

        // 1. Prevent refresh / tab close
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            // event.preventDefault();
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        // 2. Prevent browser back/forward
        const handlePopState = () => {
            if (backUrl) {
                router.replace(backUrl)
            } else {
                router.push(router.asPath).then(() => {
                    history.go(1);
                });
            }
        };
        window.addEventListener('popstate', handlePopState);

        // 3. Prevent internal Next.js navigation
        router.beforePopState(() => {
            console.log('Preventing internal navigation');
            console.log('Current URL:', router.asPath);
            console.log('Current location:', location);
            console.log('Current history:', history);
            return false; // Prevents the navigation
        });

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);

            // Restore default beforePopState handler
            router.beforePopState(() => true);

        };
    }, [router, shouldPreventBack, backUrl]);
}