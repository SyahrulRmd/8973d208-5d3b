import { useCallback, useEffect, useState } from "react";

const useGet = <T>(url: string, { isArray = false }: { isArray?: boolean }) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetching = useCallback((endpoint: string) => {
    setLoading(true)
    fetch(endpoint)
      .then(res => res.json())
      .then((data) => {
        if (isArray) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const responseData = data['data'].map((item: any) => item.attributes) as T
          const responseLinks = data['links']
          setData({ data: responseData, links: responseLinks } as unknown as T)
        } else {
          setData(data.data.attributes as T)
        }
      })
      .catch(e => {
        console.log(e);
        setError(e)
      })
      .finally(() => setLoading(false));
  }, [isArray])

  useEffect(() => {
    fetching(url)
  }, [fetching, isArray, url]);

  const refetch = (endpoint: string) => {
    fetching(endpoint)
  }

  return { data, loading, error, refetch };
}

export default useGet;
