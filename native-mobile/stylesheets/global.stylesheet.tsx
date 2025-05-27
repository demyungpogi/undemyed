import { defaultBackground } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: defaultBackground,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        fontSize: 14,
        color: '#2e78b7',
    },  
});