import { Navigate, Route, Routes } from "react-router-dom";
import BrowsePage from './Pages/Browser/browse';
import Signin from './Pages/Signin/Signin'
import Landing from './Pages/Landing/Landing'
export const Router = () => {
  return (

    <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/Browse" element={<BrowsePage/>} />
        <Route path='/Signin' element={<Signin/>} />
        <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  )
}