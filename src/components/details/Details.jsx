import React from 'react';
import './Details.css'; // This is where you'll import the global styles if needed
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Details = () => {
  return (
    <>
      <div className="details">
        <div className='stdname'>STUDIO PURPLE</div>
      </div>
      <div style={{ width: '100%', height: '20vh' }}>
        Hello
      </div>
      <div>
        <Fullcalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth",
          }}
          height={"80vh"}
        />
      </div>

    </>
  );
}

export default Details;
