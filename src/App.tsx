import { useEffect, useState } from "react";
import { getUsers } from "./api/users";
import type { ApiUser, User } from "./types/user";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

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
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>User Management Dashboard</h1>

      {users.map((user) => (
        <div key={user.id}>
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p>{user.email}</p>
          <p>{user.department}</p>
        </div>
      ))}
    </div>
  );
}

export default App;