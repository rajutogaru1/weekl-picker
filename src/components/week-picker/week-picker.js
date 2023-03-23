import React, { useEffect, useState } from "react";
import DayComponent from "../day-component/day-component";
import "./week-picker.css";

export default function WeekPicker() {
  const [currentUTCTimestamp, setCurrentUTCTimestamp] = useState();
  const [selectedTimezone, setSelectedTimezone] = useState("IST");
  const [selectedWeekCount, setSelectedWeekCount] = useState(0);
  const [weekTimestamps, setWeekTimestamps] = useState([]);
  const days = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
  };
  useEffect(() => {
    const currentDate = new Date();
    const currentUTCTimestamp =
      currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
    setCurrentUTCTimestamp(currentUTCTimestamp);
    if (selectedTimezone === "IST") {
      getISTTimestamps(currentUTCTimestamp);
    } else {
      getESTTimestamps(currentUTCTimestamp);
    }
  }, []);

  const getISTTimestamps = (
    currentUTCTimestamp,
    weekCount = selectedWeekCount
  ) => {
    const ISTOffset = 330; // IST is UTC+5:30
    const options = { weekday: "long" };
    const ISTDateCurrentIndex = new Intl.DateTimeFormat(
      "en-US",
      options
    ).format(currentUTCTimestamp);
    const daysIndex = days[ISTDateCurrentIndex];
    const ISTTimestamps = [];
    const from = weekCount - daysIndex;
    const to = from + 5;
    for (let i = from; i < to; i++) {
      const date = new Date(
        currentUTCTimestamp + ISTOffset * 60000 + i * 86400000
      );
      ISTTimestamps.push(date);
    }
    console.log("IST Timestamps:", ISTTimestamps);
    setWeekTimestamps(ISTTimestamps);
  };

  const getESTTimestamps = (
    currentUTCTimestamp,
    weekCount = selectedWeekCount
  ) => {
    const ESTOffset = -300; // EST is UTC-5:00
    const options = { weekday: "long" };
    const ESTDateCurrentIndex = new Intl.DateTimeFormat(
      "en-US",
      options
    ).format(currentUTCTimestamp);
    const daysIndex = days[ESTDateCurrentIndex];
    const ESTTimestamps = [];
    const from = weekCount - daysIndex;
    const to = from + 5;
    for (let i = from; i < to; i++) {
      const date = new Date(
        currentUTCTimestamp + ESTOffset * 60000 + i * 86400000
      );
      ESTTimestamps.push(date);
    }
    console.log("EST Timestamps:", ESTTimestamps);
    setWeekTimestamps(ESTTimestamps);
  };

  const handleTimezoneChange = (event) => {
    const { value } = event.target;
    setSelectedTimezone(value);
    if (value === "IST") {
      getISTTimestamps(currentUTCTimestamp);
    } else {
      getESTTimestamps(currentUTCTimestamp);
    }
  };

  const handleWeekChange = (value) => {
    setSelectedWeekCount(selectedWeekCount + value);
    getISTTimestamps(currentUTCTimestamp, selectedWeekCount + value);
  };

  const formatToday = () => {
    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(today);
    return formattedDate;
  };

  return (
    <div class="container">
      <section class="date-t" id="date-t">
        <div class="col-12">
          <div class="row">
            <div class="pervious-week col-4 text-left">
              <button className="btn" onClick={() => handleWeekChange(-7)}>
                Pervious Week
              </button>
            </div>
            <div class="today-date col-4 text-center">
              <p>Today Date</p>
              <h4>{formatToday()}</h4>
            </div>
            <div class="next-week col-4 text-right">
              <button className="btn" onClick={() => handleWeekChange(7)}>
                {" "}
                Next Week{" "}
              </button>
            </div>
          </div>
        </div>
      </section>
      <section class="time-z" id="time-z">
        <div class="col-12">
          <div class="row">
            <div class="time-zoon">
              <label for="timezoon">Timezoon</label>
              <br />

              <select 
                class="timezoon-selact selectpicker"
                name="time-zoon"
                onChange={handleTimezoneChange}
              >
                <option value="IST"> [UTC + 05:30] Indian Standard Time</option>
                <option value="EST"> [UTC - 05:00] Eastern Time Zone</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <DayComponent weekTimestamps={weekTimestamps} selectedTimezone={selectedTimezone} />
    </div>
  );
}
