
import axios from 'axios'
import { useState, useEffect } from 'react'

const WeatherApi = () => {

    const [info, setInfo ] = useState ({})
    const [darkmode, setdarkmode ] = useState (false)
    const apiKey ='a6ce2cc0b7a08924a5a16ca43ee042c3'
    const tempUnit = "metric";
    useEffect (()=> {

        axios
            // .get (`https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${apiKey}&units=${tempUnit}`)
            .get (`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=06ddcee1cd2a99921b275d59fe515054`)
            .then (resp => {console.log (resp.data)
                setInfo (resp.data)
            })
            .catch( error => console.error(error))
    }, [] )

    return (
        <>
        <div className={`${darkmode ? 'darkMode' : 'ligthMode'}`}>
        <h1 className="tittle">Current Location: {info.name}</h1>
        <p>{info?.lat}hola nicho</p>
        <button onClick={()=>{setdarkmode(!darkmode)}}>DarkMode</button>
        </div>
        </>
    )
}

export default WeatherApi


