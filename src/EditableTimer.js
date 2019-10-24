import React from "react";

import { TimerForm } from "./TimerForm";
import { Timer } from "./Timer";
import { TimerContext } from "./EditableTimerList";

// Stateful: hold editFormOpen status
export const EditFormContext = React.createContext({
    editFormOpen: false,
    toggleEditFormOpen: () => {},
    toggleEditFormClose: () => {}
});

export const EditableTimer = () => {
    const [editFormOpen, setEditFormOpen] = React.useState(false);

    const { id, title, project } = React.useContext(TimerContext);

    const toggleEditFormOpen = () => {
        setEditFormOpen(true);
    };
    const toggleEditFormClose = () => {
        setEditFormOpen(false);
    };

    if (editFormOpen) {
        return (
            <EditFormContext.Provider value={{ toggleEditFormClose }}>
                <TimerForm id={id} title={title} project={project} />
            </EditFormContext.Provider>
        );
    } else {
        return (
            <EditFormContext.Provider
                value={{ editFormOpen, toggleEditFormOpen }}
            >
                <Timer />
            </EditFormContext.Provider>
        );
    }
};
