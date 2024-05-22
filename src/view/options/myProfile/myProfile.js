import React, { useEffect, useState } from "react";
import { Button, Box, Grid, TextField, Alert } from "@mui/material";
import Paper from "@mui/material/Paper";
import { modifyDataUser } from "../../../conexion/ConsultasUsers";
import ImageView from "../../components/imageView";
import ImageUploader from "../../components/imageUploader";
import {
  getFileByID,
  setFilesUpdate,
} from "../../../conexion/ConsultasArchivos";
const MyProfilePage = ({ dataUser, idUser, onRegenerateUser }) => {
  const [subidoConExito, setSubidoConExito] = useState(false);
  const [image, setImage] = useState(null);
  const [esNewImage, setEsNewImage] = useState(false);
  const [form, setForm] = useState({
    Gmail: "",
    Nombres: "",
    Apellidos: "",
    Contacto: "",
    User: "",
    Password: "",
    VerifPass: "",
    Cod_Image_Perfil: null,
  });
  const [formErrors, setFormErros] = useState({
    Gmail: "",
    Nombres: "",
    Apellidos: "",
    Contacto: "",
    User: "",
    Password: "",
    VerifPass: "",
    Cod_Image_Perfil: null,
  });

  useEffect(() => {
    if (dataUser) {
      let auxPerfil = {};
      auxPerfil.User = dataUser.User_Name;
      auxPerfil.Apellidos = dataUser.Apellidos;
      auxPerfil.Gmail = dataUser.Gmail;
      auxPerfil.Contacto = dataUser.Informacion_Contacto;
      auxPerfil.Nombres = dataUser.Nombres;
      auxPerfil.Cod_Image_Perfil = dataUser.Cod_Image_Perfil;
      setForm({ ...form, ...auxPerfil });
    }
  }, [dataUser]);

  useEffect(() => {
    if (form.Cod_Image_Perfil) {
      getFileByID({
        onCallBackData: (imageData) => {
          const bufferData = new Uint8Array(imageData.archivo.data);
          const blob = new Blob([bufferData], { type: imageData.archivo.type });
          setImage(blob);
        },
        sendData: { id: form.Cod_Image_Perfil },
      });
    }
  }, [form.Cod_Image_Perfil]);

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setFormErros({ ...formErrors, [e.target.name]: "" });
  };
  const editUser = (e) => {
    let errors = {};
    let flagDataValida = true;
    if (form.Nombres === "") {
      errors.Nombres = "Este campo no puede estar Vacio";
      flagDataValida = false;
    }
    if (form.Apellidos === "") {
      errors.Apellidos = "Este campo no puede estar Vacio";
      flagDataValida = false;
    }
    if (form.Gmail === "") {
      errors.Gmail = "Este campo no puede estar Vacio";
      flagDataValida = false;
    }

    if (flagDataValida) {
      
      if (esNewImage && image) {
        setFilesUpdate({
          sendData: { nombre: "Foto perfil", file: image },
          onCallBackData: (data) => {
            const newValueUser = { ...form, idUser: idUser,Cod_Image_Perfil:data.idFile  };
            modifyDataUser({
              onCallBackData: () => {
                setSubidoConExito(true);
                onRegenerateUser();
              },
              sendData: newValueUser,
              onError: (err) => {
                console.error(err);
              },
            });
          },
          onError: (err) => {
            console.error(err);
          },
        });
      } else {
        const newValueUser = { ...form, idUser: idUser };
        modifyDataUser({
          onCallBackData: (data) => {
            setSubidoConExito(true);
            onRegenerateUser();
          },
          sendData: newValueUser,
          onError: (err) => {
            console.error(err);
          },
        });
      }
    } else {
      setFormErros({ ...formErrors, ...errors });
    }
  };
  return (
    <Box p={3}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Grid
          container
          justifyContent={"center"}
          alignContent={"center"}
          spacing={2}
        >
          <Grid container item xs={4}>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Editar Cuenta
            </h2>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  size="small"
                  fullWidth
                  label="Nombres"
                  name="Nombres"
                  value={form.Nombres}
                  error={formErrors.Nombres !== ""}
                  helperText={formErrors.Nombres}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  size="small"
                  fullWidth
                  label="Apellidos"
                  name="Apellidos"
                  value={form.Apellidos}
                  error={formErrors.Apellidos !== ""}
                  helperText={formErrors.Apellidos}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Gmail"
                name="Gmail"
                value={form.Gmail}
                error={formErrors.Gmail !== ""}
                helperText={formErrors.Gmail}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Telefono"
                name="Contacto"
                value={form.Contacto}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Usuario"
                name="User"
                value={form.User}
                error={formErrors.User !== ""}
                helperText={formErrors.User}
                onChange={handleInputChange}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12} style={{ height: "20px" }} />

            <Grid item container xs={12} justifyContent={"center"}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={editUser}
              >
                Editar
              </Button>
            </Grid>
            {subidoConExito && (
              <Alert
                severity="success"
                onClose={() => setSubidoConExito(false)}
              >
                Subido con éxito
              </Alert>
            )}
          </Grid>
          <Grid
            item
            container
            xs={4}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Grid
              item
              container
              xs={12}
              alignContent={"center"}
              justifyContent={"center"}
            >
              Agregar Foto de Perfil
            </Grid>
            <Grid
              item
              container
              xs={12}
              alignContent={"center"}
              justifyContent={"center"}
            >
              <ImageUploader
                image={image}
                onHandleChangeImage={(value) => {
                  setEsNewImage(true);
                  setImage(value);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default MyProfilePage;
