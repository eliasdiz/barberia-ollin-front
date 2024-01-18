import { Carousel } from "@material-tailwind/react";

function CarouselOne() {
  return (
    <Carousel className=" w-[35rem] h-full rounded-lg" autoplay loop>
      <img
        src="https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="https://i.postimg.cc/13rqRb9D/IMG-20231129-WA0043.jpg"
        alt="image 2"
        className="w-full h-full object-cover"
      />
      <img
        src="https://i.postimg.cc/Yq148TLT/IMG-20231129-WA0044.jpg"
        alt="image 3"
        className="h-full w-full object-cover"
      />
      <img
        src="https://i.postimg.cc/x15XVHRR/IMG-20231129-WA0045.jpg"
        alt="image 4"
        className="h-full w-full object-cover"
      />
      <img
        src="https://i.postimg.cc/HsGcwTnQ/IMG-20231129-WA0047.jpg"
        alt="image 5"
        className="h-full w-full object-cover"
      />
      <img
        src="https://i.postimg.cc/ydMdyT1V/IMG-20231129-WA0048.jpg"
        alt="image 6"
        className="h-full w-full object-cover"
      />
      <img
        src="https://i.postimg.cc/Bn4jzNxb/IMG-20231129-WA0049.jpg"
        alt="image 7"
        className="h-full w-full object-cover"
      />
      <img
        src="https://i.postimg.cc/g0BrnW1L/IMG-20231129-WA0050.jpg"
        alt="image 8"
        className="h-full w-full object-cover"
      />
      <img
        src="https://i.postimg.cc/vmmcYB2d/IMG-20231129-WA0051.jpg"
        alt="image 9"
        className="h-full w-full object-cover"
      />
      <img
        src="https://i.postimg.cc/Zn6q7yn6/IMG-20231129-WA0052.jpg"
        alt="image 10"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}

export default CarouselOne