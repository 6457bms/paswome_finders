"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  mainImageUrl: string;
  additionalImageUrls: string[];
  display: boolean;
  comingSoon: boolean;
}

const LandingPage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [comingSoonProducts, setComingSoonProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');

      // Fetch featured products that are displayed
      const featuredQuery = query(productsCollection, where("display", "==", true));
      const featuredSnapshot = await getDocs(featuredQuery);
      const featuredList = featuredSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
      setFeaturedProducts(featuredList);

       // Fetch coming soon products
      const comingSoonQuery = query(productsCollection, where("comingSoon", "==", true));
      const comingSoonSnapshot = await getDocs(comingSoonQuery);
      const comingSoonList = comingSoonSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
      setComingSoonProducts(comingSoonList);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-6">Welcome to Pawsome Finds!</h1>

       <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comingSoonProducts.map((product) => (
            <Card key={product.id} className="hover:animate-glow">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={product.mainImageUrl}
                  alt={product.name}
                  className="rounded-md mb-4"
                />
                <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                <div className="flex justify-between">
                  <Link href={`/products/${product.id}`}>
                    <Button className="mt-4">View Details</Button>
                  </Link>
                  <Button className="mt-4 hover:animate-glow" variant="secondary">Add to Cart</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="hover:animate-glow">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={product.mainImageUrl}
                  alt={product.name}
                  className="rounded-md mb-4"
                />
                <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                <div className="flex justify-between">
                  <Link href={`/products/${product.id}`}>
                    <Button className="mt-4">View Details</Button>
                  </Link>
                  <Button className="mt-4 hover:animate-glow" variant="secondary">Add to Cart</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Explore More</h2>
        <p className="text-gray-600">
          Check out our wide selection of products for your beloved pets.
        </p>
        <Link href="/products">
          <Button variant="secondary">View All Products</Button>
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
