import React from "react";
import { View } from "react-native";
import { IconColor, IconSize } from "../CWComponents/CWIcons/CWIcon.types";
import { ColorToken } from "../theme/CWColor.types";
import { CWIcon } from "../CWComponents/CWIcons/CWIcon";
import CWText from "../CWComponents/CWText/CWText";
import { CWTypography } from "../CWComponents/CWText/CWTextType";

export interface FeedbackProps {
  state?: FeedbackState;
  stateText?: string;
  feedbackSize?: FeedbackSize;
}

export enum FeedbackSize {
  S = "small",
  XS = "extra_small",
}

export enum FeedbackState {
  CLEAR = "clear",
  WARNING = "warning",
  ERROR = "error",
  SUCCESS = "success",
}

const Feedback = ({
  state,
  stateText,
  feedbackSize = FeedbackSize.S,
}: FeedbackProps) => {
  function getIcon() {
    switch (state) {
      case FeedbackState.ERROR:
        return "IcErrorColored";
      case FeedbackState.WARNING:
        return "IcWarningColored";
      default:
        return "IcSuccessColored";
    }
  }
  function getIconColor() {
    switch (state) {
      case FeedbackState.ERROR:
        return IconColor.ERROR;
      case FeedbackState.WARNING:
        return IconColor.WARNING;
      default:
        return IconColor.SUCCESS;
    }
  }

  function getStateTextColor() {
    switch (state) {
      case FeedbackState.ERROR:
        return "feedback_error_50";
      case FeedbackState.WARNING:
        return "feedback_warning_80";
      case FeedbackState.SUCCESS:
        return "feedback_success_80";
      default:
        return "primary_grey_80";
    }
  }
  return (
    state !== FeedbackState.CLEAR && (
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <CWIcon
          ic={getIcon()}
          size={feedbackSize === FeedbackSize.S ? IconSize.MEDIUM : IconSize.MEDIUM}
          color={getIconColor()}
        ></CWIcon>
        <CWText
          style={{ flex: 1 }}
          appearance={
            feedbackSize === FeedbackSize.S
              ? CWTypography.BODY_L
              : CWTypography.BODY_M
          }
          text={stateText}
          maxLines={5}
          color={getStateTextColor() as keyof ColorToken}
        ></CWText>
      </View>
    )
  );
};

export default Feedback;
