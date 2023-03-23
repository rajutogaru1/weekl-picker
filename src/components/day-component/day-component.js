import React, { useState } from "react";

export default function DayComponent({ weekTimestamps, selectedTimezone }) {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({});
  const allowed_timings = [
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
    "10:00 PM",
    "10:30 PM",
    "11:00 PM",
  ];

  const formatDate = (date) => {
    const options = { weekday: "long", month: "numeric", day: "numeric" };
    const day = new Intl.DateTimeFormat("en-US", options).format(date);
    const formatted = day.split(",");
    return (
      <>
        <h5>{formatted[0]}</h5>
        <p>{formatted[1]}</p>
      </>
    );
  };

  const handleDayTimings = (event, day) => {
    const { checked, value } = event.target;
    const { ISTDay, ESTDay } = convertDateAndTimeToUTC(day, value);
    setSelectedTimeSlots({
      ...selectedTimeSlots,
      [ISTDay + " IST"]: checked,
      [ESTDay + " EST"]: checked,
    });
  };

  const checkConvertDateAndTimeToUTC = (dateStr, timeStr, type) => {
    const options = { weekday: "long", month: "numeric", day: "numeric" };
    const day = new Intl.DateTimeFormat("en-US", options).format(dateStr);
    const combinedStr = day + ", " + timeStr + " " + type;
    console.log(selectedTimeSlots, combinedStr);
    return selectedTimeSlots[combinedStr];

  }

  const convertDateAndTimeToUTC = (dateStr, timeStr) => {
    let IST = new Date(dateStr);
    let EST = new Date(dateStr);
    let [hours, minutes] = timeStr.split(":");
    let [min, m] = minutes.split(" ");
    if (m === "PM") {
      hours = parseInt(hours) + 12;
    }

    if (selectedTimezone === "IST") {
      EST.setHours(parseInt(hours) - 5);
      EST.setMinutes(parseInt(min));
    } else {
      EST.setHours(parseInt(hours));
      EST.setMinutes(parseInt(min));
    }
    if (selectedTimezone === "EST") {
      IST.setHours(parseInt(hours) + 5);
      IST.setMinutes(parseInt(min) + 30);
    } else {
      IST.setHours(parseInt(hours));
      IST.setMinutes(parseInt(min));
    }
    const options = {
      weekday: "long",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const ISTDay = new Intl.DateTimeFormat("en-US", options).format(IST);
    const ESTDay = new Intl.DateTimeFormat("en-US", options).format(EST);

    return { ISTDay, ESTDay };
  };

  return (
    <section class="week-table">
      <div class="col-12">
        {(weekTimestamps || []).map((day, index) => (
          <div class="mon-day" key={index}>
            <div class="row box-day">
              <div class="col-2 days">{formatDate(day)}</div>
              <div class="col-10 timings">
                <ul>
                  {allowed_timings.map((item) => (
                    <li key={item}>
                      <input
                        type="checkbox"
                        class="form-check-input" 
                        id={index + item}
                        name={index + item}
                        value={item}
                        checked={
                            checkConvertDateAndTimeToUTC(day, item, selectedTimezone)
                        }
                        onClick={(event) => handleDayTimings(event, day)}
                      />
                      <label class="form-check-label" for={index + item}>{item}</label>
                      <br />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
