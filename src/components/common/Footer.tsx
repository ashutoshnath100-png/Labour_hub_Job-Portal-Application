import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white px-4 sm:px-8 py-10 mt-10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/logo.png" 
                            alt="LabourHub Logo"
                            className="h-16 w-auto object-contain"
                        />                       
                    <p className="text-sm mt-2 text-blue-100 max-w-md">
                        Connecting skilled workers with employers quickly and safely.
                    </p>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-semibold mb-3">Quick Links</h3>
                        <ul className="text-sm space-y-2 text-blue-100">
                            <li>
                                <Link to="/find-labour" className="hover:underline hover:text-orange-500">
                                    Find Labour
                                </Link>
                            </li>
                            <li>
                                <Link to="/register-worker" className="hover:underline hover:text-orange-500">
                                    Register as Worker
                                </Link>
                            </li>
                            <li>
                                <Link to="/for-employer" className="hover:underline hover:text-orange-500">
                                    For Employer
                                </Link>
                            </li>
                            <li>
                                <Link to="/how-it-works" className="hover:underline hover:text-orange-500">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link to="/about-us" className="hover:underline hover:text-orange-500">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Contact Us</h3>
                        <ul className="text-sm space-y-2 text-blue-100">
                            <li>info@labourhub.com</li>
                            <li>+91 98765 43210</li>
                            <li>support@labourhub.com</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Support</h3>
                        <ul className="text-sm space-y-2 text-blue-100">
                            <li>
                                <Link to="/help-center" className="hover:underline hover:text-orange-500">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy-policy" className="hover:underline hover:text-orange-500">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms-of-service" className="hover:underline hover:text-orange-500">
                                    Terms of Service
                                </Link>
                            </li>
                            
                        </ul>
                    </div>
                </div>

                <div className="border-t border-blue-700 mt-10 pt-4 text-center text-xs text-blue-200">
                    © {new Date().getFullYear()} Urban Force. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;