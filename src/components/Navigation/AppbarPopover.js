import React from "react";
import moment from "moment";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { useLogout } from "../../hooks/useLogout";
import { tokens } from "../UI/tokens";

// Project imports
import FlexCenter from "../UI/FlexCenter";
import Text from "../UI/Text";
import CalendarIcon from "../icons/CalendarIcon";
import SecretIcon from "../icons/SecretIcon";
import SettingsIcon from "../icons/SettingsIcon";
import SignoutIcon from "../icons/SignoutIcon";
import TimeIcon from "../icons/TimeIcon";
import ClientsIcon from "../icons/ClientsIcon";
import NotesIcon from "../icons/NotesIcon";

const AppbarPopover = ({ user, setVisible }) => {
  const navigate = useNavigate();

  const { documents } = useCollection("users");

  const { logout } = useLogout();

  const { t } = useTranslation();

  // Function to close popover and redirect to settings page
  const pushToSettings = () => {
    setVisible(false);
    navigate("/settings");
  };

  // Function to close popover and redirect to admin page
  const pushToAdminPage = () => {
    setVisible(false);
    navigate("/admin");
  };

  // Function to close popover and redirect to home page
  const pushToHome = () => {
    setVisible(false);
    navigate("/");
  };

  // Function to close popover and redirect to clients page
  const pushToClients = () => {
    setVisible(false);
    navigate("/clients");
  };

  // Function to close popover and redirect to reports page
  const pushToReports = () => {
    setVisible(false);
    navigate("/reports");
  };

  const iconProps = {
    size: 18,
    color: tokens.colors.primaryDark4,
  };

  const timeIconProps = {
    size: 16,
    color: tokens.colors.darkGrey,
  };

  return (
    <>
      <Backdrop onClick={() => setVisible(false)} />
      <Popover>
        <FlexCenter>
          <PopoverTitle>
            <h2>{t("appbar.hello")}</h2>
            {user.displayName}
            <FlexCenter style={{ marginTop: "20px", gap: "10px" }}>
              <FlexCenter style={{ gap: "2px" }}>
                <CalendarIcon {...timeIconProps} />
                <Text variant="medium12" color={tokens.colors.mediumGrey}>
                  {moment().format("YYYY.MM.DD, dddd")}
                </Text>
              </FlexCenter>
            </FlexCenter>
          </PopoverTitle>
        </FlexCenter>

        {documents && documents[0].admin && (
          <>
            <DividerLine />

            <PopoverMenuItem onClick={pushToAdminPage}>
              <PopoverMenuText>
                <SecretIcon {...iconProps} />
                {t("appbar.admin")}
              </PopoverMenuText>
            </PopoverMenuItem>
          </>
        )}

        <DividerLine />

        <PopoverMenuItem onClick={pushToHome}>
          <PopoverMenuText>
            <TimeIcon {...iconProps} />
            {t("navigation.calendar")}
          </PopoverMenuText>
        </PopoverMenuItem>

        <PopoverMenuItem onClick={pushToClients}>
          <PopoverMenuText>
            <ClientsIcon {...iconProps} />
            {t("navigation.clients")}
          </PopoverMenuText>
        </PopoverMenuItem>

        <PopoverMenuItem onClick={pushToReports}>
          <PopoverMenuText>
            <NotesIcon {...iconProps} />
            {t("navigation.reports")}
          </PopoverMenuText>
        </PopoverMenuItem>

        <DividerLine />

        <PopoverMenuItem onClick={pushToSettings}>
          <PopoverMenuText>
            <SettingsIcon {...iconProps} />
            {t("appbar.settings")}
          </PopoverMenuText>
        </PopoverMenuItem>

        <PopoverMenuItem onClick={logout}>
          <PopoverMenuText>
            <SignoutIcon {...iconProps} />
            {t("appbar.logout")}
          </PopoverMenuText>
        </PopoverMenuItem>
      </Popover>
    </>
  );
};

// Styled components

const fadeIn = keyframes`
   0% {
    opacity: 0;
    transform: scale(0.1);
  }

  30% {
    opacity: 0.7;
    transform: scale(1.15);
  }
  
   100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${tokens.colors.primaryDark3};
  opacity: 0.5;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  z-index: 3;
`;

const Popover = styled.div`
  width: 200px;
  background: ${tokens.colors.fff};
  border-radius: 4px;
  border: 1px solid ${tokens.colors.primaryLight3};
  position: absolute;
  right: 0px;
  top: 30px;
  box-shadow: 0 2px 5px rgba(42, 129, 227, 0.15);
  animation: ${fadeIn} 400ms ease;
  user-select: none;
  z-index: 4;
`;

const PopoverTitle = styled.div`
  color: ${tokens.colors.primaryDark1};
  font-size: 12px;
  font-weight: 700;
  padding: 24px;
  text-align: center;

  h2 {
    color: ${tokens.colors.primaryDark3};
  }
`;

const PopoverMenuItem = styled.div`
  text-align: left;
  padding: 12px 12px 12px 8px;
  margin: 8px;
  border-radius: 4px;
  background: ${tokens.colors.white};
  color: ${tokens.colors.primaryDark4};
  cursor: pointer;
  transition: 250ms ease;
  font-weight: 700;
  font-size: 12px;

  &:hover {
    background: ${tokens.colors.primaryLight4};
  }

  &:active {
    background: ${tokens.colors.primaryLight4};
  }
`;

const PopoverMenuText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const DividerLine = styled.div`
  height: 1px;
  width: 100%;
  background: ${tokens.colors.primaryLight4};
`;

export default AppbarPopover;
