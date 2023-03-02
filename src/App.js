
import { createTheme, ThemeProvider } from "@mui/material";
import { useMemo, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import "./App.css";
import { Basket } from "./components/basket/Basket";
import { Header } from "./components/header/Header";
import { Meals } from "./components/meals/Meals";
import { Summary } from "./components/summary/Summary";
import { Snackbar } from "./components/UI/Snackbar";
import { darkTheme, lightTheme } from "./lib/constants/theme";
import { store } from "./store";
import { uiActions } from "./store/ui/uiSlice";

function AppContent() {
  const [isBasketVisible, setBasketVisible] = useState(false);
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.ui.snackbar);
  const themeMode = useSelector((state) => state.ui.themeMode);
console.log(themeMode)
  const showBasketHandler = () => {
    setBasketVisible((prevState) => !prevState);
  };
  const closeSnackbarHandler = () => {
    dispatch(uiActions.closeSnackbar());
  };

  const theme = useMemo(() => {
    const currentTheme =
      themeMode === "light" ? { ...lightTheme } : { ...darkTheme };
    return createTheme(currentTheme)
  }, [themeMode]);
  return (
    <ThemeProvider theme={theme}>
      <Header onShowBasket={showBasketHandler} />
      <Content>
        <Summary />
        <Snackbar
          onClose={closeSnackbarHandler}
          severity={snackbar.severity}
          isOpen={snackbar.isOpen}
          message={snackbar.message}
          autoHideDuration={5000}
        />
        <Meals />
        {isBasketVisible && <Basket onClose={showBasketHandler} />}
      </Content>
    </ThemeProvider>
  );
}
const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};
export default App;

const Content = styled.div``;
