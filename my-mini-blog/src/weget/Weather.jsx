
import sun from "../icon/sun.png"
import rain from "../icon/rain.png"
import cloud from "../icon/cloud.png"
import React, { useState,useEffect } from "react";

export default function Weather() {

    //https://api.openweathermap.org/data/2.5/weather?lat=37.298&lon=127.0777&appid=41c8b26572aa3ab09ba3adb03e787560
    //41c8b26572aa3ab09ba3adb03e787560
    const [details, setDetails] = useState(null);
    const [ weather, setWeather] = useState(null);
  
    const getUserGeolocationDetails = () => {
      
      fetch(
        "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
      )
        .then((response) => response.json())
        .then((data) => SearchIP(data));
    };
  
    function SearchIP(data) {
      fetch("http://ip-api.com/json/" + data.IPv4)
        .then((response) => response.json())
        .then((data) => setDetails(data));
    }

    useEffect(() => {
        // Update the document title using the browser API
        getUserGeolocationDetails()
        SearchWeather(details)
     },[]);

    function SearchWeather(details) {
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="+details.lat+"&lon="+details.lon+"&appid=41c8b26572aa3ab09ba3adb03e787560")
          .then((response) => response.json())
          .then((data) => setWeather(data));
    }
   
    console.log(details);
    console.log(weather);
  return (
    <div> 
        <div>실시간 { } 날씨 </div>
        <img style={{width:"100px" ,height:"100px" , marginLeft : "50px", marginTop : "10px"}} src={sun}></img>

    </div>
  )
}
