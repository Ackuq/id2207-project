import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";
import api from "../config/api";
import SnackContext from "../context/SnackContext";
import AuthContext from "../context/AuthContext";
import roles from "../config/roles";
import CreateTaskModal from "../components/CreateTaskModal";
import EventProjectForm from "../components/EventProjectForm";
import role from "../config/roles";
import { taskUrl } from "../config/routes";

const formatDate = (date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(3),
  },

  form: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    minWidth: 300,
  },

  createTaskForm: {
    display: "flex",
    flexDirection: "column",
    minWidth: 300,
  },

  formField: {
    marginBottom: "0.5rem",
  },

  listItem: {
    border: `1px solid ${theme.palette.grey[500]}`,
    "&:not(:first-child)": {
      borderTop: 0,
    },
  },

  clickable: {
    transition: "background-color 0.3s",
    cursor: "pointer",
    "&:hover": { backgroundColor: theme.palette.grey[200] },
  },

  capitalize: {
    textTransform: "capitalize",
  },
}));

const TaskList = ({ eventProject, classes }) => {
  const history = useHistory();
  const setSnackState = useContext(SnackContext);
  const { user } = useContext(AuthContext);
  const [createTaskDialog, setCreateTaskDialog] = useState(false);
  const [eventTasks, setEventTasks] = useState([]);

  useEffect(() => {
    api.getEventTasks(eventProject.id).then((res) => {
      setEventTasks(res.data);
    });
  }, [eventProject.id]);

  const closeDialog = () => {
    setCreateTaskDialog(false);
  };

  const createTask = (values) => {
    return api
      .createTask(eventProject.id, values)
      .then((res) => {
        setSnackState({
          open: true,
          message: "Event project updated",
          severity: "success",
        });
        setEventTasks((prevState) => [...prevState, res.data]);
        closeDialog();
      })
      .catch((err) => {
        setSnackState({
          open: true,
          message: err.error,
          severity: "error",
        });
      });
  };

  const subTeamManager =
    user.role === role.serviceManager || user.role === role.productionManager;

  return (
    <>
      <Typography style={{ marginTop: "1rem" }} variant="h4">
        Tasks
      </Typography>
      <List>
        {eventTasks.map((task) => (
          <ListItem
            className={`${classes.listItem} ${
              subTeamManager ? classes.clickable : ""
            }`}
            onClick={() => {
              if (subTeamManager) {
                history.push(taskUrl(task.id));
              }
            }}
            key={task.description}
          >
            <ListItemText
              classes={{
                primary: classes.capitalize,
                secondary: classes.capitalize,
              }}
              primary={`${task.status} - ${task.description}`}
              secondary={`Priority: ${task.priority}`}
            ></ListItemText>
          </ListItem>
        ))}
      </List>

      {(user.role === roles.serviceManager ||
        user.role === roles.productionManager) && (
        <Button
          disableRipple
          color="primary"
          style={{ marginTop: "1rem" }}
          variant="contained"
          onClick={() => {
            setCreateTaskDialog(true);
          }}
          fullWidth
        >
          Create task
        </Button>
      )}
      <CreateTaskModal
        open={createTaskDialog}
        onSubmit={createTask}
        close={closeDialog}
        classes={classes}
      />
    </>
  );
};

const EventProject = () => {
  const classes = useStyles();

  const match = useRouteMatch();
  const { id } = match.params;

  const [eventProject, setEventProject] = useState(null);

  useEffect(() => {
    api.getEventProject(id).then((res) => {
      // Format date to a valid format
      const data = { ...res.data, date: formatDate(res.data.date) };
      setEventProject(data);
    });
  }, [id]);

  return (
    <Paper className={classes.card}>
      <Typography variant="h4">
        Event Project #{id} {eventProject?.archived ? "[ARCHIVED]" : ""}
      </Typography>
      {eventProject ? (
        <>
          <EventProjectForm
            classes={classes}
            eventProject={eventProject}
            id={id}
          />
          <TaskList eventProject={eventProject} classes={classes} />
        </>
      ) : (
        <CircularProgress />
      )}
    </Paper>
  );
};

export default EventProject;
