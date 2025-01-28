const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  const response = await fetch(`${BASE_URL}/coins`);
  const json = await response.json();
  return json;
}
export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/cpins/${coinId}`).then((response) =>
    response.json()
  );
}
export function fetchCoinHistory(coinId: string) {
    const endDate = Math.floor(Date.now() / 1000); // 현재 시간을 초 단위로 변환
    const startDate = endDate - 60 * 60 * 24 * 14; // 14일 전 데이터 조회
  
    return fetch(
      `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
    )
      .then((response) => response.json())
      .catch((error) => console.error("Error fetching coin history:", error));
  }
export async function fetchCoin(coinId: string) {
  const response = await fetch(`${BASE_URL}/tickers/${coinId}`);
  const json = await response.json();
  return json;
}
