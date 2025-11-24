import type { IProduct } from "@/types";

export interface GetProductsResponse {
  success: boolean; 
  count: number; 
  currentPage: number; 
  totalPages: number; 
  totalProducts: number; 
  data: IProduct[];
}

export async function getProducts() {
  try{
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/products`);
  if (!response.ok) {
    throw new Error(`Error fetching products: ${response.statusText}`);
  }
  const data = await response.json();
  console.log("Fetched products:", data);
  return data as GetProductsResponse;
  }catch(error: unknown){
    console.error("Failed to fetch products:", (error as Error).message);
    return null;
  }
}