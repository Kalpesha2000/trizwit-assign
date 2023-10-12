// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import "./index.css";

// Define the component
const App = () => {
  // State to store date and time data
  const [dateTime, setDateTime] = useState(null);
  // State to toggle between vertical and horizontal arrangement
  const [isHorizontal, setIsHorizontal] = useState(false);

  // Function to fetch time from the API
  const fetchTime = async () => {
    try {
      const response = await axios.get(
        "https://worldtimeapi.org/api/timezone/Asia/Kolkata"
      );
      console.log(response);

      setDateTime(response.data);
    } catch (error) {
      console.error("Error fetching time:", error);
    }
  };

  // Effect to fetch time on component mount
  useEffect(() => {
    fetchTime();
  }, []);

  // Function to format date and time
  const formatDateTime = () => {
    if (!dateTime) return "";

    const formattedDateTime = format(
      new Date(dateTime.datetime),
      "yyyy-MM-dd HH:mm:ss"
    );
    return formattedDateTime;
  };

  // Event handler for the "Click Me" button
  const handleClick = () => {
    setIsHorizontal(!isHorizontal);
  };

  console.log(isHorizontal);

  return (
    <div>
      <h1 className="heading">Current Date and Time</h1>
      <div className={isHorizontal ? "horizontal" : "vertical"}>
        <p className="date">Date: {formatDateTime().split(" ")[0]}</p>
        <p className="date">Time: {formatDateTime().split(" ")[1]}</p>
      </div>
      <button className="button" onClick={handleClick}>Click Me</button>
    </div>
  );
};

// Export the component
export default App;
