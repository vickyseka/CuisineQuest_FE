// day 85

// import React from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import pic1 from "../Assets/lunch.jpg";
// import Header from "./Header";
// const TabsForm = () => {
//   return (
//     <>
//    <Header/>
//       <div className="container mt-4 " style={{height:'auto'}}>
//         <img src={pic1} style={{width:'100%',height:'400px',backgroundSize:'100% 100%'}}/>
        
//       <h2 className="heading" style={{paddingTop:'20px',display:'inline-block'}}>The Big Chilly Cakery</h2>
//         <span><button className="btn btn-outline-danger mt-3 " style={{float:'right'}}>Place online order</button></span>
//       </div>
//       <div className="container">
//         <Tabs>
//           <TabList>
//             <Tab>Over View</Tab>
//             <Tab>Contact</Tab>
//           </TabList>

//           <TabPanel>
//             <div className="about">About this place </div>
//             <div className="head">Cuisine</div>
//             <div className="value">Bakery,Fast-food</div>
//             <div className="head">Average Cost</div>
//             <div className="value">&#8377 700 for two people(approx)</div>
//           </TabPanel>
//           <TabPanel>
//             <div className="head">Phone Number</div>
//             <div className="value">+91 6385522049</div>
//             <div className="head">The Big Chill Bakery</div>
//             <div className="value">
//               Shop 1, Plot D,Samrudhi
//               complex,chincholi,Mumbai-400002,Maharashtra{" "}
//             </div>
//           </TabPanel>
//         </Tabs>
//       </div>
//     </>
//   );
// };

// export default TabsForm;


// day 86

import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import Carousels from "./Carousel";
import TabModal from "./TabModal";

  const TabsForm = () => {
  const [restaruantData, setRestaurantData] = useState([]);
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const { restaurantId } = qs;
  // console.log(location.search);
  // console.log("id",restaurantId);
  const getRestaurant = () => {
    axios
      .get(`http://localhost:4000/getallrestById/${restaurantId}`)
      .then((response) => response.data)
      .then((data) => {
        setRestaurantData(data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error);
      });
  };

const [modalShow,setModalShow]=useState(false)
const handleModal=()=>{
  setModalShow(true)
}
  useEffect(() => {
    getRestaurant();
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-4" style={{ height: "auto" }}>
        <Carousels style={{marginBottom:'20px'}}/>
        <h2
          className="heading"
          style={{ paddingTop: "20px", display: "inline-block" }}
        >
          {restaruantData.name}
        </h2>
        <button className="btn btn-outline-danger " style={{ float: "right" }} onClick={handleModal}>
          Place online order
        </button>
      </div>
      <div className="container mt-3">
        <Tabs>
          <TabList>
            <Tab>Over View</Tab>
            <Tab>Contact</Tab>
          </TabList>

          <TabPanel className="p-3">
            <div className="about">{restaruantData.city}</div>
            <div className="head">Cuisine</div>
            <div className="value">{restaruantData.name}, Fast-food</div>
            <div className="head">Average Cost</div>
            <div className="value">
              &#8377; {restaruantData.min_price} for two people (approx)
            </div>
          </TabPanel>
          <TabPanel className="p-3">
            <div className="head">Phone Number</div>
            <div className="value">+91 {restaruantData.contact_number}</div>
            <div className="head">{restaruantData.name}</div>
            <div className="value">{restaruantData.address}</div>
          </TabPanel>
        </Tabs>
      </div>
      <TabModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default TabsForm;