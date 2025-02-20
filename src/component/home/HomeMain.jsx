import React from "react";
import HomePhotoShoot from "./HomePhotoShoot";
import HomeInfo from "./HomeInfo";
import "./HomeMain.css";
import HomeAdress from "./HomeAdress";

function HomeMain() {
  return (
    <main>

    <section className="home-main container">
      <HomeInfo />
      <HomePhotoShoot />
    </section>
      <HomeAdress />
    </main>
  );
}

export default HomeMain;
