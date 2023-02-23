import {createStore} from "redux";
import Reducers from "./reducers";

const store = createStore(
    Reducers,
    window.devToolsExtension && window.devToolsExtension()
);

export default store