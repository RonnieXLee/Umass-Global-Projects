import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DogDetails from './DogDetails';

function FilterDogDetails({ dogs }) {
  const { name } = useParams();
  const navigate = useNavigate();

  if (name) {
    const currentDog = dogs.find(
      dog => dog.name.toLowerCase() === name.toLowerCase()
    );

    if (currentDog) {
      return <DogDetails dog={currentDog} />;
    } else {
      // Dog not found, navigate back to the dog list
      navigate('/dogs');
    }
  }

  return null;
}

export default FilterDogDetails;
