import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center text-center px-4">
      <img
        src={logo}
        alt="logo"
        className="h-[100px] mb-6"
      />
      <h1 className="text-3xl font-bold text-blue-700 mb-2">
        SQATE Desktop Tool
      </h1>
      <p className="text-base text-gray-600 mb-6 my-[100px] text-[24px]">
        Welcome! This is the desktop shell for SQATE tooling modules.
      </p>
      <div className="flex gap-4 my-[100px]">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow"
        >
          Go to Enrollment
        </button>
        <button
          onClick={() => navigate('/heatmap')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow"
        >
          Go to Evaluation
        </button>
      </div>
    </div>
  );
}

export default Homepage;
