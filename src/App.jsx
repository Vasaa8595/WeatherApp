import './App.css';
import searchIcon from "./assets/search.png";
import cloudIcon from "./assets/cloudy.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/heavy-rain.png";
import humidityIcon from "./assets/humidity.png";
import snowIcon from "./assets/snow.png";
import sunIcon from "./assets/sun.png";
import sunnIcon from "./assets/sunn.png";
import windIcon from "./assets/wind.png";
import { useEffect, useState } from 'react';
//Weather details
const WeatherDetails =({icon,temp,city,country,lat,log,humidity,wind})=>{
  return (
    <>
  <div className='image'>
    <img src={icon} alt="image" />
  </div>
  <div className="temp">{temp}°C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
      <span className='lat'>Latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='log'>Logitude</span>
      <span>{log}</span>
    </div>
  </div>
  <div className="data-container">
    <div className="element">
      <img src={humidityIcon} alt="humidity" className='icon'/>
      <div className="data">
        <div className="humidity-percent">{humidity} %</div>
        <div className="text">Humidity</div>
      </div>
    </div>
    <div className="element">
      <img src={windIcon} alt="Wind" className='icon' />
      <div className="data">
        <div className="wind-percent">{wind} Kph</div>
        <div className="text">Wind Speed</div>
      </div>
    </div>
  </div>
</>
  )}

//App
function App() {
  let api_key = "57ba66803901fe60a547502dbc356ef9";
  const [text,setText] = useState("Chennai");
  const [icon,setIcon] = useState(snowIcon);
  const [temp,setTemp] = useState(0);
  const [city,setCity] = useState("");
  const [country,setCountry] = useState("");
  const [lat,setLat] = useState(0);
  const [log,setLog] = useState(0);
  const [humidity,setHumidity] = useState(0);
  const [wind,setWind] = useState(0);
  const [loading,setLoading] = useState(false);
  const [citynotfound,setCitynotfound] = useState(false);
  const[error,setError] = useState(null);
  const WeatherIconmap ={
    "01d":sunIcon,
    "01n":sunIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon,
  };

  const search = async () =>{
    setLoading(true);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
  try {
    let res = await fetch(url);
    let data = await res.json();
   if(data.cod === "404" ){
    console.error("City not found.");
    setCitynotfound(true);
    setLoading(false);
    return;
   }
   setHumidity(data.main.humidity);
   setWind(data.wind.speed);
   setTemp(Math.floor(data.main.temp));
   setCity(data.name);
   setCountry(data.sys.country);
   setLat(data.coord.lat);
   setLog(data.coord.lon);
   const weatherIconcode = data.weather[0].icon;
   setIcon(WeatherIconmap[weatherIconcode] || sunnIcon);
   setCitynotfound(false);

  } catch (error) {
    console.error("Error occured : ",error.message);
    setError("An error occured while fetching data..");
  }
  finally{
    setLoading(false);
  }
};
 const handleCity=(e)=>{
setText(e.target.value);
}
const handleKey=(e)=>{
  if(e.key == "Enter"){
    search();
  }
}
useEffect(function(){
  search();
},[]);

  return (
    <div className='container'>
      <div className='input-container'>
        <input type="text" className='cityinput' placeholder='Search City'
         value={text} onChange={handleCity} onKeyDown={handleKey} />
        <div className='searchicon' onClick={()=>search()}>
          <img src={searchIcon} alt="Search" />
        </div> 
      </div>

    {loading && <div className="loading-message">Loading....</div>}
    {error && <div className="error-message">{error}</div>}
    {citynotfound && <div className="citynotfound">City Not Found</div>}

    {!loading && !citynotfound && <WeatherDetails icon={icon} temp ={temp} city={city} country={country} lat={lat} 
      log ={log} humidity={humidity} wind={wind}/>}

      <p className='copyright'>
        Designed by <a href='https://www.instagram.com/_.vasxz._'>Vasaa</a>
      </p>
    </div>
  )
}

export default App
