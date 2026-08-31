import { useEffect } from 'react';
import { CursorAura } from './components/CursorAura';
import { Navigation } from './components/Navigation';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { VibeCoded } from './sections/VibeCoded';
import { FromScratch } from './sections/FromScratch';
import { ConceptualExperiments } from './sections/ConceptualExperiments';
import { Work } from './sections/Work';
import { MakingOf } from './sections/MakingOf';
import { Footer } from './sections/Footer';
import { siteConfig } from './config';

function App() {
  useEffect(() => {
    document.title = siteConfig.title;
    document.documentElement.lang = siteConfig.language;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', siteConfig.description);
    else {
      const el = document.createElement('meta');
      el.name = 'description';
      el.content = siteConfig.description;
      document.head.appendChild(el);
    }
  }, []);

  return (
    <div className="relative isolate min-h-screen bg-background text-foreground overflow-x-hidden">
      <CursorAura />
      <Navigation />
      <main>
        <Hero />
        <About />
        <VibeCoded />
        <FromScratch />
        <ConceptualExperiments />
        <Work />
        <MakingOf />
      </main>
      <Footer />
    </div>
  );
}

export default App;
