import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './app/home/index';
import Users from './app/users/index';
import Sidebar from './components/Sidebar';
import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <Router>
      <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
