import React from "react";

import { TimersContext } from "./TimerDashboard";
import { EditableTimer } from "./EditableTimer";

export const TimerContext = React.createContext();
export const EditableTimerList = () => {
    // console.log(timers[0].id);

    const { timers } = React.useContext(TimersContext);
    console.log(timers);

    return timers.map(timer => (
        <TimerContext.Provider
            key={timer.id}
            value={{
                key: timer.id,
                id: timer.id,
                title: timer.title,
                project: timer.project,
                elapsed: timer.elapsed,
                runningSince: timer.runningSince
            }}
        >
            <EditableTimer />
        </TimerContext.Provider>
    ));
};
