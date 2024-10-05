import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [gpayId, setGpayId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const upiID = "9724690334@ibl"; // Your UPI ID

  const location = useLocation();
  const { numberOfPeople, totalAmount, selectedDate, selectedTheater, selectedTime } = location.state || {};

  const Date = selectedDate;
  const Theater = selectedTheater;
  const Time = selectedTime;

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation Logic
    if (paymentMethod === "credit-card") {
      if (!cardNumber || !cardholderName || !expiryDate || !cvv || !phoneNumber) {
        setErrorMessage("Please fill out all credit card details.");
        return;
      }
    } else if (paymentMethod === "upi") {
      if (!upiId || !phoneNumber) {
        setErrorMessage("Please fill out all UPI details.");
        return;
      }
    } else if (paymentMethod === "google-pay" || paymentMethod === "phone-pe") {
      if (!gpayId || !phoneNumber) {
        setErrorMessage(`Please fill out all ${paymentMethod === "google-pay" ? "Google Pay" : "PhonePe"} details.`);
        return;
      }
    }

    // Proceed to the next page after successful validation
    navigate(`/ticket/${movie._id}`, {
      state: {
        numberOfPeople: numberOfPeople,
        totalAmount: totalAmount,
        Date: Date,
        Theater: Theater,
        Time: Time,
      },
    });
  };

  const [movie, setMovie] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const result = await axios.get(`http://localhost:5000/admin/${id}`);
        setMovie(result.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container bg-zinc-800 mx-auto p-8">
      <h1
        className="text-3xl text-white font-bold mb-6"
        style={{ textShadow: "2px 2px 0 red" }}
      >
        Payment Page
      </h1>

      {/* QR Code Section */}
      <div className="mb-5 mt-10 absolute right-44 flex justify-center">
        <QRCode
          value={`upi://pay?pa=${upiID}&pn=YourName&mc=YourMerchantCode&tid=TransactionId&am=${totalAmount}&cu=INR&url=`}
          size={128}
        />
      </div>

      {/* Bill Details */}
      <div className="bg-gray-100 p-6 font-normal rounded-lg shadow-red-lg mb-6">
        <h2 className="text-3xl font-bold mb-4">Bill Details</h2>
        <table>
          <tr>
            <td className="font-semibold">Movie Name </td>
            <td>: {movie.movieName}</td>
          </tr>
          <tr>
            <td className="font-semibold">Total Seats </td>
            <td>: {numberOfPeople}</td>
          </tr>
          <tr>
            <td className="font-semibold">Ticket Price </td>
            <td>: {movie.ticketRate}</td>
          </tr>
        </table>
        <p className="border-t border-gray-200 my-4"></p>
        <p className="text-lg font-bold">
          <strong>Total Amount :</strong> {totalAmount} /-
        </p>
      </div>

      {/* Payment Methods */}
      <h2
        className="text-3xl text-white font-bold mb-4"
        style={{ textShadow: "2px 2px 0 red" }}
      >
        Select Payment Method or Scan QR Code
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center p-4 rounded-lg shadow-red-lg bg-gray-50  transition">
            <input
              type="radio"
              name="payment-method"
              id="credit-card"
              value="credit-card"
              checked={paymentMethod === "credit-card"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
              
            />
            <label htmlFor="credit-card" className="cursor-pointer">
              Credit/Debit Card
            </label>
          </div>
          <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-red-lg  transition">
            <input
              type="radio"
              name="payment-method"
              id="google-pay"
              value="google-pay"
              checked={paymentMethod === "google-pay"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
              
            />
            <label htmlFor="google-pay" className="cursor-pointer">
              Google Pay
            </label>
          </div>
          <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-red-lg  transition">
            <input
              type="radio"
              name="payment-method"
              id="phone-pe"
              value="phone-pe"
              checked={paymentMethod === "phone-pe"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
              
            />
            <label htmlFor="phone-pe" className="cursor-pointer">
              PhonePe
            </label>
          </div>
          <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-red-lg transition">
            <input
              type="radio"
              name="payment-method"
              id="upi"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
              
            />
            <label htmlFor="upi" className="cursor-pointer">
              UPI
            </label>
          </div>
        </div>

        {/* Necessary Information for Selected Payment Method */}
        {paymentMethod === "credit-card" && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg text-zinc-900 font-semibold mb-2">
              Credit/Debit Card Information
            </h3>
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-2 border rounded mb-2"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              
            />
            <input
              type="text"
              placeholder="Cardholder Name"
              className="w-full p-2 border rounded mb-2"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full p-2 border rounded"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full p-2 border rounded"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                
              />
            </div>
          </div>
        )}

        {(paymentMethod === "google-pay" || paymentMethod === "phone-pe") && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-2">
              {paymentMethod === "google-pay" ? "GPay" : "PhonePe"} ID
            </h3>
            <input
              type="text"
              placeholder="Your ID"
              className="w-full p-2 border rounded mb-2"
              value={gpayId}
              onChange={(e) => setGpayId(e.target.value)}
              
            />
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-red-lg mb-6">
            <h3 className="text-lg font-semibold mb-2">UPI ID</h3>
            <input
              type="text"
              placeholder="Your UPI ID"
              className="w-full p-2 border rounded mb-2"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              
            />
          </div>
        )}

        {/* Common Payment Information */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-red-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
          <input
            type="text"
            placeholder="Your Phone Number"
            className="w-full p-2 border rounded mb-2"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            
          />
          <input
            type="text"
            placeholder="Transaction ID (optional)"
            className="w-full p-2 border rounded mb-2"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-600 mb-4">{errorMessage}</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-200 hover:bg-blue-600"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
