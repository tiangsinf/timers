import React from "react";
import ReactDOM from "react-dom";
import uuidv4 from "uuid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {
    Typography,
    Divider,
    Card,
    CardHeader,
    CardContent,
    TextField,
    ButtonGroup,
    Button,
    Fab,
    IconButton
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// Stateful: hold toggle data
const TimersContext = React.createContext();
const TimerDashboard = () => {
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

    const handleCreateFormSubmit = (timer) => {
        createTimer(timer);
    };

    const createTimer = (timer) => {
        const t = newTimer(timer);
        setTimer([...timers, t]);
    };

    const newTimer = (attrs = {}) => {
        const timer = {
          title: attrs.title || 'Timer',
          project: attrs.project || 'Project',
          id: uuidv4(),
          elapsed: 0,
        };
        return timer;
    };

    // const handleEditFormSubmit = (attrs) => {
    //     updateTimer(attrs);
    // };

    const handleEditFormSubmit = (attrs) => {
        setTimer({
            timers: timers.map(timer => {
                if (timer.id === attrs.id) {
                    return Object.assign({}, timer, {
                        title: attrs.title,
                        project: attrs.project,
                    });
                } else {
                    return timer;
                }
            }),
        });
    };

    console.log(timers)

    return (
        <Container maxWidth="sm">
            <Box display="flex" justifyContent="center" m={3} mb={1}>
                <Typography variant="h4">Timer</Typography>
            </Box>
            <Box justifyContent="center" m={3} mb={1}>
                <Divider />
            </Box>
            <Box justifyContent="center" m={3} mb={1}>
                <TimersContext.Provider value={{ timers, handleEditFormSubmit }}>
                    <EditableTimerList />
                    <ToggleableTimerForm onInformedFormSubmit={handleCreateFormSubmit}/>
                </TimersContext.Provider>
            </Box>
        </Container>
    );
};

const TimerContext = React.createContext();
const EditableTimerList = () => {
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
                runningSince: timer.runningSince,
            }}
        >
            <EditableTimer />
        </TimerContext.Provider>
    ));
};

// Stateful: hold editFormOpen status
const EditFormContext = React.createContext({
    editFormOpen: false,
    toggleEditFormOpen: () => {},
    toggleEditFormClose: () => {}
});

const EditableTimer = () => {
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

// Stateless
const Timer = () => {
    
    const { 
        title, 
        project, 
        elapsed, 
        runningSince 
    } = React.useContext(TimerContext);
    
    // Convert elapsed to HH:MM:SS
    function renderElapsedString(elapsed, runningSince) {
        let totalElapsed = elapsed;
        if (runningSince) {
            totalElapsed += Date.now() - runningSince;
        }
        return millisecondsToHuman(totalElapsed);
    }

    function millisecondsToHuman(ms) {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / 1000 / 60) % 60);
        const hours = Math.floor(ms / 1000 / 60 / 60);

        const humanized = [
            pad(hours.toString(), 2),
            pad(minutes.toString(), 2),
            pad(seconds.toString(), 2)
        ].join(":");

        return humanized;
    }

    function pad(numberString, size) {
        let padded = numberString;
        while (padded.length < size) padded = `0${padded}`;
        return padded;
    }

    return (
        <Box display="flex" justifyContent="center" m={3} mb={1}>
            <Card raised={true} style={{ width: 350 }}>
                <CardHeader
                    style={{ height: 50 }}
                    title={title}
                    subheader={project}
                    action={<SettingMenu />}
                />
                <Divider />
                <CardContent style={{ height: 150 }}>
                    <Typography
                        style={{ paddingTop: 30 }}
                        align="center"
                        variant="h2"
                        color="primary"
                    >
                        {renderElapsedString(elapsed, runningSince)}
                    </Typography>
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

// Stateful: Form is always stateful.
const TimerForm = ({ 
    id, title, project, isOpen, onInformedFormSubmit, onInformedFormClose 
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
    const { toggleEditFormClose } = React.useContext(EditFormContext)
    
    const informEditFormSubmit = (timer) => {
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
                            onChange={e => setTimerFormData({ id: id, title: e.target.value })}
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
                            onChange={e => setTimerFormData({ id: id, project: e.target.value })}

                        />
                    </form>
                </CardContent>
                <ButtonGroup fullWidth size="large">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={isOpen ? informFormSubmit : informEditFormSubmit}
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

// Stateful: hold isOpen status
// TODO: Move Open state to Parents
const ToggleableTimerForm = ({ onInformedFormSubmit }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleFormOpen = () => {
        setIsOpen(false);
    };

    const handleFormSubmit = (timer) => {
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

const StyledMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5"
    }
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center"
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        "&:focus": {
            backgroundColor: theme.palette.primary.main,
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white
            }
        }
    }
}))(MenuItem);

const SettingMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { toggleEditFormOpen } = React.useContext(EditFormContext);

    // console.log(toggleEditFormOpen);
    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={toggleEditFormOpen}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Update" />
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                </StyledMenuItem>
            </StyledMenu>
        </>
    );
};

ReactDOM.render(<TimerDashboard />, document.querySelector("#root"));
