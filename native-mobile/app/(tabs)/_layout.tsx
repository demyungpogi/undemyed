import HomeActiveSvg from '@/components/svg/HomeActiveTabSvg';
import HomeTabSvg from '@/components/svg/HomeTabSvg';
import BillServiceSvg from '@/components/svg/ProfileActiveTabSvg';
import PayBillsTabSvg from '@/components/svg/ProfileTabSvg';
import { CustomColors } from '@/constants/ThemeConstants';
import { ThemeColorsType } from '@/entities/theme.types';
import { useTheme } from '@/hooks/useTheme';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { AddCircle } from "iconsax-react-native";

type BottomTabType = {
    name: string,
    title: string,
    icon?: JSX.Element,
    active_icon?: JSX.Element,
}

export default function TabLayout() {
    const { theme } = useTheme();
    const tab_styles = getTabLayoutStyle(theme.colors);
    const HIDDEN_TABS = ["live", "settings"];
    const MAIN_TAB_KEY = "create";
    const MAIN_TAB_LABEL = "Create";
    const BOTTOM_TAB_ITEMS: BottomTabType[] = [
        {
            name: "home",
            title: "Home",
            icon: <HomeActiveSvg />,
            active_icon: <HomeTabSvg />
        },
        {
            name: MAIN_TAB_KEY,
            title: MAIN_TAB_LABEL,
            icon: <BillServiceSvg height={24} width={24} />,
            active_icon: <PayBillsTabSvg />
        },
        {
            name: "profile",
            title: "Profile",
            icon: <BillServiceSvg height={24} width={24} />,
            active_icon: <PayBillsTabSvg />
        },
    ];
    
    /**
     * A custom tab bar button component to be used for the main tab in the tab layout.
     * @param props The props passed to the component.
     * @returns The component.
     * Last Updated at: Oct 08, 2024 <br>
     * @author Jadee
     */
    const CustomTabBarButton = ({...props}) => {
        return(
            <View style={tab_styles.tab_item_container}>
                <TouchableRipple {...props}>
                    <>
                        <View style={tab_styles.main_tab_bar_icon}>
                            {/* TODO: Replace this button with the app's main button */}
                            <AddCircle size="32" color={CustomColors.lightest}/>
                        </View>
                        <View style={tab_styles.main_tab_icon}>
                            <Text style={[tab_styles.tab_label_inactive, props.accessibilityState.selected ? tab_styles.active_tab_label : tab_styles.inactive_tab_label]}>{MAIN_TAB_LABEL}</Text>
                        </View>
                    </>
                </TouchableRipple>
            </View>
        )
    }
    
    return (
        <Tabs
            screenOptions={{
            headerShown: true,
            tabBarStyle: {
                borderTopStartRadius: 26,
                borderTopEndRadius: 26,
                height: 76,
                position: "absolute",   
                elevation: 8,
            },     
            tabBarLabel({...props}) {
                return <Text style={[tab_styles.tab_bar_style, props.focused ? tab_styles.active_tab_label : tab_styles.inactive_tab_label]}>{props.children}</Text>
            },
            tabBarItemStyle: tab_styles.tab_bar_item_style,      
        }}>
            {
                BOTTOM_TAB_ITEMS.map((tab_item, index) => {
                    const is_main_tab = (tab_item.name === MAIN_TAB_KEY);
                
                    if(!HIDDEN_TABS.includes(tab_item.name)){
                        
                        return(
                            <Tabs.Screen
                                key={`tab_item_${index}`}
                                name={tab_item.name}
                                options={{
                                    title:tab_item.title,               
                                    tabBarIcon: (props) => {
                                        if(!is_main_tab){
                                            return (props.focused) ?  tab_item.icon : tab_item.active_icon; 
                                        }                                     
                                    },
                                    ...(is_main_tab) && {
                                        tabBarButton: (props) => {
                                            if(tab_item.name === MAIN_TAB_KEY){
                                                return <CustomTabBarButton {...props} style={tab_styles.custom_tab_bar_button} />                                    
                                            }
                                            else{
                                                return null
                                            }
                                        }
                                    },
                                    lazy: false,
                                }}
                            />
                        )
                    } 
                    else{
                        return (
                            <Tabs.Screen
                                key={`tab_item_${index}`}
                                name={tab_item.name}
                                options={{
                                    title: tab_item.title,
                                    tabBarButton: () => null,
                                }}                                
                            />
                        );
                    }             
                })
            }
        </Tabs>
    );
}


const getTabLayoutStyle = (colors: ThemeColorsType) => StyleSheet.create({
    custom_tab_bar_button: {
        width: 64,
        height: 64,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
        top: -30,
    },
    tab_label_inactive: {
        fontSize: 12,
        color: colors.medium_50,
    },
    main_tab_icon: {
        position: "absolute",
        bottom: -29,
    },
    main_tab_bar_icon: {
        position: "absolute",
        top: 16,
        left: 16,
    },
    tab_item_container:{
        flex: 1,
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    button_group_container: {
        alignItems: "center",
        justifyContent: "center",
    },
    tab_bar_style: {
        fontSize: 12,
        color: colors.medium_50,
    },
    tab_bar_item_style: {
        gap: 0,
        padding: 8,
    },
    active_tab_label: {
        color: colors.primary,
        fontWeight: "bold",
    },
    inactive_tab_label: {
        color: colors.medium_50
    }
});

