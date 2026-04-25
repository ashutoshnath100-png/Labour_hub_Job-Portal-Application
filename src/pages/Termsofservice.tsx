import { useState } from "react";

const Termsofservice = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const toggle = (index: any) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-gray-100">
            <div className="py-16 mx-auto text-center  mb-10 bg-gradient-to-b from-orange-200 to-orange-100">
                <div className="w-16 h-16 mx-auto bg-orange-300 rounded-xl flex items-center justify-center mb-4 shadow">
                    <img
                        src="/logo.png"
                        alt="logo"
                        className="h-12 w-auto object-contain"
                    />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
                <p className="text-sm text-gray-600 mt-1">
                    Last updated: January 15, 2026
                </p>
            </div>
            <div>
                <div className="max-w-5xl mx-auto border bg-white rounded-2xl shadow-lg p-6 space-y-3">
                    <h4>Welcome to LabourHub. These Terms of Service ("Terms") govern your use of our platform and services. Please read them carefully before using LabourHub.</h4>
                    <div className="border-b border-gray-600  last:border-none">
                        <button
                            onClick={() => toggle(1)}
                            className="w-full flex  justify-between items-center py-4 text-left text-gray-900 font-semibold text-[17px]"
                        >
                            1. Acceptance of Terms
                            <span
                                className={`transition-transform duration-300 ${openIndex === 1 ? "rotate-180" : ""
                                    }`}
                            >
                                ⌄
                            </span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${openIndex === 1 ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="text-sm text-black leading-relaxed space-y-2">
                                <div>
                                    <p>
                                        By accessing or using LabourHub ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
                                    </p>
                                    <p className="mt-2">
                                        These terms apply to all users of the Platform, including workers and employers seeking to hire workers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-gray-600  last:border-none">
                        <button
                            onClick={() => toggle(2)}
                            className="w-full flex  justify-between items-center py-4 text-left text-gray-900 font-semibold text-[17px]"
                        >
                            2. Description of Service
                            <span
                                className={`transition-transform duration-300 ${openIndex === 2 ? "rotate-180" : ""
                                    }`}
                            >
                                ⌄
                            </span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${openIndex === 2 ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="text-sm text-black leading-relaxed space-y-2">
                                <div>
                                    <p>
                                        LabourHub is a platform that connects skilled workers with employers seeking their services. We provide:
                                    </p>
                                    <ul className="list-disc ml-5 mt-2 text-sm text-black space-y-1">
                                        <li>A registration system for workers to create profiles</li>
                                        <li>A search system for employers to find suitable workers</li>
                                        <li>Contact information exchange between parties</li>
                                        <li>Profile management tools for workers</li>
                                    </ul>
                                    <p className="mt-2">
                                        LabourHub acts solely as a facilitator and is not a party to any employment contract between workers and employers.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="border-b border-gray-600  last:border-none">
                        <button
                            onClick={() => toggle(3)}
                            className="w-full flex  justify-between items-center py-4 text-left text-gray-900 font-semibold text-[17px]"
                        >
                            3. User Registration
                            <span
                                className={`transition-transform duration-300 ${openIndex === 3 ? "rotate-180" : ""
                                    }`}
                            >
                                ⌄
                            </span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${openIndex === 3 ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="text-sm text-black leading-relaxed space-y-2">
                                <div>
                                    <p>
                                        To use certain features of LabourHub, you must register and create an account. You agree to:
                                    </p>
                                    <ul className="list-disc ml-5 mt-2 text-sm text-black space-y-1">
                                        <li>Provide accurate, current, and complete information during registration</li>
                                        <li> Maintain and update your information to keep it accurate</li>
                                        <li> Keep your password secure and confidential </li>
                                        <li> Notify us immediately of any unauthorized use of your account</li>
                                        <li> Accept responsibility for all activities under your account </li>
                                    </ul>
                                    <p className="mt-2">
                                        We reserve the right to suspend or terminate accounts that violate these terms or contain false information.                  </p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="border-b border-gray-600  last:border-none">
                        <button
                            onClick={() => toggle(4)}
                            className="w-full flex  justify-between items-center py-4 text-left text-gray-900 font-semibold text-[17px]"
                        >
                            4. User Conduct
                            <span
                                className={`transition-transform duration-300 ${openIndex === 4 ? "rotate-180" : ""
                                    }`}
                            >
                                ⌄
                            </span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${openIndex === 4 ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="text-sm text-black leading-relaxed space-y-2">
                                <div>
                                    <p>
                                        Users of LabourHub agree not to:
                                    </p>
                                    <ul className="list-disc ml-5 mt-2 text-sm text-black space-y-1">
                                        <li>Provide false or misleading information in profiles or communications</li>
                                        <li>Harass, abuse, or harm other users • Use the Platform for any illegal purposes </li>
                                        <li>Attempt to gain unauthorized access to the Platform or other users' accounts  </li>
                                        <li>Post content that is defamatory, obscene, or violates intellectual property rights </li>
                                        <li>Use automated systems to access the Platform without permission </li>
                                        <li>Interfere with the proper functioning of the Platform</li>
                                    </ul>
                                    <p className="mt-2">
                                        Violation of these conduct rules may result in immediate account termination.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="border-b border-gray-600  last:border-none">
                        <button
                            onClick={() => toggle(5)}
                            className="w-full flex  justify-between items-center py-4 text-left text-gray-900 font-semibold text-[17px]"
                        >
                            5. Worker Responsibilities
                            <span
                                className={`transition-transform duration-300 ${openIndex === 5 ? "rotate-180" : ""
                                    }`}
                            >
                                ⌄
                            </span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${openIndex === 5 ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="text-sm text-black leading-relaxed space-y-2">
                                <div>
                                    <p>
                                        Workers using LabourHub agree to:
                                    </p>
                                    <ul className="list-disc ml-5 mt-2 text-sm text-black space-y-1">
                                        <li>Accurately represent their skills, experience, and qualifications </li>
                                        <li>Maintain updated availability status </li>
                                        <li>Respond professionally to employer inquiries </li>
                                        <li>Honor commitments made to employers </li>
                                        <li>Comply with all applicable labor laws and regulations  </li>
                                        <li>Obtain any necessary licenses or permits for their work </li>
                                    </ul>
                                    <p className="mt-2">
                                        Workers are independent contractors and not employees of LabourHub.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="border-b border-gray-600  last:border-none">
                        <button
                            onClick={() => toggle(6)}
                            className="w-full flex  justify-between items-center py-4 text-left text-gray-900 font-semibold text-[17px]"
                        >
                            6. Employer Responsibilities

                            <span
                                className={`transition-transform duration-300 ${openIndex === 6 ? "rotate-180" : ""
                                    }`}
                            >
                                ⌄
                            </span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${openIndex === 6 ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="text-sm text-black leading-relaxed space-y-2">
                                <div>
                                    <p>
                                        Employers using LabourHub agree to:
                                    </p>
                                    <ul className="list-disc ml-5 mt-2 text-sm text-black space-y-1">
                                        <li>Provide accurate job requirements and expectations </li>
                                        <li>Treat workers with respect and professionalism</li>
                                        <li>Pay workers as agreed upon </li>
                                        <li>Provide safe working conditions  </li>
                                        <li>Comply with all applicable employment and labor laws  </li>
                                        <li>Not discriminate based on caste, religion, gender, or other protected characteristics </li>
                                    </ul>
                                    <p className="mt-2">
                                        Employers are solely responsible for verifying worker credentials and suitability.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Termsofservice;