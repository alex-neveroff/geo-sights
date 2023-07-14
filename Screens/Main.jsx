import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../redux/auth/authSelectors";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { useEffect } from "react";
import { currentRouter } from "./Routes";

export default function Main() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  console.debug("isAuth Main: ", isAuth);

  useEffect(() => {
    dispatch(authStateChangeUser());
    console.debug("isAuth Dispatch: ", isAuth);
  }, []);

  const route = currentRouter(isAuth);

  return <NavigationContainer>{route}</NavigationContainer>;
}
