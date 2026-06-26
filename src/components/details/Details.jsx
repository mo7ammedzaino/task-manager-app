import { useState } from "react";
import "./Details.scss";
import CreateANewTask from "../createANewTask/CreateANewTask";
import DateDisplay from "../dateDisplay/DateDisplay";
import TaskTracker from "../TaskTracker/TaskTracker";
import UpcomingTasks from "../UpcomingTasks/UpcomingTasks";

const Details = ({ setTasks, tasks, taskToEdit, setTaskToEdit }) => {
  const [isCreateTaskFormVisible, setIsCreateTaskFormVisible] = useState(false);

  const showForm = isCreateTaskFormVisible || taskToEdit;

  const handleGoBack = () => {
    setIsCreateTaskFormVisible(false);
    setTaskToEdit(null);
  };

  return (
    <div className="details">
      {showForm ? (
        <CreateANewTask
          goBack={handleGoBack}
          setTasks={setTasks}
          taskToEdit={taskToEdit}
        />
      ) : (
        <div className="details-content">
          <div className="section">
            <button
              type="button"
              className="create-task-button"
              onClick={() => setIsCreateTaskFormVisible(true)}
            >
              Create a new task
            </button>
          </div>
          <div className="section">
            <DateDisplay />
          </div>
          <div className="section">
            <TaskTracker tasks={tasks} />
          </div>
          <div className="section">
            <UpcomingTasks tasks={tasks} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
