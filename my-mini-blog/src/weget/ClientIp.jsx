import React, { useState } from "react";
import NaverMap from "./NaverMap";

const GeoLocation = () => {
  const [details, setDetails] = useState(null);

  const [display, setDisplay] = useState(false);

  // const getUserGeolocationDetails = () => {

  //   fetch(
  //     "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => SearchIP(data));
  // };

  function SearchIP() {
    setDisplay(true);
    
    fetch("http://ip-api.com/json/")
      .then((response) => response.json())
      .then((data) => setDetails(data))
      .catch(() => { 
        const data = {
          locationIp :{
            latitude  : "37.5112" ,
            longitude : "126.9740999" ,
          }
          // {"locationIp":{"country_code":"KR","country_name":"South Korea","city":null,"postal":null,"latitude":37.5112,"longitude":126.97409999999999,"IPv4":"39.117.71.135","state":null}}

        }
        setDetails(data)
        console.log('에러')}
        
      )
    

      
  }

  function MapClose() {
    setDisplay(false);
  }

  return (
    <>
      <div className="myMapClose">
        <li className="mainClose">
          <button
            className="w3-bar-item w3-button"
            onClick={SearchIP}
          >
            내 위치 보기!
          </button>
        </li>

        {display && (
          <li className={display ? "MapClose-X" : "hide"}>
            <button className="w3-bar-item w3-button" onClick={MapClose}>
              &times;
            </button>
          </li>
        )}
      </div>
      {display && <div>{details && <NaverMap locationIp={details} />}</div>}
    </>
  );
};

export default GeoLocation;
