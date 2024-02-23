import React from 'react';
import { Modal, ScrollView, StyleSheet, TouchableWithoutFeedback, View, useColorScheme } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const AnimatedTouchableWithoutFeedback = Animated.createAnimatedComponent(TouchableWithoutFeedback);

const InfoSheet = ({ isVisible = false, closeModal, children, content }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleOverlayPress = (e) => {
    // Close the modal when the overlay is pressed
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <AnimatedTouchableWithoutFeedback
        onPress={handleOverlayPress}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <View style={styles.sheetContainer}>
          <Animated.View
            style={[backgroundStyle, styles.sheetBody]}
            entering={SlideInDown.springify().damping(17)}
            exiting={SlideOutDown.springify().damping(17)}
          >
            <ScrollView>
              {children}
            </ScrollView>
          </Animated.View>
        </View>
      </AnimatedTouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
    sheetContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#00000020'
    },
    sheetBody: {
      width: '100%',
      // minHeight: '50%',
      padding: 24,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
});

export default InfoSheet;

