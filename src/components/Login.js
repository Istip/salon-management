import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

import Form from './UI/Form';
import Input from './UI/Input';
import Button from './UI/Button';
import CheckIcon from './icons/CheckIcon';

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

      <Button
        type="submit"
        disabled={loading}
        block
        icon={<CheckIcon color="#fff" size={18} />}
      >
        LOGIN
      </Button>

      {error && <small>{error}</small>}
    </Form>
  );
};

export default Login;
