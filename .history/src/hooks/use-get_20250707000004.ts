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

          let lastOffset = 0
          let limit = 0

          if (responseLinks) {
            lastOffset = responseLinks['last'].split('page[offset]=')[1]
            limit = responseLinks['last'].match(/page\[limit\]=(\d+)/)[1]
          }

          setData({
            data: data['data'],
            links: responseLinks,
            total: Number(lastOffset) + Number(limit) || 0,
          } as unknown as T)
        } else {
          setData(data.data.attributes as T)
        }
      })
      .catch(e => {
        console.log(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [isArray])

  useEffect(() => {
    fetching(url)
  }, [fetching, isArray, url]);

  const refetch = (endpoint: string) => {
    fetching(endpoint)
  }

  const refetchAdditional = (endpoint: string) => {
    fetch(endpoint)
      .then(res => res.json())
      .then((json) => {
        if (isArray) {
          const responseLinks = json['links']

          let lastOffset = 0
          let limit = 0

          if (responseLinks) {
            lastOffset = responseLinks['last'].split('page[offset]=')[1]
            limit = responseLinks['last'].match(/page\[limit\]=(\d+)/)[1]
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const currentData = (data as any)?.data || []
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const newData = json['data'] || []

          setData({
            data: [...currentData, ...newData],
            links: responseLinks,
            total: Number(lastOffset) + Number(limit) || 0,
          } as unknown as T)
        } else {
          setData(json.data.attributes as T)
        }
      })
      .catch(e => {
        console.log(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }

  return { data, loading, error, refetch, refetchAdditional };
}

export default useGet;
