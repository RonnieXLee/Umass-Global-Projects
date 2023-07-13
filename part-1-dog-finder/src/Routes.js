import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DogList from './DogList';
import FilterDogDetails from './FilterDogDetails';

function Routes({ dogs }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== '/dogs') {
      navigate('/dogs');
    }
  }, [location, navigate]);

  return (
    <>
      {location.pathname === '/dogs' && <DogList dogs={dogs} />}
      {location.pathname.startsWith('/dogs/') && <FilterDogDetails dogs={dogs} />}
    </>
  );
}

export default Routes;