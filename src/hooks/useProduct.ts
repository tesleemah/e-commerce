import { useState, useCallback } from "react";
import { Product } from "../types";

const LIMIT = 100;

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(
    async (currentSkip: number) => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=${LIMIT}&skip=${currentSkip}`,
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const json = await response.json();

        if (json.products.length < LIMIT) {
          setHasMore(false);
        }

        setProducts((prev) =>
          currentSkip === 0 ? json.products : [...prev, ...json.products],
        );
        setSkip(currentSkip + LIMIT);
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  const initialLoad = useCallback(() => {
    fetchProducts(0);
  }, [fetchProducts]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchProducts(skip);
    }
  }, [fetchProducts, skip, loading, hasMore]);

  return { products, loading, error, loadMore, initialLoad, hasMore };
};
