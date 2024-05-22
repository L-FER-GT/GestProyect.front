import React, { useState, useCallback, useEffect } from "react";
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
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useDropzone } from "react-dropzone";
import { modifyDataProject, setRegisterNewProject } from "../../../conexion/ConsultasProyecto";

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

const MyProject = ({ onRefleshProjects, idUser, dataProjects, dataUser }) => {
  const { classes } = useStyles();
  const [projectsView, setProjectsView] = useState([]);
  const [selectedProject, setSelectedTask] = useState(null);
  console.log(selectedProject);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  useEffect(() => {
    if (dataProjects) {
      let auxNewViewData = [];
      for (const row of dataProjects) {
        auxNewViewData.push({
          ...row,
          id: row.ID_Proyecto,
          title: row.Titulo,
          assignee: dataUser["Nombres"] || "",
        });
      }
      setProjectsView(auxNewViewData);
    }
  }, [dataProjects]);
  const handleAddTask = () => {
    if (newProjectTitle.trim()) {
      setNewProjectTitle("");
      setRegisterNewProject({
        onCallBackData: (data) => {
          onRefleshProjects();
        },
        sendData: {
          idAdministrador: idUser,
          descripcion: "",
          fechaInicial: new Date(),
          fechaFinal: new Date(),
          titulo: newProjectTitle,
        },
      });
    }
  };

  const handleSelectTask = (project) => {
    setSelectedTask(project);
  };
  const [description, setDescription] = useState(
    selectedProject?.description || ""
  );
  const [startDate, setStartDate] = useState(
    selectedProject?.startDate || null
  );
  const [endDate, setEndDate] = useState(selectedProject?.endDate || null);
  console.log(endDate);
  function handleSave() {
    modifyDataProject({
      onCallBackData: (data) => {
        // onRefleshProjects();
      },
      sendData: {
        idAdministrador: idUser,
        descripcion: selectedProject.Description,
        fechaInicial: selectedProject.FechaInicial,
        fechaFinal: selectedProject.FechaFinal,
        titulo: newProjectTitle,
      },
    })
  }
  return (
    <Container sx={{ width: "120%" }}>
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Agreagar Proyecto</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddTask();
                }}
                placeholder="Agregar nuevo Proyecto, Presione Enter"
                className={classes.addTaskInput}
              />

              <List className={classes.taskList}>
                {projectsView.map((task) => (
                  <ListItem
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
            {selectedProject ? (
              <Paper className={classes.paper}>
                <Typography variant="h6" color="error">
                  Informacion de proyecto
                </Typography>

                <Typography variant="h5" className={classes.title}>
                  {selectedProject.title}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid container>
                    <Grid item container xs={6} justifyContent={"flex-start"}>
                      <DatePicker
                        label="Fecha de Inicio"
                        value={dayjs(selectedProject.FechaInicial)}
                        onChange={(newValue) =>
                          setSelectedTask({
                            ...selectedProject,
                            FechaInicial: newValue.toISOString(),
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            className={classes.formField}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6} justifyContent={"flex-start"}>
                      <DatePicker
                        label="Fecha Final"
                        value={dayjs(selectedProject.FechaFinal)}
                        onChange={(newValue) => {
                          setSelectedTask({
                            ...selectedProject,
                            FechaFinal: newValue.toISOString(),
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            className={classes.formField}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>
                <Grid item sx={{ height: "15px" }} />
                <TextField
                  label="Descripción"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  className={classes.formField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={selectedProject.Description}
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedProject,
                      Description: e.target.value,
                    })
                  }
                />

                <Grid item sx={{ height: "15px" }} />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleSave}
                >
                  Guardar
                </Button>
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

export default MyProject;
