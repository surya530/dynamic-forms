import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from "react-redux";
import { SnackbarProvider, useSnackbar } from 'notistack';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import store from "./store"

// ----------------------------------------------------------------------

export default function App() {

  const { enqueueSnackbar } = useSnackbar();

  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={1}>


        {/* <SnackbarProvider maxSnack={3}> */}
        <HelmetProvider>
          <BrowserRouter>
            <ThemeProvider>
              <ScrollToTop />
              <StyledChart />
              <Router />
            </ThemeProvider>
          </BrowserRouter>
        </HelmetProvider>
      </SnackbarProvider>

    </Provider>
  );
}
