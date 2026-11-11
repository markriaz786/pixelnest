import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy Policy" };

// Draft wording: have it reviewed before relying on it.
export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="November 2026"
      sections={[
        {
          heading: "Who we are",
          body: [
            `${site.name} ("Pixelnest", "we", "us") is a product design and development agency. This policy explains what personal information we collect through this website and how we use it.`,
          ],
        },
        {
          heading: "What we collect",
          body: [
            "When you contact us, by email or through the contact form (which opens your own email app), we receive the details you choose to share, such as your name, email address, company and message.",
            "Our hosting provider may record basic technical data, such as IP address, browser type and pages visited, to keep the site secure and working.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "We use your information only to reply to you, discuss and deliver projects, and keep records of our communication. We do not sell your personal information.",
          ],
        },
        {
          heading: "How long we keep it",
          body: [
            "We keep enquiry emails for as long as needed to respond and, if we work together, for the length of the engagement and any period required by law.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            `You can ask us to access, correct or delete the personal information we hold about you by emailing ${site.email}.`,
          ],
        },
        {
          heading: "Contact",
          body: [`Questions about this policy? Email ${site.email} or call ${site.phone}.`],
        },
      ]}
    />
  );
}
