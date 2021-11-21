import React, { useState } from 'react';
import Button from '../components/UI/Button';
import Form from '../components/UI/Form';
import Input from '../components/UI/Input';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, loading, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(email, password, name);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 style={{ textAlign: 'center' }}>Create Profile</h1>
      <br />
      <Input
        name="name"
        type="text"
        placeholder="Your short name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Nickname"
        required
      />

      <Input
        name="email"
        type="email"
        placeholder="Email address..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        required
      />

      <Input
        name="password"
        type="password"
        placeholder="Password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        required
      />

      <Button type="submit" disabled={loading} block>
        SIGN UP
      </Button>

      {error && <small>{error}</small>}
    </Form>
  );
};

export default Signup;
