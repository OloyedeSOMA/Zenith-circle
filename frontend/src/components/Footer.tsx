// import Image from "next/image";
// import Link from "next/link";
// import FooterLogo from "../../public/logo.png";

// const footerColumns = [
//   { title: "Products", links: ["Find Opportunities", "Internships", "Scholarship", "Jobs", "Saved Opportunities", "Deadline Reminders"] },
//   { title: "Company", links: ["About Us", "Our Mission", "Careers", "Blog", "Company"] },
//   { title: "Resources", links: ["Help Center", "FAQs", "Careers Requirement", "Resume Tips", "Interview Guidelines", "Success Stories"] },
//   { title: "Legal", links: ["Privacy Policy", "Terms & Condition", "Cookie Policy", "Accessibility", "Security", "Disclaimer"] },
// ];

// const Footer = () => {
//   return (
//     <footer className="mt-auto bg-[#0A3D2B] text-white">
//       <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-12 xl:px-16 py-16">
//         <div className="max-w-5xl mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
//             {/* Brand */}
//             <div className="lg:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
//               <Image src={FooterLogo} alt="OpportunityHub NG" className="h-9 w-auto mb-6" />
//               <p className="text-sm text-white/75 max-w-xs">
//                 Explore verified opportunities, tailored to your skills and career
//               </p>
//             </div>

//             {/* Columns */}
//             {footerColumns.map((col) => (
//               <div key={col.title} className="flex flex-col items-center sm:items-start text-center sm:text-left">
//                 <h3 className="font-semibold mb-5">{col.title}</h3>
//                 <ul className="space-y-3 text-sm">
//                   {col.links.map((link) => (
//                     <li key={link}>
//                       <Link href="#" className="text-white/75 hover:text-white">
//                         {link}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-white/60">
//           ©2026 OpportunityHub NG. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

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
    <footer className="bg-primary text-white flex justify-center w-full max-w-[100%]">
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


{/* <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          
          <div className="max-w-sm">
            <Link href="/">
              <Image
                src={footerLogo}
                alt="OpportunityHub NG"
                className="h-auto w-40"
                priority
              />
            </Link>

            <p className="mt-6 text-sm leading-7 text-white/80">
              Explore verified jobs, internships and scholarships designed to
              connect students and graduates with meaningful opportunities.
            </p>
          </div>

          
          <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-4">
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
          </div> */}