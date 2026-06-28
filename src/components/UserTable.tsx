import type { User } from "../types/user";

interface UserTableProps {
  users: User[];
  sortField: keyof User;
  sortOrder: "asc" | "desc";
  onSort: (field: keyof User) => void;
}

function UserTable({ users, sortField, sortOrder, onSort }: UserTableProps) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
      }}
    >
      <thead>
  <tr>
    <th>ID</th>

    <th onClick={() => onSort("firstName")} style={{ cursor: "pointer" }}>
      First Name {sortField === "firstName" && (sortOrder === "asc" ? "↑" : "↓")}
    </th>

    <th onClick={() => onSort("lastName")} style={{ cursor: "pointer" }}>
      Last Name {sortField === "lastName" && (sortOrder === "asc" ? "↑" : "↓")}
    </th>

    <th onClick={() => onSort("email")} style={{ cursor: "pointer" }}>
      Email {sortField === "email" && (sortOrder === "asc" ? "↑" : "↓")}
    </th>

    <th onClick={() => onSort("department")} style={{ cursor: "pointer" }}>
      Department {sortField === "department" && (sortOrder === "asc" ? "↑" : "↓")}
    </th>

    <th>Actions</th>
  </tr>
</thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.department}</td>
            <td>
              <button>Edit</button>
              <button style={{ marginLeft: 10 }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;