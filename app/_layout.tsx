import CustomHeader from '@/components/CustomHeader';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack, useNavigation } from 'expo-router';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// GestureHandlerRootView is required in recent version
// https://github.com/gorhom/react-native-bottom-sheet/issues/1389
export default function RootLayoutNav() {
  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ header: CustomHeader }} />
          <Stack.Screen
            name='(modal)/filter'
            options={{
              presentation: 'modal',
              headerTitle: 'Filter',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: Colors.lightGrey,
              },
              headerLeft: () => CloseIcon(() => navigation.goBack())
            }} />
          <Stack.Screen
            name='(modal)/location-search'
            options={{
              presentation: 'fullScreenModal',
              headerTitle: 'Select location',
              headerLeft: () => CloseIcon(() => navigation.goBack())
            }} />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const CloseIcon = (onPressCB: () => void) => (
  <TouchableOpacity onPress={onPressCB}>
    <Ionicons
      name='close-outline'
      size={28}
      color={Colors.primary} />
  </TouchableOpacity>
);
