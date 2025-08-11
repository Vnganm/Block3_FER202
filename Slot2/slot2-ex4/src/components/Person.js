import React from 'react';

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  study() {
    return `${this.name} is studying in grade ${this.grade}.`;
  }
}

const PersonComponent = () => {
  const person = new Person("John Doe", 30);
  const student = new Student("Jane Smith", 20, 12);

  return (
    <div style={{ 
      margin: '20px 0',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '5px'
    }}>
      <h2 style={{ color: '#333' }}>Person and Student Classes</h2>
      <div style={{ marginBottom: '15px' }}>
        <h3>Person</h3>
        <p>{person.greet()}</p>
      </div>
      <div>
        <h3>Student</h3>
        <p>{student.greet()}</p>
        <p>{student.study()}</p>
      </div>
    </div>
  );
};

export default PersonComponent;