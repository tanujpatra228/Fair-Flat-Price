import { useRef } from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { Colors } from 'react-native/Libraries/NewAppScreen';

const InfoContent = ({ content, isConnected }) => {
    const videoRef = useRef();
    const isDarkMode = useColorScheme() === 'dark';
    const descriptionArray = content?.description.split('--');

    const handleVideoReady = () => {
        videoRef.current.seekTo(content?.timestamp, true);
    }

    return (
        <View>
            <Text style={[styles.sectionTitle, { color: isDarkMode ? Colors.white : Colors.black }]}>
                {content?.title}
            </Text>
            {
                Array.isArray(descriptionArray) && descriptionArray.map((paragraph, i) => (
                    <Text key={i} style={[styles.paragraph, { color: isDarkMode ? Colors.white : Colors.black }]}>{paragraph?.trim()}</Text>
                ))
            }
            {
                !!content?.video && isConnected && (
                    <View style={{marginTop: 12}}>
                        <YoutubePlayer
                            ref={videoRef}
                            height={250}
                            videoId={content?.videoId}
                            onReady={handleVideoReady}
                        />
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    paragraph: {
        fontSize: 15,
        marginBottom: 4
    },
    image: {
        borderWidth: 1,
        borderColor: '#FFF',
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
});

export default InfoContent;