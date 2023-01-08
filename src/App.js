import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuthCheck } from "./hooks/useAuthCheck";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
import Layout from "./components/common/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const isAuthChecked = useAuthCheck();
  return (
    <>
      {!isAuthChecked ? (
        <div>Loading....</div>
      ) : (
        <Router>
          <Routes>
            <Route
              path="/"
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
            <Route
              path="/projects"
              element={
                <PrivateRoute>
                  <Layout>
                    <Projects />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/teams"
              element={
                <PrivateRoute>
                  <Layout>
                    <Teams />
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      )}
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
