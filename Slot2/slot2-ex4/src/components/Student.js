import React from 'react';

class Student {
  constructor(name, age, grade) {
    this.name = name;
    this.age = age;
    this.grade = grade;
  }

  greet() {
    return `Hello, my name is ${this.name}, I'm ${this.age} years old.`;
  }

  study() {
    return `${this.name} is studying in grade ${this.grade}.`;
  }

  getStudentInfo() {
    return (
      <div style={{
        padding: '15px',
        margin: '10px 0',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9'
      }}>
        <h3>Student Information</h3>
        <p><strong>Name:</strong> {this.name}</p>
        <p><strong>Age:</strong> {this.age}</p>
        <p><strong>Grade:</strong> {this.grade}</p>
        <p><em>{this.greet()}</em></p>
        <p><em>{this.study()}</em></p>
      </div>
    );
  }
}

// Component để hiển thị thông tin Student
const StudentComponent = () => {
  const student1 = new Student("Alice", 18, 12);
  const student2 = new Student("Bob", 17, 11);

  return (
    <div style={{ 
      margin: '20px 0',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '5px'
    }}>
      <h2 style={{ color: '#333' }}>Student Class Implementation</h2>
      {student1.getStudentInfo()}
      {student2.getStudentInfo()}
    </div>
  );
};

export default StudentComponent;