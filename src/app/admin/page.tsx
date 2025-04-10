"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const AdminPage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-6">Admin Panel</h1>
      <p>Welcome to the admin panel. You can manage various aspects of the application from here.</p>
      <Link href="/admin/products">
        <Button>Manage Products</Button>
      </Link>
    </div>
  );
};

export default AdminPage;
