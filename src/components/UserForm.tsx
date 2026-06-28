import { useState, useEffect } from "react";
import type { User } from "../types/user";

interface UserFormProps {
  onAddUser: (user: User) => void;
  editingUser: User | null;
  setEditingUser: React.Dispatch<React.SetStateAction<User | null>>;
}

function UserForm({ onAddUser, editingUser, setEditingUser }: UserFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  useEffect(() => {
  if (editingUser) {
    setFormData({
      firstName: editingUser.firstName,
      lastName: editingUser.lastName,
      email: editingUser.email,
      department: editingUser.department,
    });
  }
}, [editingUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.firstName.trim()) {
    alert("First Name is required");
    return;
  }

  if (!formData.lastName.trim()) {
    alert("Last Name is required");
    return;
  }

  if (!formData.email.trim()) {
    alert("Email is required");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(formData.email)) {
    alert("Please enter a valid email");
    return;
  }

  if (!formData.department.trim()) {
    alert("Department is required");
    return;
  }

  const user: User = {
    id: editingUser ? editingUser.id : Date.now(),
    ...formData,
  };

    onAddUser(user);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });

    setEditingUser(null);
  };

  return (
    <form onSubmit={handleSubmit} 
    style={{
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: "20px",
  }}
    >
      <input style={{
  width: "220px",
  padding: "10px",
  borderRadius: "6px",
}}
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />

      <input style={{
  width: "220px",
  padding: "10px",
  borderRadius: "6px",
}}
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />

      <input style={{
  width: "220px",
  padding: "10px",
  borderRadius: "6px",
}}
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input style={{
  width: "220px",
  padding: "10px",
  borderRadius: "6px",
}}
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
      />

      <button type="submit"
          style={{
            background: "#16a34a",
            color: "white",
            padding: "10px 20px",
            borderRadius: "6px",
          }}
          >
        {editingUser ? "Update User" : "Add User"}
      </button>
    </form>
  );
}

export default UserForm;