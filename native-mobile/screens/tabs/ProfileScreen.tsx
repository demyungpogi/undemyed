import { globalStyles } from '@/stylesheets/global.stylesheet';
import { Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Link } from 'expo-router';
import UserLottie from "@/assets/lottie/wired-outline-avatar.lottie.json";

export default function ProfileScreen() {
    return (
        <View style={globalStyles.container}>
            
            <LottieView source={UserLottie} autoPlay loop style={{width: 300, height: 150}}/>
            
            <Text style={globalStyles.title}>User Profile</Text>
            <Link href="https://lordicon.com/" style={globalStyles.link}>Icons by Lordicon.com</Link>
        </View>
    );
}