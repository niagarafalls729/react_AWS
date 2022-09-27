
import sun from "../icon/sun.png"
// import rain from "../icon/rain.png"
// import cloud from "../icon/cloud.png"
import React, { useState,useEffect,useContext } from "react";
import { SidebarClose } from "../context/SidebarClose";

export default function Weather() {

    //https://api.openweathermap.org/data/2.5/weather?lat=37.298&lon=127.0777&appid=41c8b26572aa3ab09ba3adb03e787560
    //41c8b26572aa3ab09ba3adb03e787560
    const [details, setDetails] = useState(null);
    const [ weather, setWeather] = useState(null);
    const { conSidebarBool, setConSidebarBool } = useContext(SidebarClose);
    // const getUserGeolocationDetails = () => {
      
    //   fetch(
    //     "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
    //   )
    //     .then((response) => response.json())
    //     .then((data) => SearchIP(data));
    // };
  
    function SearchIP() {
        // fetch("http://ip-api.com/json/")
        // .then((response) => response.json())
        // .then((data) => setDetails(data))
        // .catch(() => { 
          const data = {
            
              lat  : "37.5112" ,
              lon : "126.9740999" ,
            
            // {"locationIp":{"country_code":"KR","country_name":"South Korea","city":null,"postal":null,"latitude":37.5112,"longitude":126.97409999999999,"IPv4":"39.117.71.135","state":null}}
            
          }
          setDetails(data)
        //   console.log('에러')}
            console.log('에러'+JSON.stringify(data))
          
        // )        
    }

    useEffect(() => { 
        SearchIP()
        console.log(details)
        SearchWeather(details)
     },[conSidebarBool]);

    function SearchWeather(details) {
        console.log("API 호출")
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=37.5112&lon=126.9740999&appid=41c8b26572aa3ab09ba3adb03e787560")
          .then((response) => response.json())
          .then((data) => setWeather(data));
    }
    
    console.log(weather);
  return (
    <div> 
        {weather && <div><div className="w3-bar-item w3-button">실시간  날씨: { weather.weather[0].main } </div>
        <img style={{width:"100px" ,height:"100px" , marginLeft : "50px", marginTop : "10px"}} src={sun}></img>
        </div> }

    </div>
  )
}
