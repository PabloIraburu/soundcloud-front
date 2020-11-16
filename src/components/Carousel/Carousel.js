import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from "./img/image1.jpg";
import image2 from "./img/image2.jpg";
import image3 from "./img/image3.jpg";
import image4 from "./img/image4.jpg";
import "./carousel.css";

function Carousel() {
  return (
    <div className='carousel'>
      <AliceCarousel
        autoPlay
        autoPlayInterval='2750'
        autoPalayStrategy='default'
        infinite
      >
        <img src={image1} alt='image1' className='sliderimg' />
        <img src={image2} alt='image2' className='sliderimg' />
        <img src={image3} alt='image4' className='sliderimg' />
        <img src={image4} alt='image4' className='sliderimg' />
      </AliceCarousel>
    </div>
  );
}

export default Carousel;
