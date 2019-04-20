import React from 'react';
import { Animated,Image, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { AnimatedValue } from 'react-navigation';
import { getLogo } from '../../LogoLoader'
import { IParkingSpot } from '../../types/ParkingSpots';

interface IProps {
  parkingSpot: IParkingSpot;
  isSelected: boolean;
}

class ParkingSpotMarker extends React.Component<IProps, {}> {

  private selectedAnimation: AnimatedValue = new Animated.Value(0);

  public componentDidUpdate() {
    if (this.props.isSelected) {
      Animated.timing(this.selectedAnimation, {
        duration: 600,
        toValue: 1,
      }).start()
    } else {
      this.selectedAnimation.setValue(0);
    }
  }


  public render() {

    const background = this.selectedAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#FFFFFF', '#4da2ab'],
    });

    const border = this.selectedAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#D23F44', '#007a87'],
    });

    const paddingHorizontal = this.selectedAnimation.interpolate({
      inputRange: [0, 0.7, 1],
      outputRange: [4, 8 * 1.1, 4 * 2],
    });

    const paddingVertical = this.selectedAnimation.interpolate({
      inputRange: [0, 0.7, 1],
      outputRange: [2, 4 * 1.1, 4],
    });

    const { position, owner, id } = this.props.parkingSpot;
    return (
      <Marker
        coordinate={position}
        identifier={id.toString()}
        zIndex={this.props.isSelected ? 1 : 0}

      >
        <Animated.View style={[styles.container]}>
          <Animated.View
            style={[
              styles.bubble,
              {
                backgroundColor: background,
                borderColor: border,
                paddingHorizontal,
                paddingVertical,
              },
            ]}
          >
            <Image source={getLogo(owner)} style={styles.image} />
          </Animated.View>
          <Animated.View
            style={[styles.arrowBorder, { borderTopColor: border }]}
          />
          <Animated.View
            style={[styles.arrow, { borderTopColor: background }]}
          />
        </Animated.View>
      </Marker>
    );
  }
}

const styles = StyleSheet.create({
  arrow: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#FFFFFF',
    borderWidth: 4,
    marginTop: -9,
  },
  arrowBorder: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#000000',
    borderWidth: 4,
    marginTop: -0.5,
  },
  bubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderRadius: 4,
    borderWidth: 0.5,
    flex: 0,
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  container: {
    alignSelf: 'flex-start',
    flexDirection: 'column',
  },
  image: { maxHeight: 30, maxWidth: 40, resizeMode: "contain" },
  selectedArrow: {
    borderTopColor: '#4da2ab',

  },
  selectedArrowBorder: {
    borderTopColor: '#007a87',
  },
  selectedBubble: {
    backgroundColor: '#4da2ab',
    borderColor: '#007a87',
  },
});

export default ParkingSpotMarker;