import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { legal } from '@/data/rosario';

export const metadata: Metadata = { title: 'Disclaimer', robots: { index: false } };

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer">
      <p>{legal.disclaimer}</p>
      <h2>Imagery</h2>
      <p>
        All renders and photography on this website are artist’s impressions and are indicative
        only. They do not form part of any offer or contract.
      </p>
      <h2>Areas &amp; plans</h2>
      <p>
        Floor plans, dimensions and areas shown on this website are tentative. They are subject to change on final construction drawings
        and sanction by the competent authorities.
      </p>
    </LegalPage>
  );
}
