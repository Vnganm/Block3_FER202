import React, { useState, useReducer, useMemo, useCallback } from 'react';
import { Modal, Form, Button, Tab, Tabs, Card, Toast, InputGroup, Image, Col, Row } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PropTypes from 'prop-types';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                [action.section]: {
                    ...state[action.section],
                    [action.field]: action.value
                }
            };
        case 'UPDATE_AVATAR':
            return {
                ...state,
                about: {
                    ...state.about,
                    avatar: action.value
                }
            };
        case 'RESET_FORM':
            return {
                about: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    avatar: null
                },
                account: {
                    username: '',
                    password: '',
                    confirmPassword: '',
                    secretQuestion: secretQuestions[0],
                    secretAnswer: '',
                    showPassword: false,
                    showConfirmPassword: false
                },
                address: {
                    country: countries[0],
                    city: '',
                    street: '',
                    zipCode: ''
                }
            };
        default:
            return state;
    }
};

const secretQuestions = [
    "What is your first pet's name?",
    "What is your mother's maiden name?",
    "In which city were you born?",
    "Who was your favorite teacher?"
];

const countries = ["Viet Nam", "Korea", "Italy", "Japan", "USA"];

const ProfileWizard = ({ show, onHide }) => {
    const [state, dispatch] = useReducer(formReducer, {
        about: {
            firstName: '',
            lastName: '',
            email: '',
            avatar: null
        },
        account: {
            username: '',
            password: '',
            confirmPassword: '',
            secretQuestion: secretQuestions[0],
            secretAnswer: '',
            showPassword: false,
            showConfirmPassword: false
        },
        address: {
            country: countries[0],
            city: '',
            street: '',
            zipCode: ''
        }
    });

    const [touched, setTouched] = useState({
        about: {
            firstName: false,
            lastName: false,
            email: false
        },
        account: {
            username: false,
            password: false,
            confirmPassword: false,
            secretAnswer: false
        },
        address: {
            city: false,
            street: false,
            zipCode: false
        }
    });

    const [activeTab, setActiveTab] = useState('about');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [attemptedNext, setAttemptedNext] = useState(false);

    // Validation functions
    const isAboutValid = useMemo(() => (
        state.about.firstName.trim() &&
        state.about.lastName.trim() &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.about.email)
    ), [state.about]);

    const isAccountValid = useMemo(() => {
        const hasUpperCase = /[A-Z]/.test(state.account.password);
        const hasNumber = /\d/.test(state.account.password);
        const hasSpecial = /[!@#$%^&*]/.test(state.account.password);

        return (
            state.account.username.length >= 6 &&
            state.account.password.length >= 8 &&
            hasUpperCase &&
            hasNumber &&
            hasSpecial &&
            state.account.password === state.account.confirmPassword &&
            state.account.secretAnswer.trim()
        );
    }, [state.account]);

    const isAddressValid = useMemo(() => (
        state.address.street.trim() &&
        state.address.city.trim() &&
        state.address.zipCode.trim()
    ), [state.address]);

    const updateField = useCallback((section, field, value) => {
        dispatch({ type: 'UPDATE_FIELD', section, field, value });
    }, []);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch({ type: 'UPDATE_AVATAR', value: reader.result });
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const togglePasswordVisibility = useCallback((field) => {
        updateField('account', `show${field}`, !state.account[`show${field}`]);
    }, [state.account, updateField]);

    const handleBlur = useCallback((section, field) => {
        setTouched(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: true
            }
        }));
    }, []);

    const nextStep = useCallback(() => {
        setAttemptedNext(true);
        
        if (activeTab === 'about' && !isAboutValid) return;
        if (activeTab === 'account' && !isAccountValid) return;
        
        if (activeTab === 'about') setActiveTab('account');
        else if (activeTab === 'account') setActiveTab('address');
    }, [activeTab, isAboutValid, isAccountValid]);

    const prevStep = useCallback(() => {
        if (activeTab === 'account') setActiveTab('about');
        else if (activeTab === 'address') setActiveTab('account');
    }, [activeTab]);

    const handleSubmit = useCallback(() => {
        if (isAddressValid) {
            setShowProfile(true);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }
    }, [isAddressValid]);

    const handleCloseProfile = useCallback(() => {
        setShowProfile(false);
        onHide();
        dispatch({ type: 'RESET_FORM' });
        setActiveTab('about');
        setAttemptedNext(false);
        setTouched({
            about: {
                firstName: false,
                lastName: false,
                email: false
            },
            account: {
                username: false,
                password: false,
                confirmPassword: false,
                secretAnswer: false
            },
            address: {
                city: false,
                street: false,
                zipCode: false
            }
        });
    }, [onHide]);

    return (
        <>
            <Modal show={show} onHide={onHide} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Build Your Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-3">
                        <Tab eventKey="about" title="About" disabled={activeTab !== 'about'}>
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>First Name *</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={state.about.firstName}
                                                onChange={(e) => updateField('about', 'firstName', e.target.value)}
                                                onBlur={() => handleBlur('about', 'firstName')}
                                                required
                                                isInvalid={(touched.about.firstName || attemptedNext) && !state.about.firstName.trim()}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please enter your first name
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Last Name *</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={state.about.lastName}
                                                onChange={(e) => updateField('about', 'lastName', e.target.value)}
                                                onBlur={() => handleBlur('about', 'lastName')}
                                                required
                                                isInvalid={(touched.about.lastName || attemptedNext) && !state.about.lastName.trim()}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please enter your last name
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email *</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={state.about.email}
                                        onChange={(e) => updateField('about', 'email', e.target.value)}
                                        onBlur={() => handleBlur('about', 'email')}
                                        required
                                        isInvalid={(touched.about.email || attemptedNext) && 
                                            (!state.about.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.about.email))}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {!state.about.email 
                                            ? 'Please enter your email' 
                                            : 'Please enter a valid email address'}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Avatar</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    {state.about.avatar && (
                                        <Image
                                            src={state.about.avatar}
                                            alt="Avatar Preview"
                                            thumbnail
                                            className="mt-2"
                                            style={{ maxWidth: '150px' }}
                                        />
                                    )}
                                </Form.Group>
                            </Form>
                        </Tab>

                        <Tab eventKey="account" title="Account" disabled={activeTab !== 'account'}>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username (min 6 characters) *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={state.account.username}
                                        onChange={(e) => updateField('account', 'username', e.target.value)}
                                        onBlur={() => handleBlur('account', 'username')}
                                        required
                                        minLength={6}
                                        isInvalid={(touched.account.username || attemptedNext) && 
                                            (!state.account.username || state.account.username.length < 6)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {!state.account.username 
                                            ? 'Please enter your username' 
                                            : 'Username must be at least 6 characters'}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password *</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={state.account.showPassword ? "text" : "password"}
                                            value={state.account.password}
                                            onChange={(e) => updateField('account', 'password', e.target.value)}
                                            onBlur={() => handleBlur('account', 'password')}
                                            required
                                            minLength={8}
                                            isInvalid={(touched.account.password || attemptedNext) &&
                                                (!state.account.password || 
                                                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(state.account.password))}
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => togglePasswordVisibility('Password')}
                                        >
                                            {state.account.showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </Button>
                                    </InputGroup>
                                    <Form.Text>
                                        Must contain: uppercase, lowercase, number, and special character
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        {!state.account.password 
                                            ? 'Please enter your password'
                                            : 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Confirm Password *</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={state.account.showConfirmPassword ? "text" : "password"}
                                            value={state.account.confirmPassword}
                                            onChange={(e) => updateField('account', 'confirmPassword', e.target.value)}
                                            onBlur={() => handleBlur('account', 'confirmPassword')}
                                            required
                                            isInvalid={(touched.account.confirmPassword || attemptedNext) &&
                                                (!state.account.confirmPassword || 
                                                state.account.password !== state.account.confirmPassword)}
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => togglePasswordVisibility('ConfirmPassword')}
                                        >
                                            {state.account.showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </Button>
                                    </InputGroup>
                                    <Form.Control.Feedback type="invalid">
                                        {!state.account.confirmPassword 
                                            ? 'Please confirm your password'
                                            : 'Passwords do not match'}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Secret Question *</Form.Label>
                                    <Form.Select
                                        value={state.account.secretQuestion}
                                        onChange={(e) => updateField('account', 'secretQuestion', e.target.value)}
                                        required
                                    >
                                        {secretQuestions.map((question, index) => (
                                            <option key={index} value={question}>{question}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Answer *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={state.account.secretAnswer}
                                        onChange={(e) => updateField('account', 'secretAnswer', e.target.value)}
                                        onBlur={() => handleBlur('account', 'secretAnswer')}
                                        required
                                        isInvalid={(touched.account.secretAnswer || attemptedNext) && !state.account.secretAnswer.trim()}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter an answer for your secret question
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                        </Tab>

                        <Tab eventKey="address" title="Address" disabled={activeTab !== 'address'}>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Select
                                        value={state.address.country}
                                        onChange={(e) => updateField('address', 'country', e.target.value)}
                                        required
                                    >
                                        {countries.map((country, index) => (
                                            <option key={index} value={country}>{country}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>City *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={state.address.city}
                                        onChange={(e) => updateField('address', 'city', e.target.value)}
                                        onBlur={() => handleBlur('address', 'city')}
                                        required
                                        isInvalid={(touched.address.city || attemptedNext) && !state.address.city.trim()}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your city
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Street Address *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={state.address.street}
                                        onChange={(e) => updateField('address', 'street', e.target.value)}
                                        onBlur={() => handleBlur('address', 'street')}
                                        required
                                        isInvalid={(touched.address.street || attemptedNext) && !state.address.street.trim()}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your street address
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Zip/Postal Code *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={state.address.zipCode}
                                        onChange={(e) => updateField('address', 'zipCode', e.target.value)}
                                        onBlur={() => handleBlur('address', 'zipCode')}
                                        required
                                        isInvalid={(touched.address.zipCode || attemptedNext) && !state.address.zipCode.trim()}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your zip/postal code
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    {activeTab !== 'about' && (
                        <Button variant="secondary" onClick={prevStep}>
                            Previous
                        </Button>
                    )}
                    {activeTab !== 'address' ? (
                        <Button
                            variant="primary"
                            onClick={nextStep}
                            disabled={
                                (activeTab === 'about' && !isAboutValid && !attemptedNext) ||
                                (activeTab === 'account' && !isAccountValid && !attemptedNext)
                            }
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            variant="success"
                            onClick={handleSubmit}
                            disabled={!isAddressValid}
                        >
                            Finish
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

            <Modal show={showProfile} onHide={handleCloseProfile} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Your Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <div className="row">
                                <div className="col-md-4 text-center">
                                    {state.about.avatar && (
                                        <Image
                                            src={state.about.avatar}
                                            roundedCircle
                                            fluid
                                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                                        />
                                    )}
                                </div>
                                <div className="col-md-8">
                                    <h5>About</h5>
                                    <p><strong>First Name:</strong> {state.about.firstName}</p>
                                    <p><strong>Last Name:</strong> {state.about.lastName}</p>
                                    <p><strong>Email:</strong> {state.about.email}</p>

                                    <h5 className="mt-4">Account</h5>
                                    <p><strong>Username:</strong> {state.account.username}</p>
                                    <p><strong>Secret Question:</strong> {state.account.secretQuestion}</p>
                                    <p><strong>Answer:</strong> {state.account.secretAnswer}</p>

                                    <h5 className="mt-4">Address</h5>
                                    <p><strong>Country:</strong> {state.address.country}</p>
                                    <p><strong>City:</strong> {state.address.city}</p>
                                    <p><strong>Street:</strong> {state.address.street}</p>
                                    <p><strong>Zip Code:</strong> {state.address.zipCode}</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseProfile}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Toast 
                show={showSuccess} 
                onClose={() => setShowSuccess(false)} 
                delay={5000} 
                autohide
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 9999,
                    backgroundColor: '#d4edda',
                    border: '1px solid #c3e6cb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    minWidth: '300px'
                }}
            >
                <Toast.Header 
                    closeButton={false}
                    style={{
                        backgroundColor: '#d4edda',
                        borderBottom: '1px solid #c3e6cb',
                        color: '#155724'
                    }}
                >
                    <div className="d-flex align-items-center">
                        <div 
                            className="me-2" 
                            style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: '#28a745',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }}
                        >
                            ✓
                        </div>
                        <strong className="me-auto" style={{ color: '#155724' }}>Success</strong>
                    </div>
                </Toast.Header>
                <Toast.Body style={{ 
                    backgroundColor: '#d4edda', 
                    color: '#155724',
                    fontWeight: '500'
                }}>
                    Profile submitted successfully!
                </Toast.Body>
            </Toast>
        </>
    );
};

ProfileWizard.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired
};

export default ProfileWizard;