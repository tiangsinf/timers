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

// const TimersContext = React.createContext();

const TimerDashboard = () => {
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

const Timer = ({ title, project, elapsed, runningSince }) => {
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

const TimerForm = ({ title, project }) => {
    const submitText = title ? "Update" : "Create";
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
                <StyledMenuItem>
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
