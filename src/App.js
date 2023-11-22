import React, { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SkeletonProgress from './components/custom-progress/SkeletonProgress';

const Router = lazy(() => import('./routes'));
const ThemeProvider = lazy(() => import('./theme'));

// ----------------------------------------------------------------------

export default function App() {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<SkeletonProgress skeletonHeight="100vh" />}>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </Suspense>
        <ToastContainer />
      </BrowserRouter>
    </HelmetProvider>
  );
}


