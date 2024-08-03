import AddressAndHours from "../components/AddressAndHours";
import Carousel from "../components/Carousel";
import CarouselBarberos from "../components/CarouselBarberos";
import HeaderMobile from "../components/HeaderMobile";
import { useState, useRef, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { Typography } from '@material-tailwind/react';
import { useSelector } from "react-redux";


function App() {
  const [showTable, setShowTable] = useState(false);
  const tableRef = useRef();

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  useEffect(() => {
    if (showTable && tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showTable]);

  const tableContent = (
    <div ref={tableRef}>
      <table className="mt-2 text-white ">
        <thead>
          <tr>
            <th>Día</th>
            <th>Apertura</th>
            <th>Cierre</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lunes</td>
            <td className="px-5">08:30 AM</td>
            <td>08:00 PM</td>
          </tr>
          <tr>
            <td>Martes</td>
            <td className="px-5">08:30 AM</td>
            <td>08:00 PM</td>
          </tr>
          <tr>
            <td>Miercoles</td>
            <td className="px-5">08:30 AM</td>
            <td>08:00 PM</td>
          </tr>
          <tr>
            <td>Jueves</td>
            <td className="px-5">08:30 AM</td>
            <td>08:00 PM</td>
          </tr>
          <tr>
            <td>Viernes</td>
            <td className="px-5">08:30 AM</td>
            <td>08:00 PM</td>
          </tr>
          <tr>
            <td>Sabado</td>
            <td className="px-5">08:30 AM</td>
            <td>08:00 PM</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const horaActual = new Date().getHours()
  const abierto = 8.5
  const cerrado = 20



  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <header className="h-[55vh] flex justify-evenly mt-10 xsm:hidden xxsm:hidden">
          <div className="flex justify-center items-center bg-black rounded-lg">
            <img
              src="https://i.postimg.cc/ryYmjMph/logo-barberia-png.png"
              alt="logo"
              className="px-5"
            ></img>
          </div>
          <Carousel />
        </header>
        <HeaderMobile />
        <div className="flex justify-evenly items-center pb-10 xsm:hidden xxsm:hidden">
          <div className="flex-col text-white w-3/6">
            <h1 className="font-bold text-3xl mt-4">Sobre Barberia Ollin</h1>
            <p className="mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
              recusandae quos, perspiciatis inventore voluptas sapiente libero
              facilis. Nihil unde, voluptatibus vitae maiores cum accusantium
              sint fugit nam deleniti natus molestias?Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Quod recusandae quos, perspiciatis
              inventore voluptas sapiente libero facilis. Nihil unde,
              voluptatibus vitae maiores cum accusantium sint fugit nam deleniti
              natus molestias?
            </p>
          </div>
          <div className="text-white mt-5">
            <h2 className="font-bold text-2xl pb-2">Dirección</h2>
            <p className="pb-2">Cra. 16a #41-04, Montería, Córdoba</p>
            <iframe
              className="rounded-lg"
              title="Ubicación de Barberia Ollin"
              width="300"
              height="160"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3943.3430502813408!2d-75.8690719!3d8.7537574!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5a2f3b2645fae7%3A0xa18047bd9380ea9b!2sBarberia%20Ollin!5e0!3m2!1sen!2sco!4v1700339914566!5m2!1sen!2sco"
            ></iframe>
            <div
              className="flex justify-between mt-5 items-center cursor-pointer"
              onClick={toggleTable} >
              {
              horaActual >= abierto && horaActual <= cerrado ? 
              <>
                <FaClock color='green' />
                <Typography variant='h6' className='capitalize'>abierto</Typography>
              </>
              :
              <>
                <FaClock color='red' />
                <Typography variant='h6' className='capitalize'>cerrado</Typography>
              </>
            }
              <p className="cursor-pointer"> hoy 08:30 AM - 08:00 PM</p>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAK5JREFUSEvtk9ENgzAMRO82KZvQUTpJu0lhElZhE1cnpRKkSWwqIbVS+EFCznv2mRAnPzyZjy5wE+4R/XhEZnYHMJNcS62a2QXASHKqjVJdcoI/AAh+zSUJ/pQAwK0maQnU3QJA750kg68kh8MT6EAC7SQJ9O68CVetew8KEk2jWFx4SFCYRJ9C8LAgk6CVeb4LN6LtAcVV+2W/WrJ7TQMFhyYI8D5KusBN7f8jegHXUToZ2Xag4AAAAABJRU5ErkJggg==" />
            </div>

            {showTable && tableContent}
          </div>
        </div>
        <CarouselBarberos />
        </div>
        <AddressAndHours />
        </>
    );
    }

export default App;
