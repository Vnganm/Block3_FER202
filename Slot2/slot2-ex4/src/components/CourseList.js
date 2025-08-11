import React from 'react';

const CourseList = () => {
  const courses = ['React Basics', 'Advanced JavaScript', 'Node.js Fundamentals', 'CSS Styling'];
  
  return (
    <div style={{ 
      margin: '20px 0',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '5px'
    }}>
      <h2 style={{ color: '#333' }}>List of Courses</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {courses.map((course, index) => (
          <li 
            key={index}
            style={{
              padding: '10px',
              margin: '5px 0',
              backgroundColor: '#f5f5f5',
              borderRadius: '3px'
            }}
          >
            {course}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;