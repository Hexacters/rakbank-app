import { Image, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function HomeScreen() {

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ffffff', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/rakbank.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ color: 'green' }}>Successfully Submitted!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <Image
          source={require('@/assets/images/success.png')}
          style={{resizeMode: 'contain', width: '100%', height: 350}}
        />
        <ThemedText style={{textAlign: 'center'}}>
          Our <ThemedText type="defaultSemiBold">representative</ThemedText> will get in touch with you shortly
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: '100%',
    bottom: 0,
    left: 0,
    resizeMode: 'contain',
    position: 'absolute',
  },
});
