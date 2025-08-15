import SingletonRouter from 'next/router';
import { useEffect } from 'react';


export function usePreventBack({ shouldPreventBack = true }) {
    useEffect(() => {
        //eslint-disable-next-line;
        // @ts-ignore Because 'change' is private and only accessible within class 'Router'
        if (!SingletonRouter.router) return;

        //eslint-disable-next-line;
        // @ts-ignore Because 'change' is private and only accessible within class 'Router'
        const originalChangeFunction = SingletonRouter.router.change
        const originalBeforeUnloadFunction = window.onbeforeunload

        if (shouldPreventBack) {
            window.onbeforeunload = (event) => ""
        } else {
            window.onbeforeunload = originalBeforeUnloadFunction
        }

        if (shouldPreventBack) {
            //eslint-disable-next-line;
            // @ts-ignore 
            SingletonRouter.router.change = async (...args) => {
                const [historyMethod, , as] = args;

                //eslint-disable-next-line;
                // @ts-ignore: Because 'state' is private and only accessible within class 'Router'.
                const currentUrl = SingletonRouter.router?.state.asPath.split('?')[0]
                const targetUrl = as.split('?')[0]

                const hasNavigateAwayFromPage = currentUrl !== targetUrl
                const wasBackOrForwardBrowserButtonClick = historyMethod === "replaceState" || historyMethod === "pushState"

                if (hasNavigateAwayFromPage && wasBackOrForwardBrowserButtonClick) {
                    //eslint-disable-next-line;
                    // @ts-ignore: Because 'state' is private and only accessible within class 'Router'.
                    // Prevent internal Next.js navigation by pushing the current URL back to the history stack
                    await SingletonRouter.router?.push(SingletonRouter.router?.state.asPath)

                    // Prevent back navigation in browser history
                    history.go(1)

                }
            };
        }

        return () => {
            if (!SingletonRouter.router) return;
            //eslint-disable-next-line;
            // @ts-ignore Because 'change' is private and only accessible within class 'Router'
            SingletonRouter.router.change = originalChangeFunction
            window.onbeforeunload = originalBeforeUnloadFunction
        };
    }, []);
}