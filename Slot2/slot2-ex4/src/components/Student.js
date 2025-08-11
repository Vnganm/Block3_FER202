import React, { useState } from 'react';

class StudentClass {
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
}

const StudentComponent = () => {
  const [counter, setCounter] = useState(0);
  
  const student1 = new StudentClass("Alice", 18, 12);
  const student2 = new StudentClass("Bob", 17, 11);

  const createCounter = () => {
    let count = 0;
    return () => {
      count++;
      setCounter(count);
      return count;
    };
  };

  const counterInstance = createCounter();

  return (
    <div style={{ 
      margin: '20px 0',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '5px'
    }}>
      <h2 style={{ color: '#333' }}>Student Class Implementation</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <h3>Student 1</h3>
        <p>{student1.greet()}</p>
        <p>{student1.study()}</p>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <h3>Student 2</h3>
        <p>{student2.greet()}</p>
        <p>{student2.study()}</p>
      </div>
      
      <div>
        <h3>Counter Example</h3>
        <button 
          onClick={() => {
            const newCount = counterInstance();
            console.log(`Counter value: ${newCount}`);
          }}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Increment Counter
        </button>
        <p>Counter value (check console): {counter}</p>
      </div>
    </div>
  );
};

export default StudentComponent;