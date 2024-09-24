import React, { useState } from 'react'
import './Home.css'
import Header from '../../compnents/Header/Header'
import ExploreMenu from '../../compnents/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../compnents/FoodDisplay/FoodDisplay';

function Home() {

  const [category , setCategory] = useState("All");

  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />


    </div>
  )
}

export default Home