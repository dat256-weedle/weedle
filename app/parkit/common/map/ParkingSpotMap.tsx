import { inject, observer } from "mobx-react";
import React, { RefObject } from "react";
import MapView, { Marker } from "react-native-maps";
import { Store } from "../../Store";

interface IProps {
    store?: Store;
}

interface IState {
    width: string;
}

@inject("store")
@observer
export default class ParkingSpotMap extends React.Component<IProps, IState> {

    private store: Store;
    private theMap = React.createRef<MapView>();
    private defaultLatLong = 0.092;

    constructor(props: IProps) {
        super(props);
        this.store = this.props.store!; // Since store is injected it should never be undefined
        this.state = {
            width: "99%",
        };

    }

    public render() {
        return (
            <MapView
                style={{
                    alignItems: "center",
                    flex: 1,
                    width: this.state.width,
                }}
                // Show user location button isn't implemented with Apple MapKit => use google instead
                provider={"google"}
                ref={this.theMap}
                mapPadding={{ top: 1, right: 1, bottom: 1, left: 1 }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsBuildings={false}
                showsIndoorLevelPicker={false}
                showsPointsOfInterest={false}
                showsTraffic={false}
                /**
                 * Stupid hack to make the 'show user location' button appear on android
                 * from https://github.com/react-native-community/react-native-maps/issues/1033
                 */
                onMapReady={() => this.setState({ width: "100%" })}>
                {this.store.allParkingSpots.map((pSpot) => (
                    <Marker
                        coordinate={pSpot.position}
                        key={pSpot.id}
                    />
                ))}

            </MapView>
        );
    }

    public componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.theMap.current!.animateToRegion({
                    latitude: position.coords.latitude,
                    latitudeDelta: this.defaultLatLong,
                    longitude: position.coords.longitude,
                    longitudeDelta: this.defaultLatLong,
            }, 1);
        });
    }

}
