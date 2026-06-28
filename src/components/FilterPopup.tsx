interface FilterProps {
  filters: {
    firstName: string;
    lastName: string;
    email: string;
    department: string;
  };

  setFilters: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      email: string;
      department: string;
    }>
  >;

  show: boolean;
  onClose: () => void;
}

function FilterPopup({
  filters,
  setFilters,
  show,
  onClose,
}: FilterProps) {
  if (!show) return null;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 20,
        marginBottom: 20,
      }}
    >
      <h3>Filters</h3>

      <input
        placeholder="First Name"
        value={filters.firstName}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            firstName: e.target.value,
          }))
        }
      />

      <input
        placeholder="Last Name"
        value={filters.lastName}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            lastName: e.target.value,
          }))
        }
      />

      <input
        placeholder="Email"
        value={filters.email}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            email: e.target.value,
          }))
        }
      />

      <input
        placeholder="Department"
        value={filters.department}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            department: e.target.value,
          }))
        }
      />

      <button onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default FilterPopup;