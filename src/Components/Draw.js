import React from "react";
import '../style/Draw.css'
import FilterBox from './FilterBox';
import Filter from './Filter';
const Draw = () => {
    return (
        <div id="page">
         <nav><FilterBox/></nav>
         <main><Filter/></main>
         <footer>Footer</footer>
        </div>
    );
};

export default Draw;