export interface IVariant {
  color: string;
  colorCode?: string;
  size: string;
  sku?: string;
  stock: number;
}
export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  discountPercentage: number;
  brand: string;
  category: 'Men' | 'Women' | 'Kids' | 'Unisex'; // Union type for strictness
  subCategory?: string;
  tags?: string[];
  thumbnail: string;
  images?: string[];
  variants: IVariant[];
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Virtuals definition (optional, for type hinting)
  finalPrice: number;
  totalStock: number;
}