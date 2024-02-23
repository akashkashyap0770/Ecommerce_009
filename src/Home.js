import React from "react";
// import styled from "styled-components";
import HeroSection from './Components/HeroSection';
import Services from "./Components/Services";
import Trusted from "./Components/Trusted";
import FeatureProduct from "./Components/FeatureProduct";

const Home = () => {

    const data = {
        name: "Akash Store",
    } 

  return(
    <>  
    <HeroSection myData={data}/>
    <FeatureProduct />
    <Services/>
    <Trusted/>
    </>
  )
};

// const Wrapper = styled.section`
//   height: 100vh;
//   background-color: ${({ theme }) => theme.colors.bg};
// `;

export default Home;
