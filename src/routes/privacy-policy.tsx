import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
    component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-bodyBg py-12 px-4 md:px-10">
            <div className="max-w-4xl mx-auto">
                <div className="bg-cardBg rounded-3xl p-8 md:p-12 shadow-lg">
                    <h1 className="text-4xl font-bold text-textColor mb-6">
                        Privacy Policy
                    </h1>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-textColorWeak mb-6">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-textColor mb-4">
                                1. Information We Collect
                            </h2>
                            <p className="text-textColorWeak leading-relaxed mb-4">
                                We collect information that you provide directly to us, including:
                            </p>
                            <ul className="list-disc list-inside text-textColorWeak ml-4 space-y-2">
                                <li>Account information (name, email address, profile picture)</li>
                                <li>Content you submit (projects, comments, reviews)</li>
                                <li>Communication preferences</li>
                                <li>Any other information you choose to provide</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-textColor mb-4">
                                2. How We Use Your Information
                            </h2>
                            <p className="text-textColorWeak leading-relaxed mb-4">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc list-inside text-textColorWeak ml-4 space-y-2">
                                <li>Provide, maintain, and improve our services</li>
                                <li>Process and complete transactions</li>
                                <li>Send you technical notices and support messages</li>
                                <li>Respond to your comments and questions</li>
                                <li>Communicate with you about products, services, and events</li>
                                <li>Monitor and analyze trends, usage, and activities</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-textColor mb-4">
                                3. Information Sharing
                            </h2>
                            <p className="text-textColorWeak leading-relaxed">
                                We do not share your personal information with third parties except as described
                                in this Privacy Policy. We may share information:
                            </p>
                            <ul className="list-disc list-inside text-textColorWeak ml-4 mt-2 space-y-2">
                                <li>With your consent</li>
                                <li>To comply with laws or respond to lawful requests</li>
                                <li>To protect our rights, privacy, safety, or property</li>
                                <li>With service providers who perform services on our behalf</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-textColor mb-4">
                                4. Third-Party Authentication
                            </h2>
                            <p className="text-textColorWeak leading-relaxed">
                                When you sign in using third-party services (Google, GitHub), we receive basic
                                profile information from these services. This information is used solely for
                                authentication purposes and to create your account. We encourage you to review
                                the privacy policies of these third-party services.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-textColor mb-4">
                                5. Data Security
                            </h2>
                            <p className="text-textColorWeak leading-relaxed">
                                We take reasonable measures to help protect your personal information from loss,
                                theft, misuse, unauthorized access, disclosure, alteration, and destruction.
                                However, no internet or email transmission is ever fully secure or error-free.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-textColor mb-4">
                                6. Cookies and Tracking
                            </h2>
                            <p className="text-textColorWeak leading-relaxed">
                                We use cookies and similar tracking technologies to track activity on our service
                                and hold certain information. Cookies are files with small amounts of data which
                                may include an anonymous unique identifier. You can instruct your browser to
                                refuse all cookies or to indicate when a cookie is being sent.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-textColor mb-4">
                                7. Your Rights
                            </h2>
                            <p className="text-textColorWeak leading-relaxed mb-4">
                                You have the right to:
                            </p>
                            <ul className="list-disc list-inside text-textColorWeak ml-4 space-y-2">
                                <li>Access and receive a copy of your personal data</li>
                                <li>Rectify inaccurate personal data</li>
                                <li>Request deletion of your personal data</li>
                                <li>Object to processing of your personal data</li>
                                <li>Request restriction of processing your personal data</li>
                                <li>Data portability</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-textColor mb-4">
                                8. Children's Privacy
                            </h2>
                            <p className="text-textColorWeak leading-relaxed">
                                Our service is not intended for children under 13 years of age. We do not
                                knowingly collect personal information from children under 13. If you are a
                                parent or guardian and believe your child has provided us with personal
                                information, please contact us.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-textColor mb-4">
                                9. Changes to This Policy
                            </h2>
                            <p className="text-textColorWeak leading-relaxed">
                                We may update our Privacy Policy from time to time. We will notify you of any
                                changes by posting the new Privacy Policy on this page and updating the "Last
                                updated" date.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-textColor mb-4">
                                10. Contact Us
                            </h2>
                            <p className="text-textColorWeak leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at{" "}
                                <a href="mailto:privacy@appgrade.com" className="text-mainColor hover:text-mainColorHover">
                                    privacy@appgrade.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
