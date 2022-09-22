import React, { useState } from "react";
import NaverMap from "./NaverMap";

const GeoLocation = () => {
  const [details, setDetails] = useState(null);

  const [display, setDisplay] = useState(false);

  const getUserGeolocationDetails = () => {
    setDisplay(true);
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
  
  function MapClose() {
    setDisplay(false);
  }

  return (
    <>
      <div className="myMapClose">
        <li className="mainClose">
          <button
            className="w3-bar-item w3-button"
            onClick={getUserGeolocationDetails}
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
