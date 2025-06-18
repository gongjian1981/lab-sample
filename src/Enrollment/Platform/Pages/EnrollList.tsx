import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getStudentsBySectionAndPage } from "../../Student/Services/getStudentsBySectionAndPage";
import { enrollStudentToPlatform } from "../Services/enrollStudentToPlatform";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const StudentListByPlatform: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();

  const platform = query.get("platform") || "github";
  const pageFromUrl = parseInt(query.get("page") || "1", 10);
  const [page, setPage] = useState<number>(isNaN(pageFromUrl) ? 1 : pageFromUrl);
  const pageSize = 10;

  const [students, setStudents] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const loadStudents = async () => {
    const result = await getStudentsBySectionAndPage(undefined, page, pageSize);
    setStudents(result.data);
    setTotal(result.total);
    setTotalPages(result.totalPages);
  };

  React.useEffect(() => {
    let isMounted = true;
    loadStudents();
    return () => { isMounted = false; };
  }, [page, pageSize]);

  const updateQueryParam = (newPage: number) => {
    const params = new URLSearchParams(location.search);
    params.set("page", newPage.toString());
    params.set("platform", platform);
    navigate(`${location.pathname}?${params.toString()}`, { replace: false });
  };

  const handlePrev = () => {
    const newPage = Math.max(page - 1, 1);
    setPage(newPage);
    updateQueryParam(newPage);
  };

  const handleNext = () => {
    const newPage = Math.min(page + 1, totalPages);
    setPage(newPage);
    updateQueryParam(newPage);
  };

  const handleEnrollment = async (studentId: string) => {
    const confirmed = window.confirm("Are you sure the student enroll with " + platform + "?");
    if (!confirmed) return;

    const success = await enrollStudentToPlatform(studentId, platform as 'github' | 'loop');
    if (success) {
      alert("Student enrolled successfully.");
      await loadStudents();
    } else {
      alert("Failed to enroll student. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{platform === 'loop' ? 'Loop Platform' : 'GitHub Platform'} Students</h1>
        <div className="flex gap-2">
          <button
            disabled={platform === 'github'}
            onClick={() => navigate(`?platform=github&page=1`)}
            className={`border rounded px-3 py-1 
              ${platform === 'github' ? 'bg-blue-600 text-white cursor-not-allowed opacity-50' : 'hover:bg-gray-100'}`}
          >
            GitHub
          </button>
          <button
            disabled={platform === 'loop'}
            onClick={() => navigate(`?platform=loop&page=1`)}
            className={`border rounded px-3 py-1 
              ${platform === 'loop' ? 'bg-blue-600 text-white cursor-not-allowed opacity-50' : 'hover:bg-gray-100'}`}
          >
            Loop
          </button>
          <Link
            to="/status"
            className="border rounded px-3 py-1 bg-purple-600 text-white hover:bg-purple-700"
          >
            View Status
          </Link>
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
            <th className="px-4 py-3 text-left">{platform === 'loop' ? 'Loop Status' : 'GitHub Status'}</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const status = platform === "loop" ? student.loopStatus : student.githubStatus;

            return (
              <tr key={student.studentId} className="border-t">
                <td className="px-4 py-3">
                  <Link to={`/profile/${student.studentId}`} className="text-blue-600 hover:underline">
                    {student.name}
                  </Link>
                </td>
                <td className="px-4 py-3">{student.email}</td>
                <td className="px-4 py-3">{student.role}</td>
                <td className="px-4 py-3">{student.section}</td>
                <td className="px-4 py-3">{student.group}</td>
                <td className="px-4 py-3">{status}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  {status === "unenrolled" && (
                    <button onClick={() => handleEnrollment(student.id)}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                    >Enroll</button>
                  )}
                </td>
              </tr>
            );
          })}
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

export default StudentListByPlatform;
