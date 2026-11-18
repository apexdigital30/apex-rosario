import { enquiry, contact, legal } from '@/data/rosario';
import { Container, SectionLabel } from './ui';
import EnquiryForm from './EnquiryForm';

export default function Enquiry() {
  return (
    <section id="contact" className="scroll-mt-[var(--header-h)] bg-navy py-[4.5rem] text-pearl sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel tone="light">{enquiry.label}</SectionLabel>
            <h2 className="mt-7 font-display text-display-lg font-medium">
              {enquiry.headline.map((l, i) => (
                <span key={i} className="block overflow-hidden">
                  <span data-reveal data-reveal-delay={i * 100} className="block">
                    {l}
                  </span>
                </span>
              ))}
            </h2>
            <p data-reveal className="mt-7 text-body-lg text-pearl/75">
              {enquiry.intro}
            </p>

            <dl className="mt-10 space-y-4 border-t border-pearl/15 pt-8 text-[0.95rem]">
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-gold">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${contact.email}`} className="text-pearl hover:text-gold">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-gold">Office</dt>
                <dd className="mt-1 text-pearl/80">{contact.corporateAddress}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-gold">Site address</dt>
                <dd className="mt-1 text-pearl/80">{contact.siteAddress}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-gold">Directions</dt>
                <dd className="mt-1">
                  <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-pearl hover:text-gold">
                    Open in Google Maps
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-pearl/15 bg-navy/40 p-6 sm:p-8">
              <EnquiryForm tone="dark" />
              <p className="mt-6 text-[0.72rem] leading-relaxed text-pearl/40">{legal.disclaimer}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
