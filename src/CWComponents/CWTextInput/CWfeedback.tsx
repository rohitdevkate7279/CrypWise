import { View } from "react-native";
import React from "react";
import { IconColor } from "../CWIcon.types";

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
  feedbackSize = FeedbackSize.XS,
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
        return "feedback_error_80";
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
        {/* <JioIcon
          ic={getIcon()}
          size={feedbackSize === FeedbackSize.S ? IconSize.MEDIUM : IconSize.SMALL}
          color={getIconColor()}
        ></JioIcon>
        <JioText
          style={{ flex: 1 }}
          appearance={
            feedbackSize === FeedbackSize.S
              ? JioTypography.BODY_S
              : JioTypography.BODY_XS
          }
          text={stateText}
          maxLines={5}
          color={getStateTextColor() as keyof ColorToken}
        ></JioText> */}
      </View>
    )
  );
};

export default Feedback;
