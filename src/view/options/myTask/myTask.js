import React, { useState, useCallback } from "react";
import { makeStyles } from "tss-react/mui";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Paper,
} from "@mui/material";
import { useDropzone } from "react-dropzone";

const useStyles = makeStyles()((theme) => ({
  container: {
    marginTop: 20,
  },
  paper: {
    padding: 4,
  },
  taskList: {
    maxHeight: 500,
    overflowY: "auto",
  },
  taskDetails: {
    padding: 16,
  },
  addTaskInput: {
    marginTop: 8,
    marginBottom: 16,
  },
  dropzone: {
    border: "2px dashed #cccccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    position: "relative",
    height: "250px",
    width: "250px",
  },
  dropzoneActive: {
    backgroundColor: "#e6ffe6",
  },
  avatar: {
    backgroundColor: "red",
    color: "white",
  },
  imagePreview: {
    maxWidth: "250px",
    maxHeight: "250px",
  },
}));

const initialTasks = [
  {
    id: 1,
    title: "Videos explicando herramientas a usar",
    assignee: "David Borja",
  },
  { id: 2, title: "Blog", assignee: "David Borja" },
  { id: 3, title: "Pantalla chat bootstrap", assignee: "David Borja" },
  {
    id: 4,
    title: "adjuntar archivos en los chats web",
    assignee: "David Borja",
  },
];

const MyTask = () => {
  const { classes } = useStyles();
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [image, setImage] = useState(null);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: tasks.length + 1,
        title: newTaskTitle,
        assignee: "David Borja",
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    }
  };

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const image = acceptedFiles[0];
      if (image.type && image.type.startsWith("image/")) {
        setImage(image);
      } else {
        console.error("El archivo no es una imagen válida.");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
  });

  return (
    <Container sx={{width:'120%'}}>
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h6">Proyecto A</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Add Task</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleAddTask();
                }}
                placeholder="Add another task by pressing Enter."
                className={classes.addTaskInput}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAddTask}
              >
                Add Task
              </Button>
              <List className={classes.taskList}>
                {tasks.map((task) => (
                  <ListItem
                    button
                    key={task.id}
                    onClick={() => handleSelectTask(task)}
                  >
                    <ListItemAvatar>
                      <Avatar className={classes.avatar}>
                        {task.assignee.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={task.title} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            {selectedTask ? (
              <Paper className={classes.paper}>
                <Typography variant="h6" color="error">
                  URGENTE
                </Typography>
                <Typography variant="h5">{selectedTask.title}</Typography>
                <Typography variant="body1" style={{ marginTop: "16px" }}>
                  Description
                </Typography>
                <Divider style={{ margin: "16px 0" }} />
                <Typography variant="body2">
                  David Borja created task. {new Date().toLocaleTimeString()}
                </Typography>
                <Typography variant="body2">
                  David Borja added to URGENTE.{" "}
                  {new Date().toLocaleTimeString()}
                </Typography>
                {image && (
                  <div>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Imagen Seleccionada"
                      className={classes.imagePreview}
                    />
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => setImage(null)}
                    >
                      Quitar
                    </Button>
                  </div>
                )}
              </Paper>
            ) : (
              <Typography variant="h6">Select a task to see details</Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default MyTask;
