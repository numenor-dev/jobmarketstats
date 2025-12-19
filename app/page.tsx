'use client';

import { useState } from 'react';
import Header from './components/header';
import JobChart from './components/jobchart';
import InfoContainer from './components/infocontainer';
import Footer from './components/footer';

export default function AppContainer() {

  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <main className="flex flex-col w-auto m-h-screen bg-zinc-100">
      <Header />
      <JobChart isMounted={() => setIsLoading(false)} />
      {!isLoading && <InfoContainer />}
      {!isLoading && <Footer />}
    </main>
  )
}
