import LoadingLottie from "@/assets/lottie/loading.lottie.json";
import { globalStyles } from '@/stylesheets/global.stylesheet';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';
const SplashScreen = () => {
    return (
        <View style={globalStyles.container}>
            <LottieView source={LoadingLottie} autoPlay loop style={{width: 300, height: 150}}/>
        </View>
    );
};

export default SplashScreen;
