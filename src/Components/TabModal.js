import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import defaultImage from "../Assets/idly.jpg";
import axios from "axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Payment from "./Payment";

const TabModal = (props) => {
  const [restaruantData, setRestaurantData] = useState([]);
  const [restaruantName, setRestaurantName] = useState(undefined);
  const [menuItem, setMenuItem] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [menuFood, setMenuFood] = useState([]);

  const location = useLocation();
  const qs = queryString.parse(location.search);
  const { restaurantId } = qs;

  const getRestaurant = async () => {
    try {
      const response = await axios.get(
        `https://cuisinequest-be-3.onrender.com/getallrestById/${restaurantId}`
      );
      const data = response.data;
      setRestaurantData(data);
      setRestaurantName(data.name);
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  };

  const menuItems = async () => {
    try {
      const response = await axios.get(
        `https://cuisinequest-be-3.onrender.com/menuItemByName/${restaruantName}`
      );
      const data = response.data;
      setMenuItem(data);
      const datas = data.flatMap((item) => item.item);
      setMenuData(datas);
      console.log("data", data);
    } catch (error) {
      console.log("Error fetching menu items", error);
    }
  };

  const addItems = (index, operationType) => {
    let total = 0;
    const items = [...menuFood];
    const item = items[index];

    if (operationType === "add") {
      item.qty += 1;
    } else if (operationType === "subtract" && item.qty > 0) {
      item.qty -= 1;
    }

    items[index] = item;
    items.forEach((item) => {
      total += item.qty * item.price;
    });
    setMenuFood(items);
    setSubTotal(total);
  };
  const [payModalShow, setPayModalShow] = useState(false);
  const handleModal = () => {
    setPayModalShow(true);
  };
  useEffect(() => {
    if (restaurantId) {
      getRestaurant();
    }
  }, [restaurantId]);

  useEffect(() => {
    if (restaruantName) {
      menuItems();
    }
  }, [restaruantName]);

  useEffect(() => {
    if (menuItem.length > 0) {
      const data = menuItem.flatMap((items) => items.item);
      setMenuFood(data);
    }
  }, [menuItem]);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {menuItem.length > 0 ? (
          <div className="p-3">
            <h2>
              {restaruantName}
              <span
                style={{ float: "right", cursor: "pointer" }}
                onClick={props.onHide}
              >
                <i className="bi bi-x-lg"></i>
              </span>
            </h2>
            <h2 className="lead mt-4">Sub Total: {subTotal}</h2>
            <Button
              variant="danger"
              className="mt-4"
              onClick={() => handleModal()}
            >
              Pay Now
            </Button>
            {menuFood.map((item, index) => (
              <div className="row mt-4 px-3" key={index}>
                <div className="col-8 col-md-9 col-lg-10">
                  <h4>{item.name}</h4>
                  <p>
                    <i className="bi bi-currency-rupee">{item.price}</i>
                  </p>
                  <p>{item.desc}</p>
                </div>
                <div
                  className="col-4 col-md-3 col-lg-2"
                  style={{
                    float: "right",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={defaultImage}
                    alt="Img not found"
                    className="rounded"
                    style={{ width: "100%", height: "100px" }}
                  ></img>
                  {item.qty === 0 ? (
                    <button
                      style={{
                        padding: "5px 5px",
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => addItems(index, "add")}
                    >
                      Add
                    </button>
                  ) : (
                    <div>
                      <button
                        style={{
                          padding: "5px 5px",
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                        onClick={() => addItems(index, "subtract")}
                      >
                        <i className="bi bi-dash-lg"></i>
                      </button>
                      <button
                        style={{
                          padding: "5px 5px",
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        {item.qty}
                      </button>
                      <button
                        style={{
                          padding: "5px 5px",
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                        onClick={() => addItems(index, "add")}
                      >
                        <i className="bi bi-plus-lg"></i>
                      </button>
                    </div>
                  )}
                </div>
                <hr className="px-3 center"></hr>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4">
            <h2 style={{ color: "red" }}>
              No meals available
              <span
                style={{ float: "right", cursor: "pointer" }}
                onClick={props.onHide}
              >
                <i className="bi bi-x-lg"></i>
              </span>
            </h2>
          </div>
        )}
      </Modal>
      <Modal show={payModalShow} onHide={() => setPayModalShow(false)}>
        {subTotal > 0 ? (
          <Payment amount={subTotal} hide={() => setPayModalShow(false)} />
        ) : null}
      </Modal>
    </>
  );
};

export default TabModal;
