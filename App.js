// import React, { useState, useEffect, useCallback } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import * as SplashScreen from 'expo-splash-screen';
// import {
//   useFonts,
//   Fraunces_400Regular,
//   Fraunces_700Bold,
//   PublicSans_400Regular,
//   PublicSans_700Bold,
// } from '@expo-google-fonts/fraunces';

// // Prevent the splash screen from auto-hiding
// SplashScreen.preventAutoHideAsync();

// export default function App() {
//   const [appIsReady, setAppIsReady] = useState(false);
//   const [verse, setVerse] = useState('Loading...');

//   let [fontsLoaded] = useFonts({
//     Fraunces_400Regular,
//     Fraunces_700Bold,
//     PublicSans_400Regular,
//     PublicSans_700Bold,
//   });

//   useEffect(() => {
//     async function prepare() {
//       try {
//         console.log('Preparing app...');
//         // Pre-load data
//         await fetchVerse();
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         console.log('App is ready.');
//         setAppIsReady(true);
//       }
//     }

//     prepare();
//   }, []);

//   const fetchVerse = async () => {
//     try {
//       const response = await fetch('https://book-of-mormon-api.vercel.app/random');
//       const data = await response.json();
//       setVerse(`${data.reference} - ${data.text}`);
//       console.log('Fetched verse:', `${data.reference} - ${data.text}`);
//     } catch (error) {
//       setVerse('Failed to load verse. Please try again.');
//       console.error('Error fetching verse:', error);
//     }
//   };

//   const onLayoutRootView = useCallback(async () => {
//     if (appIsReady && fontsLoaded) {
//       console.log('Hiding splash screen...');
//       await SplashScreen.hideAsync();
//     }
//   }, [appIsReady, fontsLoaded]);

//   if (!appIsReady || !fontsLoaded) {
//     console.log('App is not ready or fonts not loaded.');
//     return null;
//   }

//   return (
//     <View style={styles.container} onLayout={onLayoutRootView}>
//       <Text style={styles.header}>Random Book of Mormon Verse</Text>
//       <Text style={styles.verse}>{verse}</Text>
//       <View style={styles.footer}>
//         <Text>Created by UplandWave | 2024 | Under open source license</Text>
//         <TouchableOpacity onPress={() => alert('This website provides a random verse from the Book of Mormon each time you refresh the page to help you read the word of God as often as possible.')}>
//           <Text style={styles.infoIcon}>&#9432;</Text>
//         </TouchableOpacity>
//         <Text style={styles.right}>Using <Text style={styles.link} onPress={() => alert('https://github.com/BraydenTW/book-of-mormon-api?tab=readme-ov-file')}>book-of-mormon-api</Text></Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E8E6E3',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 30,
//   },
//   header: {
//     fontSize: 30,
//     fontFamily: 'Fraunces_700Bold',
//     color: '#36211B',
//     textAlign: 'center',
//   },
//   verse: {
//     fontSize: 20,
//     marginTop: 20,
//     textAlign: 'left',
//   },
//   footer: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     backgroundColor: '#7991B1',
//     padding: 10,
//     alignItems: 'center',
//   },
//   infoIcon: {
//     fontSize: 14,
//     color: 'white',
//   },
//   right: {
//     position: 'absolute',
//     right: 15,
//     paddingRight: 30,
//     color: 'white',
//   },
//   link: {
//     textDecorationLine: 'underline',
//     color: 'white',
//   },
// });


import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [verse, setVerse] = useState('Loading...');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    async function prepare() {
      try {
        console.log('Preparing app...');
        // Pre-load data
        await fetchVerse();
      } catch (e) {
        console.warn(e);
      } finally {
        console.log('App is ready.');
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const fetchVerse = async () => {
    try {
      const response = await fetch('https://book-of-mormon-api.vercel.app/random');
      const data = await response.json();
      setVerse(`${data.reference} - ${data.text}`);
      console.log('Fetched verse:', `${data.reference} - ${data.text}`);
    } catch (error) {
      setVerse('Failed to load verse. Please try again.');
      console.error('Error fetching verse:', error);
    }
  };

  const openModal = () => {
    setModalText('This app provides a random verse from the Book of Mormon to help you read the word of God as often as possible.');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getNewVerse = () => {
    fetchVerse();
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      console.log('Hiding splash screen...');
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    console.log('App is not ready.');
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.verseContainer}>
      <Text style={styles.header}>Random Book of Mormon Verse</Text>
        <Text style={styles.verse}>{verse}</Text>
        <TouchableOpacity style={styles.newVerseButton} onPress={getNewVerse}>
          <Text style={styles.buttonText}>Get New Verse</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>UplandWave | 2024</Text>
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.infoIcon}>&#9432;</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.popUpText}>{modalText}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E6E3',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#36211B',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  verseContainer: {
    borderWidth: 1,
    borderColor: '#7991B1',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  verse: {
    fontSize: 18,
    color: '#333',
    // textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  newVerseButton: {
    backgroundColor: '#7991B1',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign:'center',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#7991B1',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  footerText: {
    color: 'white',
    fontSize: 14,
  },
  infoIcon: {
    fontSize: 18,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#7991B1',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  popUpText: {
    fontSize: 18,
    // alignItems: 'center'
  }
});