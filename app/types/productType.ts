/* eslint-disable @typescript-eslint/no-explicit-any */
interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Review {
  rating: number;
  comment: string;
  date: string; // أو Date إذا تحب تخزن كـ تاريخ حقيقي
  [key: string]: any; // لتغطية أي خصائص إضافية محتملة
}

interface Meta {
  createdAt: string; // أو Date
  updatedAt: string; // أو Date
  [key: string]: any;
}

export interface ProductType {
  availabilityStatus: string; // مثال: "In Stock"
  brand: string; // مثال: "Velvet Touch"
  category: string; // مثال: "beauty"
  description: string;
  dimensions: Dimensions;
  discountPercentage: number;
  id: number;
  images: string[];
  meta: Meta;
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: Review[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
}
