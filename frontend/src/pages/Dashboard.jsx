import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
    const [counts, setCounts] = useState({
        total: 0,
        open: 0,
        inProgress: 0,
        closed: 0,
    });

    const [error, setError] = useState("");

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const response = await api.get("/dashboard/counts");
                setCounts(response.data);
            } catch (err) {
                setError("Unable to load dashboard data");
            }
        };

        loadDashboard();
    }, []);

    return (
        <div className="page-container">
            <h1>Dashboard</h1>

            {error && <p className="error-message">{error}</p>}

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h3>Total Issues</h3>
                    <p>{counts.total}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Open</h3>
                    <p>{counts.open}</p>
                </div>

                <div className="dashboard-card">
                    <h3>In Progress</h3>
                    <p>{counts.inProgress}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Closed</h3>
                    <p>{counts.closed}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
