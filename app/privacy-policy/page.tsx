import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { contact } from '@/data/rosario';

export const metadata: Metadata = { title: 'Privacy Policy', robots: { index: false } };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This policy explains how Apex Group handles the information you share through the Apex Rosario
        website. It should be reviewed and finalised by the developer’s legal team before
        launch.
      </p>
      <h2>What we collect</h2>
      <p>
        When you submit an enquiry we collect your name, phone number, email address, requirement and
        any message you provide, together with basic campaign parameters (such as UTM tags or a Google
        click ID) that may be present in the page URL.
      </p>
      <h2>How we use it</h2>
      <p>
        Your details are used only to respond to your enquiry about Apex Rosario — to share project
        information, discuss availability and arrange a site visit. We may contact you by phone, email
        or WhatsApp for this purpose.
      </p>
      <h2>Retention &amp; sharing</h2>
      <p>
        Enquiry details are retained only as long as needed to assist you and to meet legal
        obligations, and are shared only with the Apex Rosario sales team and the developer’s CRM.
        They are not sold or shared with unrelated third parties.
      </p>
      <h2>Your choices</h2>
      <p>
        You can ask us to update or delete your details, or to stop contacting you, at any time by
        writing to <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    </LegalPage>
  );
}
