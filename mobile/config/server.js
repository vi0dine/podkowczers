import Constants from "expo-constants";
const {manifest} = Constants;

export const apiURL = () => {
    return 'http://api.depodkowczers.walbrzych.pl'
    // return `http://${manifest.debuggerHost.split(':').shift()}:4000`;
};