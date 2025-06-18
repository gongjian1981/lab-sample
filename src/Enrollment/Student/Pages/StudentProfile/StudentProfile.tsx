import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findStudentById } from "../../Services/findStudentById";
import { deleteStudentById } from "../../Services/deleteStudentById";
import type { Student } from "../../Types/StudentTypes"; // 替换为你真实路径

const StudentProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState<Student | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchStudent = async () => {
      const result = await findStudentById(id);
      setStudent(result);
      setLoading(false);
    };

    fetchStudent();
  }, [id]);

  const handleDelete = async (studentId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (confirmed) {
      await deleteStudentById(studentId);
      alert("Student deleted successfully.");
      navigate("/students");
    }
  };

  if (!id) {
    return <div className="p-6 text-red-500">Invalid student ID.</div>;
  }

  if (loading) {
    return <div className="p-6">Loading student information...</div>;
  }

  if (!student) {
    return <div className="p-6 text-red-500">Student not found.</div>;
  }

  return (
    <div className="p-6 overflow-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-6">
          <img
            src={student.imageUrl || "https://via.placeholder.com/100"}
            alt="student"
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{student.name}</h2>
            <p className="text-sm text-gray-500">Student ID: {student.id}</p>
            <p className="text-sm text-gray-500">Email: {student.email}</p>
          </div>
          <div className="ml-auto space-x-2">
            <Link to={`/email/${student.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Send Email
            </Link>
            <Link to={`/edit/${student.id}`}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Edit Profile
            </Link>
            <button
              onClick={() => handleDelete(student.id)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete Student
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Additional Notes</h3>
          <p className="text-gray-700 text-sm">{student.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
