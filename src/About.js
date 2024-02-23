import HeroSection from './Components/HeroSection';
// import React, { useContext } from 'react';
// import {AppContext} from './Context/ProductContext';

import { useProductContext } from './Context/ProductContext';

function About() {

  // const {myName} = useContext(AppContext);
  const {myName} = useProductContext();

  const data = {
    name: "Akash Ecommerce",
  }
  return (
    <>
    {myName}
    <HeroSection myData={data}/>
    </>
  )
}

export default About;
