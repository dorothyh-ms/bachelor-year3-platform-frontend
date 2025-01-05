
import { PlayerStatistics } from "../types/PlayerStatistics";
import axios from "./axios";

export const getPlayerStatistics = async (): Promise<PlayerStatistics[]> => {
    const response = await axios.get('/player-statistics');
    return response.data;
};

export const exportPlayerStatisticsCsv = async () => {
    const response = await axios.get("player-statistics/export", {
        responseType: "arraybuffer",
        headers: {
          Accept: "application.csv",
        },
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `player-statistics.csv`);
      document.body.appendChild(link);
      link.click();

      //Todo:
      // how to handle asset produced on server, where to put? ask kevin - put in the public folder of webserver serving spring boot application
}