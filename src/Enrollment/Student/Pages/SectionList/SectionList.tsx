import React from "react";
import { getSections } from "../../Services/getSections";


const SectionList: React.FC = () => {
  const sections = getSections();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Section List</h1>

      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <input type="text" placeholder="Search..." className="border rounded px-3 py-1" />
          <button className="border rounded px-3 py-1">Sort by</button>
          <button className="border rounded px-3 py-1">Filters</button>
        </div>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <a href="/upload-student">Upload</a>
          </button>
          <button className="border px-4 py-2 rounded hover:bg-gray-100">
            Download Excel
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-6 py-3 font-medium">Name</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section, index) => (
            <tr key={index} className="border-t">
              <td className="px-6 py-4">
                <a href={`/students?section=${encodeURIComponent(section)}`}
                 className="font-semibold text-blue-600 hover:underline">
                  {section}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SectionList;
