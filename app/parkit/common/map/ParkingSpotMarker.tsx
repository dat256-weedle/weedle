import React from 'react';
import { Marker } from 'react-native-maps';
import { getLogo } from '../../LogoLoader'
import {
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import { IParkingSpot } from '../../types/ParkingSpots';
import { AnimatedValue } from 'react-navigation';

interface IProps {
  parkingSpot: IParkingSpot;
  isSelected: boolean;
}

class ParkingSpotMarker extends React.Component<IProps, {}> {

  private selectedAnimation: AnimatedValue = new Animated.Value(0);

  componentDidUpdate() {
    if (this.props.isSelected) {
      Animated.timing(this.selectedAnimation, {
        toValue: 1,
        duration: 600,
      }).start()
    } else {
      this.selectedAnimation.setValue(0);
    }
  }


  render() {

    let background = this.selectedAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#FFFFFF', '#4da2ab'],
    });

    let border = this.selectedAnimation.interpolate({
      outputRange: ['#D23F44', '#007a87'],
      inputRange: [0, 1],
    });

    let paddingHorizontal = this.selectedAnimation.interpolate({
      outputRange: [4, 8 * 1.1, 4 * 2],
      inputRange: [0, 0.7, 1],
    });

    let paddingVertical = this.selectedAnimation.interpolate({
      outputRange: [2, 4 * 1.1, 4],
      inputRange: [0, 0.7, 1],
    });

    let { position, owner, id } = this.props.parkingSpot;
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
                paddingHorizontal: paddingHorizontal,
                paddingVertical: paddingVertical,
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
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  image: { maxHeight: 30, maxWidth: 40, resizeMode: "contain" },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    borderColor: '#000000',
    borderWidth: 0.5,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 4,
    borderTopColor: '#FFFFFF',
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 4,
    borderTopColor: '#000000',
    alignSelf: 'center',
    marginTop: -0.5,
  },
  selectedBubble: {
    backgroundColor: '#4da2ab',
    borderColor: '#007a87',
  },
  selectedArrow: {
    borderTopColor: '#4da2ab',

  },
  selectedArrowBorder: {
    borderTopColor: '#007a87',
  },
});

export default ParkingSpotMarker;