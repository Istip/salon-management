import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { tokens } from './UI/tokens';

import Form from './UI/Form';
import Input from './UI/Input';
import Button from './UI/Button';
import CheckIcon from './icons/CheckIcon';
import EmailIcon from './icons/EmailIcon';
import LockIcon from './icons/LockIcon';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const iconProps = {
    color: tokens.colors.primaryLight1,
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="email"
        type="email"
        placeholder="Enter email address.."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        icon={<EmailIcon {...iconProps} />}
        required
      />

      <Input
        name="password"
        type="password"
        placeholder="Enter password.."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        icon={<LockIcon {...iconProps} />}
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
