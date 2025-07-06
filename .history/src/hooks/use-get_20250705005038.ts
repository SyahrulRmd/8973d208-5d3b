import { useEffect, useState } from "react";

const useGet = <T>(url: string, isArray?: boolean) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        console.log(data['data']);

        if (isArray) {
          setData(data['data'].map((item: any) => item.attributes) as T)
        } else {
          setData(data.data.attributes as T)
        }
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

export default useGet;
