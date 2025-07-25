import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export function useComplaintStatuses() {
  const [statuses, setStatuses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStatuses() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/complaints/system/statuses`);
        if (!res.ok) throw new Error("Erro ao buscar status");
        const data = await res.json();
        setStatuses(data);
      } catch (err: any) {
        setError(err.message || "Erro ao buscar status");
      } finally {
        setIsLoading(false);
      }
    }
    fetchStatuses();
  }, []);

  return { statuses, isLoading, error };
} 