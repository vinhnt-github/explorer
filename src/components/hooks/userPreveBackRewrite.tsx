import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface UsePreventBackProps {
    shouldPreventBack?: boolean;
}

export function usePreventBack({ shouldPreventBack = true }: UsePreventBackProps) {
    const router = useRouter();

    useEffect(() => {
        if (!shouldPreventBack) return;

        // 1. Prevent refresh / tab close
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            // event.returnValue = ''; // Triggers the confirmation dialog
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        // 2. Prevent browser back/forward
        const handlePopState = () => {
            // console.log('handlePopState: history', history);
            router.push(router.asPath)
            history.go(1);
            // router.reload(); // Reloads the current page to prevent back navigation
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
    }, [router, shouldPreventBack]);
}

// export function usePreventBack({ shouldPreventBack = true }: UsePreventBackProps) {
//     const router = useRouter();

//     useEffect(() => {
//         if (!shouldPreventBack) return;

//         // Rewrite history so back button won't leave this page
//         history.pushState(null, '', location.href);

//         const handlePopState = () => {
//             history.pushState(null, '', location.href);
//             console.log('history', history)
//         };

//         window.addEventListener('popstate', handlePopState);

//         // Prevent refresh / tab close
//         const handleBeforeUnload = (event: BeforeUnloadEvent) => {
//             event.preventDefault();
//             event.returnValue = '';
//         };
//         window.addEventListener('beforeunload', handleBeforeUnload);

//         return () => {
//             window.removeEventListener('popstate', handlePopState);
//             window.removeEventListener('beforeunload', handleBeforeUnload);
//         };
//     }, [shouldPreventBack]);
// }