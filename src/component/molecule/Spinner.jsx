// src/components/LoadingSpinner.js

import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-[24px] w-[20px] border-t-2 border-b-2 border-white"></div>
    </div>
  );
};

export default LoadingSpinner;
