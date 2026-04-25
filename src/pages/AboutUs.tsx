import { Link } from "react-router-dom";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-gradient-to-b from-blue-900 to-blue-700 py-16 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        About <span className="text-orange-500">Urban Force</span>
                    </h1>
                    <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                        Connecting skilled workers with employers quickly and safely.
                    </p>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-black mb-4">Our Mission</h2>
                    <p className="text-gray-600 leading-relaxed">
                        LabourHub exists to bridge the gap between skilled workers and employers. We help workers find fair work opportunities and help employers hire verified, trusted labour for their projects—all in one place.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-black mb-4">Our Story</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        We saw that finding reliable workers was difficult for employers, and getting steady work was equally hard for workers. LabourHub was built to make both sides win: workers get more visibility and jobs, and employers get verified labour without the hassle.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Today we are growing across regions, helping thousands of workers and employers connect every day.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-black mb-6">What We Believe In</h2>
                    <div className="grid sm:grid-cols-3 gap-6">
                        <div className="text-center p-4 rounded-lg bg-orange-50 border border-orange-100">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-black mb-2">Trust & Safety</h3>
                            <p className="text-sm text-gray-600">Verified workers and secure connections for everyone.</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-orange-50 border border-orange-100">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-black mb-2">Fair Opportunities</h3>
                            <p className="text-sm text-gray-600">Every worker gets a fair chance to find work.</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-orange-50 border border-orange-100">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-black mb-2">Simple & Fast</h3>
                            <p className="text-sm text-gray-600">Connect and hire without delay or middlemen.</p>
                        </div>
                    </div>
                </div>

                <div className="text-center pb-12">
                    <Link
                        to="/find-labour"
                        className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded font-semibold transition"
                    >
                        Find Workers
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
