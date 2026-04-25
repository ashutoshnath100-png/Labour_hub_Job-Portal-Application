const PrivacyPolicy = () => {
    return (
        <div className="bg-[#f7f7f7] min-h-screen">
            <div className="bg-gradient-to-r from-orange-200 to-orange-100 border-b">
                <div className="max-w-6xl mx-auto px-4 py-2 text-center ">
                    <div className="flex justify-center mb-4">
                        <div className="bg-orange-400 w-14 h-14  rounded-xl 
                        flex items-center justify-center text-2xl">❓</div>

                    </div>
                    <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
                    <p className="text-gray-700 max-w-2xl mx-auto">Your privacy is important to us. 
                        This policy explains how we collect,use, and protect your personal information</p>
                    <p className="mt-3 text-sm text-gray-600">Last updated: January 15,2026</p>
                </div>
            </div>
            <section className="max-w-6xl mx-auto px-4 py-6">
                <h2 className="text-2xl font-semibold text-center mb-8">Privace at a Glance</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        {
                            title: "Data Encrypted",
                            desc: "All data encrypted in transit and at rest",
                        },
                        {
                            title: "Transparent Use",
                            desc: "Clear explanation of how we use your data",
                        },
                        {
                            title: "Your Control",
                            desc: "Access,correct, or delete your data anytime",
                        },
                        {
                            title: "No Selling",
                            desc: "We never sell your personal information",
                        },
                    ].map((item, index) => (
                        <div key={index} className="bg-white  rounded-2xl  shadow-sm   p-8 text-center">
                            <div className="bg-orange-200 w-14 h-10 mx-auto rounded-lg flex items-center justify-center  mb- ">📊</div>
                            <h3 className="text-lg font-bold">{item.title}</h3>
                            <p className="text-gray-600 mt-1 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-4xl mx-auto mt-10 bg-[#f1d6d6] rounded-xl px-8 py-6">
        <h2 className="text-2xl font-semibold mb-2">
          Full Privacy Policy
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Please read this policy carefully. By using LabourHub, you agree to the
          collection and use of information in accordance with this policy.
        </p>
      </section>

      
      <section className="max-w-4xl mx-auto mt-10 px-4">
        <div className="bg-white rounded-xl shadow-md p-8 space-y-12 text-[15px] leading-7 
        text-gray-800">

          {[
            {
              title: "1. Information We Collect",
              content: (
                <>
                  <p>
                    We collect information you provide directly to us, including:
                  </p>

                  <p className="font-semibold mt-4">Personal Information:</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Name, email address, phone number</li>
                    <li>Physical address and location data</li>
                    <li>Government-issued ID for verification (Aadhaar, PAN)</li>
                    <li>Profile photos and work samples</li>
                  </ul>

                  <p className="font-semibold mt-4">Professional Information:</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Skills, experience, and qualifications</li>
                    <li>Work history and certifications</li>
                    <li>Availability and preferred work locations</li>
                    <li>Daily wage rates and payment preferences</li>
                  </ul>

                  <p className="font-semibold mt-4">Usage Information:</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Device information and IP addresses</li>
                    <li>Browser type and operating system</li>
                    <li>Pages visited and features used</li>
                    <li>Search queries and interaction patterns</li>
                  </ul>

                  <p className="font-semibold mt-4">Communication Data:</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Messages between users</li>
                    <li>Customer support conversations</li>
                    <li>Feedback and reviews</li>
                  </ul>
                </>
              ),
            },
            {
              title: "2. How We Use Your Information",
              content: (
                <>
                  <p className="font-semibold">Service Delivery:</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Creating and managing your account</li>
                    <li>Connecting workers with employers</li>
                    <li>Processing bookings and payments</li>
                    <li>Providing customer support</li>
                  </ul>

                  <p className="font-semibold mt-4">Platform Improvement:</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Analyzing usage patterns</li>
                    <li>Developing new services and tools</li>
                    <li>Conducting research and analytics</li>
                    <li>Testing and troubleshooting</li>
                  </ul>
                </>
              ),
            },
            {
              title: "3. Information Sharing",
              content: (
                <>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Other users after booking confirmation</li>
                    <li>Payment processors and service providers</li>
                    <li>Legal authorities when required</li>
                    <li>Business transfers</li>
                  </ul>
                  <p className="mt-3 font-medium">
                    We never sell your personal information.
                  </p>
                </>
              ),
            },
            {
              title: "4. Data Security",
              content: (
                <ul className="list-disc ml-6 space-y-1">
                  <li>SSL/TLS encryption</li>
                  <li>AES-256 encryption at rest</li>
                  <li>Secure password hashing (bcrypt)</li>
                  <li>Two-factor authentication and audits</li>
                </ul>
              ),
            },
            {
              title: "5. Cookies and Tracking",
              content: (
                <p>
                  We use essential, analytics, and marketing cookies. Users can
                  manage cookie preferences through browser settings.
                </p>
              ),
            },
            {
              title: "6. Your Rights",
              content: (
                <p>
                  You have rights to access, correction, deletion, restriction,
                  objection, and portability of your data.
                </p>
              ),
            },
            {
              title: "7. Communications & Marketing",
              content: (
                <p>
                  Transactional messages are mandatory. Marketing messages are
                  sent only with your consent.
                </p>
              ),
            },
            {
              title: "8. Data Retention",
              content: (
                <p>
                  We retain data based on account status, legal, and business
                  requirements.
                </p>
              ),
            },
            {
              title: "9. Children's Privacy",
              content: (
                <p>
                  LabourHub does not knowingly collect data from users under 18.
                </p>
              ),
            },
            {
              title: "10. International Data Transfers",
              content: (
                <p>
                  Data may be transferred outside India with appropriate
                  safeguards.
                </p>
              ),
            },
            {
              title: "11. Third-Party Links",
              content: (
                <p>
                  We are not responsible for third-party privacy practices.
                </p>
              ),
            },
            {
              title: "12. Changes to This Policy",
              content: (
                <p>
                  Updates will be communicated via email or in-app notices.
                </p>
              ),
            },
            {
              title: "13. Contact Us",
              content: (
                <>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:privacy@labourhub.com"
                      className="font-semibold hover:underline"
                    >
                      privacy@labourhub.com
                    </a>
                  </p>
                  <p>
                    Phone:{" "}
                    <a
                      href="tel:+919431607346"
                      className="font-semibold hover:underline"
                    >
                      +91 9431607346
                    </a>
                  </p>
                </>
              ),
            },
          ].map((section, i) => (
            <div key={i}>
              <h3 className="text-lg font-semibold mb-3">
                {section.title}
              </h3>
              {section.content}
              {i !== 12 && (
                <hr className="mt-8 border-gray-300" />
              )}
            </div>
                    ))}
                </div>

            </section>

        </div>
    )
}
export default PrivacyPolicy;