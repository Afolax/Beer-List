import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchBeers = () => {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://api.sampleapis.com/beers/ale')
      .then(response => {
        setBeers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { beers, loading, error };
};

export default useFetchBeers;
