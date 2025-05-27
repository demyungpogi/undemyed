
import { baseFont, CustomColors, fontConfig } from "@/constants/ThemeConstants";
import {  
    configureFonts, 
    MD3LightTheme as light_theme, 
    useTheme as useReactNativePaperTheme 
} from "react-native-paper";

export function useTheme() {
    type AppTheme = typeof theme;

    const baseVariants = configureFonts({ config: baseFont });
    const useAppTheme = () => useReactNativePaperTheme<AppTheme>();

    /* Add custom theme here. */
    const theme = {
        ...light_theme,
        myOwnProperty: true,
        custom: "property",
        colors: {
            ...light_theme.colors,
            ...CustomColors
        },
        fonts: configureFonts({
            config: {
                ...baseVariants,
                ...fontConfig
            }
        }),
    };
    
    return { theme, useAppTheme };
}