import type { AppProps } from 'next/app';
import { AuthProvider } from '../lib/auth';
import '@/app/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
