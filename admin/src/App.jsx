import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './app/home/index';
import Users from './app/users/index';
import Sidebar from './components/Sidebar';



function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
