import { CustomColors } from "@/constants/ThemeConstants";
import { MD3LightTheme as light_theme } from "react-native-paper";

export type ThemeColorsType = typeof CustomColors & typeof light_theme.colors;