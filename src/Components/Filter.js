import React, { useEffect, useState } from "react";
import "../style/Filter.css";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import defaultImage from "../Assets/idly.jpg";


const Filter = () => {
  const [mealData, setMealData] = useState([]);
  const [cuisine, setCuisine] = useState([]);
  const [locationIds, setLocationIds] = useState(undefined);
  const [lowCost,setLowCost]=useState(undefined)
  const [highCost,setHighCost]=useState(undefined)
  const [sorting,setSorting]=useState(1)
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const { mealTypeId, locationId } = qs;

  const filterObj = {
    mealtype_id: Number(mealTypeId),
    location_id: Number(locationId),
  };
  const mealItem = () => {
    axios({
      method: "POST",
      url: `https://cuisinequest-be-3.onrender.com/filter`,
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => response.data)
      .then((data) => {
        setMealData(data);
        // console.log("fetchdata", data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error.message);
      });
  };

  const [locationData, setLocationData] = useState([]);
  const getEvents = () => {
    axios
      .get("https://cuisinequest-be-3.onrender.com/getallloc")
      .then((response) => response.data)
      .then((data) => {
        setLocationData(data);
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
      });
  };

  //Location change
  const handleLocationChange = (event) => {
    const locationId = event.target.value;

    setLocationIds(locationId);
    console.log("id", locationIds);
    const filterObj = {
      mealtype_id: Number(mealTypeId),
      location_id:locationId,
      hcost: highCost,
      lcost: lowCost,
      cuisine_id:cuisine.length == 0 ? undefined : cuisine,
      sort: sorting,
    };
    axios({
      method: "POST",
      url: `https://cuisinequest-be-3.onrender.com/filter`,
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => response.data)
      .then((data) => {
        setMealData(data);
        // console.log("fetchdata", data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error.message);
      });
  };

  //Cuisine change
  const handleCuisineChange = (cuisineId) => {
    const index = cuisine.indexOf(cuisineId);
    if (index == -1) {
      cuisine.push(cuisineId);
    } else {
      cuisine.splice(index, 1);
    }
    console.log("cuisinenumber", cuisine);
    setCuisine(cuisine);
    const filterObj = {
      mealtype_id: Number(mealTypeId),
      hcost: highCost,
      lcost: lowCost,
      location_id:locationIds,
      cuisine_id:cuisine.length == 0 ? undefined : cuisine,
      sort: sorting,
    };
    axios({
      method: "POST",
      url: `https://cuisinequest-be-3.onrender.com/filter`,
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => response.data)
      .then((data) => {
        setMealData(data);
        // console.log("fetchdata", data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error.message);
      });
  };

  //Cost change
  const handleCostChange = (lcost, hcost) => {
    setLowCost(Number(lcost));
    setHighCost(Number(hcost));
    const filterObj = {
      mealtype_id: Number(mealTypeId),
      hcost: Number(hcost),
      lcost: Number(lcost),
      location_id:locationIds,
      cuisine_id:cuisine.length == 0 ? undefined : cuisine,
      sort: sorting,
    };
    axios({
      method: "POST",
      url: `https://cuisinequest-be-3.onrender.com/filter`,
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => response.data)
      .then((data) => {
        setMealData(data);
        // console.log("fetchdata", data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error.message);
      });
  };

  //Sort change
  const handleSortChange = (sort) => {
      setSorting(Number(sort))
      const filterObj = {
      mealtype_id: Number(mealTypeId),
      hcost: highCost,
      lcost: lowCost,
      location_id:locationIds,
      cuisine_id:cuisine.length == 0 ? undefined : cuisine,
      sort: sort,
    };
    axios({
      method: "POST",
      url: `https://cuisinequest-be-3.onrender.com/filter`,
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => response.data)
      .then((data) => {
      setMealData(data);
        // console.log("fetchdata", data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error.message);
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(2);
  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentMealData = mealData.slice(indexOfFirst, indexOfLast);
  const paginate = (pageNumber) => {
    console.log(pageNumber);
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    const totalPage = Math.ceil(mealData.length / booksPerPage);
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    } else {
      alert("Not have a meal items...");
    }
  };
const navigate=useNavigate()
  const handleNavigate=(id)=>{
    navigate(`/detail?restaurantId=${id}`)
  }


  useEffect(() => {
    mealItem();
    getEvents();
  }, []);
  const mealTypeName=sessionStorage.getItem('mealtype')
  return (
    <>
      <Header />
      <div className="headline mt-3">
        <p style={{ color: "black" }}>{mealTypeName} places in Mumbai</p>
      </div>
      <div className="main-container">
        {/* <FilterBox /> */}
        <div className="flex-parent flex-item1">
          <h3>Filters</h3>
          <h5>Select Location</h5>
          <select style={{ width: "auto" }} onChange={handleLocationChange}>
            <option value="0">--Select Location--</option>
            {locationData.map((item) => (
              <option key={item._id} value={item.location_id}>
                {item.name}, {item.city}
              </option>
            ))}
          </select>
          <br />
          <h4 className="mt-3">Cuisine</h4>
          <div className="d-block">
            <input type="checkbox" onChange={() => handleCuisineChange(1)} />
            <span>North Indian</span>
          </div>
          <div className="d-block">
            <input type="checkbox" onChange={() => handleCuisineChange(2)} />
            <span>South Indian</span>
          </div>
          <div className="d-block">
            <input type="checkbox" onChange={() => handleCuisineChange(3)} />
            <span>Chinese</span>
          </div>
          <div className="d-block">
            <input type="checkbox" onChange={() => handleCuisineChange(4)} />
            <span>Fast food</span>
          </div>
          <div className="d-block">
            <input type="checkbox" onChange={() => handleCuisineChange(5)} />
            <span>Street food</span>
          </div>

          <h4 className="mt-3">Cost for two</h4>

          <div className="d-block">
            <input
              type="radio"
              name="cost"
              onChange={() => handleCostChange(1, 500)}
            />
            <span>Less than ₹500</span>
          </div>
          <div className="d-block">
            <input
              type="radio"
              name="cost"
              onChange={() => handleCostChange(500, 1000)}
            />
            <span>₹500 to ₹1000</span>
          </div>
          <div className="d-block">
            <input
              type="radio"
              name="cost"
              onChange={() => handleCostChange(1000, 1500)}
            />
            <span>₹1000 to ₹1500</span>
          </div>
          <div className="d-block">
            <input
              type="radio"
              name="cost"
              onChange={() => handleCostChange(1500, 2000)}
            />
            <span>₹1500 to ₹2000</span>
          </div>
          <div className="d-block">
            <input
              type="radio"
              name="cost"
              onChange={() => handleCostChange(2000, 50000)}
            />
            <span>₹2000 to +</span>
          </div>

          <h3 className="mt-3">Sort</h3>
          <div className="d-block">
            <input
              type="radio"
              name="sort"
              onChange={() => handleSortChange(-1)}
            />
            <span>Price high to low</span>
          </div>
          <div className="d-block">
            <input
              type="radio"
              name="sort"
              onChange={() => handleSortChange(1)}
            />
            <span>Price low to high</span>
          </div>
        </div>
        {currentMealData.map((item,) => {
          return (
            <>
              <div className="flex-parent flex-item2" key={item._id} onClick={() => handleNavigate(item._id)}>
                <img src={defaultImage} alt="No image found" />
                <h3
                  style={{
                    marginLeft: "17%",
                    lineHeight: "normal",
                    marginTop: "0px",
                  }}
                >
                  {item.name}
                </h3>
                <h5
                  className="mt-3"
                  style={{ marginLeft: "17%", lineHeight: "0%" }}
                >
                  {item.locality}
                </h5>
                <h6 className="mt-3" style={{ marginLeft: "17%" }}>
                  {item.city}
                </h6>
                <hr />
                <p style={{ position: "absolute", fontSize: "medium" }}>
                  Cuisine:
                </p>
                <h5 style={{ marginLeft: "28%", lineHeight: "normal" }}>
                  {item.cuisine.map((cuisineItem) => `${cuisineItem.name}`)}
                </h5>
                <p
                  style={{
                    position: "absolute",
                    marginTop: "0px",
                    fontSize: "medium",
                  }}
                >
                  Cost for two:
                </p>
                <h5
                  style={{
                    marginLeft: "28%",
                    marginTop: "0%",
                    lineHeight: "15px",
                  }}
                >
                  {item.min_price}
                </h5>
              </div>
            </>
          );
        })}
       {currentMealData.length > 0 ? (
          <div className="flex-parent flex-item4">
            <ul className="pagination justify-content-center mt-3">
              {/* Previous Button */}
              <li className="page-item" style={{ margin: "5px" }}>
                <div
                  style={{
                    border: "none",
                    borderRadius: "none",
                    boxShadow: "3px 4px 4px 1px rgba(170, 0, 0, 0.479)",
                    color: "red",
                    cursor: "pointer",
                  }}
                  onClick={() => handlePrevious()}
                  className="page-link"
                >
                  {`<<`}
                </div>
              </li>

              {/* Page Numbers */}
              {[...Array(Math.ceil(mealData.length / booksPerPage)).keys()].map(
                (number) => (
                  <li
                    key={number}
                    className="page-item"
                    style={{ margin: "5px" }}
                  >
                    <div
                      style={{
                        border: "none",
                        borderRadius: "none",
                        boxShadow: "3px 4px 4px 1px rgba(170, 0, 0, 0.479)",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => paginate(number + 1)}
                      className="page-link"
                    >
                      {number + 1}
                    </div>
                  </li>
                )
              )}

              {/* Next Button */}
              <li className="page-item" style={{ margin: "5px" }}>
                <div
                  style={{
                    border: "none",
                    borderRadius: "none",
                    boxShadow: "3px 4px 4px 1px rgba(170, 0, 0, 0.479)",
                    color: "red",
                    cursor: "pointer",
                  }}
                  onClick={() => handleNext()}
                  className="page-link"
                >
                  {`>>`}
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <h1
            className="flex-parent flex-item4"
            style={{ color: "red", fontFamily: "monospace" }}
          >
            No Record Found...
          </h1>
        )}
      </div>
    </>
  );
};

export default Filter;

