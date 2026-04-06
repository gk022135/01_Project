import { useState } from "react";

import SignupTeacher from "./signup-teacher";
import SignupStudent from "./singup-student";


function Signup() {
  const [isStudentMode, setIsStudentMode] = useState(true);

  return (
    <div className="flex flex-col items-center gap-6 bg-base-100 py-6">
      {/* Toggle Switch */}
      <div className="join rounded-2xl border border-base-content/20 bg-base-200/70 p-1 shadow-xl">
        <button
          onClick={() => setIsStudentMode(false)}
          className={`join-item btn btn-sm border-none px-6 ${
            !isStudentMode
              ? "bg-gradient-to-r from-primary to-secondary text-white"
              : "bg-transparent text-base-content/70"
          }`}
        >
          Teacher
        </button>
        <button
          onClick={() => setIsStudentMode(true)}
          className={`join-item btn btn-sm border-none px-6 ${
            isStudentMode
              ? "bg-gradient-to-r from-primary to-secondary text-white"
              : "bg-transparent text-base-content/70"
          }`}
        >
          Student
        </button>
      </div>

      {/* Conditional Component */}
      <div className="w-full">
        {isStudentMode ? <SignupStudent /> : <SignupTeacher />}
      </div>
    </div>

  );
}

export default Signup;
