import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useFirestore } from '../../hooks/useFirestore';
import { tokens } from '../UI/tokens';

// project components
import Text from '../UI/Text';
import FlexCenter from '../UI/FlexCenter';
import CloseIcon from '../icons/CloseIcon';
import Error from '../UI/Error';

const Operations = ({ documents }) => {
  const [selected, setSelected] = useState(null);
  const [validation, setValidation] = useState('');

  const operations = documents[0].actions;

  const wrapperNode = useRef();

  const { updateDocument } = useFirestore('users');

  const { t } = useTranslation();

  // Function to delete
  const deleteOperation = () => {
    const filteredOperations = operations.filter((item) => item !== selected);
    const data = { actions: [...filteredOperations] };

    // Validation for the last deletable operation
    if (operations.length === 1) {
      return setValidation(t('validations.one_operation_left'));
    }

    updateDocument(documents[0].id, data);
  };

  // Function to handle outside click from the deletable element
  const handleClickOutside = (e) => {
    if (wrapperNode.current && wrapperNode.current.contains(e.target)) {
      return;
    }
    setSelected(null);
    setValidation('');
  };

  useEffect(() => {
    if (wrapperNode) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Text tag="h2" variant="h2" color={tokens.colors.primaryDark3}>
        {t('settings.operations')}
      </Text>

      <FlexCenter
        style={{
          textAlign: 'center',
          lineHeight: '150%',
          marginBottom: '10px',
        }}
      >
        <Text variant="regular14">{t('settings.operation_description')}</Text>
      </FlexCenter>

      <OperationsWrapper>
        {operations.sort().map((operation, i) => (
          <OperationBadge key={i} onClick={() => setSelected(operation)}>
            {operation === selected && (
              <OperationDelete onClick={deleteOperation} ref={wrapperNode}>
                <FlexCenter style={{ height: '100%' }}>
                  <CloseIcon color={tokens.colors.white} />
                </FlexCenter>
              </OperationDelete>
            )}

            <Text variant="medium8" color={tokens.colors.primary}>
              {operation}
            </Text>
          </OperationBadge>
        ))}
      </OperationsWrapper>

      {validation && (
        <ErrorWrapper>
          <Error>{validation}</Error>
        </ErrorWrapper>
      )}
    </>
  );
};

// styeld components
const OperationsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  cursor: pointer;
`;

const OperationDelete = styled.div`
  position: absolute;
  top: -2px;
  bottom: -2px;
  left: -2px;
  right: -2px;
  background: red;
  border-radius: 10px;
  background: ${tokens.colors.error};
`;

const OperationBadge = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-width: 48px;
  height: 48px;
  padding: 4px;
  background: ${tokens.colors.primaryLight4};
  border: 1px solid ${tokens.colors.primary};
  border-radius: 10px;
  transition: 250ms ease;
`;

const ErrorWrapper = styled.div`
  width: 100%;
`;

export default Operations;
