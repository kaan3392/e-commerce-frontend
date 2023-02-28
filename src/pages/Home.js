import Caurier from "../components/user/Caurier";
import Footer from "../components/user/Footer";
import LatestProducts from "../components/user/LatestProducts";
import Menu from "../components/user/Menu";
import Navbar from "../components/user/Navbar"
import ProductsSlider from "../components/user/ProductsSlider";
import Slider from "../components/user/Slider";

const Home = () => {
  return (
    <>
    <Navbar/>
    <Menu/>
    <Slider/>
    <ProductsSlider/>
    <LatestProducts/>
    <Caurier/>
    <Footer/>
    </>
  )
}

export default Home