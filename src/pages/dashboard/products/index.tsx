import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { IProduct } from "@/types"
import ProductTable from "./product-table"
import AddProduct from "./add-product"

export default function DashboardProducts() {
  const [products, setProducts] = useState<IProduct[]>([])
  console.log("products",products)
  const [, setLoading] = useState(false)
  const [,setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const itemsPerPage = 10

  // Filter and paginate products
  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    )
  }, [products, searchTerm])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIdx, startIdx + itemsPerPage)

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${baseUrl}/products`)
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
        const data = await res.json()
        if (data?.data.length) {
           setProducts(data?.data)
        } else {
          setProducts([])
        }
      } catch (err) {
        setError((err as Error).message || "Failed to load products")
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    void fetchProducts()
  }, [])

  // Handlers 

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-sm text-muted-foreground">
          Manage your product catalog with add, edit, and delete functionality
        </p>
      </div>

      <Separator />

      {/* Search and Add Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search by title, brand, or category..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
          className="w-full sm:max-w-sm"
        />
          <AddProduct open={isDialogOpen} setOpen={setIsDialogOpen}/>
        </div>

      {/* Products Table */}
<ProductTable paginatedProducts={paginatedProducts}/>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIdx + 1} to{" "}
            {Math.min(startIdx + itemsPerPage, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="h-8 w-8 p-0"
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
