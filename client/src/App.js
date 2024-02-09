import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
