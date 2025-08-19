import React, { useState, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Filters from '../components/Filters';
import SortDropdown from '../components/SortDropdown';
import StudentGrid from '../components/StudentGrid';
import StudentDetailModal from '../components/StudentDetailModal';
import ProfileWizard from '../components/ProfileWizard';
import { students as initialStudents } from '../data/students';

function StudentsPage({ showProfileWizard, setShowProfileWizard }) { // Nhận prop từ App.js
  const [searchTerm, setSearchTerm] = useState('');
  const [ageRange, setAgeRange] = useState('all');
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sortOption, setSortOption] = useState('nameAsc');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = useMemo(() => {
    let result = [...initialStudents];

    if (searchTerm) {
      result = result.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (hasAvatar) {
      result = result.filter((s) => s.avatar);
    }

    if (ageRange !== 'all') {
      if (ageRange === '<=20') result = result.filter((s) => s.age <= 20);
      else if (ageRange === '21-25') result = result.filter((s) => s.age >= 21 && s.age <= 25);
      else if (ageRange === '>25') result = result.filter((s) => s.age > 25);
    }

    return result.sort((a, b) => {
      if (sortOption === 'ageAsc') return a.age - b.age;
      if (sortOption === 'ageDesc') return b.age - a.age;
      if (sortOption === 'nameAsc') return a.name.localeCompare(b.name);
      if (sortOption === 'nameDesc') return b.name.localeCompare(a.name);
      return 0;
    });
  }, [searchTerm, ageRange, hasAvatar, sortOption]);

  const handleQuickSearch = (term) => {
    setSearchTerm(term);
  };

  const handleShowProfileWizard = () => setShowProfileWizard(true); // Sử dụng setShowProfileWizard từ prop
  const handleCloseProfileWizard = () => setShowProfileWizard(false); // Sử dụng setShowProfileWizard từ prop

  return (
    <>
      <Navbar onQuickSearch={handleQuickSearch} onShowProfile={handleShowProfileWizard} />
      <Container className="my-4">
        <Row className="mb-4">
          <Col>
            <h1 className="text-center">Student Management</h1>
            <p className="text-center text-muted">Manage and explore student information efficiently.</p>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <div className="p-3 bg-light rounded shadow-sm">
              <Filters
                onFilter={({ searchTerm, ageRange, hasAvatar }) => {
                  setSearchTerm(searchTerm);
                  setAgeRange(ageRange);
                  setHasAvatar(hasAvatar);
                }}
              />
            </div>
          </Col>
          <Col md={9}>
            <div className="mb-3">
              <SortDropdown onSort={setSortOption} />
            </div>
            <StudentGrid students={filteredStudents} onViewDetails={setSelectedStudent} />
          </Col>
        </Row>
      </Container>
      <StudentDetailModal
        show={!!selectedStudent}
        onHide={() => setSelectedStudent(null)}
        student={selectedStudent || {}}
      />
      <ProfileWizard show={showProfileWizard} onHide={handleCloseProfileWizard} />
    </>
  );
}

export default StudentsPage;