import "./Modal.scss";
import moment from "moment";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";
import { MdOutlineCalendarToday } from "react-icons/md";

const Modal = ({ event, setSelectedEvent, setTasks, setTaskToEdit }) => {
    const [isEventCompleted, setIsEventCompleted] = useState(event.isCompleted);

    const handleEdit = () => {
        setTaskToEdit(event);
        setSelectedEvent(null);
    };

    return (
        <div className="modal" onClick={() => setSelectedEvent(null)}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                style={{ borderTop: `3px solid ${event.tag.lightColor}` }}
            >
                <div className="modal-title">
                    <div className="status">
                        <button
                            className="complete-button"
                            onClick={() => {
                                setTasks((prevTasks) =>
                                    prevTasks.map((task) =>
                                        task.id === event.id
                                            ? { ...task, isCompleted: !task.isCompleted }
                                            : task,
                                    ),
                                );
                                setIsEventCompleted(!isEventCompleted);
                            }}
                        >
                            {isEventCompleted ? (
                                <ImCheckboxChecked size={25} color={event.tag.color} />
                            ) : (
                                <ImCheckboxUnchecked size={25} color={event.tag.color} />
                            )}
                        </button>
                        <h3 className={isEventCompleted ? "completed-task" : ""}>{event.title}</h3>
                    </div>
                    <p
                        className="tag-name"
                        style={{ color: event.tag.color, backgroundColor: event.tag.lighterColor }}
                    >
                        {event.tag.name}
                    </p>
                </div>
                <div className="modal-item">
                    <p style={{ opacity: 0.6 }}>{event.description}</p>
                </div>
                <div className="modal-item">
                    <p className="date">
                        <MdOutlineCalendarToday />
                        {moment(event.start).format("MMM D, YYYY, h:mm A")} →{" "}
                        {moment(event.end).format("h:mm A")}
                    </p>
                </div>

                <div className="footer">
                    <button
                        className="event-button"
                        style={{ color: "red", border: "1px solid #ccc" }}
                        onClick={() => {
                            setTasks((prevTasks) =>
                                prevTasks.filter((task) => task.id !== event.id),
                            );
                            setSelectedEvent(null);
                        }}
                    >
                        <BsTrash />
                        Delete
                    </button>
                    <button
                        className="event-button"
                        onClick={() => handleEdit()}
                        style={{ backgroundColor: event.tag.color }}
                    >
                        <FiEdit2 />
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
