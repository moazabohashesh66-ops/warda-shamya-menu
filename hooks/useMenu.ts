import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to load menu");
  }

  return res.json();
};

export function useMenu() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/menu",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 600000, // 10 دقائق
    }
  );

  return {
    categories: Array.isArray(data) ? data : [],
    error,
    isLoading,
    mutate,
  };
}