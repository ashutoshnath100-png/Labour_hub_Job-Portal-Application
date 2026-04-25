import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
          

            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-black mb-3">
                    How do you want to use LabourHub?
                </h2>
                <p className="text-gray-600 text-lg">
                    Choose your role to get started with the right experience
                </p>
            </div>

            {/* Role Selection Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full mb-12">
                {/* Worker Card */}
                <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 bg-orange-500 rounded-lg mb-6 flex items-center justify-center">
                        <svg className="w-10 h-10 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-4">I'm a Worker</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Find work opportunities, showcase your skills, and connect with employers looking for your expertise.
                    </p>
                    <Link 
                        to="/register/worker" 
                        className="text-orange-500 font-semibold hover:text-orange-600 inline-flex items-center gap-2"
                    >
                        Register as Worker →
                    </Link>
                </div>

                {/* Employer Card */}
                <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 bg-blue-900 rounded-lg mb-6 flex items-center justify-center">
                        <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-4">I'm an Employer</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Find skilled workers in your area, hire talent for your projects, and manage your workforce efficiently.
                    </p>
                    <Link 
                        to="/register/employer" 
                        className="text-orange-500 font-semibold hover:text-orange-600 inline-flex items-center gap-2"
                    >
                        Register as Employer →
                    </Link>
                </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
                <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-orange-500 font-semibold hover:text-orange-600">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Home;
