import { useEffect, useRef } from 'react';
 


function NaverMap(locationIp) {
  console.log("NAVER::"+JSON.stringify (locationIp))
  // {"locationIp":{"country_code":"KR","country_name":"South Korea","city":null,"postal":null,"latitude":37.5112,"longitude":126.97409999999999,"IPv4":"39.117.71.135","state":null}}
  const mapElement = useRef(null); 
  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return; 
    
    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(locationIp.locationIp.lat, locationIp.locationIp.lon);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 1,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);


  return <div ref={mapElement} style={{ width: '200px',  minHeight: '200px' }} />;
}


export default NaverMap;