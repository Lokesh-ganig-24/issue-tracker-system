import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function IssueDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [issue, setIssue] = useState(null);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const loadIssue = async () => {
        try {
            const response = await api.get(`/issues/${id}`);
            setIssue(response.data);
        } catch (err) {
            setError("Unable to load issue");
        }
    };

    const loadComments = async () => {
        try {
            const response = await api.get(`/issues/${id}/comments`);
            setComments(response.data);
        } catch (err) {
            setError("Unable to load comments");
        }
    };

    useEffect(() => {
        loadIssue();
        loadComments();
    }, [id]);

    const addComment = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            return;
        }

        try {
            await api.post(`/issues/${id}/comments`, {
                content,
            });

            setContent("");
            await loadComments();
        } catch (err) {
            setError("Unable to add comment");
        }
    };

    if (!issue) {
        return (
            <div className="page-container">
                {error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <p>Loading issue...</p>
                )}
            </div>
        );
    }

    return (
        <div className="page-container">
            <button onClick={() => navigate("/issues")}>
                ? Back to Issues
            </button>

            {error && <p className="error-message">{error}</p>}

            <div className="issue-card">
                <h1>{issue.title}</h1>

                <p>{issue.description}</p>

                <p>
                    <strong>Status:</strong> {issue.status}
                </p>

                <p>
                    <strong>Created by:</strong>{" "}
                    {issue.createdBy?.name}
                </p>

                <p>
                    <strong>Assigned to:</strong>{" "}
                    {issue.assignedTo?.name || "Unassigned"}
                </p>
            </div>

            <div className="issue-card">
                <h2>Comments</h2>

                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id}>
                            <p>
                                <strong>
                                    {comment.user?.name}
                                </strong>
                            </p>

                            <p>{comment.content}</p>

                            <hr />
                        </div>
                    ))
                )}

                <h3>Add Comment</h3>

                <form onSubmit={addComment}>
                    <textarea
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                        placeholder="Write a comment..."
                        rows="4"
                        required
                    />

                    <br />

                    <button type="submit">
                        Add Comment
                    </button>
                </form>
            </div>
        </div>
    );
}

export default IssueDetails;
