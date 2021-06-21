import './App.css';
import { Provider } from "react-redux";
import { Route, Switch, HashRouter } from "react-router-dom";
import { WordsScreen } from "./screens/Words";
import store from "./store/store";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Provider store={store}>
        <HashRouter>
          <div className="app">
            <Switch>
              <Route path="/" component={WordsScreen}/>
            </Switch>
          </div>
        </HashRouter>
    </Provider>
  );
}

export default App;
