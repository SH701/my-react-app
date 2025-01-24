import { Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";


function Router() {
  return (
  
      <Switch>
        <Route path="/" exact>
          <Coins />
        </Route>
        <Route path="/:coinId">
          <Coin />
        </Route>
      </Switch>
  );
}
export default Router;
