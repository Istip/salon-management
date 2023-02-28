import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useFirestore } from "../../hooks/useFirestore";
import { tokens } from "../UI/tokens";

// project components
import Text from "../UI/Text";
import FlexCenter from "../UI/FlexCenter";
import Error from "../UI/Error";
import Operation from "./Operation";

const Operations = ({ documents }) => {
  const [selected, setSelected] = useState(null);
  const [validation, setValidation] = useState("");

  const operations = documents[0].actions;

  const wrapperNode = useRef();

  const { updateDocument } = useFirestore("users");

  const { t } = useTranslation();

  // Function to delete
  const deleteOperation = () => {
    const filteredOperations = operations.filter((item) => item !== selected);
    const data = { actions: [...filteredOperations] };

    // Validation for the last deletable operation
    if (operations.length === 1) {
      return setValidation(t("validations.one_operation_left"));
    }

    updateDocument(documents[0].id, data);
  };

  // Function to handle outside click from the deletable element
  const handleClickOutside = (e) => {
    if (wrapperNode.current && wrapperNode.current.contains(e.target)) {
      return;
    }
    setSelected(null);
    setValidation("");
  };

  useEffect(() => {
    if (wrapperNode) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Text tag="h2" variant="h2" color={tokens.colors.primaryDark3}>
        {t("settings.operations")}
      </Text>

      <FlexCenter
        style={{
          textAlign: "center",
          lineHeight: "150%",
          marginBottom: "10px",
        }}
      >
        <Text variant="regular14">{t("settings.operation_description")}</Text>
      </FlexCenter>

      <OperationsWrapper>
        {operations
          .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
          .map((operation, i) => (
            <Operation
              key={i}
              operation={operation}
              operations={operations}
              documents={documents}
              selected={selected}
              setSelected={setSelected}
              wrapperNode={wrapperNode}
              deleteOperation={deleteOperation}
            />
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

const ErrorWrapper = styled.div`
  width: 100%;
`;

export default Operations;

// Prop Types
Operations.propTypes = {
  documents: PropTypes.array,
};
