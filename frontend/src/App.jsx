import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Issues from "./pages/Issues";
import CreateIssue from "./pages/CreateIssue";
import IssueDetails from "./pages/IssueDetails";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/login" replace />;
}

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/issues"
                    element={
                        <ProtectedRoute>
                            <Issues />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/issues/create"
                    element={
                        <ProtectedRoute>
                            <CreateIssue />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/issues/:id"
                    element={
                        <ProtectedRoute>
                            <IssueDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                />
            </Routes>
        </>
    );
}

export default App;
