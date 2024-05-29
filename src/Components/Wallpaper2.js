import React, { useEffect, useState } from "react";
import "../style/HomeStyle.css";
import Header from "./Header";
import axios from "axios";

const Wallpaper2 = () => {
  const [eventDetails, setEventDetails] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState("0");
  const [restaurants, setRestaurants] = useState([]);

  const getEvents = () => {
    axios
      .get("https://cuisinequest-be-3.onrender.com/getallloc")
      .then((response) => response.data)
      .then((data) => {
        setEventDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
      });
  };

  const handleLocationChange = (event) => {
    const locationId = event.target.value;
    setSelectedLocationId(locationId);
    axios
      .get(`https://cuisinequest-be-3.onrender.com/getallrestLocationId/${locationId}`)
      .then((response) => response.data)
      .then((data) => {
        setRestaurants(data);
      })
      .catch((err) => console.log(err));
  };

  const searchHandle = (e) => {
    const text = e.target.value;
    setInputText(text);
    const suggestionsData = restaurants.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setSuggestions(suggestionsData);
  };
  const showSuggestion = () => {
    if (suggestions.length === 0 && inputText === "") {
      return null;
    }
    if (suggestions.length === 0 && inputText) {
      return (
        <ul className="suggestions">
          <li>No Search Result Found</li>
        </ul>
      );
    }
    return (
      <ul className="suggestions">
        {suggestions.map((item) => (
          <li
            key={item._id}
          >{`${item.name} - ${item.locality}, ${item.city}`}</li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <div className="container-fluid main " style={{height:'auto'}}>
        <Header />
        <div className="container">
          <br />
          <div className="text-center mt-4">
            <div
              className="logos justify-content-center"
              style={{ marginLeft: "50%", marginRight: "50%" }}
            >
              <h4
                className="display-6 d-flex justify-content-center"
                style={{
                  borderRadius: "50%",
                  backgroundColor: "aquamarine",
                  height: "60px",
                  width: "60px",
                }}
              >
                e!
              </h4>
            </div>
            <h4 className="display-6 d-flex justify-content-center text-white">
              Find the best restaurant, coffee, and bar
            </h4>
            <div className="row">
              <div className="col-12 col-sm-6">
                <select
                  className="form-select text-decoration-none"
                  aria-label="Default select example"
                  value={selectedLocationId}
                  onChange={(e) => handleLocationChange(e)}
                  style={{height:'auto',marginBottom:'20px'}}
                >
                  <option value="0" selected disabled>
                    --Select city--
                  </option>
                  {eventDetails.map((item) => (
                    <option key={item._id} value={item.location_id}>
                      {item.name}, {item.city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-sm-6">
                <div className="search-container col-sm-mx-2">
                  <input
                    type="search"
                    className="form-control text-decoration-none mb-4"
                    list="datalistOptions"
                    id="text"
                    placeholder="Search type your restaurant"
                    onChange={(e) => searchHandle(e)}
                  />
                  {showSuggestion()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallpaper2;

