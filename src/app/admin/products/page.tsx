"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc, deleteDoc, addDoc } from "firebase/firestore";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  mainImageUrl: string;
  additionalImageUrls: string[];
  availableQuantity: number;
  offerPrice: number;
  discount: number;
  category: string;
  type: string;
  display: boolean;
  comingSoon: boolean;
}

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [isNewProductOpen, setIsNewProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState(0);
  const [editMainImageUrl, setEditMainImageUrl] = useState("");
  const [editAdditionalImageUrls, setEditAdditionalImageUrls] = useState<string[]>([]);
  const [editAvailableQuantity, setEditAvailableQuantity] = useState(0);
  const [editOfferPrice, setEditOfferPrice] = useState(0);
  const [editDiscount, setEditDiscount] = useState(0);
  const [editCategory, setEditCategory] = useState("");
  const [editType, setEditType] = useState("");
  const [editDisplay, setEditDisplay] = useState(false);
  const [editComingSoon, setEditComingSoon] = useState(false);


    // New Product State
  const [newProductName, setNewProductName] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newProductMainImageUrl, setNewProductMainImageUrl] = useState("");
  const [newProductAdditionalImageUrls, setNewProductAdditionalImageUrls] = useState<string[]>([]);
  const [newProductAvailableQuantity, setNewProductAvailableQuantity] = useState(0);
  const [newProductOfferPrice, setNewProductOfferPrice] = useState(0);
  const [newProductDiscount, setNewProductDiscount] = useState(0);
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductType, setNewProductType] = useState("");
  const [newProductDisplay, setNewProductDisplay] = useState(false);
  const [newProductComingSoon, setNewProductComingSoon] = useState(false);


  useEffect(() => {
    // Fetch products from Firestore
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setEditName(product.name);
    setEditDescription(product.description);
    setEditPrice(product.price);
    setEditMainImageUrl(product.mainImageUrl);
    setEditAdditionalImageUrls(product.additionalImageUrls);
    setOpen(true);
  };

  const handleSave = async () => {
    if (!selectedProduct) return;

    // Reference to the product document in Firestore
    const productRef = doc(db, 'products', selectedProduct.id);

    // Update the product in Firestore
    try {
      await updateDoc(productRef, {
        name: editName,
        description: editDescription,
        price: editPrice,
        mainImageUrl: editMainImageUrl,
        additionalImageUrls: editAdditionalImageUrls,
        availableQuantity: editAvailableQuantity,
        offerPrice: editOfferPrice,
        discount: editDiscount,
        category: editCategory,
        type: editType,
        display: editDisplay,
        comingSoon: editComingSoon,
      });

      // Update the product in the local state
      const updatedProducts = products.map((product) => {
        if (product.id === selectedProduct.id) {
          return {
            ...product,
            name: editName,
            description: editDescription,
            price: editPrice,
            mainImageUrl: editMainImageUrl,
            additionalImageUrls: editAdditionalImageUrls,
            availableQuantity: editAvailableQuantity,
            offerPrice: editOfferPrice,
            discount: editDiscount,
            category: editCategory,
            type: editType,
            display: editDisplay,
            comingSoon: editComingSoon,
          };
        }
        return product;
      });

      setProducts(updatedProducts);
      setOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
      // Optionally, display an error message to the user
    }
  };

  const handleDelete = async (product: Product) => {
    // Reference to the product document in Firestore
    const productRef = doc(db, 'products', product.id);

    // Delete the product from Firestore
    try {
      await deleteDoc(productRef);

      // Update the product in the local state
      const updatedProducts = products.filter((p) => p.id !== product.id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
      // Optionally, display an error message to the user
    }
  };

    const handleCreateNewProduct = async () => {
        try {
            const productsCollection = collection(db, 'products');
            await addDoc(productsCollection, {
                name: newProductName,
                description: newProductDescription,
                price: newProductPrice,
                mainImageUrl: newProductMainImageUrl,
                additionalImageUrls: newProductAdditionalImageUrls,
                availableQuantity: newProductAvailableQuantity,
                offerPrice: newProductOfferPrice,
                discount: newProductDiscount,
                category: newProductCategory,
                type: newProductType,
                display: newProductDisplay,
                comingSoon: newProductComingSoon,
            });

            // Fetch the updated list of products
            const fetchProducts = async () => {
                const productSnapshot = await getDocs(productsCollection);
                const productList = productSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Product));
                setProducts(productList);
            };
            fetchProducts();

            // Clear the form
            setNewProductName("");
            setNewProductDescription("");
            setNewProductPrice(0);
            setNewProductMainImageUrl("");
            setNewProductAdditionalImageUrls([]);
            setNewProductAvailableQuantity(0);
            setNewProductOfferPrice(0);
            setNewProductDiscount(0);
            setNewProductCategory("");
            setNewProductType("");
            setNewProductDisplay(false);
            setNewProductComingSoon(false);

            setIsNewProductOpen(false);
        } catch (error) {
            console.error("Error creating new product:", error);
        }
    };


  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-6">Manage Products</h1>
      <p>Here, you will be able to add, edit, and delete products.</p>

        <Button variant="secondary" onClick={() => setIsNewProductOpen(true)}>
            Add New Product
        </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Main Image URL</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Offer Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Display</TableHead>
            <TableHead>Coming Soon</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.mainImageUrl}</TableCell>
              <TableCell>{product.availableQuantity}</TableCell>
              <TableCell>${product.offerPrice.toFixed(2)}</TableCell>
              <TableCell>{product.discount}%</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>{product.display ? "Yes" : "No"}</TableCell>
              <TableCell>{product.comingSoon ? "Yes" : "No"}</TableCell>
              <TableCell className="text-right">
                <Button variant="secondary" onClick={() => handleEdit(product)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(product)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Make changes to the product details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                type="number"
                id="price"
                value={editPrice}
                onChange={(e) => setEditPrice(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mainImageUrl" className="text-right">
                Main Image URL
              </Label>
              <Input
                id="mainImageUrl"
                value={editMainImageUrl}
                onChange={(e) => setEditMainImageUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="additionalImageUrls" className="text-right">
                Additional Image URLs (comma-separated)
              </Label>
              <Input
                id="additionalImageUrls"
                value={editAdditionalImageUrls.join(',')}
                onChange={(e) => setEditAdditionalImageUrls(e.target.value.split(',').map(url => url.trim()))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="availableQuantity" className="text-right">
                Available Quantity
              </Label>
              <Input
                type="number"
                id="availableQuantity"
                value={editAvailableQuantity}
                onChange={(e) => setEditAvailableQuantity(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="offerPrice" className="text-right">
                Offer Price
              </Label>
              <Input
                type="number"
                id="offerPrice"
                value={editOfferPrice}
                onChange={(e) => setEditOfferPrice(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discount" className="text-right">
                Discount (%)
              </Label>
              <Input
                type="number"
                id="discount"
                value={editDiscount}
                onChange={(e) => setEditDiscount(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Input
                id="type"
                value={editType}
                onChange={(e) => setEditType(e.target.value)}
                className="col-span-3"
              />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="display" className="text-right">
                Display
              </Label>
              <Checkbox
                id="display"
                checked={editDisplay}
                onCheckedChange={(checked) => setEditDisplay(!!checked)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="comingSoon" className="text-right">
                Coming Soon
              </Label>
              <Checkbox
                id="comingSoon"
                checked={editComingSoon}
                onCheckedChange={(checked) => setEditComingSoon(!!checked)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSave}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

        <Dialog open={isNewProductOpen} onOpenChange={setIsNewProductOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the new product below.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="newProductName" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="newProductName"
                            value={newProductName}
                            onChange={(e) => setNewProductName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="newProductDescription" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="newProductDescription"
                            value={newProductDescription}
                            onChange={(e) => setNewProductDescription(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="newProductPrice" className="text-right">
                            Price
                        </Label>
                        <Input
                            type="number"
                            id="newProductPrice"
                            value={newProductPrice}
                            onChange={(e) => setNewProductPrice(Number(e.target.value))}
                            className="col-span-3"
                        />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="newProductMainImageUrl" className="text-right">
                        Main Image URL
                      </Label>
                      <Input
                        id="newProductMainImageUrl"
                        value={newProductMainImageUrl}
                        onChange={(e) => setNewProductMainImageUrl(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="newProductAdditionalImageUrls" className="text-right">
                        Additional Image URLs (comma-separated)
                      </Label>
                      <Input
                        id="newProductAdditionalImageUrls"
                        value={newProductAdditionalImageUrls.join(',')}
                        onChange={(e) => setNewProductAdditionalImageUrls(e.target.value.split(',').map(url => url.trim()))}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="newProductAvailableQuantity" className="text-right">
                            Available Quantity
                        </Label>
                        <Input
                            type="number"
                            id="newProductAvailableQuantity"
                            value={newProductAvailableQuantity}
                            onChange={(e) => setNewProductAvailableQuantity(Number(e.target.value))}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="newProductOfferPrice" className="text-right">
                            Offer Price
                        </Label>
                        <Input
                            type="number"
                            id="newProductOfferPrice"
                            value={newProductOfferPrice}
                            onChange={(e) => setNewProductOfferPrice(Number(e.target.value))}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="newProductDiscount" className="text-right">
                            Discount (%)
                        </Label>
                        <Input
                            type="number"
                            id="newProductDiscount"
                            value={newProductDiscount}
                            onChange={(e) => setNewProductDiscount(Number(e.target.value))}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="newProductCategory" className="text-right">
                            Category
                        </Label>
                        <Input
                            id="newProductCategory"
                            value={newProductCategory}
                            onChange={(e) => setNewProductCategory(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="newProductType" className="text-right">
                            Type
                        </Label>
                        <Input
                            id="newProductType"
                            value={newProductType}
                            onChange={(e) => setNewProductType(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="newProductDisplay" className="text-right">
                        Display
                      </Label>
                      <Checkbox
                        id="newProductDisplay"
                        checked={newProductDisplay}
                        onCheckedChange={(checked) => setNewProductDisplay(!!checked)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="newProductComingSoon" className="text-right">
                        Coming Soon
                      </Label>
                      <Checkbox
                        id="newProductComingSoon"
                        checked={newProductComingSoon}
                        onCheckedChange={(checked) => setNewProductComingSoon(!!checked)}
                        className="col-span-3"
                      />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleCreateNewProduct}>
                        Create Product
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
};

export default AdminProductsPage;
