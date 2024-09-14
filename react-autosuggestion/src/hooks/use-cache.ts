import { useRef } from 'react';

const useCache = () => {
  // Create a cache object (in memory)
  const cache = useRef({});

  // Retrieve cached data from the cache object by key
  const getCache = (key) => {
    return cache.current[key] || null;
  };

  // Set data into the cache with a specific key
  const setCache = (key, data) => {
    cache.current[key] = data;
  };

  return { getCache, setCache };
};

export default useCache;
