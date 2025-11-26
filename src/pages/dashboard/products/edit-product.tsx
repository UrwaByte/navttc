import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface newProduct {
  title: string
  price: number
  discount: number
  description: string
  brand: string
  category: string
  subCategory: string
  tags: string[]
  images: unknown[]
  variants: {
    color: string,
    colorCode?: string,
    size: string,
    sku?: string,
    stock: number
  }[]
}

export default function EditProduct() {
  const [formData, setFormData] = useState<newProduct>({
    title: "",
    price: 0,
    discount: 0,
    description: "",
    category: "",
    subCategory: "",
    brand: "",
    images: [],
    tags: [],
    variants: [],
  })


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === "collection" || name === "size" || name === "color") {
      const arr = value.split(",").map((s) => s.trim()).filter(Boolean)
      setFormData((prev) => ({ ...prev, [name]: arr }))
    } else if (name === "price" || name === "discount" || name === "rating") {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = () => {}

  return(
        <Dialog>
          <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
          </DialogTrigger>

          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
              Add New Product
              </DialogTitle>
              <DialogDescription>
               Fill in the details to create a new product
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {/* Title */}
              <div className="grid gap-2">
                <label className="text-sm font-medium">Title *</label>
                <Input
                  name="title"
                  placeholder="Product title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              {/* Brand and Category */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Brand *</label>
                  <Input
                    name="brand"
                    placeholder="Brand name"
                    value={formData.brand}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Category *</label>
                  <Input
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Price, Discount, Rating */}
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Price ($) *</label>
                  <Input
                    name="price"
                    type="number"
                    placeholder="0.00"
                    value={formData.price || ""}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Discount (%)</label>
                  <Input
                    name="discount"
                    type="number"
                    placeholder="0"
                    value={formData.discount || ""}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Rating</label>
                  <Input
                    name="rating"
                    type="number"
                    placeholder="0-5"
                    value={"set rating here"}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Collection */}
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Collection (comma separated)
                </label>
                <Input
                  name="collection"
                  placeholder="casual, formal, gym, summer, winter"
                  value={"store subCategory here"}
                  onChange={handleInputChange}
                />
              </div>

              {/* Size and Color */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Size (comma separated)
                  </label>
                  <Input
                    name="size"
                    placeholder="S, M, L, XL"
                    value={"store size here"}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Color (comma separated)
                  </label>
                  <Input
                    name="color"
                    placeholder="Red, Blue, Black"
                    value={"store color here"}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="grid gap-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  placeholder="Product description..."
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>

            <DialogFooter>
            <DialogClose  asChild>
              <Button
                variant="outline"
              >
                Cancel
              </Button>
            </DialogClose>
              <Button onClick={handleSubmit}>
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
  )
}