"use client";

import { X } from "lucide-react";

interface PrivacyPolicyModalProps {
  open: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal = ({
  open,
  onClose,
}: PrivacyPolicyModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-2 py-3">
      <div className="relative flex max-h-[90vh] w-full max-w-[600px] flex-col overflow-hidden rounded-[16px] border border-[#a9aaa4] bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-base font-bold text-[#1f1f1f]">
              OpportunityHub NG
            </h2>

            <p className="mt-1 text-sm font-semibold text-[#70696b]">
              Privacy Policy & Terms of Use
            </p>

            <p className="mt-1 text-[10px] text-gray-400">
              Draft v0.1 — Updated on 23 July 2026
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close privacy policy"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-6 py-6 text-[11px] leading-relaxed text-[#70696b]">
          {/* PART 1 */}
          <section>
            <h3 className="text-sm font-bold text-[#1f1f1f]">
              Part 1 — Privacy Policy
            </h3>

            <div className="mt-5 space-y-5">
              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  1. Introduction
                </h4>

                <p className="mt-2">
                  This Privacy Policy explains what personal information
                  OpportunityHub NG ("we", "the platform") collects from
                  students, Post Creators, and administrators, why we
                  collect it, and what rights users have over their data.
                  By creating an account, you agree to the practices
                  described here.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  2. Information We Collect
                </h4>

                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                  <li>
                    <strong>Account information:</strong> full name, email
                    address, password (stored as a hash, never in plain
                    text).
                  </li>
                  <li>
                    <strong>Profile information:</strong> institution,
                    academic level, expected/completed graduation year,
                    skills, career interests, profile picture.
                  </li>
                  <li>
                    <strong>Usage data:</strong> opportunities viewed,
                    searched, filtered, saved, and shared; reminders
                    enabled; pages visited within the app.
                  </li>
                  <li>
                    <strong>Post Creator content:</strong> opportunity
                    listings submitted for review, including any
                    organisation or contact details included in a
                    submission.
                  </li>
                  <li>
                    <strong>Admin activity:</strong> approval/rejection
                    actions taken on submitted listings (logged for
                    accountability, not shared publicly).
                  </li>
                  <li>
                    <strong>Technical data:</strong> IP address,
                    device/browser type, and basic analytics events,
                    collected automatically for performance and security
                    purposes.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  3. How We Use Your Information
                </h4>

                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                  <li>
                    To create and manage your account, and to personalise
                    the opportunities you see.
                  </li>
                  <li>
                    To operate core features: saving opportunities,
                    sending deadline reminders, and processing Post Creator
                    submissions.
                  </li>
                  <li>
                    To verify and moderate listings before they go live,
                    protecting users from scams or expired postings.
                  </li>
                  <li>
                    To measure product performance and usage through the
                    KPIs and events described in our internal Analytics
                    Event Tracking Plan (e.g. signups, listing views,
                    saves).
                  </li>
                  <li>
                    To communicate with you, including account
                    verification emails, password resets, and deadline
                    reminders.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  4. Third-Party Services
                </h4>

                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                  <li>
                    <strong>Supabase:</strong> database hosting and backend
                    infrastructure (stores account, profile, and
                    opportunity data).
                  </li>
                  <li>
                    <strong>Google Analytics / Supabase Analytics:</strong>{" "}
                    aggregated usage analytics (does not include your
                    password or full profile in raw form).
                  </li>
                  <li>
                    <strong>Email delivery provider:</strong> used solely
                    to send verification, password-reset, and reminder
                    emails.
                  </li>
                </ul>

                <p className="mt-2">
                  We do not sell personal data to third parties, and we do
                  not share individual user data with opportunity providers
                  without your action (e.g. clicking an apply link).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  5. Data Storage & Security
                </h4>

                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                  <li>
                    Passwords are hashed and never stored or transmitted in
                    plain text.
                  </li>
                  <li>
                    All traffic between the app and our servers is
                    encrypted (HTTPS).
                  </li>
                  <li>
                    Access to the admin panel and underlying database is
                    restricted to authorised team members only.
                  </li>
                  <li>
                    As an MVP built during a 6-week internship programme,
                    this platform has not undergone a formal third-party
                    security audit; this is disclosed here in the interest
                    of transparency.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  6. Your Rights
                </h4>

                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                  <li>
                    <strong>Access:</strong> you can view your profile
                    information at any time from within the app.
                  </li>
                  <li>
                    <strong>Correction:</strong> you can edit your profile
                    details directly.
                  </li>
                  <li>
                    <strong>Deletion:</strong> you may request that your
                    account and associated data be deleted by contacting
                    the team; requests will be honoured within a reasonable
                    timeframe.
                  </li>
                  <li>
                    <strong>Withdrawal of consent:</strong> you may stop
                    using the platform and request deletion at any time;
                    this does not affect the lawfulness of processing that
                    occurred before withdrawal.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  7. Data Retention
                </h4>

                <p className="mt-2">
                  We retain your account data for as long as your account
                  is active. If you request deletion, we will remove your
                  personal data within a reasonable period, except where
                  retention is required for legitimate operational or legal
                  reasons (e.g. resolving an active dispute).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  8. Children's Privacy
                </h4>

                <p className="mt-2">
                  OpportunityHub NG is intended for university students and
                  recent graduates. It is not directed at children under
                  16, and we do not knowingly collect data from users under
                  that age.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  9. Changes to This Policy
                </h4>

                <p className="mt-2">
                  This is a living MVP document and may be updated as the
                  product evolves. Material changes will be communicated to
                  users through the app.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  10. Contact
                </h4>

                <p className="mt-2">
                  Questions about this policy or requests regarding your
                  data can be directed to the Zenith-circle team via
                  [insert contact email/channel].
                </p>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="my-8 border-t border-gray-200" />

          {/* PART 2 */}
          <section>
            <h3 className="text-sm font-bold text-[#1f1f1f]">
              Part 2 — Terms & Conditions
            </h3>

            <div className="mt-5 space-y-5">
              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  1. Acceptance of Terms
                </h4>

                <p className="mt-2">
                  By creating an account or using OpportunityHub NG, you
                  agree to these Terms. If you do not agree, please do not
                  use the platform.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  2. Who Can Use the Platform
                </h4>

                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                  <li>
                    Students and recent graduates may create a student
                    account to browse, search, save, and receive reminders
                    for opportunities.
                  </li>
                  <li>
                    Post Creators (registered applicants as contributors)
                    may draft, edit, and submit opportunities for review.
                  </li>
                  <li>
                    Admins manage the review, approval, and moderation of
                    submitted opportunities.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  3. Acceptable Use
                </h4>

                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                  <li>
                    You agree to provide accurate information when creating
                    your account and profile.
                  </li>
                  <li>
                    You agree not to submit false, misleading, expired, or
                    fraudulent opportunity listings.
                  </li>
                  <li>
                    You agree not to attempt to disrupt, reverse-engineer,
                    or gain unauthorised access to the platform or other
                    users' accounts.
                  </li>
                  <li>
                    You agree not to use the platform to harass, scam, or
                    mislead other users.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  4. Listings & Verification
                </h4>

                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                  <li>
                    An admin reviews all opportunities submitted by a Post
                    Creator/Editor before appearing publicly.
                  </li>
                  <li>
                    A "Verified" badge indicates the listing passed our
                    internal review process; it does not guarantee the
                    outcome of any application, nor does it constitute an
                    endorsement of the listing organisation.
                  </li>
                  <li>
                    We reserve the right to remove any listing at any time,
                    including after approval, if it is later found to be
                    inaccurate, expired, or fraudulent.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  5. No Guarantee of Outcome
                </h4>

                <p className="mt-2">
                  OpportunityHub NG is a discovery and organisation tool.
                  We make reasonable efforts to verify listings before they
                  go live, but we do not guarantee that any listed
                  opportunity is still open, that your application will be
                  successful, or that a listing organisation will respond.
                  We are not a party to any agreement between you and an
                  opportunity provider.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  6. Account Termination
                </h4>

                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                  <li>
                    You may stop using the platform and request account
                    deletion at any time.
                  </li>
                  <li>
                    We reserve the right to suspend or terminate accounts
                    that violate the Acceptable Use section above,
                    including those that submit fraudulent listings.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  7. Limitation of Liability
                </h4>

                <p className="mt-2">
                  OpportunityHub NG is provided "as is" as a student-built
                  MVP developed during a time-limited internship programme.
                  To the fullest extent permitted, we are not liable for
                  any loss, missed deadline, scam encountered through a
                  third-party link, or other damages arising from your use
                  of the platform, including but not limited to reliance on
                  a listing's accuracy or a Post Creator's submission.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  8. Intellectual Property
                </h4>

                <p className="mt-2">
                  The OpportunityHub NG name, logo, and platform design are
                  the property of the Zenith-circle team as part of the
                  Orange Internship Programme. Opportunity listing content
                  remains the property of the submitting organisation or
                  Post Creator.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  9. Changes to These Terms
                </h4>

                <p className="mt-2">
                  These Terms may be updated as the product evolves during
                  and after the internship programme. Continued use of the
                  platform after changes constitutes acceptance of the
                  revised Terms.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1f1f1f]">
                  10. Governing Context
                </h4>

                <p className="mt-2">
                  These Terms are provided in the context of an educational
                  internship MVP (Circo Digital Academy's Orange Internship
                  Programme) and are not a substitute for formal legal
                  terms that would be required for a commercial public
                  launch.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-200 bg-white px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-primary px-6 py-2.5 text-xs font-medium text-white transition hover:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;