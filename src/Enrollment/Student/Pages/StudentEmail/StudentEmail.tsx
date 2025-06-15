import React, { useState } from "react";
import { sendEmail } from "../../Services/sendEmail";
import { useNavigate, useParams } from "react-router-dom";
import { findStudentById } from "../../Services/findStudentById";

const StudentEmail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const student = id ? findStudentById(id) : undefined;
  const [content, setContent] = useState("");

  if (!student) {
    return <div className="p-6 text-red-600">Student not found.</div>;
  }

  const handleSendEmail = () => {
    if (!content.trim()) {
      alert("Please enter email content before sending.");
      return;
    }

    const confirmed = window.confirm("Do you want to send the email?");
    if (confirmed) {
      const success = sendEmail(student.id, content);
      if (success) {
        alert("Email sent successfully!");
        navigate(`/profile/${id}`);
      } else {
        alert("Failed to send email.");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <img src={student.imageUrl} alt={student.name} className="w-24 h-24 rounded-full" />
          <div>
            <h2 className="text-2xl font-bold">{student.name}</h2>
            <p className="text-gray-600">{student.email}</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">Notes</h3>
        <p className="text-gray-700 mb-4">{student.notes}</p>

        <h3 className="text-lg font-semibold mb-2">Email Content</h3>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full border rounded p-3 mb-4 text-sm"
          placeholder="Write your message here..."
        />

        <button
          onClick={handleSendEmail}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Send Email
        </button>
      </div>
    </div>
  );
};

export default StudentEmail;
