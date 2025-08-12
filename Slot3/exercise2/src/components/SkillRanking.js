import React from 'react';
import { persons } from '../persons';
import { Table } from 'react-bootstrap';

const SkillRanking = () => {
  const skillCounts = persons.reduce((acc, { skills }) => {
    skills.forEach(s => acc[s] = (acc[s] || 0) + 1);
    return acc;
  }, {});

  const sortedSkills = Object.entries(skillCounts).sort(([,a], [,b]) => b - a);
  const maxCount = sortedSkills[0]?.[1] || 0;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Skill</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {sortedSkills.map(([skill, count]) => (
          <tr key={skill}>
            <td style={{ fontWeight: count === maxCount ? 'bold' : 'normal' }}>{skill}</td>
            <td>{count}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SkillRanking;