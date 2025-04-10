// src/app/products/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  mainImageUrl: string;
  additionalImageUrls: string[];
}

interface Props {
  params: { id: string };
}

const ProductDetailsPage = ({ params }: Props) => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = params;

  useEffect(() => {
    // Fetch product details from Firestore (replace with your actual data fetching logic)
    const fetchProductDetails = async (id: string) => {
      // Simulate fetching data from Firestore
      const mockProduct: Product = {
        id: id,
        name: "Cozy Dog Bed",
        description: "A super comfy bed for your furry friend. This bed is made with high quality faux fur.",
        price: 49.99,
        mainImageUrl: "https://picsum.photos/id/237/300/200", // Placeholder image
        additionalImageUrls: [
          "https://picsum.photos/id/238/300/200",
          "https://picsum.photos/id/239/300/200",
        ]
      };
      setProduct(mockProduct);
    };

    fetchProductDetails(id);
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <img
            src={product.mainImageUrl}
            alt={product.name}
            className="rounded-md mb-4"
          />
          {product.additionalImageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`${product.name} - Additional ${index + 1}`}
              className="rounded-md mb-4"
            />
          ))}
          <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
          <Button className="mt-4">Add to Cart</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailsPage;
