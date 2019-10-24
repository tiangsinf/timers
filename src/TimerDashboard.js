import React from "react";
import uuidv4 from "uuid";
import { Container, Box, Typography, Divider } from "@material-ui/core";

import { EditableTimerList } from "./EditableTimerList";
import { ToggleableTimerForm } from "./ToggleableTimerForm";

// Stateful: hold toggle data
export const TimersContext = React.createContext();
export const TimerDashboard = () => {
    const [timers, setTimer] = React.useState([
        {
            id: uuidv4(),
            title: "Learn React",
            project: "World Domination",
            elapsed: "86300",
            runningSince: null
        },
        {
            id: uuidv4(),
            title: "Use Hook",
            project: "React FTW",
            elapsed: "3890985",
            runningSince: null
        }
    ]);

    const handleCreateFormSubmit = timer => {
        createTimer(timer);
    };

    const createTimer = timer => {
        const t = newTimer(timer);
        setTimer([...timers, t]);
    };

    const newTimer = (attrs = {}) => {
        const timer = {
            title: attrs.title || "Timer",
            project: attrs.project || "Project",
            id: uuidv4(),
            elapsed: 0
        };
        return timer;
    };

    // const handleEditFormSubmit = (attrs) => {
    //     updateTimer(attrs);
    // };

    const handleEditFormSubmit = attrs => {
        setTimer({
            timers: timers.map(timer => {
                if (timer.id === attrs.id) {
                    return Object.assign({}, timer, {
                        title: attrs.title,
                        project: attrs.project
                    });
                } else {
                    return timer;
                }
            })
        });
    };

    console.log(timers);

    return (
        <Container maxWidth="sm">
            <Box display="flex" justifyContent="center" m={3} mb={1}>
                <Typography variant="h4">Timer</Typography>
            </Box>
            <Box justifyContent="center" m={3} mb={1}>
                <Divider />
            </Box>
            <Box justifyContent="center" m={3} mb={1}>
                <TimersContext.Provider
                    value={{ timers, handleEditFormSubmit }}
                >
                    <EditableTimerList />
                    <ToggleableTimerForm
                        onInformedFormSubmit={handleCreateFormSubmit}
                    />
                </TimersContext.Provider>
            </Box>
        </Container>
    );
};
