import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function IcProfile({ color, size }: { color: string; size: number }) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
      <G fill={color}>
        <Path d="M16,6C16,8.209 14.209,10 12,10C9.791,10 8,8.209 8,6C8,3.791 9.791,2 12,2C14.209,2 16,3.791 16,6ZM20,16.5C20,19.538 16.418,22 12,22C7.582,22 4,19.538 4,16.5C4,13.462 7.582,11 12,11C16.418,11 20,13.462 20,16.5Z" />
      </G>
    </Svg>
  );
}
export default IcProfile;
