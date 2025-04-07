import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NavBarComponents from "./components/NavBarComponets";
import BoardList from "./components/BoardList";
import BoardDetails from "./components/board/BoardDetails";

function App() {
  return (
    <div style={{ height: "100vh" }} className="h-full">
      <BrowserRouter>
        <NavBarComponents />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Boards" element={<BoardList />} />
          <Route path="/Boards/:id" element={<BoardDetails />} />
          <Route path="/*" element={<h1>not correct page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
