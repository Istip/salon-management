import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { timestamp } from "../../firebase/config";
import { tokens } from "../UI/tokens";
import { capitalize } from "../../utils/capitalize";

// project components
import Form from "../UI/Form";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Text from "../UI/Text";
import UserIcon from "../icons/UserIcon";
import FaceIcon from "../icons/FaceIcon";
import Select from "../UI/Select";
import FlexCenter from "../UI/FlexCenter";
import Slider from "../UI/Slider";
import { toast } from "react-toastify";

const ModalAddEvent = ({ show, setShow, selectedDate, time, setTime }) => {
  const [name, setName] = useState("");
  const [action, setAction] = useLocalStorage("savedActionType", "");
  const [gender, setGender] = useState("male");
  const [late, setLate] = useState(0);

  const { documents } = useCollection("users");

  const { t } = useTranslation();

  const { user } = useAuthContext();

  const { addDocument, response } = useFirestore("events");

  // Resetting the local state back to original
  const resetFields = () => {
    setShow(false);
    setName("");
    setGender("female");
    setLate(0);
  };

  // Function fired when submitting the modal
  const handleSubmit = (e) => {
    e.preventDefault();

    const date = timestamp.fromDate(
      moment(selectedDate)
        .set({ hour: time.slice(0, 2), minute: time.slice(3, 5) })
        .toDate()
    );

    const formattedDate = moment(date.seconds * 1000)
      .add(late, "minutes")
      .format("HH:mm");

    // Object that gonna be published to server
    addDocument({
      name,
      action: action || t("dashboard.no_data"),
      gender,
      finished: false,
      price: 0,
      date,
      uid: user.uid,
      late,
    });

    // Return toast notification
    toast.success(
      `${t("dashboard.added")}: ${
        name || t(`dashboard.${gender}`)
      } ${action} 🕒${formattedDate}.`
    );

    resetFields();
  };

  // Reset input fields on form cancellation
  const handleCancel = () => {
    resetFields();
  };

  // Function to change the time and the minutes
  const changeTime = (type = "hour") => {
    const hour = time.slice(0, 2);
    const minute = time.slice(3, 5);
    const parsedHour = parseInt(hour);

    if (type === "hour") {
      if (parsedHour + 1 < 10) {
        const newTime = `0${parseInt(time.slice(0, 2)) + 1}:${minute}`;
        return setTime(newTime);
      }

      if (parsedHour + 1 >= 10 && parsedHour + 1 < 24) {
        const newTime = `${parseInt(time.slice(0, 2)) + 1}:${minute}`;
        return setTime(newTime);
      }

      const newTime = `00:${minute}`;
      return setTime(newTime);
    }

    if (type === "minute") {
      if (minute === "00") {
        return setTime(`${hour}:30`);
      }

      return setTime(`${hour}:00`);
    }
  };

  // Function to display the minutes with the late added
  const formattedMinutes = () => {
    const minutes = parseInt(late) + parseInt(time.slice(3, 5));
    if (minutes < 10) {
      return `0${minutes}`;
    }
    return minutes;
  };
  useEffect(() => {
    if (response.success) {
      resetFields();
    }
    // eslint-disable-next-line
  }, [response.success]);

  const iconProps = {
    color: tokens.colors.primaryLight1,
  };

  if (!documents) {
    return null;
  }

  const actions = documents ? documents[0].actions : ["haircut"];

  return (
    <Modal
      show={show}
      setShow={setShow}
      title={t("dashboard.new_appointment")}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <FlexCenter style={{ marginTop: "20px", gap: "10px" }}>
        <TimeWrapper>
          <Text variant="display" color={tokens.colors.success} tag="h1">
            <span onClick={() => changeTime()}>{time.slice(0, 2)}:</span>
            <span onClick={() => changeTime("minute")}>
              {formattedMinutes()}
            </span>
          </Text>
        </TimeWrapper>
      </FlexCenter>

      <FlexCenter
        style={{
          gap: "10px",
          padding: "20px 20px 0 20px",
        }}
      >
        <Slider
          label={`${capitalize(t("dashboard.late"))}: ${late} ${t(
            "dashboard.minutes"
          )}`}
          value={late}
          min={0}
          max={29}
          step={5}
          onChange={(e) => setLate(e.target.value)}
        />
      </FlexCenter>

      <Form style={{ padding: "20px 20px 0" }}>
        <Input
          type="text"
          label={t("input.label.client_name")}
          placeholder={t("input.placeholder.client_name")}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={<UserIcon {...iconProps} />}
          autoComplete="off"
        />

        <Select
          label={t("input.label.event_type")}
          selected={action}
          setSelected={setAction}
          list={actions.map((action) => action.name)}
          icon={<FaceIcon color={tokens.colors.primaryLight1} />}
        />

        <GenderWrapper>
          <GenderType
            onClick={() => setGender("female")}
            className={gender === "female" ? "female" : ""}
          >
            <Text
              variant={gender === "female" ? "black12" : "regular12"}
              color={gender === "female" ? white : pink}
            >
              {t("dashboard.female").toUpperCase()}
            </Text>
          </GenderType>

          <GenderType
            onClick={() => setGender("male")}
            className={gender === "male" ? "male" : ""}
          >
            <Text
              variant={gender === "male" ? "black12" : "regular12"}
              color={gender === "male" ? white : primary}
            >
              {t("dashboard.male").toUpperCase()}
            </Text>
          </GenderType>
        </GenderWrapper>
      </Form>
      <br />
    </Modal>
  );
};

const primary = tokens.colors.primary;
const white = tokens.colors.fff;
const pink = tokens.colors.pink;

// styled components
const GenderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background: ${tokens.colors.primaryLight4};
  border-radius: 4px;
  margin-top: 20px;
`;

const GenderType = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 8px 0;
  border-radius: 4px;

  transition: 250ms ease;

  &.male {
    background: ${tokens.colors.primaryLight2};
  }

  &.female {
    background: ${tokens.colors.pink};
  }
`;

const TimeWrapper = styled.span`
  font-feature-settings: "tnum" on, "lnum" on;
`;

export default ModalAddEvent;

// Prop types
ModalAddEvent.propTypes = {
  selectedDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),
  setShow: PropTypes.func,
  show: PropTypes.bool,
  time: PropTypes.string.isRequired,
};
