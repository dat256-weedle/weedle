import React from 'react';
import { Marker } from 'react-native-maps';
import {getLogo} from '../../LogoLoader'
import {
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import { IParkingSpot } from '../../types/ParkingSpots';

interface IProps {
  parkingSpot: IParkingSpot
}

class ParkingSpotMarker extends React.Component<IProps, {}> {
  
  render() {
    
    let {position, owner} = this.props.parkingSpot;
    return (
      <Marker coordinate = {position}>
        <Animated.View style={[styles.container]}>
          <Animated.View
            style={[
              styles.bubble
            ]}
          >
          <Image source={getLogo(owner)} style={styles.image}/>
          </Animated.View>
          <Animated.View
            style={[styles.arrowBorder]}
          />
          <Animated.View
            style={[styles.arrow]}
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
    borderRadius: 3,
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