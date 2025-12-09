import Swiper from 'swiper';
import 'swiper/css';
import Banner from "../Banner/Banner";
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import HowItWorks from '../HowItWorks/HowItWorks';
import FAQ from '../FAQ/FAQ';
import MeetOurExperts from '../MeetOurExperts/MeetOurExperts';
import ClientSay from '../ClientReview/ClientReview';

const Home = () => {
  return (
    <div>
      <Banner />
      <WhyChooseUs/>
      <HowItWorks/>
      <FAQ/>
      <MeetOurExperts/>
      <ClientSay/>
    </div>
  );
};

export default Home;
