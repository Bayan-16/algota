// src/hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// عرف الواجهات
export interface ProductItem {
  id?: string;
  image: string;
  name: string;
  nameEn: string;
  pieceWieght: string;
  numOf: string;
  parcelBarcode: string;
}

export interface NumberOfSection {
  title1: string;
  title2: string;
  title3: string;
}

export interface ProductSection {
  id: string;
  image: string;
  insideImage: string;
  name: string;
  nameEn: string;
  descrption: string;
  descrptionEn: string;
  descrption1: string;
  descrption1En: string;
  numberofsection: NumberOfSection;
  numberofsectionEn: NumberOfSection;
  section1: ProductItem[];
  section2: ProductItem[];
  section3: ProductItem[];
}

// الهُوك
export const useTest = () => {
  return useQuery<ProductSection[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "products"));

      const products = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const data = doc.data();

          const [section1Snap, section2Snap, section3Snap] = await Promise.all([
            getDocs(collection(doc.ref, "section1")),
            getDocs(collection(doc.ref, "section2")),
            getDocs(collection(doc.ref, "section3")),
          ]);

          const section1 = section1Snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as ProductItem[];
          const section2 = section2Snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as ProductItem[];
          const section3 = section3Snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as ProductItem[];

          return {
            id: doc.id,
            ...data,
            section1,
            section2,
            section3,
          } as ProductSection;
        })
      );

      return products;
    },
  });
};
