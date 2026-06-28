interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination({
  currentPage,
  totalPages,
  pageSize,
  setCurrentPage,
  setPageSize,
}: PaginationProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
        alignItems: "center",
      }}
    >
      <div 
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
      }}
      >
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span style={{ margin: "0 15px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      <select 
      style={{
        marginLeft: "20px",
        padding: "8px",
        borderRadius: "6px",
      }}
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setCurrentPage(1);
        }}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
}

export default Pagination;