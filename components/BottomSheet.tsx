import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, TouchableOpacity, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { Link } from 'expo-router';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ['50%'], []);
  const renderBackdrop = useCallback((props: any) => (
    <BottomSheetBackdrop
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      {...props} />
  ), []);
  const { dismiss } = useBottomSheetModal();

  return (
    <BottomSheetModal
      ref={ref}
      handleIndicatorStyle={{ display: 'none' }}
      backgroundStyle={{ borderRadius: 0, backgroundColor: Colors.lightGrey }}
      overDragResistanceFactor={0}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}>

      <View style={styles.contentContainer}>
        <View style={styles.toggle}>
          <TouchableOpacity style={styles.toggleActive}>
            <Text style={styles.activeText}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleInactive}>
            <Text style={styles.inactiveText}>Pickup</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subheader}>Your Location</Text>
        <Link href={'/(modal)/location-search'} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              <Ionicons name='location-outline' size={20} color={Colors.medium} />
              <Text style={{ flex: 1 }}>Current location</Text>
              <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
            </View>
          </TouchableOpacity>
        </Link>

        <Text style={styles.subheader}>Arrival Time</Text>
        <Link href={'/'} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              <Ionicons name='stopwatch-outline' size={20} color={Colors.medium} />
              <Text style={{ flex: 1 }}>Now</Text>
              <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
            </View>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.button} onPress={() => dismiss()} >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  toggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 32,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 30
  },
  activeText: {
    color: 'white',
    fontWeight: '700',
  },
  toggleInactive: {
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 30
  },
  inactiveText: {
    color: Colors.primary,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 16,
    fontWeight: '600',
    margin: 16,
  },
  item: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
});

export default BottomSheet;
