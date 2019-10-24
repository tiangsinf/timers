import React from "react";

import { Box, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { TimerForm } from "./TimerForm";

// Stateful: hold isOpen status
// TODO: Move Open state to Parents
export const ToggleableTimerForm = ({ onInformedFormSubmit }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleFormOpen = () => {
        setIsOpen(false);
    };

    const handleFormSubmit = timer => {
        onInformedFormSubmit(timer);
        setIsOpen(false);
    };

    if (isOpen) {
        return (
            <TimerForm
                isOpen={isOpen}
                onInformedFormClose={handleFormOpen}
                onInformedFormSubmit={handleFormSubmit}
            />
        );
    } else {
        return (
            <Box align="center" m={4}>
                <Fab
                    color="secondary"
                    size="large"
                    onClick={() => setIsOpen(true)}
                >
                    <AddIcon />
                </Fab>
            </Box>
        );
    }
};
