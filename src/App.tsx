import { useEffect, useState } from "react";
import { getUsers } from "./api/users";
import type { ApiUser, User } from "./types/user";
import UserTable from "./components/UserTable";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import UserForm from "./components/UserForm";
import { createUser } from "./api/users";
import { deleteUser } from "./api/users";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof User>("firstName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const data = await getUsers();

      const formattedUsers: User[] = data.map((user: ApiUser) => {
        const names = user.name.split(" ");

        return {
          id: user.id,
          firstName: names[0] || "",
          lastName: names.slice(1).join(" "),
          email: user.email,
          department: "IT",
        };
      });


    setUsers(formattedUsers);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }
  const filteredUsers = users
  .filter((user) => {
    const value = search.toLowerCase();

    return (
      user.firstName.toLowerCase().includes(value) ||
      user.lastName.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    );
  })
  .sort((a, b) => {
    const valueA = String(a[sortField]).toLowerCase();
    const valueB = String(b[sortField]).toLowerCase();

    if (sortOrder === "asc") {
      return valueA.localeCompare(valueB);
    }

    return valueB.localeCompare(valueA);
  });
      const totalPages = Math.ceil(filteredUsers.length / pageSize);

    const startIndex = (currentPage - 1) * pageSize;

    const paginatedUsers = filteredUsers.slice(
      startIndex,
      startIndex + pageSize
    );

  const handleSort = (field: keyof User) => {
  if (field === sortField) {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  } else {
    setSortField(field);
    setSortOrder("asc");
  }
};

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleAddUser = async (user: User) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? user : u))
      );

      setEditingUser(null);
      return;
    }

    try {
      await createUser(user);

      setUsers((prev) => [user, ...prev]);
    } catch {
      alert("Failed to add user");
    }
  };

  const handleDelete = async (id: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this user?"
  );

    if (!confirmed) return;

    try {
      await deleteUser(id);

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  };

  return (
    <div>
      <h1>User Management Dashboard</h1>
      <UserForm 
      onAddUser={handleAddUser}
      editingUser={editingUser}
      setEditingUser={setEditingUser}
      />
      <SearchBar search={search} setSearch={setSearch} />

      <UserTable 
      users={paginatedUsers} 
      sortField={sortField} 
      sortOrder={sortOrder} 
      onSort={handleSort}
      onEdit={handleEdit} 
      onDelete={handleDelete}
      />
      <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      pageSize={pageSize}
      setCurrentPage={setCurrentPage}
      setPageSize={setPageSize}
    />
    

    </div>
  );
}

export default App;