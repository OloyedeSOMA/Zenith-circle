import Image from "next/image";
import Link from "next/link";

import footerLogo from "../../public/footerLogo.png";

const footerLinks = [
  {
    title: "Products",
    links: [
      { name: "Find Jobs", href: "/jobs" },
      { name: "Internships", href: "/internships" },
      { name: "Scholarships", href: "/scholarships" },
      { name: "Saved Opportunities", href: "/saved" },
      { name: "Deadline Reminders", href: "/reminders" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Mission", href: "/mission" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help Center", href: "/help" },
      { name: "FAQs", href: "/faq" },
      { name: "Resume Tips", href: "/resume-tips" },
      { name: "Interview Guide", href: "/interview-guide" },
      { name: "Success Stories", href: "/success-stories" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Accessibility", href: "/accessibility" },
      { name: "Security", href: "/security" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-white flex justify-center w-full max-w-[100%] gap-5">
      <div className="mx-auto w-full max-w-[90%] px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-full">
            <Link href="/">
                <Image
                src={footerLogo}
                alt="OpportunityHub NG"
                className="h-auto w-40"
                priority
                />
            </Link>

            <p className="mt-6 text-sm leading-7 text-white/80">
                Explore verified opportunities, tailored to your skills and career
            </p>
        </div>

        {/* Footer Links */}
        <div className="mx-auto w-full max-w-[100%] flex justify-center px-4 py-14 sm:px-6 lg:px-8">
            <div className="w-full max-w-[70%] mt-12 mb-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerLinks.map((section) => (
                <div key={section.title}>
                <h3 className="mb-4 text-base font-semibold">
                    {section.title}
                </h3>

                <ul className="space-y-3">
                    {section.links.map((link) => (
                    <li key={link.name}>
                        <Link
                        href={link.href}
                        className="text-sm text-white/80 transition-colors duration-200 hover:text-white"
                        >
                        {link.name}
                        </Link>
                    </li>
                    ))}
                </ul>
                </div>
            ))}
            </div>
        </div>
        {/* </div> */}

        {/* Divider */}
        <div className="my-10 h-px bg-white/20" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-white/70 sm:flex-row">
          <p>
            © {new Date().getFullYear()} OpportunityHub NG. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;