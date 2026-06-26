import "./DateDisplay.scss";

const DateDisplay = () => {
  const today = new Date();
  const day = today.getDate();
  const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" });
  const month = today.toLocaleDateString("en-US", { month: "long" });
  const year = today.getFullYear();

  return (
    <div className="date-display">
      <h3 className="title">Today</h3>
      <div className="date">
        <div className="date-large">{day}</div>
        <div className="date-light-text">
          <p className="">{dayOfWeek}</p>
          <p className="">
            {month}, {year}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DateDisplay;
