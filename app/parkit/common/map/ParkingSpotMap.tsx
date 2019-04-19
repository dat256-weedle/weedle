import { inject, observer } from 'mobx-react';
import React from 'react';
import MapView from 'react-native-maps';
import { Store } from '../../Store';
import ParkingSpotMarker from './ParkingSpotMarker';

interface IProps {
	store?: Store;
	nightmode?: boolean;
}

interface IState {
	width: string;
}

@inject('store')
@observer
export default class ParkingSpotMap extends React.Component<IProps, IState> {
	private store: Store;
	private theMap = React.createRef<MapView>();
	private defaultLatLong = 0.092;
	private daymodeStyle = require('./MapStyleDay.json');
	private nightmodeStyle = require('./MapStyleNight.json');

	constructor(props: IProps) {
		super(props);
		this.store = this.props.store!; // Since store is injected it should never be undefined
		this.state = {
			width: '99%'
		};
	}

	public render() {
		return (
			<MapView
				style={{
					alignItems: 'center',
					flex: 1,
					width: this.state.width
				}}
				// Show user location button isn't implemented with Apple MapKit => use google instead
				provider={'google'}
				ref={this.theMap}
				mapPadding={{ top: 1, right: 1, bottom: 1, left: 1 }}
				showsUserLocation={true}
				showsMyLocationButton={true}
				customMapStyle={this.props.nightmode ? this.nightmodeStyle : this.daymodeStyle}
				/**
                 * Stupid hack to make the 'show user location' button appear on android
                 * from https://github.com/react-native-community/react-native-maps/issues/1033
                 */
				onMapReady={() => this.setState({ width: '100%' })}
			>
				{this.store.allParkingSpots.map((parkingSpot) => <ParkingSpotMarker parkingSpot={parkingSpot} key={parkingSpot.id} />)}
			</MapView>
		);
	}

	public componentDidMount() {
		// Move view to user's current location
		navigator.geolocation.getCurrentPosition((position) => {
			this.theMap.current!.animateToRegion(
				{
					latitude: position.coords.latitude,
					latitudeDelta: this.defaultLatLong,
					longitude: position.coords.longitude,
					longitudeDelta: this.defaultLatLong
				},
				1
			);
		});
	}
}
