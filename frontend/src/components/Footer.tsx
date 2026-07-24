// import Image from "next/image";
// import Link from "next/link";
// import FooterLogo from "../../public/logo.png";

// const footerColumns = [
//   {
//     title: "Products",
//     links: ["Find Opportunities", "Internships", "Scholarship", "Jobs", "Saved Opportunities", "Deadline Reminders"],
//   },
//   {
//     title: "Company",
//     links: ["About Us", "Our Mission", "Careers", "Blog", "Company"],
//   },
//   {
//     title: "Resources",
//     links: ["Help Center", "FAQs", "Careers Requirement", "Resume Tips", "Interview Guidelines", "Success Stories"],
//   },
//   {
//     title: "Legal",
//     links: ["Privacy Policy", "Terms & Condition", "Cookie Policy", "Accessibility", "Security", "Disclaimer"],
//   },
// ];

// const Footer = () => {
//   return (
//     <footer className="mt-auto bg-[#0A3D2B] text-white">
//       <div className="mx-auto max-w-[1280px] px-6 md:px-8 lg:px-10 py-16">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
//           {/* Brand Column */}
//           <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start">
//             <Image
//               src={FooterLogo}
//               alt="OpportunityHub NG"
//               className="h-9 w-auto mb-6"
//             />
//             <p className="text-sm text-white/75 text-center sm:text-left max-w-xs">
//               Explore verified opportunities, tailored to your skills and career
//             </p>
//           </div>

//           {/* Other Columns - Centered on mobile */}
//           {footerColumns.map((column) => (
//             <div
//               key={column.title}
//               className="flex flex-col items-center sm:items-start text-center sm:text-left"
//             >
//               <h3 className="font-semibold mb-5 text-white text-base">
//                 {column.title}
//               </h3>
//               <ul className="space-y-3 text-sm">
//                 {column.links.map((link) => (
//                   <li key={link}>
//                     <Link
//                       href="#"
//                       className="text-white/75 hover:text-white transition-colors block"
//                     >
//                       {link}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-16 pt-8 border-t border-white/10 text-center">
//           <p className="text-sm text-white/60">
//             ©2026 OpportunityHub NG. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// import Image from "next/image";
// import Link from "next/link";
// import FooterLogo from "../../public/logo.png";

// const footerColumns = [
//   {
//     title: "Products",
//     links: ["Find Opportunities", "Internships", "Scholarship", "Jobs", "Saved Opportunities", "Deadline Reminders"],
//   },
//   {
//     title: "Company",
//     links: ["About Us", "Our Mission", "Careers", "Blog", "Company"],
//   },
//   {
//     title: "Resources",
//     links: ["Help Center", "FAQs", "Careers Requirement", "Resume Tips", "Interview Guidelines", "Success Stories"],
//   },
//   {
//     title: "Legal",
//     links: ["Privacy Policy", "Terms & Condition", "Cookie Policy", "Accessibility", "Security", "Disclaimer"],
//   },
// ];

// const Footer = () => {
//   return (
//     <footer className="mt-auto bg-[#0A3D2B] text-white">
//       <div className="mx-auto max-w-[1280px] px-6 md:px-8 lg:px-12 py-16">
//         {/* Centered Grid Container */}
//         <div className="max-w-5xl mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
//             {/* Brand Column */}
//             <div className="lg:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
//               <Image
//                 src={FooterLogo}
//                 alt="OpportunityHub NG"
//                 className="h-9 w-auto mb-6 mx-auto sm:mx-0"
//               />
//               <p className="text-sm text-white/75 max-w-xs">
//                 Explore verified opportunities, tailored to your skills and career
//               </p>
//             </div>

//             {/* Other Columns */}
//             {footerColumns.map((column) => (
//               <div
//                 key={column.title}
//                 className="flex flex-col items-center sm:items-start text-center sm:text-left"
//               >
//                 <h3 className="font-semibold mb-5 text-white">{column.title}</h3>
//                 <ul className="space-y-3 text-sm">
//                   {column.links.map((link) => (
//                     <li key={link}>
//                       <Link
//                         href="#"
//                         className="text-white/75 hover:text-white transition-colors"
//                       >
//                         {link}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Bottom Bar */}
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
import FooterLogo from "../../public/logo.png";

const footerColumns = [
  { title: "Products", links: ["Find Opportunities", "Internships", "Scholarship", "Jobs", "Saved Opportunities", "Deadline Reminders"] },
  { title: "Company", links: ["About Us", "Our Mission", "Careers", "Blog", "Company"] },
  { title: "Resources", links: ["Help Center", "FAQs", "Careers Requirement", "Resume Tips", "Interview Guidelines", "Success Stories"] },
  { title: "Legal", links: ["Privacy Policy", "Terms & Condition", "Cookie Policy", "Accessibility", "Security", "Disclaimer"] },
];

const Footer = () => {
  return (
    <footer className="mt-auto bg-[#0A3D2B] text-white">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-12 xl:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
            {/* Brand */}
            <div className="lg:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
              <Image src={FooterLogo} alt="OpportunityHub NG" className="h-9 w-auto mb-6" />
              <p className="text-sm text-white/75 max-w-xs">
                Explore verified opportunities, tailored to your skills and career
              </p>
            </div>

            {/* Columns */}
            {footerColumns.map((col) => (
              <div key={col.title} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <h3 className="font-semibold mb-5">{col.title}</h3>
                <ul className="space-y-3 text-sm">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-white/75 hover:text-white">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-white/60">
          ©2026 OpportunityHub NG. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;