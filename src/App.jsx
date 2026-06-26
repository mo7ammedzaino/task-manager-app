import { useState, useEffect } from "react";
import "./App.scss";
import Details from "./components/details/Details";
import EventCalendar from "./components/eventCalendar/EventCalendar";

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);

    // Request notification permission and check for upcoming tasks
    useEffect(() => {
        if ("Notification" in window) {
            if (Notification.permission === "default") {
                Notification.requestPermission().then((permission) => {
                    console.error("Permission result:", permission);
                });
            }
        }

        const checkUpcomingTasks = () => {
            if (Notification.permission !== "granted") {
                console.error("Notifications not granted");
                return;
            }

            const now = new Date();
            tasks.forEach((task) => {
                if (task.isCompleted) return;

                const taskStart = new Date(`${task.date}T${task.start}:00`);
                const diffMinutes = (taskStart - now) / 1000 / 60;

                // Notify if task starts in 4-5 minutes (tight window to avoid duplicates)
                if (diffMinutes > 4 && diffMinutes <= 5) {
                    const audio = new Audio('/notification.wav');
                    audio.play().catch(err => console.error('Audio play failed:', err));

                    new Notification(`Upcoming: ${task.title}`, {
                        body: `Starts in ${Math.round(diffMinutes)} minutes`,
                        tag: task.id,
                        icon: '/logo.png',
                    });
                }
            });
        };

        const interval = setInterval(checkUpcomingTasks, 60000);
        checkUpcomingTasks();

        return () => clearInterval(interval);
    }, [tasks]);

    return (
        <div className="app-container">
            <div className="task-manager">
                <EventCalendar events={tasks} setTasks={setTasks} setTaskToEdit={setTaskToEdit} />
                <Details tasks={tasks} setTasks={setTasks} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
            </div>
        </div>
    );
}

export default App;
