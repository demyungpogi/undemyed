import { CustomColors } from "@/constants/ThemeConstants";
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function HomeTabSvg(props: SvgProps) {
    return (
        <Svg
            width={25}
            height={24}
            viewBox="0 0 25 24"
            fill="none"
            {...props}
        >
            <Path
                d="M12.625 18v-3M10.694 2.82l-6.93 5.55c-.78.62-1.28 1.93-1.11 2.91l1.33 7.96c.24 1.42 1.6 2.57 3.04 2.57h11.2c1.43 0 2.8-1.16 3.04-2.57l1.33-7.96c.16-.98-.34-2.29-1.11-2.91l-6.93-5.54c-1.07-.86-2.8-.86-3.86-.01z"
                stroke={CustomColors.medium}
                strokeOpacity={0.77}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

