import { useState } from "react";
import "./CreateANewTask.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { formatTime, TASK_TAGS } from "../../utils/utils";
import { TASK_ICONS } from "../../utils/utils.components";

const CreateANewTask = ({ goBack, setTasks, taskToEdit }) => {
  const [selectedTag, setSelectedTag] = useState(
    taskToEdit?.tag || TASK_TAGS[0]
  );
  const [taskInfo, setTaskInfo] = useState({
    title: taskToEdit ? taskToEdit.title : "",
    description: taskToEdit ? taskToEdit.description : "",
    date: taskToEdit ? taskToEdit.date : "",
    start: taskToEdit ? formatTime(taskToEdit.start) : "",
    end: taskToEdit ? formatTime(taskToEdit.end) : "",
  });

  const isSaveButtonDisabled =
    !taskInfo.title ||
    !taskInfo.description ||
    !taskInfo.date ||
    !taskInfo.start ||
    !taskInfo.end;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskToEdit.id
            ? {
                ...taskInfo,
                id: taskToEdit.id,
                tag: selectedTag,
                isCompleted: task.isCompleted,
              }
            : task
        )
      );
    } else {
      const newTask = {
        ...taskInfo,
        id: uuidv4(),
        tag: selectedTag,
        isCompleted: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
    goBack();
  };

  return (
    <div className="create-new-task">
      <div className="header">
        <div className="icon" onClick={() => goBack()}>
          <IoMdArrowRoundBack size={22} />
        </div>
        <h2>{taskToEdit ? "Edit Task" : "Create a new task"}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="label-input">
            <label htmlFor="title">Task Name</label>
            <input
              name="title"
              type="text"
              value={taskInfo.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="label-input">
            <label htmlFor="description">Task Description</label>
            <textarea
              name="description"
              value={taskInfo.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="label-input">
            <label htmlFor="date">Date</label>
            <input
              name="date"
              type="date"
              value={taskInfo.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="dates">
            <div className="label-input">
              <label htmlFor="start">Start time</label>
              <input
                name="start"
                type="time"
                value={taskInfo.start}
                onChange={handleInputChange}
              />
            </div>
            <div className="label-input">
              <label htmlFor="end">End time</label>
              <input
                name="end"
                type="time"
                value={taskInfo.end}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="tags">
            {TASK_TAGS.map((tag) => {
              const { id, name, color, lighterColor } = tag;
              const isActive = selectedTag.name === name;
              return (
                <div
                  key={id}
                  className="tag"
                  style={{
                    border: `1px solid ${isActive ? color : "transparent"}`,
                    backgroundColor: isActive ? lighterColor : "",
                    color: isActive ? color : "",
                  }}
                  onClick={() => setSelectedTag(tag)}
                >
                  {TASK_ICONS(id, color)}
                  <span className={isActive ? "visible" : "invisible"}>
                    {name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <button
          type="submit"
          className="create-task-button"
          disabled={isSaveButtonDisabled}
          style={{ backgroundColor: selectedTag ? selectedTag.color : "" }}
        >
          Save Task
        </button>
      </form>
    </div>
  );
};

export default CreateANewTask;
