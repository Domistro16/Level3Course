import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, BookOpen } from "lucide-react";
import { Link, NavLink } from "react-router-dom";


const FallBackNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/coming-soon", label: "Earn", isExternal: false },
    {
      href: "https://dns.level3labs.fun/",
      label: "Mint Domain",
      isExternal: true,
    },
  ];

  const activeLinkClasses = "text-yellow-400 font-semibold";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation to visible state
      transition={{ duration: 0.7, ease: "easeOut" }} // Animation transition properties
      // Adjusted background color to the specific hex code #141b33
      className={`fixed top-4 left-0 right-0 max-w-6xl mx-auto z-50 transition-all duration-300 px-1 sm:pl-6 lg:pl-8
                  ${
                    isScrolled || mobileMenuOpen
                      ? "bg-[#141b33] py-2 shadow-xl"
                      : "bg-[#141b33] py-1 shadow-lg"
                  }  ${mobileMenuOpen ? "rounded-sm" : "rounded-full"}
        
                 `}
    >
      <div className="flex justify-between items-center h-13">
        <div className="flex items-center gap-2">
          {}
          <div className="hidden md:flex items-center">
            <div className="bg-slate-900 rounded-full p-3 flex flex-col justify-center w-12 h-12 cursor-pointer">
              <div className="border-[#FFB000] border-b-[2px] w-6"></div>
              <div className="border-[#FFB000] border-b-[2px] w-4 mt-3"></div>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-1.5">
            <img
              src="/Level3.png"
              className="text-xl font-bold text-[#FFB000] h-10 hidden lg:block"
            />
            <img
              src="/small.png"
              className="text-xl font-bold text-[#FFB000] h-14 lg:hidden block"
            />
          </Link>
        </div>

        {}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) =>
            link.isExternal || link.href ? (
              <a
                key={link.label}
                href={link.href || link.to}
                className="text-gray-200 hover:text-yellow-400 transition-colors duration-200 font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.label}
                to={link.to as string}
                className={({ isActive }) =>
                  `text-gray-200 hover:text-yellow-400 transition-colors duration-200 font-semibold ${
                    isActive ? activeLinkClasses : ""
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            )
          )}
          {}
          <NavLink
            to="/courses/all"
            className={({ isActive }) =>
              `text-gray-200 hover:text-yellow-400 transition-colors duration-200 flex items-center font-semibold ${
                isActive ? activeLinkClasses : ""
              }`
            }
          >
            {" "}
            <BookOpen className="w-4 h-4 mr-2" />
            View Courses
          </NavLink>
        </div>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-200 hover:text-yellow-400"
          >
            {mobileMenuOpen ? (
              <X size={26} />
            ) : (
              <div className="items-center">
                <div className="bg-slate-900 rounded-full p-3 flex flex-col justify-center w-12 h-12 cursor-pointer">
                  <div className="border-[#FFB000] border-b-[2px] w-6"></div>
                  <div className="border-[#FFB000] border-b-[2px] w-4 mt-3"></div>
                </div>
              </div>
            )}
          </Button>
        </div>
      </div>

      {}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#141b33] py-3 shadow-lg rounded-lg"
        >
          <div className="flex flex-col items-center space-y-4">
            {navLinks.map((link) =>
              link.isExternal || link.href ? (
                <a
                  key={link.label}
                  href={link.href || link.to}
                  className="text-gray-200 hover:text-yellow-400 transition-colors duration-200 font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to as string}
                  className={({ isActive }) =>
                    `text-gray-200 hover:text-yellow-400 transition-colors duration-200 font-semibold ${
                      isActive ? activeLinkClasses : ""
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              )
            )}
            {}
            <NavLink
              to="/courses/all"
              className={({ isActive }) =>
                `text-gray-200 hover:text-yellow-400 transition-colors duration-200 flex items-center font-semibold ${
                  isActive ? activeLinkClasses : ""
                }`
              }
            >
              {" "}
              <BookOpen className="w-4 h-4 mr-2" />
              View Courses
            </NavLink>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default FallBackNavbar;
