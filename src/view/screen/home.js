import React, { useState, useEffect } from "react";

//UI Material
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { Menu, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
//icons
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid } from "@mui/material";

// import LogoGen from "../../assets/logoS.jpeg";
//Constantes
import { listaPaginas_1, listaPaginas_2 } from "../options/constantes";
//Componentes
import ListItemOption from "../components/listItemOption";
import Footer from "../components/footerview";
//Paginas
import WelcomePage from "../options/welcome/welcomePage";
import SettingsPage from "../options/settings/settingsPage";
import MyProfilePage from "../options/myProfile/myProfile";
//QUERIES
import { getDataUser } from "../../conexion/ConsultasUsers";
import { getFileByID } from "../../conexion/ConsultasArchivos";
import { MyTask } from "../options/myTask";
import { MyProject } from "../options/myProject";
import { getProjectsByID } from "../../conexion/ConsultasProyecto";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

//------------------------------------------------------------------------//
//-------------------------------MAIN-------------------------------------//
//------------------------------------------------------------------------//
export default function Home({ onChangeScreen, onRefleshUser, idUser }) {
  const [open, setOpen] = useState(true);
  const [dataUser, setDataUser] = useState({});
  function regenerateDataUser() {
    getDataUser({
      onCallBackData: (data) => {
        setDataUser(data);
      },
      sendData: { idUser: idUser },
    });
  }
  useEffect(() => {
    if (idUser) {
      regenerateDataUser();
    }
  }, [idUser]);
  const handleChangeDrawer = () => {
    setOpen(!open);
  };

  //Control pagina
  const [selectedPage, setSelectedPage] = useState("Welcome");
  //Control menu Settings
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    if (dataUser && dataUser.Cod_Image_Perfil) {
      getFileByID({
        onCallBackData: (imageData) => {
          const bufferData = new Uint8Array(imageData.archivo.data);
          const blob = new Blob([bufferData], { type: imageData.archivo.type });
          const imageUrl = URL.createObjectURL(blob);
          setImage(imageUrl);
        },
        sendData: { id: dataUser.Cod_Image_Perfil },
      });
    }
  }, [dataUser.Cod_Image_Perfil]);
  const [dataProjects, setDataProjects] = useState([]);
  function onRefleshProjects() {
    getProjectsByID({
      onCallBackData: (data) => {
        setDataProjects(data.proyecto);
      },
      sendData: { idUsuario: idUser },
    });
  }
  useEffect(() => {
    onRefleshProjects();
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={false}
        sx={{ backgroundColor: "#fff" }}
        elevation={2}
      >
        <Toolbar>
          <Grid container>
            <Grid container item xs={6} justifyContent={"flex-start"}>
              <IconButton
                aria-label="open drawer"
                onClick={()=>{}}//{handleChangeDrawer}
                edge="start"
                sx={{
                  marginRight: 5,
                }}
              >
                <MenuIcon />
              </IconButton>
              {/* <Box
                component="img"
                src={LogoGen}
                alt="GestProy"
                style={{ height: "35px", objectFit: "inherit" }}
              /> */}
            </Grid>
            <Grid container item xs={6} justifyContent={"flex-end"}>
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {image && (
                    <Avatar src={image} sx={{ width: 56, height: 56 }} />
                  )}
                  {!image && (
                    <Avatar sx={{ bgcolor: "red", color: "white" }}>
                      {"L"}
                    </Avatar>
                  )}
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    key={"itemMenuPerfil"}
                    onClick={() => {
                      setSelectedPage("MyProfile");
                    }}
                  >
                    <Typography textAlign="center">{"Perfil"}</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    key={"itemMenuCerrarSesion"}
                    onClick={() => {
                      onChangeScreen("Login");
                    }}
                  >
                    <Typography textAlign="center">
                      {"Cerrar Sesion"}
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={true}>
        <DrawerHeader />
        <Divider />
        <List key={"List_1"}>
          {listaPaginas_1.map((item, index) => (
            <ListItemOption
              key={item.value}
              text={item.text}
              Icon={item.icon}
              open={open}
              value={item.value}
              onHandleClick={(value) => {
                setSelectedPage(value);
              }}
            />
          ))}
        </List>
        <SimpleTreeView
          onSelectedItemsChange={(e, ids) => {
            console.log(ids);
          }}
        >
          <TreeItem itemId="proyectosAcutales" label="MIS PROYECTOS">
            {dataProjects.map((row, index) => {
              return (
                <TreeItem key={index} itemId={`${row.ID_Proyecto}`} label={row.Titulo} onClick={()=>{console.log(row.ID_Proyecto)}}/>
              );
            })}
          </TreeItem>
        </SimpleTreeView>

        <Divider />
        <List key={"List_2"}>
          {listaPaginas_2.map((item, index) => (
            <ListItemOption
              key={item.value}
              text={item.text}
              Icon={item.icon}
              open={open}
              value={item.value}
              onHandleClick={(value) => {
                setSelectedPage(value);
              }}
            />
          ))}
        </List>
      </Drawer>
      <Grid container>
        <Grid container item xs={12}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              backgroundColor: "#eee",
              minHeight: "500px",
            }}
          >
            <DrawerHeader />
            {/*Cambio de paginas */}
            {selectedPage === "Welcome" && <WelcomePage />}
            {selectedPage === "Settings" && <SettingsPage />}
            {selectedPage === "MyProfile" && (
              <MyProfilePage
                dataUser={dataUser}
                idUser={idUser}
                onRegenerateUser={regenerateDataUser}
              />
            )}
            {selectedPage === "MyTask" && <MyTask />}
            {selectedPage === "MyPoject" && (
              <MyProject
                onRefleshProjects={onRefleshProjects}
                idUser={idUser}
                dataProjects={dataProjects}
                dataUser={dataUser}
              />
            )}
          </Box>
        </Grid>
        <Grid container item xs={12} justifyContent={"center"}>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
}
