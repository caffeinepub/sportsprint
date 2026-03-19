import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="font-heading font-bold text-lg">
                Sports<span className="text-primary">Print</span>
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Premium custom sports printing for clubs, teams, and individuals
              across the UK.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-primary transition-colors"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-primary transition-colors"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://x.com"
                aria-label="X"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-primary transition-colors"
              >
                <SiX className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5 text-white/30">
              Shop
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link
                  to="/stock"
                  className="hover:text-primary transition-colors"
                  data-ocid="footer.link"
                >
                  General Stock
                </Link>
              </li>
              <li>
                <Link
                  to="/clubs"
                  className="hover:text-primary transition-colors"
                  data-ocid="footer.link"
                >
                  Club Locker Rooms
                </Link>
              </li>
              <li>
                <span className="cursor-default">Custom Orders</span>
              </li>
              <li>
                <span className="cursor-default">Bulk Orders</span>
              </li>
            </ul>
          </div>

          {/* Club Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5 text-white/30">
              Club Support
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link
                  to="/club-setup"
                  className="hover:text-primary transition-colors"
                  data-ocid="footer.link"
                >
                  Set Up Your Club
                </Link>
              </li>
              <li>
                <Link
                  to="/branding"
                  className="hover:text-primary transition-colors"
                  data-ocid="footer.link"
                >
                  Branding Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/size-guide"
                  className="hover:text-primary transition-colors"
                  data-ocid="footer.link"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/delivery"
                  className="hover:text-primary transition-colors"
                  data-ocid="footer.link"
                >
                  Delivery Info
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="hover:text-primary transition-colors"
                  data-ocid="footer.link"
                >
                  Returns Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5 text-white/30">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>hello@sportsprint.co.uk</li>
              <li>0800 123 4567</li>
              <li className="text-white/40">Mon–Fri, 9am–5pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {year} SportsPrint. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              className="hover:text-white/60 transition-colors underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
