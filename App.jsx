/**
 * Fair Flat Price
 * 
 */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme
} from 'react-native';
import YoutubePlayer, { getYoutubeMeta } from 'react-native-youtube-iframe';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import NetInfo from "@react-native-community/netinfo";
import Calculator from './src/Calculator';
import AdBanner from './src/components/AdBanner';
import SplashScreen from 'react-native-splash-screen'

const VIDEO_ID = 'qCMFlfBTWks'; // https://youtu.be/qCMFlfBTWks (LLA video link)

function Section({ children, title }){
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(){
  const [videoMetaData, setVideoMetaData] = useState({title:''});
  const [isConnected, setConnected] = useState(true);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    if (isConnected) {
      getYoutubeMeta(VIDEO_ID).then((metaData) => {
        setVideoMetaData(metaData);
      }).catch(error => {
        console.log('error', error);      
      });
    }
  }, [isConnected]);

  useEffect(() => {
    // Hide Splash Screen
    SplashScreen.hide();

    // Add event listner for network
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected);
    });

    // Cleanup the event listener for network
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            paddingHorizontal: 24,
            paddingBottom: 70,
          }}>

          {isConnected && (<View style={{marginTop: 12}}>
              <YoutubePlayer
                height={200}
                videoId={VIDEO_ID}
              />
              <Text style={{fontWeight: '500', color: isDarkMode ? Colors.light : Colors.dark}}>{videoMetaData?.title || ''}</Text>
          </View>)}
            
          <View style={styles.calculatorSection}>
            <Calculator isConnected={isConnected} />
          </View>

          <Section title="Fair Market Value of Property">
            This app is designed to calculate the approximate profit share that the builder is adding to a property, the calculation is inspired by a YouTube video from LLA. Labour Law Advisor (LLA) team is not responsible for the development and maintainance of this app.
          </Section>
          <Text style={{ marginTop: 4, color: isDarkMode ? Colors.light : Colors.dark }}>Numbers from this app should only be used for information purposes only.</Text>
          <Text style={{ marginTop: 12, textAlign:'center', color: isDarkMode ? Colors.light : Colors.dark }}>Version 1.0.1</Text>
        </View>
      </ScrollView>
      {isConnected && <AdBanner />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  calculatorSection: {
    marginTop: 18
  },
});

export default App;
