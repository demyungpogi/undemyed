import { View, Text } from 'react-native';
import { globalStyles } from '@/stylesheets/global.stylesheet';
import LottieView from 'lottie-react-native';
import { Link } from 'expo-router';
import HomeLottie from "@/assets/lottie/wired-outline-home.lottie.json";


export default function HomeScreen() {
    return (
        <View style={globalStyles.container}>
            <LottieView source={HomeLottie} autoPlay loop style={{width: 300, height: 150}}/>
            
            <Text style={globalStyles.title}>Home Screen</Text>
            <Link href="https://lordicon.com/" style={globalStyles.link}>Icons by Lordicon.com</Link>
        </View>
    );
}