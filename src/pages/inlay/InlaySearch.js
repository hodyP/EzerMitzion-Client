import React, { useState,useEffect } from 'react';
import SelectOption from './SelectOption';

const InlaySearch = () => {
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");
  const [domain, setDomain] = useState("");
  const [family, setFamily] = useState("");

  const [allDay, setAllDay] = useState([]);
  const [allTime, setAllTime] = useState([]);
  const [allCity, setAllCity] = useState([]);
  const [allDomain, setAllDomain] = useState([]);
  const [allFamily, setAllFamily] = useState([]);

  const handleReset = (e) => {
    setDay("");
    setTime("");
    setCity("");
    setDomain("");
    setFamily("");
  }

  useEffect(() => {
const days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const time =["Morning", "Afternoon", "Evening"]
const cities=["New York", "Los Angeles", "Chicago", "Houston", "Philadelphia", "Phoenix", "San Antonio", "San Diego", "Dallas", "San Jose"]
const domain=["Technology", "Finance", "Health", "Food", "Education"]
const families=["Single", "Couple", "Family with kids", "Family without kids"]

setAllDay(days);
setAllTime(time)
setAllCity(cities)
setAllDomain(domain)
setAllFamily(families)

}, []);

  return (
    <div className="container">
      <form>
        <SelectOption
          id="day"
          label="Day"
          options={allDay}
          selectedOption={day}
          setSelectedOption={setDay}
        />

        <SelectOption
          id="time"
          label="Time"
          options={allTime}
          selectedOption={time}
          setSelectedOption={setTime}
        />

        <SelectOption
          id="city"
          label="City"
          options={allCity}
          selectedOption={city}
          setSelectedOption={setCity}
        />

        <SelectOption
          id="domain"
          label="Domain"
          options={allDomain}
          selectedOption={domain}
          setSelectedOption={setDomain}
        />

        <SelectOption
          id="family"
          label="Family"
          options={allFamily}
          selectedOption={family}
          setSelectedOption={setFamily}
        />

        <button type="submit">Search</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
    </div>
  );
}

export default InlaySearch;

