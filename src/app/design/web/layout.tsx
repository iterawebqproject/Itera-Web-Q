import type React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 w-full h-[calc(100vh-72px)] flex flex-col overflow-hidden items-center justify-center">
      <div className="card bg-white w-full h-full p-10 rounded-lg shadow-2xl border border-slate-200 container mx-auto my-20">
        {children}
      </div>
    </div>
  );
};

export default layout;
