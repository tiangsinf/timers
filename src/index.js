import React from "react";
import ReactDOM from "react-dom";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {
    Typography,
    Divider,
    Card,
    CardHeader,
    CardContent,
    IconButton,
    TextField,
    ButtonGroup,
    Button,
    Fab
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";

// const TimersContext = React.createContext();

const TimerDashboard = () => {
    // const [timers, setTimers] = React.useState([
    //     {
    //         title: "Learn React",
    //         project: "World Domination",
    //         elapsed: "8986300",
    //         runningSince: null,
    //         editFormOpen: false
    //     },
    //     {
    //         title: "Use Hook",
    //         project: "React FTW",
    //         elapsed: "3890985",
    //         runningSince: null,
    //         editFormOpen: true
    //     }
    // ]);
    return (
        <Container maxWidth="sm">
            <Box display="flex" justifyContent="center" m={3} mb={1}>
                <Typography variant="h4">Timer</Typography>
            </Box>
            <Box justifyContent="center" m={3} mb={1}>
                <Divider />
            </Box>
            <Box justifyContent="center" m={3} mb={1}>
                <EditableTimerList />
                <ToggleableTimerForm isOpen={false} />
            </Box>
        </Container>
    );
};

const EditableTimerList = () => {
    return (
        <>
            <EditableTimer
                title="Learn React"
                project="World Domination"
                elapsed="8986300"
                runningSince={null}
                editFormOpen={false}
            />
            <EditableTimer
                title="Use Hook"
                project="React FTW"
                elapsed="3890985"
                runningSince={null}
                editFormOpen={true}
            />
        </>
    );
};

const EditableTimer = ({
    editFormOpen,
    title,
    project,
    elapsed,
    runningSince
}) => {
    if (editFormOpen) {
        return <TimerForm title={title} project={project} />;
    } else {
        return (
            <Timer
                title={title}
                project={project}
                elapsed={elapsed}
                runningSince={runningSince}
            />
        );
    }
};

const Timer = ({ title, project, elapsed }) => {
    return (
        <Box display="flex" justifyContent="center" m={3} mb={1}>
            <Card raised={true} style={{ width: 350 }}>
                <CardHeader
                    title={title}
                    subheader={project}
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
                <Divider />
                <CardContent>
                    <Typography align="center" variant="h2" color="primary">
                        {elapsed}
                    </Typography>
                    <div>
                        <IconButton edge="end">
                            <DeleteIcon />
                        </IconButton>
                        <IconButton edge="end">
                            <EditIcon />
                        </IconButton>
                    </div>
                </CardContent>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                >
                    START
                </Button>
            </Card>
        </Box>
    );
};

const IsOpenContext = React.createContext(false);
const TimerForm = ({ title, project }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const submitText = title ? "Update" : "Create";
    return (
        <Box display="flex" justifyContent="center" m={3} mb={1}>
            <Card raised={true} style={{ width: 350 }}>
                <CardHeader title={`${submitText} Timer`} />
                <Divider />
                <CardContent>
                    <form
                        style={{ display: "flex", flexWrap: "wrap" }}
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
                            defaultValue={title}
                            placeholder="Title"
                        />
                        <TextField
                            fullWidth
                            style={{ margin: 20 }}
                            id="outlined-name"
                            label="Project"
                            margin="normal"
                            variant="outlined"
                            defaultValue={project}
                            placeholder="Project"
                        />
                    </form>
                </CardContent>
                <ButtonGroup fullWidth size="large">
                    <Button variant="contained" color="primary">
                        {submitText}
                    </Button>
                    <Button variant="contained" color="secondary">
                        Cancel
                    </Button>
                </ButtonGroup>
            </Card>
        </Box>
    );
};

const ToggleableTimerForm = ({ isOpen }) => {
    if (isOpen) {
        return <TimerForm />;
    } else {
        return (
            <Box align="center" m={4}>
                <Fab color="secondary" size="large">
                    <AddIcon />
                </Fab>
            </Box>
        );
    }
};

ReactDOM.render(<TimerDashboard />, document.querySelector("#root"));
