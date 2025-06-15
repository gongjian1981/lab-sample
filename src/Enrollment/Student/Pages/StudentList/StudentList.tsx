import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getStudents } from "../../Services/getStudents";
import { Student } from "../../Services/StudentInfo";
import { deleteStudentById } from "../../Services/deleteStudentById";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const StudentList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();

  const section = query.get("section") ?? undefined;
  const pageFromUrl = parseInt(query.get("page") || "1", 10);
  const [page, setPage] = useState<number>(isNaN(pageFromUrl) ? 1 : pageFromUrl);
  const pageSize = 10;

  const { data: students, total, totalPages } = getStudents(section, page, pageSize);

  const updatePageInUrl = (newPage: number) => {
    const params = new URLSearchParams(location.search);
    params.set("page", newPage.toString());
    navigate(`${location.pathname}?${params.toString()}`, { replace: false });
  };

  const handlePrev = () => {
    const newPage = Math.max(page - 1, 1);
    setPage(newPage);
    updatePageInUrl(newPage);
  };

  const handleNext = () => {
    const newPage = Math.min(page + 1, totalPages);
    setPage(newPage);
    updatePageInUrl(newPage);
  };

  const handleDelete = (studentId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (confirmed) {
      deleteStudentById(studentId);
      alert("Student deleted successfully.");
    }
    navigate("/students");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Software Quality Applications Lab</h1>
          <p className="text-gray-500">
            {section ?? "All Sections"}
          </p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search students..."
            className="border rounded px-3 py-1"
          />
          <button className="border rounded px-3 py-1">Sort by</button>
          <button className="border rounded px-3 py-1">Filters</button>
        </div>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Section</th>
            <th className="px-4 py-3 text-left">Group</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-t">
              <td className="px-4 py-3">
                <Link to={`/profile/${student.id}`} className="text-blue-600 hover:underline">
                  {student.name}
                </Link>
              </td>
              <td className="px-4 py-3">{student.email}</td>
              <td className="px-4 py-3">{student.role}</td>
              <td className="px-4 py-3">{student.section}</td>
              <td className="px-4 py-3">{student.group}</td>
              <td className="px-4 py-3 text-right space-x-2">
                <button title="Edit">
                  <Link to={`/edit/${student.id}`}>✏️</Link>
                </button>
                <button title="Delete" onClick={() => handleDelete(student.id)}>
                  🗑️
                </button>
                <button title="Send Email">
                  <Link to={`/email/${student.id}`}>✉️</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * pageSize + 1}–
          {Math.min(page * pageSize, total)} of {total} students
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
