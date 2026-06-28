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
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />

      <input
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
      />

      <button type="submit">
        {editingUser ? "Update User" : "Add User"}
      </button>
    </form>
  );
}

export default UserForm;