'use client';

import { useState, useCallback } from 'react';
import Header from './header';
import JobChart from './jobchart';
import InfoContainer from './infocontainer';
import Footer from './footer';
import { ThemeToggle } from "./themetoggle";

export default function AppContainer() {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleMounted = useCallback(() => setIsLoading(false), []);

  return (
    <main className="flex flex-col bg-neutral-200 dark:bg-neutral-950 m-h-screen">
      <div className="flex justify-end mx-8 my-10 md:mx-20">
      <ThemeToggle />
      </div>
      <Header />
      <JobChart isMounted={handleMounted} />
      {!isLoading && <InfoContainer />}
      {!isLoading && <Footer />}
    </main>
  )
}
