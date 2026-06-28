import { useEffect, useState } from "react";
import { getUsers } from "./api/users";
import type { ApiUser, User } from "./types/user";
import UserTable from "./components/UserTable";
import SearchBar from "./components/SearchBar";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof User>("firstName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  

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

  const handleSort = (field: keyof User) => {
  if (field === sortField) {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  } else {
    setSortField(field);
    setSortOrder("asc");
  }
};

  return (
    <div>
      <h1>User Management Dashboard</h1>
      <SearchBar search={search} setSearch={setSearch} />

      <UserTable 
      users={filteredUsers} 
      sortField={sortField} 
      sortOrder={sortOrder} 
      onSort={handleSort} />
    </div>
  );
}

export default App;