"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Target, X } from "lucide-react";

const navLinks = [
  { name: "Upload", href: "/upload", target: "" },
  { name: "Static Analysis", href: "/upload/analysis", target: "" },
  {
    name: "VM",
    href: "https://remotedesktop.google.com/access/session/0780a217-8709-48ee-d00a-8d2c5707f9cd",
    target: "_blank",
  },
  { name: "Capa", href: "/upload/capa", target: "" },
  { name: "Code", href: "/upload/code", target: "" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md fixed w-[100%] z-999">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          MalBox
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="hover:text-gray-400"
                target={link.target}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-gray-800 mt-2 p-4 rounded-md">
          {navLinks.map((link) => (
            <li key={link.name} className="py-2 border-b border-gray-700">
              <Link
                href={link.href}
                className="block"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
