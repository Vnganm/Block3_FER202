import React from 'react';
import Navbar from './components/Navbar';
import TextDisplay from './components/TextDisplay';
import CourseList from './components/CourseList';
import CompanyList from './components/CompanyList';
import PersonComponent from './components/Person';
import StudentComponent from './components/Student';

import './styles.css';

const App = () => {
  // 1. Xử lý mảng people
  const people = [
    {name: 'Jack', age: 50},
    {name: 'Michael', age: 9},
    {name: 'John', age: 40},
    {name: 'Ann', age: 19},
    {name: 'Elisabeth', age: 16}
  ];

  const firstTeenager = people.find(person => person.age >= 10 && person.age <= 20);
  const allTeenagers = people.filter(person => person.age >= 10 && person.age <= 20);
  const isAllTeenagers = people.every(person => person.age >= 10 && person.age <= 20);
  const isAnyTeenager = people.some(person => person.age >= 10 && person.age <= 20);

  // 2. Xử lý mảng array
  const array = [1, 2, 3, 4];
  const sum = array.reduce((accumulator, current) => accumulator + current, 0);
  const product = array.reduce((acc, curr) => acc * curr, 1);

  // 3. Xử lý companies, ages và person
  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
  const person = {
    name: "Costas",
    address: {
      street: "Lalaland 12"
    }
  };

  const sortedAges = [...ages].sort((a, b) => b - a);
  const ageSum = ages.reduce((acc, age) => acc + age, 0);
  const { address: { street } } = person;

  // 4. Hàm tính tổng các số
  const sumNumbers = (...numbers) => numbers.reduce((acc, num) => acc + num, 0);

  // 5. Hàm gộp mảng
  const mergeToArray = (...args) => {
    return args.reduce((acc, item) => {
      if (Array.isArray(item)) {
        return [...acc, ...item];
      }
      return [...acc, item];
    }, []);
  };

  // 6. Hàm đếm tăng dần
  const createCounter = () => {
    let count = 0;
    return () => count++;
  };

  // 7. Promise
  const randomNumberPromise = new Promise((resolve, reject) => {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    if (randomNum > 5) {
      resolve(randomNum);
    } else {
      reject("Error: Number is 5 or less");
    }
  });

  randomNumberPromise
    .then(num => console.log(`Success: ${num}`))
    .catch(err => console.error(err));

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <TextDisplay />
        <CourseList />
        <CompanyList />
        <PersonComponent />
        <StudentComponent />
        {/* Hiển thị kết quả xử lý mảng people */}
        <div className="result-box">
          <h2>People Array Results</h2>
          <p><strong>First teenager:</strong> {firstTeenager?.name || 'None'} (Age: {firstTeenager?.age || 'N/A'})</p>
          <p><strong>All teenagers:</strong> {allTeenagers.map(p => p.name).join(', ')}</p>
          <p><strong>Are all teenagers?</strong> {isAllTeenagers.toString()}</p>
          <p><strong>Is any teenager?</strong> {isAnyTeenager.toString()}</p>
        </div>

        {/* Hiển thị kết quả xử lý mảng array */}
        <div className="result-box">
          <h2>Array Operations</h2>
          <p><strong>Sum of [1,2,3,4]:</strong> {sum}</p>
          <p><strong>Product of [1,2,3,4]:</strong> {product}</p>
        </div>

        {/* Hiển thị kết quả xử lý ages và person */}
        <div className="result-box">
          <h2>Ages and Person</h2>
          <p><strong>Sorted ages (descending):</strong> {sortedAges.join(', ')}</p>
          <p><strong>Sum of ages:</strong> {ageSum}</p>
          <p><strong>Street from person:</strong> {street}</p>
        </div>

        {/* Hiển thị kết quả các hàm */}
        <div className="result-box">
          <h2>Function Results</h2>
          <p><strong>sumNumbers(1,2,3,4):</strong> {sumNumbers(1, 2, 3, 4)}</p>
          <p><strong>mergeToArray(1, [2,3], 4):</strong> {JSON.stringify(mergeToArray(1, [2,3], 4))}</p>
        </div>
      </div>
    </div>
  );
};

export default App;