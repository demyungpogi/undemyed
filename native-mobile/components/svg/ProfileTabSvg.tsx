import { CustomColors } from "@/constants/ThemeConstants"
import * as React from "react"
import Svg, { G, Path, SvgProps } from "react-native-svg"

export default function ProfileTabSvg(props: SvgProps) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      {...props}
    >
      <G
        opacity={0.77}
        stroke={CustomColors.medium}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path
          d="M7.105 20.2c.82-.88 2.07-.81 2.79.15l1.01 1.35c.81 1.07 2.12 1.07 2.93 0l1.01-1.35c.72-.96 1.97-1.03 2.79-.15 1.78 1.9 3.23 1.27 3.23-1.39V7.54c.01-4.03-.93-5.04-4.71-5.04h-7.56c-3.78 0-4.72 1.01-4.72 5.04V18.8c0 2.67 1.46 3.29 3.23 1.4z"
          strokeWidth={1.5}
        />
        <Path d="M8.471 11.5h.01" strokeWidth={2} />
        <Path d="M11.273 11.5h5.5" strokeWidth={1.5} />
        <Path d="M8.471 7.5h.01" strokeWidth={2} />
        <Path d="M11.273 7.5h5.5" strokeWidth={1.5} />
      </G>
    </Svg>
  )
}

