import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Issues() {
    const [issues, setIssues] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editStatus, setEditStatus] = useState("OPEN");
    const [editAssignedToId, setEditAssignedToId] = useState("");

    const loadIssues = async () => {
        try {
            const response = await api.get("/issues");
            setIssues(response.data);
        } catch (err) {
            setError("Unable to load issues");
        }
    };

    const loadUsers = async () => {
        try {
            const response = await api.get("/users");
            setUsers(response.data);
        } catch (err) {
            setError("Unable to load users");
        }
    };

    useEffect(() => {
        loadIssues();
        loadUsers();
    }, []);

    const startEditing = (issue) => {
        setEditingId(issue.id);
        setEditTitle(issue.title);
        setEditDescription(issue.description);
        setEditStatus(issue.status);
        setEditAssignedToId(issue.assignedTo?.id || "");
        setError("");
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditTitle("");
        setEditDescription("");
        setEditStatus("OPEN");
        setEditAssignedToId("");
    };

    const updateIssue = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.put(`/issues/${editingId}`, {
                title: editTitle,
                description: editDescription,
                status: editStatus,
                assignedToId: editAssignedToId
                    ? Number(editAssignedToId)
                    : null,
            });

            cancelEditing();
            await loadIssues();
        } catch (err) {
            setError("Unable to update issue");
        }
    };

    const deleteIssue = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this issue?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/issues/${id}`);
            await loadIssues();
        } catch (err) {
            setError("Unable to delete issue");
        }
    };

    return (
        <div className="page-container">
            <h1>Issues</h1>

            {error && <p className="error-message">{error}</p>}

            {issues.length === 0 ? (
                <p>No issues found.</p>
            ) : (
                <div className="issues-list">
                    {issues.map((issue) => (
                        <div className="issue-card" key={issue.id}>
                            {editingId === issue.id ? (
                                <form onSubmit={updateIssue}>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) =>
                                            setEditTitle(e.target.value)
                                        }
                                        required
                                    />

                                    <textarea
                                        value={editDescription}
                                        onChange={(e) =>
                                            setEditDescription(e.target.value)
                                        }
                                        rows="5"
                                        required
                                    />

                                    <select
                                        value={editStatus}
                                        onChange={(e) =>
                                            setEditStatus(e.target.value)
                                        }
                                    >
                                        <option value="OPEN">
                                            Open
                                        </option>
                                        <option value="IN_PROGRESS">
                                            In Progress
                                        </option>
                                        <option value="CLOSED">
                                            Closed
                                        </option>
                                    </select>

                                    <select
                                        value={editAssignedToId}
                                        onChange={(e) =>
                                            setEditAssignedToId(
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">
                                            Unassigned
                                        </option>

                                        {users.map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name} ({user.email})
                                            </option>
                                        ))}
                                    </select>

                                    <button type="submit">
                                        Save Changes
                                    </button>

                                    <button
                                        type="button"
                                        onClick={cancelEditing}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <h2>{issue.title}</h2>

                                    <p>{issue.description}</p>

                                    <p>
                                        <strong>Status:</strong>{" "}
                                        {issue.status}
                                    </p>

                                    <p>
                                        <strong>Created by:</strong>{" "}
                                        {issue.createdBy?.name}
                                    </p>

                                    <p>
                                        <strong>Assigned to:</strong>{" "}
                                        {issue.assignedTo?.name ||
                                            "Unassigned"}
                                    </p>

                                    <div className="issue-actions">
                                        <Link to={`/issues/${issue.id}`}>
                                            <button type="button">
                                                View
                                            </button>
                                        </Link>

                                        <button
                                            onClick={() =>
                                                startEditing(issue)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                deleteIssue(issue.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Issues;
