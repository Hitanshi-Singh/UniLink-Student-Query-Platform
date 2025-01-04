import { BrowserRouter, Routes, Route } from "react-router";

import './App.css'
import Login from './components/pages/Login.jsx'
import Signup from './components/pages/Signup.jsx'
import Tags from './components/pages/Tags.jsx'
import Feed from "./components/pages/Feed.jsx";
import Questions from './components/pages/questions.jsx'
// import Signup from './components/pages/signup.jsx'
function App() {
  

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
