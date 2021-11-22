import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

import Button from './UI/Button';
import Form from './UI/Form';
import Input from './UI/Input';
import SigninIcon from './icons/SigninIcon';

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

      <Button
        type="submit"
        disabled={loading}
        block
        icon={<SigninIcon color="#fff" size={18} />}
      >
        SIGN UP
      </Button>

      {error && <small>{error}</small>}
    </Form>
  );
};

export default Signup;
