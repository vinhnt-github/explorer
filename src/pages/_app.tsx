import { useRouteHistory } from '@/components/hooks/useRouteHistory';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    useRouteHistory()
    return <Component {...pageProps} />;
}

export default MyApp;
