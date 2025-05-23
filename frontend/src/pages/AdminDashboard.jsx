import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [agents, setAgents] = useState([]);
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role) {
      navigate("/admin/login");
    } else {
      fetchAgents();
    }
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/agents/all");
      setAgents(res.data.agents);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAgentId || !title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/admin/add-agent-task", {
        agentId: selectedAgentId,
        title,
        description,
      });

      setTitle("");
      setDescription("");
      setSelectedAgentId("");

      fetchAgents();
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task");
    }
  };

  const handleLogout = () => {
    // localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin/login");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center w-full">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="absolute top-8 right-8 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Agents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {agents.map((agent) => (
          <div key={agent._id} className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              {agent.username}
            </h2>
            <p className="text-sm text-gray-600 mb-4">{agent.email}</p>

            <h3 className="text-md font-medium mb-2 text-gray-800">
              Assigned Tasks:
            </h3>
            {agent.tasks.length === 0 ? (
              <p className="text-gray-500 italic">No tasks assigned</p>
            ) : (
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {agent.tasks.map((task, i) => (
                  <li key={i}>
                    <span className="font-medium">{task.title}</span> –{" "}
                    {task.description}{" "}
                    <span
                      className={`ml-2 text-sm font-semibold ${
                        task.completed ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      ({task.completed ? "Completed" : "Pending"})
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Task Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Assign New Task</h2>

        <select
          value={selectedAgentId}
          onChange={(e) => setSelectedAgentId(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">Select an agent</option>
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.username}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
