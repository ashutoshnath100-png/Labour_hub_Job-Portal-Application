import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
  return (
    <>
      {/* Smooth Transition */}
      <div className="h-16 bg-gradient-to-b from-[#f8b4be] via-[#f8f4ef] to-[#fdfaf7]" />

      {/* Footer */}
      <footer className="relative overflow-hidden bg-[#fdfaf7] border-t border-[#ece7e1]">

        {/* Soft Background Grid */}
        <div className="absolute inset-0 opacity-60">

          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:38px_38px]" />

          {/* Glow */}
          <div className="absolute top-[-120px] left-[-120px] w-[220px] h-[220px] bg-orange-100 rounded-full blur-3xl opacity-60" />

          <div className="absolute bottom-[-120px] right-[-120px] w-[220px] h-[220px] bg-orange-50 rounded-full blur-3xl opacity-60" />

        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-12">

          {/* Main */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div>

              <Link
                to="/"
                className="flex items-center gap-3 mb-5 group"
              >

                {/* Logo */}
                <div className="relative">

                  <div className="absolute inset-0 bg-orange-400 blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300" />

                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center shadow-[0_10px_25px_rgba(255,122,0,0.25)]">

                    <span className="text-white font-black text-lg">
                      W
                    </span>

                  </div>

                </div>

                {/* Brand */}
                <div>

                  <h2 className="text-xl font-black tracking-tight text-[#0f172a]">
                    Workora
                  </h2>

                  <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                    Smart Job Portal
                  </p>

                </div>

              </Link>

              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Connecting skilled workers with employers
                quickly, securely and efficiently.
              </p>

            </div>

            {/* Links */}
            <div>

              <h3 className="font-semibold mb-5 text-sm uppercase tracking-wider text-[#0f172a]">
                Quick Links
              </h3>

              <ul className="space-y-3 text-sm text-slate-500">

                <li>
                  <Link
                    to="/find-labour"
                    className="hover:text-orange-500 transition-all duration-300 flex items-center gap-1 group"
                  >
                    Find Workers

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 group-hover:opacity-100 transition-all"
                    />
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register-worker"
                    className="hover:text-orange-500 transition-all duration-300 flex items-center gap-1 group"
                  >
                    Register Worker

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 group-hover:opacity-100 transition-all"
                    />
                  </Link>
                </li>

                <li>
                  <Link
                    to="/for-employer"
                    className="hover:text-orange-500 transition-all duration-300 flex items-center gap-1 group"
                  >
                    For Employers

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 group-hover:opacity-100 transition-all"
                    />
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about-us"
                    className="hover:text-orange-500 transition-all duration-300 flex items-center gap-1 group"
                  >
                    About Us

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 group-hover:opacity-100 transition-all"
                    />
                  </Link>
                </li>

              </ul>

            </div>

            {/* Contact */}
            <div>

              <h3 className="font-semibold mb-5 text-sm uppercase tracking-wider text-[#0f172a]">
                Contact
              </h3>

              <ul className="space-y-4">

                <li className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shadow-sm">
                    <Mail size={16} />
                  </div>

                  <span className="text-sm text-slate-500">
                    support@workora.com
                  </span>

                </li>

                <li className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 shadow-sm">
                    <Phone size={16} />
                  </div>

                  <span className="text-sm text-slate-500">
                    +91 98765 43210
                  </span>

                </li>

              </ul>

            </div>

            {/* Support */}
            <div>

              <h3 className="font-semibold mb-5 text-sm uppercase tracking-wider text-[#0f172a]">
                Support
              </h3>

              <ul className="space-y-3 text-sm text-slate-500">

                <li>
                  <Link
                    to="/help-center"
                    className="hover:text-orange-500 transition-colors duration-300"
                  >
                    Help Center
                  </Link>
                </li>

                <li>
                  <Link
                    to="/privacy-policy"
                    className="hover:text-orange-500 transition-colors duration-300"
                  >
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link
                    to="/terms-of-service"
                    className="hover:text-orange-500 transition-colors duration-300"
                  >
                    Terms of Service
                  </Link>
                </li>

              </ul>

            </div>

          </div>

          {/* Bottom */}
          <div className="border-t border-[#ece7e1] mt-10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">

            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} Workora. All rights reserved.
            </p>

            <div className="flex items-center gap-5 text-xs text-slate-400">

              <Link
                to="/privacy-policy"
                className="hover:text-orange-500 transition-colors"
              >
                Privacy
              </Link>

              <Link
                to="/terms-of-service"
                className="hover:text-orange-500 transition-colors"
              >
                Terms
              </Link>

              <Link
                to="/help-center"
                className="hover:text-orange-500 transition-colors"
              >
                Support
              </Link>

            </div>

          </div>

        </div>

      </footer>
    </>
  );
};

export default Footer;