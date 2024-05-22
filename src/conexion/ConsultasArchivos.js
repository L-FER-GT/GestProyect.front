import { enlace } from "./Enlace";
import { getConsult } from "./GenerateConeccion";
import { postConsult, postFile } from "./GenerateConeccion";

export const getFiles = ({ onCallBackData=()=>{}, onError=()=>{}}) => {
    getConsult(`${enlace}/getIdNamesFile`, { onCallBackData, onError })
};

export const setFilesUpdate = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postFile(`${enlace}/newFile`, { onCallBackData, onError, sendData})
};

export const getFileByID = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postConsult(`${enlace}/getFileById`, { onCallBackData, onError, sendData})
};

