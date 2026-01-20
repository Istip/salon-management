import { useState } from "react";
import { tokens } from "../UI/tokens";
import { useFirestore } from "../../hooks/useFirestore";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

// Project imports
import FlexCenter from "../UI/FlexCenter";
import Text from "../UI/Text";
import Input from "../UI/Input";
import MoneyIcon from "../icons/MoneyIcon";
import Button from "../UI/Button";
import CheckIcon from "../icons/CheckIcon";
import CloseIcon from "../icons/CloseIcon";

const Operation = ({
  operation,
  operations,
  documents,
  selected,
  setSelected,
  wrapperNode,
  deleteOperation,
}) => {
  const [price, setPrice] = useState(operation.price);

  const { updateDocument } = useFirestore("users");

  const { t } = useTranslation();

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;

    // Allow empty string (user clearing the field)
    if (newPrice === "") {
      setPrice("");
      return;
    }

    // Try to parse as number
    const num = Number(newPrice);

    // Check if it's valid (not NaN and not negative)
    if (isNaN(num) || num < 0) {
      setPrice(0);
      toast.error(t("Invalid price"));
      const filtered = operations.filter(
        (element) => element.name !== operation.name,
      );
      const data = [...filtered, { name: operation.name, price: 0 }];
      updateDocument(documents[0].id, { actions: data });
      return;
    }

    // Valid number, update state and document immediately
    setPrice(newPrice);
    const filtered = operations.filter(
      (element) => element.name !== operation.name,
    );
    const data = [...filtered, { name: operation.name, price: num }];
    updateDocument(documents[0].id, { actions: data });
  };

  const iconProps = {
    color: tokens.colors.primaryLight1,
  };

  return (
    <OperationWrapper>
      <OperationBadge onClick={() => setSelected(operation)}>
        {operation === selected && (
          <OperationDelete
            onDoubleClick={() => deleteOperation()}
            ref={wrapperNode}
          >
            <FlexCenter style={{ height: "100%" }}>
              <CloseIcon color={tokens.colors.white} />
            </FlexCenter>
          </OperationDelete>
        )}

        <Text variant="medium12" color={tokens.colors.primary}>
          {operation.name}
        </Text>
      </OperationBadge>

      <Input
        type="number"
        value={price}
        onChange={handlePriceChange}
        icon={<MoneyIcon {...iconProps} />}
        noMargin
      />
      <Button
        variant="success"
        icon={<CheckIcon color={tokens.colors.success} />}
        onClick={handlePriceChange}
      />
    </OperationWrapper>
  );
};

export default Operation;

const OperationWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 5px;
`;

const OperationDelete = styled.div`
  position: absolute;
  top: -2px;
  bottom: -2px;
  left: -2px;
  right: -2px;
  border-radius: 10px;
  background: ${tokens.colors.error};
`;

const OperationBadge = styled.div`
  width: 100%;
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
