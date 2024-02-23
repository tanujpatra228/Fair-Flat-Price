import { View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-3725787040297957/3564392177';

const AdBanner = () => {
  return (
    <View style={{position: 'absolute', bottom: 0}}>
        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
    </View>
  )
}

export default AdBanner;