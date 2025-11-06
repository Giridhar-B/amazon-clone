// src/pages/AccountPage.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const { user, setUser, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile_number: user?.mobile_number || "",
  });

  const [editingField, setEditingField] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/update/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Error updating profile");
        return;
      }

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setMessage("Profile updated successfully!");
      setEditingField(null);
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Something went wrong. Try again.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Account Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NAME */}
        <div className="flex justify-between items-center">
          <label className="font-medium w-1/3">Name:</label>
          {editingField === "name" ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-1 w-2/3 rounded"
            />
          ) : (
            <span className="w-2/3">{formData.name}</span>
          )}
          <button
            type="button"
            onClick={() =>
              setEditingField(editingField === "name" ? null : "name")
            }
            className="text-blue-600 text-sm ml-2 hover:underline"
          >
            {editingField === "name" ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* EMAIL */}
        <div className="flex justify-between items-center">
          <label className="font-medium w-1/3">Email:</label>
          {editingField === "email" ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-1 w-2/3 rounded"
            />
          ) : (
            <span className="w-2/3">{formData.email}</span>
          )}
          <button
            type="button"
            onClick={() =>
              setEditingField(editingField === "email" ? null : "email")
            }
            className="text-blue-600 text-sm ml-2 hover:underline"
          >
            {editingField === "email" ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* MOBILE */}
        <div className="flex justify-between items-center">
          <label className="font-medium w-1/3">Mobile:</label>
          {editingField === "mobile_number" ? (
            <input
              type="text"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              className="border p-1 w-2/3 rounded"
            />
          ) : (
            <span className="w-2/3">{formData.mobile_number}</span>
          )}
          <button
            type="button"
            onClick={() =>
              setEditingField(
                editingField === "mobile_number" ? null : "mobile_number"
              )
            }
            className="text-blue-600 text-sm ml-2 hover:underline"
          >
            {editingField === "mobile_number" ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* SAVE BUTTON */}
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded mt-4 hover:bg-yellow-600"
        >
          Save Changes
        </button>

        {/* MESSAGE */}
        {message && (
          <p
            className={`text-center mt-2 ${
              message.includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>

      {/* SIGN OUT BUTTON */}
      <button
        onClick={handleLogout}
        className="w-full bg-gray-200 text-gray-800 py-2 rounded mt-6 hover:bg-gray-300"
      >
        Sign Out
      </button>
    </div>
  );
};

export default AccountPage;
