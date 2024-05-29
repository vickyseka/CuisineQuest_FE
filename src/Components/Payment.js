import React, { useState, useEffect } from "react";



  const Payment = (props) => {
  const [total, setTotal] = useState(props.amount);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phno, setPhno] = useState('');
  const [emailId, setEmailId] = useState('');
  

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePay = (e) => {
    e.preventDefault();
    if (total === "") {
      alert("Please enter the Amount");
    } else {
      if (window.Razorpay) {
        let option = {
          key: "rzp_test_kXqvWeEDmZf3GE",
          key_secret: "KUeNBDBBiCcN6vrn4Q9hDUJK",
          amount: total * 100,
          currency: "INR",
          name: "ZOMATO",
          description: "for testing",
          handler: (response) => {
            alert(response.razorpay_payment_id);
            // Reset state values to empty strings after successful payment
            setTotal(0)
            setName('');
            setEmailId('');
            setPhno('');
            setAddress('');
          },
          prefill: {
            name: name,
            email: emailId,
            contact: phno,
          },
          notes: {
            address: address,
          },
          theme: {
            color: "powderblue",
          },
        };
        let pay = new window.Razorpay(option);
        pay.open();
      } else {
        alert("Razorpay script is not loaded yet. Please wait and try again.");
      }
    }
  };

  return (
    <>
      <div className="p-3">
        <form onSubmit={handlePay}>
          <h3 className="mt-5 text-center">Verified payment and continuing</h3>
          <h1 className="mt-4 text-center" style={{ color: "green" }}>
            <i className="bi bi-currency-rupee"></i>
            {props.amount}
          </h1>
          <label htmlFor="names" className="px-5" style={{ color: "black", float: "left" }}>
            Name
          </label>
          <input
            type="text"
            className="px-3 mx-5"
            id="names"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "80%" }}
            required
          />
          <label htmlFor="emailId" style={{ color: "black", float: "left" }} className="px-5">
            Email
          </label>
          <input
            type="email"
            className="px-3 mx-5"
            id="emailId"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            style={{ width: "80%" }}
            required
          />
          <label htmlFor="phno" style={{ color: "black", float: "left" }} className="px-5">
            Contact Number
          </label>
          <input
            type="text"
            className="px-3 mx-5"
            id="phno"
            value={phno}
            onChange={(e) => setPhno(e.target.value)}
            style={{ width: "80%" }}
            required
          />
          <label htmlFor="address" style={{ color: "black", float: "left" }} className="px-5">
            Address
          </label>
          <input
            type="text"
            className="px-3 mx-5"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: "80%" }}
            required
          />
          <button
            type="submit"
            className="px-3 mx-5 mt-3 btn btn-outline-success"
            style={{ width: "80%" }}
          >
            Pay Now
          </button>
        </form>
        <button
          className="px-3 mx-5 mt-3 btn btn-outline-danger"
          onClick={props.hide}
          style={{ width: "80%" }}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default Payment;
