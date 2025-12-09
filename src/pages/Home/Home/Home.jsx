import Swiper from 'swiper';
import 'swiper/css';
import Banner from "../Banner/Banner";
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import HowItWorks from '../HowItWorks/HowItWorks';

const Home = () => {
  return (
    <div>
      <Banner />
      <WhyChooseUs/>
      <HowItWorks/>
    </div>
  );
};

export default Home;
