import moment from "moment";
import "./UpcomingTasks.scss";
import { TASK_ICONS } from "../../utils/utils.components";
import { sortUpcomingTaskByDate } from "../../utils/utils";

const UpcomingTasks = ({ tasks }) => {
    const sortedTasks = sortUpcomingTaskByDate(tasks);

    return (
        <div className="upcoming-tasks">
            <h3 className="title">Upcoming Tasks</h3>
            {sortedTasks.length > 0 ? (
                <div className="tasks-list">
                    {sortedTasks.map(({ tag, id, title, date, start, end }) => (
                        <div className="task-info" key={id}>
                            <div></div>
                            <div className="task-details">
                                <div className="task-icon">{TASK_ICONS(tag.id, tag.color)}</div>
                                <h4 className="task-name">{title}</h4>
                                <p className="task-date" style={{backgroundColor: tag.lighterColor}}>
                                    {moment(`${date}T${start}`).format("MMM D, YYYY, h:mm A")} →{" "}
                                    {moment(`${date}T${end}`).format("h:mm A")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have no upcoming tasks</p>
            )}
        </div>
    );
};

export default UpcomingTasks;
