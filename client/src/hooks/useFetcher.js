import {useState, useEffect} from 'react';

const useFetcher = (url, options = {}) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setStatus('fetching');
      const response = await fetch(url, options);

      const data = await response.json();
      setData(data);
      setStatus('fetched');
    }

    fetchData();
  }, [url]);

  return [data, status];
};
export default useFetcher;