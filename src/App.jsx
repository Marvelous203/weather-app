import { useRef, useState } from "react";
import images from './assets/images.png';
import search_icon from './assets/search_icon.png';
import clear_sky from './assets/clearSky.jpg';
import rain_sky from './assets/rainSky.jpg';
import hazel_sky from './assets/HazelSky.jpg';
import clouds_sky from './assets/cloudsSky.jpg';
import snow_sky from './assets/snowSky.jpg';
import smoke_sky from './assets/Smoke_Sky.jpg';
import mist_sky from './assets/mist_Sky.jpg';
import drizzle_sky from './assets/Drizzle_Sky.jpg';

const Api_key = "599b334a4008e2e68ca3e6e5db4fb569";

const App = () => {
  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);

  const [loading, setLoading] = useState(false);

  const WeatherTypes = [
    {
      type: "Clear",
      img: clear_sky,
    },
    {
      type: "Rain",
      img: rain_sky,
    },
    {
      type: "Snow",
      img: snow_sky,
    },
    {
      type: "Clouds",
      img: clouds_sky,
    },
    {
      type: "Haze",
      img: hazel_sky,
    },
    {
      type: "Smoke",
      img: smoke_sky,
    },
    {
      type: "Mist",
      img: mist_sky,
    },
    {
      type: "Drizzle",
      img: drizzle_sky,
    },
  ];

  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_key}`;
    setLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setApiData(null);
        if (data.cod == 404 || data.cod == 400) {
          setShowWeather([
            {
              type: "Not Found",
              img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
            },
          ]);
        }
        setShowWeather(
          WeatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );
        console.log(data);
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="bg-purple-500 bg-gradient-to-t h-screen grid place-items-center">
      <div className="bg-white w-96 p-4 rounded-md drop-shadow-2xl ">
        <div className="flex items-center justify-between">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter Your Location"
            className="text-xl border-b
          p-1 border-gray-200 font-semibold uppercase flex-1"
          /> 
          <button onClick={fetchWeather}>
            <img
              src={search_icon}
              alt="..."
              className=" w-8"
            />
          </button>
        </div>
        <div
          className={`duration-300 delay-75  overflow-hidden
         ${showWeather ? "h-[35rem]" : "h-0"}`}
        >
          {loading ? (
            <div className="grid place-items-center h-full">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                alt="..."
                className="w-14 mx-auto mb-2 animate-spin"
              />
            </div>
          ) : (
            showWeather && (
              <div className="text-center flex flex-col gap-6 mt-10">
                {apiData && (
                  <p className="text-xl font-semibold">
                    {apiData?.name + "," + apiData?.sys?.country}
                  </p>
                )}
                
                <img
                  src={showWeather[0]?.img}
                  alt="..."
                  className="w-52 mx-auto"
                />
                <h3 className="text-2xl font-bold text-zinc-800">
                  {showWeather[0]?.type}
                </h3>
                {apiData && (
                <div className="text-xl font-semibold flex items-center justify-center">                  
                <img className="" src={`https://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`} alt="icon000" />
                  <p>
                 {apiData?.weather[0]?.description.toUpperCase()}	
                  </p>
                </div>
                )}

                {apiData && (
                  <>
                    <div className="flex justify-around gap-10">
                      <div className="text-2xl font-extrabold flex">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png"
                        alt="..."
                        className="h-6 mt-1"
                      />
                        {apiData?.main?.temp}&#176;C
                      </div>
                      <div className="flex">
                      <img src={images} alt="" className="h-8 mr-1" />
                      <div className="text-2xl font-extrabold">
                        {apiData.wind.speed} Km/s
                      </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default App;