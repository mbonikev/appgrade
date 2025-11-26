import Navbar from '../../../components/layout/Navbar';
import { RiMailSendLine, RiQuestionAnswerLine, RiBookOpenLine } from 'react-icons/ri';

const SupportPage = () => {
    return (
        <div className="min-h-screen bg-bodyBg">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-textColor mb-4">How can we help?</h1>
                    <p className="text-textColorWeak text-lg">Find answers, contact support, and learn more about AppGrade.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* FAQ */}
                    <div className="bg-cardBg p-8 rounded-3xl border border-linesColor hover:border-mainColor/50 transition-colors group cursor-pointer">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                            <RiQuestionAnswerLine className="text-2xl" />
                        </div>
                        <h3 className="text-xl font-bold text-textColor mb-2">FAQs</h3>
                        <p className="text-textColorWeak text-sm">Find answers to commonly asked questions about submissions and reviews.</p>
                    </div>

                    {/* Documentation */}
                    <div className="bg-cardBg p-8 rounded-3xl border border-linesColor hover:border-mainColor/50 transition-colors group cursor-pointer">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                            <RiBookOpenLine className="text-2xl" />
                        </div>
                        <h3 className="text-xl font-bold text-textColor mb-2">Documentation</h3>
                        <p className="text-textColorWeak text-sm">Detailed guides on how to prepare your projects for submission.</p>
                    </div>

                    {/* Contact */}
                    <div className="bg-cardBg p-8 rounded-3xl border border-linesColor hover:border-mainColor/50 transition-colors group cursor-pointer">
                        <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform">
                            <RiMailSendLine className="text-2xl" />
                        </div>
                        <h3 className="text-xl font-bold text-textColor mb-2">Contact Us</h3>
                        <p className="text-textColorWeak text-sm">Need specific help? Reach out to our support team directly.</p>
                    </div>
                </div>

                <div className="mt-16 bg-cardItemBg rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-2xl font-bold text-textColor mb-4">Still need help?</h2>
                    <p className="text-textColorWeak mb-8 max-w-xl mx-auto">Our team is available Monday through Friday to assist you with any issues you might encounter.</p>
                    <button className="bg-mainColor text-white px-8 py-3 rounded-full font-bold hover:bg-mainColorHover transition-colors">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
