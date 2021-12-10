import React, { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { useTranslation } from 'react-i18next';
import { tokens } from '../UI/tokens';

import Form from '../UI/Form';
import Input from '../UI/Input';
import Button from '../UI/Button';
import CheckIcon from '../icons/CheckIcon';
import EmailIcon from '../icons/EmailIcon';
import LockIcon from '../icons/LockIcon';
import Error from '../UI/Error';
import FlexCenter from '../UI/FlexCenter';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading, error } = useLogin();

  const { t } = useTranslation();

  // Login the user by submitting the form
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const iconProps = {
    color: tokens.colors.primaryLight1,
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FlexCenter>
        <h1>{t('auth.login')}</h1>
      </FlexCenter>
      <br />
      <Input
        name="email"
        type="email"
        placeholder={t('input.placeholder.email')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label={t('input.label.email')}
        icon={<EmailIcon {...iconProps} />}
        required
      />

      <Input
        name="password"
        type="password"
        placeholder={t('input.placeholder.password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label={t('input.label.password')}
        icon={<LockIcon {...iconProps} />}
        required
      />

      <Button
        type="submit"
        disabled={loading}
        block
        icon={<CheckIcon color="#fff" size={18} />}
      >
        {t('auth.login').toUpperCase()}
      </Button>

      {error && <Error>{error}</Error>}
    </Form>
  );
};

export default Login;
