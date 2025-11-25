import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user-agreement")({
  component: UserAgreementPage,
});

function UserAgreementPage() {
  return (
    <div className="min-h-screen bg-bodyBg py-12 px-4 md:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-cardBg rounded-3xl p-8 md:p-12 shadow-lg">
          <h1 className="text-4xl font-bold text-textColor mb-6">
            User Agreement
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-textColorWeak mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-textColor mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-textColorWeak leading-relaxed">
                By accessing and using Appgrade, you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above,
                please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-textColor mb-4">
                2. Use License
              </h2>
              <p className="text-textColorWeak leading-relaxed mb-4">
                Permission is granted to temporarily access the materials (information or software)
                on Appgrade for personal, non-commercial transitory viewing only.
              </p>
              <p className="text-textColorWeak leading-relaxed">
                This is the grant of a license, not a transfer of title, and under this license
                you may not:
              </p>
              <ul className="list-disc list-inside text-textColorWeak ml-4 mt-2 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or other proprietary notations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-textColor mb-4">
                3. User Accounts
              </h2>
              <p className="text-textColorWeak leading-relaxed">
                When you create an account with us, you must provide accurate, complete, and
                current information. Failure to do so constitutes a breach of the Terms, which
                may result in immediate termination of your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-textColor mb-4">
                4. Content Submission
              </h2>
              <p className="text-textColorWeak leading-relaxed">
                By submitting content to Appgrade, you grant us a worldwide, non-exclusive,
                royalty-free license to use, reproduce, modify, and display such content in
                connection with the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-textColor mb-4">
                5. Disclaimer
              </h2>
              <p className="text-textColorWeak leading-relaxed">
                The materials on Appgrade are provided on an 'as is' basis. Appgrade makes no
                warranties, expressed or implied, and hereby disclaims and negates all other
                warranties including, without limitation, implied warranties or conditions of
                merchantability, fitness for a particular purpose, or non-infringement of
                intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-textColor mb-4">
                6. Limitations
              </h2>
              <p className="text-textColorWeak leading-relaxed">
                In no event shall Appgrade or its suppliers be liable for any damages (including,
                without limitation, damages for loss of data or profit, or due to business
                interruption) arising out of the use or inability to use the materials on
                Appgrade.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-textColor mb-4">
                7. Revisions
              </h2>
              <p className="text-textColorWeak leading-relaxed">
                Appgrade may revise these terms of service at any time without notice. By using
                this service you are agreeing to be bound by the then current version of these
                terms of service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-textColor mb-4">
                8. Contact Information
              </h2>
              <p className="text-textColorWeak leading-relaxed">
                If you have any questions about this User Agreement, please contact us at{" "}
                <a href="mailto:support@appgrade.com" className="text-mainColor hover:text-mainColorHover">
                  support@appgrade.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
