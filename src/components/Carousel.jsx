import { Carousel } from "@material-tailwind/react";
 
 function CarouselDefault() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      };
  return (
    <Carousel className=" w-3/5 rounded-lg" {...settings}>
      <img
        src="https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.pexels.com/photos/667986/pexels-photo-667986.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.pexels.com/photos/7697673/pexels-photo-7697673.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}

export default CarouselDefault