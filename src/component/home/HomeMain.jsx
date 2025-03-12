import HomePhotoShoot from "./HomePhotoShoot";
import HomeInfo from "./HomeInfo";
import "./HomeMain.css";
import HomeAdress from "./HomeAdress";
import HomeServices from "./HomeServices";

function HomeMain() {
  return (
    <main>

    <section className="home-main container">
      <HomeInfo />
      <HomePhotoShoot />
    </section>
      <HomeServices />
      <HomeAdress />
    </main>
  );
}

export default HomeMain;
