import Header from './components/header';
import JobChart from './components/jobchart';
import Footer from './components/footer';

export default function AppContainer() {
  return (
    <main className="flex flex-col w-auto m-h-screen bg-zinc-100">
      <Header />
      <JobChart />
      <Footer />
    </main>
  )
}
