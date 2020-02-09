import { createStore, combineReducers, Action, applyMiddleware } from "redux";
import { routerMiddleware, connectRouter } from "connected-react-router";
import { createHashHistory } from "history";

export const history = createHashHistory();

export default createStore(
  combineReducers({
    router: connectRouter(history)
  }),
  applyMiddleware(routerMiddleware(history))
);

export type ReduxState = {};

export type ReduxAction = Action;
