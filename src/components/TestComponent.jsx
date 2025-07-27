import React from 'react';

const TestComponent = () => {
  return (
    <div className="p-8 bg-white">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Component</h1>
      <p className="text-gray-600">This is a simple test to check if basic components work.</p>
      
      {/* Test basic Tailwind classes */}
      <div className="mt-4 p-4 bg-blue-100 rounded-lg">
        <p>Basic Tailwind styling works</p>
      </div>
      
      {/* Test custom CSS classes */}
      <div className="mt-4 p-4 glass rounded-lg">
        <p>Glass morphism effect</p>
      </div>
      
      <div className="mt-4">
        <span className="gradient-text text-2xl font-bold">Gradient text effect</span>
      </div>
      
      {/* Test skeleton */}
      <div className="mt-4 skeleton h-4 w-32 rounded"></div>
    </div>
  );
};

export default TestComponent;