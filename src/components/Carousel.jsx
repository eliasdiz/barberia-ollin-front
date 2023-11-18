import { Carousel } from "@material-tailwind/react";
 
 function CarouselOne() {
  return (
    <Carousel className=" w-3/5 rounded-lg">
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

export default CarouselOne