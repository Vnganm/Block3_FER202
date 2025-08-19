import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";

const validateInput = (value) => {
  return value.length >= 5;
};

function ValidatedInput() {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const isValidInput = validateInput(value);
    setIsValid(isValidInput);
    if (!isValidInput) {
      setErrorMessage("Giá trị phải có ít nhất 5 ký tự!");
    } else {
      setErrorMessage("");
    }
  }, [value]);

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-light">
        <h4 className="mb-0">Bài 4: Validated Input</h4>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group controlId="validatedInput" className="mb-4">
            <Form.Label className="fw-semibold">Nhập một giá trị</Form.Label>
            <Form.Control
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              isValid={isValid}
              isInvalid={!isValid}
              className="py-2"
              placeholder="Vui lòng nhập dữ liệu..."
            />
            <Form.Control.Feedback type="invalid" className="mt-1 text-danger">
              {errorMessage}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid" className="mt-1 text-success">
              Dữ liệu hợp lệ
            </Form.Control.Feedback>
          </Form.Group>

          <div className="text-end">
            <Button 
              variant="primary" 
              type="submit" 
              disabled={!isValid}
              className="px-4 py-2 rounded-3 fw-medium"
            >
              Gửi
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ValidatedInput;