import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { createSocketConnection } from "./actions/socketActions";
import Navbar from "./components/navbar/Navbar";
import OtherProfile from "./components/profile/OtherProfile";
import UpdatePassword from "./components/profile/UpdatePassword";
import UpdateProfile from "./components/profile/UpdateProfile";
import AppointmentPage from "./pages/AppointmentPage";
import BlogCreatePage from "./pages/BlogCreatePage";
import BlogsPage from "./pages/BlogsPage";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MedicinePage from "./pages/MedicinePage";
import ProfilePage from "./pages/ProfilePage";
import QueAnsPage from "./pages/QueAnsPage";
import RegisterPage from "./pages/RegisterPage";
import SingleBlogPage from "./pages/SingleBlogPage";
import SingleQnAPage from "./pages/SingleQnAPage";
import SmartDetectPage from "./pages/SmartDetect";
import VideoCallPage from "./pages/VideoCallPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createSocketConnection());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/appointments" element={<AppointmentPage />} />
        <Route path="/appointments/chat/" element={<ChatPage />} />

        <Route path="/appointments/videoCall/" element={<VideoCallPage />} />

        <Route path="/q-a" element={<QueAnsPage />} />
        <Route path="/q-a/:questionId" element={<SingleQnAPage />} />

        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:blogId" element={<SingleBlogPage />} />
        <Route path="/blogs/create" element={<BlogCreatePage />} />

        <Route path="/drug-info" element={<MedicinePage />} />

        <Route path="/detect" element={<SmartDetectPage />} />

        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route path="account" element={<UpdateProfile />} />
          <Route path="change-password" element={<UpdatePassword />} />
          <Route path="other" element={<OtherProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
