import { ResponsiveLine } from '@nivo/line'
import { PlayerEngagementPredictions } from '../../types/PlayerGameEngagementPredictions';
type NivoData = {
    id: string;
    color: string;
    data: { x: string; y: number }[];
};

interface ChartData {
    data: PlayerEngagementPredictions
}


function convertPredictionsToFormat(
    input: PlayerEngagementPredictions
): NivoData[] {
    // Generate a random color for the id (e.g., HSL color format)

    // Map each prediction into the desired format
    return [
        {
            id: input.username, // Using username as the ID
            color: "#8F00FF",
            data: input.predictions.map(prediction => ({
                x: prediction.date, // x corresponds to date
                y: prediction.predictedMinutes, // y corresponds to predictedMinutes
            })),
        },
    ];
}


const PlayerGameEngagementLineChart = (props: ChartData) => {
    const { data } = props;
    const nivoData = convertPredictionsToFormat(data);

    return <ResponsiveLine
        data={nivoData}
        margin={{ top: 50, right: 110, bottom: 72, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 20,
            legend: 'Date',
            legendOffset: 50,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Minutes',
            legendOffset: -50,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        colors={{ scheme: 'paired' }}
        pointColor={{ theme: 'background' }}
        pointSize={10}
        pointBorderColor={{ from: 'serieColor' }}
        pointBorderWidth={2}

        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
}

export default PlayerGameEngagementLineChart;