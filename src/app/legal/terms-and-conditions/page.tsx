import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Terms and Conditions" };

// Draft wording: have it reviewed before relying on it.
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      updated="November 2026"
      sections={[
        {
          heading: "Using this website",
          body: [
            `This website is operated by ${site.name}. By using it, you agree to these terms. If you do not agree, please do not use the site.`,
          ],
        },
        {
          heading: "Content and work samples",
          body: [
            "All content on this site, including text, graphics and case study material, belongs to Pixelnest or our clients and is shown for portfolio purposes. Please do not copy or reuse it without permission.",
          ],
        },
        {
          heading: "No offer or contract",
          body: [
            "Information on this site is for general purposes only. Any project with Pixelnest is governed by a separate written proposal or agreement, which takes precedence over anything stated here.",
          ],
        },
        {
          heading: "Links to other sites",
          body: [
            "We may link to third-party websites. We are not responsible for their content or practices.",
          ],
        },
        {
          heading: "Liability",
          body: [
            "We work to keep this site accurate and available, but it is provided as is. To the extent allowed by law, we are not liable for any loss arising from its use.",
          ],
        },
        {
          heading: "Contact",
          body: [`Questions about these terms? Email ${site.email}.`],
        },
      ]}
    />
  );
}
