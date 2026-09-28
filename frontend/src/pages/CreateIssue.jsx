import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateIssue() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("OPEN");
    const [assignedToId, setAssignedToId] = useState("");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await api.get("/users");
                setUsers(response.data);
            } catch (err) {
                setError("Unable to load users");
            }
        };

        loadUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.post("/issues", {
                title,
                description,
                status,
                assignedToId: assignedToId
                    ? Number(assignedToId)
                    : null,
            });

            navigate("/issues");
        } catch (err) {
            setError("Unable to create issue");
        }
    };

    return (
        <div className="page-container">
            <div className="auth-card">
                <h2>Create Issue</h2>

                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Issue title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Issue description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows="6"
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="OPEN">Open</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="CLOSED">Closed</option>
                    </select>

                    <select
                        value={assignedToId}
                        onChange={(e) => setAssignedToId(e.target.value)}
                    >
                        <option value="">Unassigned</option>

                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name} ({user.email})
                            </option>
                        ))}
                    </select>

                    <button type="submit">
                        Create Issue
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateIssue;
