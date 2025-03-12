import HomePhotoShoot from "./HomePhotoShoot";
import HomeInfo from "./HomeInfo";
import "./HomeMain.css";
import HomeAdress from "./HomeAdress";
import HomeServices from "./HomeServices";
import Footer from "../Footer/Footer";
import photo1 from "../../assets/images/home-photo-1.webp";
import photo2 from "../..//assets/images/home-photo-2.webp";
import photo3 from "../../assets/images/home-photo-3.webp";
import tarot1 from "../../assets/images/tarot-1.webp";
import tarot2 from "../../assets/images/tarot-2.webp";
import tarot3 from "../../assets/images/tarot-3.webp";


function HomeMain() {
  return (
    <>
    <main>

    <section className="home-main container">
      <HomeInfo />
      <HomePhotoShoot photo1={photo1} photo2={photo2} photo3={photo3} />
    </section>
    <section className="home-main container">
      <HomePhotoShoot photo1={tarot1} photo2={tarot2} photo3={tarot3} />
      <HomeServices />
    </section>
      <HomeAdress />
    </main>
    <Footer />
    </>
  );
}

export default HomeMain;
