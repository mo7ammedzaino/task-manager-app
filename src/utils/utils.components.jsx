import { MdOutlineNotificationImportant } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { MdEvent } from "react-icons/md";

export const TASK_ICONS = (type, color) => {
    switch (type) {
        case "event":
            return <MdEvent color={color} size={20}/>;
        case "important":
            return <MdOutlineNotificationImportant color={color} size={20}/>;
        case "meeting":
            return <MdOutlinePeopleAlt color={color} size={20}/>;
        default:
            return <MdEvent color={color} size={20}/>;
    }
};
