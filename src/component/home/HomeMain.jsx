import HomePhotoShoot from "./HomePhotoShoot";
import HomeInfo from "./HomeInfo";
import "./HomeMain.css";
import HomeAdress from "./HomeAdress";
import HomeServices from "./HomeServices";
import Footer from "../Footer/Footer";

function HomeMain() {
  return (
    <>
    <main>

    <section className="home-main container">
      <HomeInfo />
      <HomePhotoShoot />
    </section>
      <HomeServices />
      <HomeAdress />
    </main>
    <Footer />
    </>
  );
}

export default HomeMain;
