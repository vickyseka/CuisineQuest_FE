import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';
import pic1 from '../Assets/snacks.jpg';
import pic2 from '../Assets/drink.jpg';
import pic3 from '../Assets/lunch.jpg';
import CarouselModal from "./CarouselModal";


const Carousels = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
          <div style={{ marginBottom: "20px" }} onClick={() => setModalShow(true)}>
    <Carousel showThumbs={false} >
        <div style={{height:'400px',width:'100%',padding:'0px 50px'}}>
            <img src={pic1} alt='not found'/>
        </div>
        <div style={{height:'400px',width:'100%',padding:'0px 50px'}}>
            <img src={pic2} alt='not found'/>
        </div>
        <div style={{height:'400px',width:'100%',padding:'0px 50px'}}>
            <img src={pic3} alt='not found'/>
        </div>
    </Carousel>
    </div>
    <CarouselModal show={modalShow} onHide={() => setModalShow(false)} />
   
    </>
  );
};

export default Carousels;