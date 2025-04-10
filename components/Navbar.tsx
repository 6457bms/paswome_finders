"use client";

// src/components/Navbar.tsx
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  // Placeholder for authentication and role checking
  const isAdmin = true; // Replace with actual authentication check

  return (
    <nav className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold">
          Pawsome Finds
        </Link>
        <div className="flex items-center">
          <Link href="/products" className="mr-4">
            Products
          </Link>
          <Link href="/about" className="mr-4">
            About Us
          </Link>
          <Link href="/contact" className="mr-4">
            Contact Us
          </Link>
          <Link href="/faq" className="mr-4">
            FAQ
          </Link>
          <Link href="/order-history" className="mr-4">
            Order History
          </Link>
          <Link href="/cart" className="mr-4">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          {isAdmin && (
            <Link href="/admin" className="mr-4">
              Admin Panel
            </Link>
          )}
          <Link href="/login">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
