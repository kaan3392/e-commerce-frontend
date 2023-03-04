import Navbar from "../components/user/Navbar";
import Menu from "../components/user/Menu";
import Caurier from "../components/user/Caurier";
import Footer from "../components/user/Footer";
import SinglePro from "../components/user/SinglePro";
import { useLocation } from "react-router-dom";

const SingleProduct = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  return (
    <>
      <Navbar />
      <Menu />
      <SinglePro id={id} />
      <Caurier/>
      <Footer />
    </>
  );
};

export default SingleProduct;
