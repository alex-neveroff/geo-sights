import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../redux/auth/authSelectors";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { useEffect } from "react";
import { currentRouter } from "./Routes";

export default function Main() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const route = currentRouter(isAuth);

  return <NavigationContainer>{route}</NavigationContainer>;
}
