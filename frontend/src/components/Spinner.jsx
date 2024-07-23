import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary border-t-transparent"></div>
    </div>
  );
}

export default Spinner;
