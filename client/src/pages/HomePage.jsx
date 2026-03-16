import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchFeaturedProducts,
  fetchCategories,
} from "../redux/slices/productSlice";
import HeroBanner from "../components/home/HeroBanner";
import CategoryGrid from "../components/home/CategoryGrid";
import FeaturedProducts from "../components/home/FeaturedProducts";
import RamadanBanner from "../components/home/RamadanBanner";
import DailyAyah from "../components/home/DailyAyah";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Newsletter from "../components/home/Newsletter";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div style={{ background: "#ffffff", width: "100%" }}>
      <HeroBanner />
      <DailyAyah />
      <CategoryGrid />
      <FeaturedProducts />
      <RamadanBanner />
      {/* <WhyChooseUs /> */}
      <Newsletter />
    </div>
  );
};

export default HomePage;
