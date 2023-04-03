import { useEffect, useState } from 'react';
import { Button } from 'ui';

type ApiData = {
  uptime?: number;
  timestamp?: number;
  url?: string;
};

export default function Web() {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('https://api.nelgroup.biz/health');
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError((err as Error).toString());
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Web</h1>
      {data?.uptime && (
        <div>
          <span>uptime:</span>
          <span>data.uptime</span>
        </div>
      )}
      {data?.timestamp && (
        <div>
          <span>timestamp:</span>
          <span>data.timestamp</span>
        </div>
      )}
      {data?.url && (
        <div>
          <span>url:</span>
          <span>data.url</span>
        </div>
      )}
      <Button />
    </div>
  );
}
