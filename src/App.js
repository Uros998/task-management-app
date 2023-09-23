import './App.scss';
import {Route, Routes} from "react-router-dom";
import HomePage from "./page/home-page/home-page";

function App() {
  return (
      <>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
        </Routes>
      </>
  );
}

export default App;
