import "./TaskTracker.scss";

const TaskTracker = ({tasks}) => {
    const tasksCount = { meeting: 0, event: 0, important: 0 };
    
    tasks.forEach(({ tag, isCompleted }) => {
        if (isCompleted) return;
        if (tag.name === "Meeting") {
            tasksCount.meeting++;
        } else if (tag.name === "Event") {
            tasksCount.event++;
        } else if (tag.name === "Important") {
            tasksCount.important++;
        }
    });
    
    return (
        <div className="task-tracker">
            <h3 className="title">You have </h3>
            <div className="tasks-count">
                <span className="meeting-count">{tasksCount.meeting} Meetings</span>
                <span className="event-count">{tasksCount.event} Events</span>
                <span className="important-count">{tasksCount.important} Important Tasks</span>
            </div>
        </div>
    );
};

export default TaskTracker;
