import { useState } from "react";
import "./EventCalendar.scss";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Modal from "../modal/Modal";
const localizer = momentLocalizer(moment);

const EventCalendar = ({ events, setTasks, setTaskToEdit }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const calendarEvents = events.map((event) => ({
    ...event,
    start: new Date(`${event.date}T${event.start}:00`),
    end: new Date(`${event.date}T${event.end}:00`),
  }));

  return (
    <div className="calendar">
      {selectedEvent && (
        <Modal
          event={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          setTasks={setTasks}
          setTaskToEdit={setTaskToEdit}
        />
      )}
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%", overflowY: "auto" }}
        date={currentDate}
        view={currentView}
        onNavigate={(date) => setCurrentDate(date)}
        onView={(view) => setCurrentView(view)}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.tag?.lightColor || "#3174ad",
            color: "#444444",
            textDecoration: event.isCompleted ? "line-through" : "none",
          },
        })}
        onSelectEvent={(event) => {
          setSelectedEvent(event);
        }}
      />
    </div>
  );
};

export default EventCalendar;
