import React, { useState } from "react";
import { Container, Tabs, Tab, Card } from "react-bootstrap";
import UserProfile from "./components/UserProfile";
import UserProfile2 from "./components/UserProfile2";
import MyForm from "./components/MyForm";
import AdvancedForm from "./components/AdvancedForm";

const App = () => {
  const [key, setKey] = useState("userProfile");

  const handleSubmit = (data) => {
    console.log("Submitted:", data);
  };

  return (
    <Container className="py-3" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-4">Bài Tập React Form</h2>
      
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 justify-content-center"
      >
        <Tab eventKey="userProfile" title="Bài 1" />
        <Tab eventKey="userProfile2" title="Bài 2" />
        <Tab eventKey="myForm" title="Bài 3" />
        <Tab eventKey="advancedForm" title="Bài 4" />
      </Tabs>

      <Card className="shadow-sm p-3">
        {key === "userProfile" && <UserProfile name="Nguyễn Văn A" age={25} />}
        {key === "userProfile2" && (
          <UserProfile2 name="Nguyễn Văn A" age={25} onSubmit={handleSubmit} />
        )}
        {key === "myForm" && <MyForm onSubmit={handleSubmit} />}
        {key === "advancedForm" && <AdvancedForm onSubmit={handleSubmit} />}
      </Card>
    </Container>
  );
};

export default App;