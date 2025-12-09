import Swiper from 'swiper';
import 'swiper/css';
import Banner from "../Banner/Banner";
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import HowItWorks from '../HowItWorks/HowItWorks';
import FAQ from '../FAQ/FAQ';

const Home = () => {
  return (
    <div>
      <Banner />
      <WhyChooseUs/>
      <HowItWorks/>
      <FAQ/>
    </div>
  );
};

export default Home;
