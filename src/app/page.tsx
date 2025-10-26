import { Faq } from '@/components/landing/faq';
import { Features } from '@/components/landing/features';
import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { HowItWorks } from '@/components/landing/how-it-works';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Features />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
