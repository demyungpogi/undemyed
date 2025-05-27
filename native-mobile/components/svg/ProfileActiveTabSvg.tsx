import { CustomColors } from "@/constants/ThemeConstants";
import Svg, { Path, SvgProps } from "react-native-svg";

/**
 * DOCU: Render bill service dashboard icon. <br>.
 * Triggered: on render dashboard. <br>.
 * Last Updated Date: August 26, 2024
 * @author Noel
 */
export default function ProfileActiveTabSvg(props: SvgProps) {
    return (
        <Svg
            width={33}
            height={33}
            viewBox="0 0 33 33"
            fill="none"
            {...props}
        >
            <Path
                d="M9.598 27.143c1.093-1.173 2.76-1.08 3.72.2l1.346 1.8c1.08 1.427 2.827 1.427 3.907 0l1.347-1.8c.96-1.28 2.626-1.373 3.72-.2 2.373 2.533 4.306 1.693 4.306-1.853V10.263c.014-5.373-1.24-6.72-6.28-6.72h-10.08c-5.04 0-6.293 1.347-6.293 6.72v15.013c0 3.56 1.947 4.387 4.307 1.867zM11.42 15.542h.011"
                stroke={CustomColors.primary}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M15.156 15.543h7.334"
                stroke={CustomColors.primary}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M11.42 10.21h.011"
                stroke={CustomColors.primary}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M15.156 10.207h7.334"
                stroke={CustomColors.primary}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}
