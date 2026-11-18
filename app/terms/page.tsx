import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Terms & Conditions', robots: { index: false } };

export default function TermsPage() {
  return (
    <LegalPage title="Terms &amp; Conditions">
      <p>
        This website is published for general information about Apex Rosario by Apex Group. By
        using it you agree to the terms below. They should be reviewed and finalised by the
        developer’s legal team before launch.
      </p>
      <h2>No offer or contract</h2>
      <p>
        Nothing on this website constitutes an offer, an invitation to offer, or a contract of any
        kind. Bookings, allotments and payments are governed solely by the documents executed between
        the buyer and the developer.
      </p>
      <h2>Accuracy</h2>
      <p>
        While care has been taken to reproduce official Apex Rosario project information,
        details including plans, areas, specifications, amenities and distances are
        tentative and subject to change. Verify everything with the developer before taking any
        decision.
      </p>
      <h2>Intellectual property</h2>
      <p>
        All content, imagery, plans and marks on this website are the property of Apex Group or its
        licensors and may not be reproduced without permission.
      </p>
      <h2>External links</h2>
      <p>
        Links to third-party websites (including maps) are provided for convenience; Apex Group is not
        responsible for their content.
      </p>
    </LegalPage>
  );
}
