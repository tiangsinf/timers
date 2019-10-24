import React from "react";

import {
    Box,
    Card,
    CardHeader,
    Divider,
    CardContent,
    TextField,
    ButtonGroup,
    Button
} from "@material-ui/core";

import { TimersContext } from "./TimerDashboard";
import { EditFormContext } from "./EditableTimer";

// Stateful: Form is always stateful.
export const TimerForm = ({
    id,
    title,
    project,
    isOpen,
    onInformedFormSubmit,
    onInformedFormClose
}) => {
    const [timerFormData, setTimerFormData] = React.useState({
        id: id || "",
        title: title || "",
        project: project || ""
    });

    const informFormSubmit = () => {
        onInformedFormSubmit({
            id: id,
            title: title,
            project: project
        });
    };

    const { handleEditFormSubmit } = React.useContext(TimersContext);
    const { toggleEditFormClose } = React.useContext(EditFormContext);

    const informEditFormSubmit = timer => {
        handleEditFormSubmit(timer);
        toggleEditFormClose();
    };

    const informFormClose = () => {
        onInformedFormClose();
    };

    const submitText = timerFormData.id ? "Update" : "Create";

    return (
        <Box display="flex" justifyContent="center" m={3} mb={1}>
            <Card raised={true} style={{ width: 350 }}>
                <CardHeader
                    title={`${submitText} Timer`}
                    subheader="Update title or project description"
                    style={{ height: 50 }}
                />
                <Divider />
                <CardContent>
                    <form
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            height: 150
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            fullWidth
                            style={{
                                margin: 20,
                                marginTop: 1,
                                marginBottom: 1
                            }}
                            id="outlined-name"
                            label="Title"
                            margin="normal"
                            variant="outlined"
                            defaultValue={timerFormData.title}
                            placeholder="Title"
                            onChange={e =>
                                setTimerFormData({
                                    id: id,
                                    title: e.target.value
                                })
                            }
                        />
                        <TextField
                            fullWidth
                            style={{ margin: 20 }}
                            id="outlined-name"
                            label="Project"
                            margin="normal"
                            variant="outlined"
                            defaultValue={timerFormData.project}
                            placeholder="Project"
                            onChange={e =>
                                setTimerFormData({
                                    id: id,
                                    project: e.target.value
                                })
                            }
                        />
                    </form>
                </CardContent>
                <ButtonGroup fullWidth size="large">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={
                            isOpen ? informFormSubmit : informEditFormSubmit
                        }
                    >
                        {submitText}
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={isOpen ? informFormClose : toggleEditFormClose}
                    >
                        Cancel
                    </Button>
                </ButtonGroup>
            </Card>
        </Box>
    );
};
