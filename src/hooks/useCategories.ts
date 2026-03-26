import { useState, useEffect } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [catLoading, setCatLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setCatLoading(true);
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories",
        );
        const data = await response.json();
        setCategories(data.map((c: { slug: string }) => c.slug));
      } catch (err) {
        console.error("Error fetching categories", err);
      } finally {
        setCatLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return { categories, catLoading };
};
