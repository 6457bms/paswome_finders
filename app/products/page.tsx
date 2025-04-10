"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name"); // Default sorting by name

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const q = query(productsCollection, where("display", "==", true));
      const productSnapshot = await getDocs(q);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  // Function to filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-6">Our Products</h1>
      <div className="flex items-center mb-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mr-4"
        />
        <div>
          <Label htmlFor="sort">Sort by:</Label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="ml-2 p-2 border rounded"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
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
    </div>
  );
};

export default ProductsPage;
