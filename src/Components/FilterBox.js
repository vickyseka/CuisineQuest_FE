// import React, { useEffect, useState } from "react";
// import "../style/Filter.css";
// import axios from "axios";
// const FilterBox = () => {
//   const [locationData, setLocationData] = useState([]);
//   const getEvents = () => {
//     axios
//       .get("http://localhost:4000/getallloc")
//       .then((response) => response.data)
//       .then((data) => {
//         setLocationData(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching event details:", error);
//       });
//   };
//   useEffect(() => {
//     getEvents();
//   }, []);
//   return (
//     <div className="flex-parent flex-item1">
//       <h3>Filters</h3>
//       <h5>Select Location</h5>
//       <select style={{ width: "auto" }}>
//         <option value=>
//           Select Location
//         </option>
//         {locationData.map((item) => (
//           <option key={item._id} value={item.location_id}>
//             {item.name}, {item.city}
//           </option>
//         ))}
//       </select>
//       <br />
//       <h4 className="mt-3">Cuisine</h4>
//       <div className="d-block">
//         <input type="checkbox" />
//         <span>North Indian</span>
//       </div>
//       <div className="d-block">
//         <input type="checkbox" />
//         <span>South Indian</span>
//       </div>
//       <div className="d-block">
//         <input type="checkbox" />
//         <span>Chinese</span>
//       </div>
//       <div className="d-block">
//         <input type="checkbox" />
//         <span>Fast food</span>
//       </div>
//       <div className="d-block">
//         <input type="checkbox" />
//         <span>Street food</span>
//       </div>

//       <h4 className="mt-3">Cost for two</h4>

//       <div className="d-block">
//         <input type="radio" name="cost" />
//         <span>Less than ₹500</span>
//       </div>
//       <div className="d-block">
//         <input type="radio" name="cost" />
//         <span>₹500 to ₹1000</span>
//       </div>
//       <div className="d-block">
//         <input type="radio" name="cost" />
//         <span>₹1000 to ₹1500</span>
//       </div>
//       <div className="d-block">
//         <input type="radio" name="cost" />
//         <span>₹1500 to ₹2000</span>
//       </div>
//       <div className="d-block">
//         <input type="radio" name="cost" />
//         <span>₹2000 to +</span>
//       </div>

//       <h3 className="mt-3">Sort</h3>
//       <div className="d-block">
//         <input type="radio" name="sort" />
//         <span>Price high to low</span>
//       </div>
//       <div className="d-block">
//         <input type="radio" name="sort" />
//         <span>Price low to high</span>
//       </div>
//     </div>
//   );
// };

// export default FilterBox;
