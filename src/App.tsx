import { Provider } from "react-redux";

import store from "./store/store";
import "./app.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { WordsScreen } from "./pages/WordsScreen";

const App = () => {
  return (
    <Provider store={store}>
          <div className="app-main">
            <div className="header">
              marianelement@gmail.com
            </div>
            <div className="main-container">
              <WordsScreen />
            </div>
          </div>
    </Provider>
  );
}

export default App;
