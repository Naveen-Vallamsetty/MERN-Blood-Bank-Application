import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Donar from "./pages/Dashboard/Donar";
import Hospitals from "./pages/Dashboard/Hospitals";
import Organisation from "./pages/Dashboard/Organisation";
import Consumer from "./pages/Dashboard/Consumer";
import Donation from "./pages/Donation";
import Analytics from "./pages/Dashboard/Analytics";
import DonarList from "./pages/Admin/DonarList";
import OrgList from "./pages/Admin/OrgList";
import HospitalList from "./pages/Admin/HospitalList";
import InfoPage from "./components/shared/InfoPage";
import IntroPage from "./pages/IntroPage";

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route
          path="/info"
          element={
            <ProtectedRoute>
              <InfoPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}

        <Route
          path="/donar-list"
          element={
            <ProtectedRoute>
              <DonarList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organisation-list"
          element={
            <ProtectedRoute>
              <OrgList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital-list"
          element={
            <ProtectedRoute>
              <HospitalList />
            </ProtectedRoute>
          }
        />
        <Route path="/intro" element={<IntroPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donar"
          element={
            <ProtectedRoute>
              <Donar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital"
          element={
            <ProtectedRoute>
              <Hospitals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consumer"
          element={
            <ProtectedRoute>
              <Consumer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donation"
          element={
            <ProtectedRoute>
              <Donation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organisation"
          element={
            <ProtectedRoute>
              <Organisation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
