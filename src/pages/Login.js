import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

import Form from '../components/UI/Form';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { tokens } from '../components/UI/tokens';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 style={{ textAlign: 'center' }}>Login</h1>
      <br />

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
        LOGIN
      </Button>

      {error && <small>{error}</small>}
    </Form>
  );
};

export default Login;
