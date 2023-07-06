
import axios from 'axios'
import { useState, useEffect } from 'react'
import Loader from './Loader'

const WeatherApi = () => {

    const [darkmode, setdarkmode ] = useState (false)
    const [units, setUnits ] = useState (false)
    const [info, setInfo ] = useState ({})
    const [isLoading, setIsLoading] = useState (true);
    const apiKey ='06ddcee1cd2a99921b275d59fe515054';
    
    const options = {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
    };

    function success(pos) {
        const crd = pos.coords;
        let tempUnit = units ? 'units' : 'metric'
        axios
            .get (`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${apiKey}&units=${tempUnit}`)
            .then (resp => {console.log (resp.data)
            setInfo (resp.data)
            setTimeout (()=> {
                setIsLoading (false)
            }, 1000)
            })
            .catch( error => console.error(error));
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
}

    useEffect (()=> {
        navigator.geolocation.getCurrentPosition(success, error, options);
        
        
    }, [units] )

    return (
        <div className={`${darkmode ? 'darkMode' : 'ligthMode'}`}>
            {isLoading && <Loader/>}
            <span><button className= "mode" onClick={()=>{setdarkmode(!darkmode)}}>Ligth/Dark</button></span>
            <div >
                <h1 className="header">WEATHER RADAR</h1>
                <span className={`${units ? 'units' : 'metric'}`}>
                    <div className= "card">
                        <div className="container">
                            {info?.weather ? (<img src={`../../${info?.weather[0].icon}.png`} alt="image" />): null}
                        </div>
                        <h1 className="tittle">📍Current Location: {info.name}, {info.sys?.country}</h1>
                        <div className="totalWrap">
                            <div className="description">{info?.weather ? ( <span>{info?.weather[0].description}</span>) : null}</div>
                            <div className="Temperatur">Temperature: {info.main?.temp} {units ? 'K' : '°C' } </div>
                            <div className="realFeel">Feels like: {info.main?.feels_like} {units ? 'K' : '°C' }</div>
                            <div className="Humidity">Humidity: {info.main?.humidity}%</div>
                            <div className="speed">Wind speed: {info.wind?.speed} Kts</div>
                        </div>
                        <div><button className="temp-scale" onClick= {()=>{setUnits(!units)}}>K - °C</button>
                        
                        </div>
                    </div>            
                </span>
            </div>    
        </div>
        )
}


export default WeatherApi


