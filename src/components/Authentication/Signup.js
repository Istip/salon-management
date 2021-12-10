import React, { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { useTranslation } from 'react-i18next';
import { tokens } from '../UI/tokens';

import Button from '../UI/Button';
import Form from '../UI/Form';
import Input from '../UI/Input';
import SigninIcon from '../icons/SigninIcon';
import EmailIcon from '../icons/EmailIcon';
import LockIcon from '../icons/LockIcon';
import ProfileIcon from '../icons/ProfileIcon';
import Error from '../UI/Error';
import ValidationText from '../UI/ValidationText';
import FlexCenter from '../UI/FlexCenter';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validation, setValidation] = useState('');

  const { signUp, loading, error } = useSignup();

  const { t } = useTranslation();

  // Sign up the user by submitting the form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length > 20) {
      setValidation(t('validations.shorter_name'));
      return null;
    }

    setValidation('');

    signUp(email, password, name);
  };

  const iconProps = {
    color: tokens.colors.primaryLight1,
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FlexCenter>
          <h1>{t('auth.sign_up')}</h1>
        </FlexCenter>
        <br />
        <Input
          name="name"
          type="text"
          placeholder={t('input.placeholder.name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          label={t('input.label.name')}
          icon={<ProfileIcon {...iconProps} />}
          required
        />

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
          icon={<SigninIcon color="#fff" size={18} />}
        >
          {t('auth.sign_up').toUpperCase()}
        </Button>

        {error && <Error>{error}</Error>}
      </Form>

      {validation && <ValidationText>{validation}</ValidationText>}
    </>
  );
};

export default Signup;
