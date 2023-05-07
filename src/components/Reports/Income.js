import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { timestamp } from "../../firebase/config";
import { useCollection } from "../../hooks/useCollection";
import { useTranslation } from "react-i18next";
import { capitalize } from "../../utils/capitalize";
import { tokens } from "../UI/tokens";

// project components
import Text from "../UI/Text";
import FlexCenter from "../UI/FlexCenter";
import Error from "../UI/Error";
import i18n from "../../translations/i18n";
import Button from "../UI/Button";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import Loading from "../UI/Loading";
import TimeIcon from "../icons/TimeIcon";

const Income = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState([
    "date",
    ">=",
    timestamp.fromDate(moment(currentDate).startOf("month").toDate()),
  ]);
  const [endDate, setEndDate] = useState([
    "date",
    "<=",
    timestamp.fromDate(moment(currentDate).startOf("month").toDate()),
  ]);
  const [data, setData] = useState({
    income: 0,
    femaleClients: 0,
    maleClients: 0,
  });

  const finished = ["finished", "==", true];

  const { t } = useTranslation();

  const formatStart = moment(currentDate).startOf("month").toDate();
  const start = timestamp.fromDate(formatStart);

  const formatEnd = moment(currentDate).endOf("month").toDate();
  const end = timestamp.fromDate(formatEnd);

  const addMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "month").toDate());
  };

  const subtractMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "month").toDate());
  };

  const resetMonth = () => {
    setCurrentDate(new Date());
  };

  const isCurrentMonth =
    moment(currentDate).format("YY-MM-DD") ===
    moment(new Date()).format("YY-MM-DD");

  const { documents, error } = useCollection(
    "events",
    startDate,
    endDate,
    finished
  );

  useEffect(() => {
    const formatStart = moment(currentDate).startOf("month").toDate();
    const start = timestamp.fromDate(formatStart);

    const formatEnd = moment(currentDate).endOf("month").toDate();
    const end = timestamp.fromDate(formatEnd);

    setStartDate(["date", ">=", start]);
    setEndDate(["date", "<=", end]);

    if (documents) {
      const income = documents.reduce(
        (accumulator, current) => accumulator + parseInt(current.price),
        0
      );

      const maleClients = documents.filter((doc) => doc.gender === "male");
      const femaleClients = documents.filter((doc) => doc.gender === "female");

      setData({ income, maleClients, femaleClients });
    }
  }, [currentDate, documents, error]);

  const { income, femaleClients, maleClients } = data;

  console.log(currentDate);

  if (!documents) {
    return (
      <FlexCenter style={{ height: "50vh" }}>
        <Loading />
      </FlexCenter>
    );
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  return (
    <IncomeWrapper>
      <FlexCenter>
        <Text tag="h2" color={tokens.colors.primaryDark3}>
          {t("reports.stats")}
        </Text>
      </FlexCenter>

      <ButtonGroup>
        <Button onClick={subtractMonth} size="medium" variant="neutral">
          <FlexCenter>
            <ArrowLeftIcon color={tokens.colors.darkGrey} />
            <Text color={tokens.colors.primary} variant="medium10">{`${moment(
              moment(currentDate).subtract(1, "month")
            ).format("YYYY - MM")}`}</Text>
          </FlexCenter>
        </Button>

        {!isCurrentMonth && (
          <Button size="medium" variant="secondary" onClick={resetMonth}>
            <FlexCenter>
              <TimeIcon color={tokens.colors.primary} size={16} />
              <Text style={{ marginLeft: "6px" }}>
                {t("reports.current_month")}
              </Text>
            </FlexCenter>
          </Button>
        )}

        <Button
          disabled={isCurrentMonth}
          onClick={addMonth}
          size="medium"
          variant="neutral"
        >
          <FlexCenter>
            <Text color={tokens.colors.primary} variant="medium10">{`${moment(
              moment(currentDate).add(1, "month")
            ).format("YYYY - MM")}`}</Text>
            <ArrowRightIcon color={tokens.colors.darkGrey} />
          </FlexCenter>
        </Button>
      </ButtonGroup>

      <IncomeInfo style={{ padding: "20px" }}>
        <Text variant="black14" color={tokens.colors.primaryDark3}>
          {capitalize(moment(currentDate).format("MMMM"))}
          {i18n.language === "hu" && "i"} {t("reports.income")}:
        </Text>

        <Text
          variant="black14"
          color={income > 0 ? tokens.colors.success : tokens.colors.error}
        >
          {income} RON
        </Text>
      </IncomeInfo>

      <DividerLine />

      <IncomeInfo style={{ padding: "20px" }}>
        <Text variant="black14" color={tokens.colors.primaryDark3}>
          {t("reports.total_female_clients")}
        </Text>

        <Text variant="black14" color={tokens.colors.primary}>
          {femaleClients.length}
        </Text>
      </IncomeInfo>

      <IncomeInfo style={{ padding: "20px" }}>
        <Text variant="black14" color={tokens.colors.primaryDark3}>
          {t("reports.total_male_clients")}
        </Text>

        <Text variant="black14" color={tokens.colors.primary}>
          {maleClients.length}
        </Text>
      </IncomeInfo>
    </IncomeWrapper>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding: 10px 20px;
`;

const IncomeWrapper = styled.div`
  border: 1px solid ${tokens.colors.primaryLight3};
  background: ${tokens.colors.fff};
  padding: 10px;
  border-radius: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const IncomeInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  background: ${tokens.colors.primaryLight4};
`;

export default Income;
