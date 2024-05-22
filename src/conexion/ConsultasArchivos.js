import { enlace } from "./Enlace";
import { getConsult } from "./GenerateConeccion";
import { postConsult, postImage } from "./GenerateConeccion";

export const getImages = ({ onCallBackData=()=>{}, onError=()=>{}}) => {
    getConsult(`${enlace}/getIdNamesFile`, { onCallBackData, onError })
};

export const setImageUpdate = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postImage(`${enlace}/newFile`, { onCallBackData, onError, sendData})
};

export const getImageByID = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postConsult(`${enlace}/getFileById`, { onCallBackData, onError, sendData})
};

