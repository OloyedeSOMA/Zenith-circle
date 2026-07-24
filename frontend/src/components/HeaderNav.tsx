// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Bell, Menu, X } from "lucide-react";
// import HeaderLogo from "../../public/logo.png";
// import Button from "./Button";

// const navLinks = [
//   { label: "Jobs", href: "/jobs" },
//   { label: "Internships", href: "/internships" },
//   { label: "Scholarships", href: "/scholarships" },
// ];

// const HeaderNav = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="w-full mx-auto border-b bg-white">
//       <div className="mx-auto max-w-[1280px] px-4 md:px-8 lg:px-10">
//         <div className="flex h-16 md:h-20 items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="shrink-0">
//             <Image
//               src={HeaderLogo}
//               alt="OpportunityHub NG"
//               className="h-8 md:h-9 w-auto"
//               priority
//             />
//           </Link>

//           {/* Desktop Nav - Centered */}
//           <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="text-[15px] font-medium text-gray-700 hover:text-emerald-600 transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>

//           {/* Right Side */}
//           <div className="flex items-center gap-3">
//             <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors hidden md:block">
//               <Bell size={22} />
//             </button>

//             {/* Desktop Buttons */}
//             <div className="hidden md:flex items-center gap-3">
//               <Link href="/login">
//                 <Button variant="secondary" className="px-6 py-2.5 text-sm font-medium">
//                   Log in
//                 </Button>
//               </Link>
//               <Link href="/signup">
//                 <Button variant="primary" className="px-6 py-2.5 text-sm font-medium">
//                   Sign Up
//                 </Button>
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="md:hidden p-2 text-gray-700"
//             >
//               {menuOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden border-t bg-white px-4 py-6">
//           <div className="flex flex-col gap-6">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="text-lg font-medium text-gray-700"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <div className="flex flex-col gap-3 pt-4 border-t">
//               <Link href="/login" onClick={() => setMenuOpen(false)}>
//                 <Button variant="secondary" className="w-full py-3 text-base">
//                   Log in
//                 </Button>
//               </Link>
//               <Link href="/signup" onClick={() => setMenuOpen(false)}>
//                 <Button variant="primary" className="w-full py-3 text-base">
//                   Sign Up
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default HeaderNav;

// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Bell, Menu, X } from "lucide-react";
// import HeaderLogo from "../../public/logo.png";
// import Button from "./Button";

// const navLinks = [
//   { label: "Jobs", href: "/jobs" },
//   { label: "Internships", href: "/internships" },
//   { label: "Scholarships", href: "/scholarships" },
// ];

// const HeaderNav = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="w-full border-b bg-white">
//       <div className="mx-auto max-w-[1280px] px-6 lg:px-8 xl:px-10">
//         <div className="flex h-16 md:h-20 items-center justify-between">
//           {/* Logo - Left */}
//           <Link href="/" className="shrink-0">
//             <Image
//               src={HeaderLogo}
//               alt="OpportunityHub NG"
//               className="h-8 md:h-9 w-auto"
//               priority
//             />
//           </Link>

//           {/* Navigation - Perfectly Centered */}
//           <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="text-[15px] font-medium text-gray-700 hover:text-emerald-600 transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>

//           {/* Right Side Actions */}
//           <div className="flex items-center gap-4">
//             <button className="p-2 text-gray-600 hover:text-gray-900 hidden md:block">
//               <Bell size={22} />
//             </button>

//             <div className="hidden md:flex items-center gap-3">
//               <Link href="/login">
//                 <Button variant="secondary" className="px-6 py-2.5 text-sm font-medium min-w-[110px]">
//                   Log in
//                 </Button>
//               </Link>
//               <Link href="/signup">
//                 <Button variant="primary" className="px-6 py-2.5 text-sm font-medium min-w-[110px]">
//                   Sign Up
//                 </Button>
//               </Link>
//             </div>

//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="md:hidden p-2 text-gray-700"
//             >
//               {menuOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden border-t bg-white px-6 py-8">
//           <div className="flex flex-col gap-6 text-center">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="text-lg font-medium text-gray-700 py-1"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 {link.label}
//               </Link>
//             ))}

//             <div className="pt-6 border-t flex flex-col gap-3">
//               <Link href="/login" onClick={() => setMenuOpen(false)}>
//                 <Button variant="secondary" className="w-full py-3.5">Log in</Button>
//               </Link>
//               <Link href="/signup" onClick={() => setMenuOpen(false)}>
//                 <Button variant="primary" className="w-full py-3.5">Sign Up</Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default HeaderNav;

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, Menu, X } from "lucide-react";
import HeaderLogo from "../../public/logo.png";
import Button from "./Button";

const navLinks = [
  { label: "Jobs", href: "/jobs" },
  { label: "Internships", href: "/internships" },
  { label: "Scholarships", href: "/scholarships" },
];

const HeaderNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-12 xl:px-16">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src={HeaderLogo}
              alt="OpportunityHub NG"
              className="h-8 md:h-9 w-auto"
              priority
            />
          </Link>

          {/* Centered Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium text-gray-700 hover:text-emerald-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 hidden md:block">
              <Bell size={22} />
            </button>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="secondary" className="px-6 py-2.5 text-sm">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" className="px-6 py-2.5 text-sm">Sign Up</Button>
              </Link>
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-6 py-8">
          <div className="flex flex-col gap-6 text-center">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-lg">
                {link.label}
              </Link>
            ))}
            <div className="pt-6 border-t space-y-3">
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="secondary" className="w-full py-3">Log in</Button>
              </Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)}>
                <Button variant="primary" className="w-full py-3">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderNav;