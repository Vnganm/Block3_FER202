import React from 'react';
import { persons } from '../persons';
import { Table } from 'react-bootstrap';

const SkillRanking = () => {
  // Đếm số lượng từng skill
  const skillCounts = persons.reduce((acc, { skills }) => {
    skills.forEach(skill => acc[skill] = (acc[skill] || 0) + 1);
    return acc;
  }, {});

  // Sắp xếp skills theo số lượng giảm dần
  const sortedSkills = Object.entries(skillCounts).sort((a, b) => b[1] - a[1]);
  
  // Lấy số lượng cao nhất để highlight
  const maxCount = sortedSkills[0]?.[1] || 0;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Kỹ năng</th>
          <th>Số người có</th>
        </tr>
      </thead>
      <tbody>
        {sortedSkills.map(([skill, count]) => (
          <tr key={skill}>
            {/* Highlight skill phổ biến nhất */}
            <td style={{ fontWeight: count === maxCount ? 'bold' : 'normal' }}>
              {skill}
            </td>
            <td>{count}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SkillRanking;