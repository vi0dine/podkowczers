import Constants from "expo-constants";
const {manifest} = Constants;

export const apiURL = () => {
    return 'http://51.178.16.104:4000'
    // return `http://${manifest.debuggerHost.split(':').shift()}:3000`;
};