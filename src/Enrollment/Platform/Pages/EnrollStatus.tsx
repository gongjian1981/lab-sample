import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Student } from '../../Student/Services/StudentInfo';
import { StudentLoadService } from '../../Student/Services/StudentLoadService';

const COLORS = ['#00C49F', '#FF8042'];

const EnrollStatus: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const service = StudentLoadService.createDefault();
      const result = await service.loadStudents();
      setStudents(result);
    };
    fetchData();
  }, []);

  const getCounts = (platform: 'github' | 'loop') => {
    const statusKey = platform === 'github' ? 'githubStatus' : 'loopStatus';
    const enrolled = students.filter(s => s[statusKey] === 'enrolled').length;
    const unenrolled = students.filter(s => s[statusKey] === 'unenrolled').length;
    return { enrolled, unenrolled };
  };

  const githubCounts = getCounts('github');
  const loopCounts = getCounts('loop');

  const pieDataGitHub = [
    { name: 'Enrolled', value: githubCounts.enrolled },
    { name: 'Unenrolled', value: githubCounts.unenrolled },
  ];

  const pieDataLoop = [
    { name: 'Enrolled', value: loopCounts.enrolled },
    { name: 'Unenrolled', value: loopCounts.unenrolled },
  ];

  const barData = [
    {
      platform: 'GitHub',
      Enrolled: githubCounts.enrolled,
      Unenrolled: githubCounts.unenrolled,
    },
    {
      platform: 'Loop',
      Enrolled: loopCounts.enrolled,
      Unenrolled: loopCounts.unenrolled,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Enrollment Status Overview</h1>

      <div className="flex flex-col lg:flex-row justify-around items-center gap-8">
        <div>
          <h2 className="text-lg font-semibold text-center mb-2">GitHub Enrollment</h2>
          <PieChart width={250} height={250}>
            <Pie
              data={pieDataGitHub}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {pieDataGitHub.map((entry, index) => (
                <Cell key={`cell-github-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-center mb-2">Loop Enrollment</h2>
          <PieChart width={250} height={250}>
            <Pie
              data={pieDataLoop}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {pieDataLoop.map((entry, index) => (
                <Cell key={`cell-loop-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-center mb-4">Comparison Bar Chart</h2>
        <BarChart
          width={500}
          height={300}
          data={barData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="platform" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Enrolled" fill="#00C49F" />
          <Bar dataKey="Unenrolled" fill="#FF8042" />
        </BarChart>
      </div>
    </div>
  );
};

export default EnrollStatus;
