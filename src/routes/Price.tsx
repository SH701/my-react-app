import { useQuery } from "react-query";
import { fetchCoinPrice } from "./api";
import styled from "styled-components";

const Box = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
`;

interface PriceData {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface CoinProps {
  coinId: string;
}

function Price({ coinId }: CoinProps) {
  const { isLoading, data } = useQuery<PriceData[]>(["Price", coinId], () => fetchCoinPrice(coinId), {
    refetchInterval: 10000,
  });

  console.log("Fetched Data:", data);
  console.log("Type of Data:", typeof data);

  const latestData = Array.isArray(data) && data.length > 0 ? data[0] : null;

  return (
    <Box>
      <Title>Price</Title>
      {isLoading ? (
        <p>Loading Price...</p>
      ) : latestData ? (
        <div>
          <p>Open: ${Number(latestData.open).toFixed(2)}</p>
          <p>High: ${Number(latestData.high).toFixed(2)}</p>
          <p>Low: ${Number(latestData.low).toFixed(2)}</p>
          <p>Close: ${Number(latestData.close).toFixed(2)}</p>
          <p>24h Volume: {Number(latestData.volume).toLocaleString()}</p>
        </div>
      ) : (
        <p>No Data Available</p>
      )}
    </Box>
  );
}

export default Price;