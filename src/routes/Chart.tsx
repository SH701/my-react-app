import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart  from "react-apexcharts"
import { isDarkAtom } from "../atom";
import { useRecoilState } from "recoil";

interface OhlcvData {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface ChartProps {
  coinId: string;
}
function Chart({ coinId}: ChartProps) {
  const [isDark] = useRecoilState(isDarkAtom);
  const { isLoading, data } = useQuery<OhlcvData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId),
  {
    refetchInterval:10000,
  }
);
const exceptData = Array.isArray(data) ?data : []; 

const chartData = exceptData.map((i) => {
  return {
    x: i.time_close, 
    y: [i.open, i.high, i.low, i.close], 
  };
});
  return (
    <div>
  {isLoading ? (
    "Loading Chart..."
  ) : (
    <ApexChart
      type="candlestick"
      series={[
        {
          name: "Price",
          data: chartData, 
        }
      ]}
      options={{
        theme:{
          mode:isDark? "dark" : "light"
        },
        chart: { type: "candlestick",toolbar:{
          show:false
        } },
        tooltip: {
          enabled: true,
          y: {
            formatter: (_, { seriesIndex, dataPointIndex, w }) => {
              // 안전하게 데이터 접근, 기본값 설정
              const data =
                w?.globals?.initialSeries?.[seriesIndex]?.data?.[dataPointIndex]?.y || [0, 0, 0, 0];
      
              return `
                <div style="color: #000; padding: 8px; background: #fff; border-radius: 5px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">
                  <b>Open:</b> ${data[0]}<br/>
                  <b>High:</b> ${data[1]}<br/>
                  <b>Low:</b> ${data[2]}<br/>
                  <b>Close:</b> ${data[3]}
                </div>
              `;
            },
          },
        },
        yaxis: {
          show: false,
        },
        
      }}
    />
  )}
</div>
  );
};
export default Chart;