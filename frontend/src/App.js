import { BrowserRouter, Route } from "react-router-dom";

import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import Switch from "react-bootstrap/esm/Switch";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen/SignUpScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={SignUpScreen} />
          <Route exact path="/mynotes" component={() => <MyNotes />} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
