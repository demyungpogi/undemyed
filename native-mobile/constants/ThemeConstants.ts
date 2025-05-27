/* COLORS */
export const primary_base = "#128AF9";
export const darkest_base = "#162635";
export const medium_base = "#4C5E6F";
export const light_base = "#F4F7FB";
export const lightest_base = "#FFFFFF";
export const app_red_base = "#FF6B6B";
export const app_green_base = "#128AF9";
export const bg_dark_green_base = "#128AF9" 
export const app_yellow_base = "#F7CA3E";
export const app_blue_base = "#128AF9";
export const app_purple_base = "#8935BC";
export const dark_base = "#233545";
export const app_orange = "#FB923C";
export const primary_60_base = "#95DEB6";
export const app_yellow_50_base = "#EAB30880"

export const CustomColors = {
    primary: primary_base,
    primary_60: primary_60_base,
    primary_15: `${primary_base}26`,
    darkest: darkest_base,
    darkest_80: `${darkest_base}CC`,
    darkest_60: `${darkest_base}99`,
    dark: dark_base,
    medium: medium_base,
    medium_60: `${medium_base}99`,
    medium_50: `${medium_base}80`,
    medium_40: `${medium_base}66`,
    medium_35: `${medium_base}59`,
    medium_20: `${medium_base}33`,
    medium_10: `${medium_base}1A`,
    light: light_base,
    light_80: `${light_base}CC`,
    lightest: lightest_base,
    lightest_75: `${lightest_base}BF`,
    lightest_20: `${lightest_base}33`,
    app_red: app_red_base,
    app_red_50: `${app_red_base}80`,
    app_red_10: `${app_red_base}1A`,
    app_green: app_green_base,
    app_green_50: `${app_green_base}80`,
    app_green_10: `${app_green_base}1A`,
    app_green_5: `${app_green_base}0D`,
    bg_dark_green: bg_dark_green_base,
    app_yellow: app_yellow_base,
    app_yellow_50: app_yellow_50_base,
    app_orange: app_orange,
    app_blue: app_blue_base,
    app_blue_50: `${app_blue_base}80`,
    app_purple: app_purple_base,
};

/* FONTS */
export const fontConfig = {
    /* Display */
    "displaySmall": {   
        "fontSize": 36,
        "fontWeight": "400",
        "letterSpacing": 0,
        "lineHeight": 44,
    },
    "displayMedium": {
        "fontSize": 45,
        "fontWeight": "400",
        "letterSpacing": 0,
        "lineHeight": 52,
    },
    "displayLarge": {  
        "fontSize": 57,
        "fontWeight": "400",
        "letterSpacing": 0,
        "lineHeight": 64,
    },

    /* Headlines */
    /* Inter-Bold 16 */
    "headlineSmall": {        
        "fontSize": 16,
        "fontWeight": "700",
        "letterSpacing": 0,
        "lineHeight": 24,
    },

    /* Inter-Bold 20 */
    "headlineMedium": {
        "fontSize": 20,
        "fontWeight": "700",
        "letterSpacing": 0,
        "lineHeight": 30,
    },
    /* Inter-Bold 24 */
    "headlineLarge": {
        "fontSize": 24,
        "fontWeight": "700",
        "letterSpacing": 0,
        "lineHeight": 36,
    },

    /* Title */
    /* Inter-Bold 12 */
    "titleSmall": {
        "fontSize": 12,
        "fontWeight": "700",
        "letterSpacing": 0,
        "lineHeight": 18,
    },
    /* Inter-Bold 14 */
    "titleMedium": {
        "fontSize": 14,
        "fontWeight": "700",
        "letterSpacing": 0,
        "lineHeight": 21,
    },
    /* Inter-Bold 16 */
    "titleLarge": {           
        "fontSize": 16,
        "fontWeight": "700",
        "letterSpacing": 0,
        "lineHeight": 24,
    },

    /* Label */
    /* Inter-Regular 10 */
   "labelSmall": {
        "fontSize": 10,
        "fontWeight": "400",
        "letterSpacing": 0,
        "lineHeight": 15,
    },
    /* Inter-Regular 14 */
    "labelMedium": { 
        "fontSize": 14,
        "fontWeight": "400",
        "letterSpacing": 0,
        "lineHeight": 22,
    },
    /* Inter-Regular 16 */
    "labelLarge": {
        "fontSize": 16,
        "fontWeight": "400",
        "letterSpacing": 0,
        "lineHeight": 24,
    },

    /* Body */
    /* Inter-Regular 10 */
    "bodySmall": {
        "fontSize": 10,
        "fontWeight": "400",
        "letterSpacing": 0,
        "lineHeight": 15,
    },
    /* Inter-Regular 12 */
    "bodyMedium": {        
        "fontSize": 12,
        "fontWeight": "400",
        "letterSpacing": 0,
        "lineHeight": 18,
    },
    /* Inter-Regular 14 */
    "bodyLarge": {     
        "fontSize": 14,
        "fontWeight": "400",
        "letterSpacing": 0,
        "lineHeight": 22,
    },
} as const;

export const baseFont = {
    fontFamily: "Inter_400Regular",
} as const;

export const SVG_DIMENSIONS = {
    PH_FLAG: { height: 20, width: 28 },
    LOGIN_PAYCHAT_LOGO: { height: 48.52, width: 185.25},
    MPIN_PAYCHAT_LOGO: { height: 31.17, width: 119},
    OTP_PAYCHAT_LOGO: { height: 42.83, width: 163.52},
}

export const LINEAR_GRADIENT = {
    AUTH_SCREEN: {
        start: { x: 0, y: 0},
        end: { x: 1, y: 1 }
    }
}

export const MPIN_ANIMATION_DURATION = {
    WARNING_TEXT: {
        entering: 150,
        exiting: 50
    }
}

export const ONBOARDING_ITEM_HEIGHT = 419;