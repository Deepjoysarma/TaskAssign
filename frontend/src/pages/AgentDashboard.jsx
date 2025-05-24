import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AgentDashboard = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // localStorage.removeItem('token');
    localStorage.removeItem("id");
    navigate("/agents/login");
  };

  const fetchAgent = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/agents/${id}`);
      setAgent(res.data.agent);
    } catch (error) {
      console.error("Failed to fetch agent:", error);
    } finally {
      setLoading(false);
    }
  };

  const markTaskComplete = async (taskIndex) => {
    try {
      await axios.post(
        `http://localhost:3000/api/agents/${id}/tasks/${taskIndex}`
      );
      fetchAgent();
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };

  useEffect(() => {
    // const token = localStorage.getItem('token');
    const localId = localStorage.getItem("id");
    if (id !== localId) {
      navigate("/agents/login");
    } else {
      fetchAgent();
    }
  }, [id, navigate]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (!agent)
    return <div className="text-center text-red-500">Agent not found</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Hi, {agent.username}</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <p className="text-gray-600 mb-8">{agent.email}</p>

      <h2 className="text-xl font-semibold mb-4">Assigned Tasks:</h2>
      {agent.tasks.length === 0 ? (
        <p className="italic text-gray-500">No tasks assigned</p>
      ) : (
        <ul className="space-y-4">
          {agent.tasks.map((task, index) => (
            <li key={index} className="bg-white shadow p-4 rounded-lg">
              <h3 className="font-semibold text-blue-600">{task.title}</h3>
              <p className="text-gray-700">{task.description}</p>

              <p className="text-sm text-gray-500">
                Assigned At: {new Date(task.assignedAt).toLocaleString()}
              </p>

              <p className="text-sm text-gray-500">
                Completed: {task.completed ? "✅ Yes" : "❌ No"}
                {task.completed && (
                  <> (on {new Date(task.completedAt).toLocaleString()})</>
                )}
              </p>

              {!task.completed && (
                <button
                  onClick={() => markTaskComplete(index)}
                  className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Mark as Complete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AgentDashboard;
