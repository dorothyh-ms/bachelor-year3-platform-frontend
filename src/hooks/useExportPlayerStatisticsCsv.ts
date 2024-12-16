import { useMutation } from "@tanstack/react-query";
import { exportPlayerStatisticsCsv } from "../services/playerStatisticsService";

const useExportPlayerStatisticsCsv = () => {

        const {mutate, isError, isPending} = useMutation(
            {
                mutationFn: exportPlayerStatisticsCsv
            }
        );

        return {
            handleStatisticsCsvDownload: mutate,
            isError, 
            isPending
        }
      
}

export default useExportPlayerStatisticsCsv;