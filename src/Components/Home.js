import React from "react";
import Wallpaper from "./Wallpaper";
import QuickSearch from "./QuickSearch";


const Home = () => {
  sessionStorage.clear();
  return (
    <>
      <Wallpaper />
      <QuickSearch />
    </>
  );
};

export default Home;
