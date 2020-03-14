import Constants from "expo-constants";
const {manifest} = Constants;

export const apiURL = () => {
    return `http://${manifest.debuggerHost.split(':').shift()}:3000`;
};