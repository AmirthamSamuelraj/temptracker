import React from 'react'; 
import { useState } from 'react';
 
import './App.css';
import axios from 'axios';

function App() {
  const [location,setLocation]=useState('');
  const [data,setData]=useState({});
 
   
  const url= `https://api.openweathermap.org/data/2.5/weather?q=${location}&&units=imperial&appid=f2d63d44e934b9032be3fd92972c5198 `;
  
  const searchLocation=(event)=>{
    if(event.key === 'Enter')
    {
      axios.get(url).then(response=>{
      
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
     
    
    
    }
  }
  return (
    <div className="App">
      <section className='container  '>
      <div className="input-group flex-nowrap searchinput   mt-5">
        <span className="input-group-text searchinput" id="addon-wrapping"><i class="bi bi-geo-alt text-danger"></i></span>
        <input type="text" 
        value={location}
        onChange={event=> setLocation(event.target.value)}
        onKeyPress={searchLocation}
         className="form-control searchinput text-warning" 
         placeholder="Search Location"
          aria-label="Location" 
          aria-describedby="addon-wrapping"/>
      </div>
      <div className="row mt-5 ">
        <div className="col-12 col-md-6  text-center">
          <div className="container for-details">
            <div className="country">
              <p className="lead display-3 text-warning">{data.name}</p>
            </div>
            <div className="temperature">
              {data.main ? <p className="lead display-1 fw-bold text-white">{data.main.temp.toFixed()}<sup>o</sup>C</p>:null}
            </div>
            <div className="clouds">
              {data.weather?<p className="lead h3 fw-bolder text-primary">{data.weather[0].main}</p>:null}
            </div>
          </div>
        </div>
       {data.name !== undefined && 
        <div className="custom-column col-md-6 text-white  ">
        <div className="row ">
          <div className=" col humidity text-center">
            <h2>Humidity</h2>
            {data.main ? <h4 className='mt-4 fw-light text-info'>{data.main.humidity.toFixed()}<span className='text-info'>%</span></h4>:null}
          </div>
          <div className="col feelslike text-center">
            <h2>Feelslike</h2>
            { data.main ?<h4 className='mt-4 fw-light text-info'>{data.main.feels_like.toFixed()}<span className='text-info'><sup>o</sup>F</span></h4>:null}
          </div>
          <div className="col speed text-center">
            <h2>Speed</h2>
            {data.wind ?<h4 className='mt-4 fw-light text-info'>{data.wind.speed}<span className='text-info'>MPH</span></h4>:null}
          </div>
        </div>
      </div>
       }
      
      </div>
      </section>
    </div>
  );
}

export default App;
