import { enlace } from "./Enlace";
import { getConsult } from "./GenerateConeccion";
import { postConsult } from "./GenerateConeccion";

export const getProjectsByID = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postConsult(`${enlace}/getProjectsByUserId`, { onCallBackData, onError, sendData })
};

export const setRegisterNewProject = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postConsult(`${enlace}/addProject`, { onCallBackData, onError, sendData})
};

export const modifyDataProject = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postConsult(`${enlace}/updateProject`, { onCallBackData, onError, sendData})
};