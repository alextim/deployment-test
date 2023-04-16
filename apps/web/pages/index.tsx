import useSWR from 'swr';
import { Button } from 'ui';

type ApiData = {
  uptime?: number;
  timestamp?: number;
  url?: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Web() {
  const { data, error, isLoading } = useSWR('https://api.nelgroup.biz/health', fetcher)

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.toString()}</div>;
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
