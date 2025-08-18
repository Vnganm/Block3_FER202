import React from 'react';
import StudentCard from './StudentCard';

function StudentGrid({ students, onViewDetails }) {
  return (
    <div className="row">
      {students.map((student) => (
        <div key={student.id} className="col-12 col-md-6 col-lg-4">
          <StudentCard student={student} onViewDetails={onViewDetails} />
        </div>
      ))}
    </div>
  );
}

export default StudentGrid;