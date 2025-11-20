export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6e92a0] to-[#36454c] text-white py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-gray-100">Last updated: November 19, 2025</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Welcome to SpareTime Calendar. We respect your privacy and are committed to protecting your personal data.
                            This privacy policy will inform you about how we look after your personal data when you visit our website
                            and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Information We Collect</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">We may collect, use, store and transfer different kinds of personal data about you:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li><strong>Identity Data:</strong> First name, last name, username</li>
                            <li><strong>Contact Data:</strong> Email address, telephone number</li>
                            <li><strong>Technical Data:</strong> IP address, browser type, time zone setting</li>
                            <li><strong>Profile Data:</strong> Your interests, preferences, feedback</li>
                            <li><strong>Usage Data:</strong> Information about how you use our website and services</li>
                            <li><strong>Calendar Data:</strong> Your availability, scheduling preferences, meeting details</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">We use your personal data for the following purposes:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>To provide and maintain our service</li>
                            <li>To notify you about changes to our service</li>
                            <li>To provide customer support</li>
                            <li>To gather analysis or valuable information to improve our service</li>
                            <li>To monitor the usage of our service</li>
                            <li>To detect, prevent and address technical issues</li>
                            <li>To manage your calendar and scheduling requests</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Security</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost,
                            used or accessed in an unauthorized way, altered or disclosed. We use industry-standard encryption for data
                            transmission and storage. Your calendar data is encrypted both in transit and at rest.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Third-Party Integrations</h2>
                        <p className="text-gray-600 leading-relaxed">
                            SpareTime integrates with third-party calendar services (Google Calendar, Apple Calendar, Outlook Calendar).
                            When you connect these services, we access only the minimum data necessary to provide our scheduling features.
                            We do not share your data with these services beyond what is required for the integration to function.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Rights</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">Under data protection law, you have rights including:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li><strong>Right to access:</strong> Request copies of your personal data</li>
                            <li><strong>Right to rectification:</strong> Request correction of inaccurate or incomplete data</li>
                            <li><strong>Right to erasure:</strong> Request deletion of your personal data</li>
                            <li><strong>Right to restrict processing:</strong> Request limitation of processing your data</li>
                            <li><strong>Right to data portability:</strong> Request transfer of your data to another service</li>
                            <li><strong>Right to object:</strong> Object to processing of your personal data</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Cookies</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We use cookies and similar tracking technologies to track activity on our service and store certain information.
                            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
                            if you do not accept cookies, you may not be able to use some portions of our service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Retention</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We will retain your personal data only for as long as necessary for the purposes set out in this privacy policy.
                            We will retain and use your data to the extent necessary to comply with our legal obligations, resolve disputes,
                            and enforce our policies. When you delete your account, we will delete all your personal data within 30 days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to This Policy</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We may update our privacy policy from time to time. We will notify you of any changes by posting the new
                            privacy policy on this page and updating the "Last updated" date. You are advised to review this privacy
                            policy periodically for any changes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            If you have any questions about this privacy policy or our privacy practices, please contact us:
                        </p>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <p className="text-gray-700"><strong>Email:</strong> privacy@sparetime.me</p>
                            <p className="text-gray-700 mt-2"><strong>Address:</strong> SpareTime Inc., 123 Calendar Street, San Francisco, CA 94102</p>
                        </div>
                    </section>
                </div>

                {/* Back to Home */}
                <div className="mt-8 text-center">
                    <a href="/" className="text-[#6e92a0] hover:text-[#36454c] font-semibold">
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
