import 'bootstrap/dist/css/bootstrap.min.css';

import NameList from "./components/NameList";
import UserProfile from "./components/UserProfile";
import Welcome from "./components/Welcome";

import { Container, Row, Col } from "react-bootstrap";
import StudentCard from "./components/StudentCard";

function App() {
  const userData = { name: "nganvm@fe.edu.vn", age: 20 };
  const namesList = ["nganvm@fe.edu.vn", "test@fe.edu.vn"];
  
  const students = [
    { name: "Nha Phuong", age: 19, avatar: "https://bizweb.dktcdn.net/100/175/849/files/nhung-luu-y-khi-di-chup-anh-the-hoc-sinh-sinh-vien-7-0c8056ae-0cd9-4fe7-afba-6d568dbf322d.jpg?v=1720762638583" },
    { name: "Quoc Phong", age: 20, avatar: "https://bizweb.dktcdn.net/100/175/849/files/nhung-luu-y-khi-di-chup-anh-the-hoc-sinh-sinh-vien-1-016c9c22-e8bb-46fe-a6bb-69b81dcdd0c3.jpg?v=1720762597525" },
    { name: "Gia Man", age: 21, avatar: "https://anhvienpiano.com/wp-content/uploads/2016/10/anh-4.jpg" },
  ];

  return (
    <>
      <Welcome name="traltb@fe.edu.vn" />
      <UserProfile user={userData} />
      <NameList names={namesList} />
      <Container>
        <h1 className="my-4 text-center">Student information</h1>
        <Row>
          {students.map((student, index) => (
            <Col key={index} sm={12} md={4}>
              <StudentCard student={student} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;