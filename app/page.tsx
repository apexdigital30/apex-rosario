import ScrollVideoHero from '@/components/ScrollVideoHero';
import ProjectIntroduction from '@/components/ProjectIntroduction';
import LifeAt from '@/components/LifeAt';
import Residences from '@/components/Residences';
import Amenities from '@/components/Amenities';
import MasterPlan from '@/components/MasterPlan';
import Specifications from '@/components/Specifications';
import Location from '@/components/Location';
import ConstructionUpdates from '@/components/ConstructionUpdates';
import Gallery from '@/components/Gallery';
import AboutApex from '@/components/AboutApex';
import FAQ from '@/components/FAQ';
import Enquiry from '@/components/Enquiry';
import Footer from '@/components/Footer';
import StatueInterlude from '@/components/StatueInterlude';
import RevealProvider from '@/components/RevealProvider';
import EnquiryModal from '@/components/EnquiryModal';
import ReraPopup from '@/components/ReraPopup';
import { project, legal, siteMeta, faqs, interludes } from '@/data/rosario';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Apex Rosario — Official Project Website',
  url: project.url,
  description: siteMeta.description,
  about: { '@type': 'ApartmentComplex', name: 'Apex Rosario' },
  publisher: { '@type': 'Organization', name: legal.brand },
};

export default function Page() {
  return (
    <>
      <main id="content">
        <h1 className="sr-only">
          Apex Rosario by The Apex Group — A Royal Living: 3 &amp; 4 BHK residences at Siddharth Vihar,
          Ghaziabad.
        </h1>
        <ScrollVideoHero />
        <ProjectIntroduction />
        <StatueInterlude data={interludes.sculptor} />
        <LifeAt />
        <MasterPlan />
        <StatueInterlude data={interludes.orator} />
        <Amenities />
        <StatueInterlude data={interludes.reader} />
        <Residences />
        <Specifications />
        <StatueInterlude data={interludes.thinker} />
        <Location />
        <ConstructionUpdates />
        <StatueInterlude data={interludes.reclining} />
        <Gallery />
        <AboutApex />
        <FAQ />
        <StatueInterlude data={interludes.senator} />
        <Enquiry />
      </main>
      <Footer />

      <RevealProvider />
      <EnquiryModal />
      <ReraPopup />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
