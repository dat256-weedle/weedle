import React from "react";
import MapView, { Marker } from "react-native-maps";
import { Store } from "../../Store";
import { observer, inject } from "mobx-react";

interface IProps {
    store?: Store;
}

interface IState {
    width: string,
}

@inject("store")
@observer
export default class ParkingSpotMap extends React.Component<IProps, IState> {

    private store: Store;

    constructor(props: IProps) {
        super(props);
        this.store = this.props.store!; // Since store is injected it should never be undefined
        this.state = {
            width: "99%",
        };
    }

    public render() {
        console.log(this.state)
        return (
            <MapView
                style={{ 
                    alignItems: "center",
                    flex: 1,
                    width: this.state.width,
                }}
                // Show user location button isn't implemented with MapKit => use google instead
                provider={"google"}
                initialRegion={{
                    latitude: 37.78825,
                    latitudeDelta: 0.0922,
                    longitude: -122.4324,
                    longitudeDelta: 0.0421,
                }}
                mapPadding = {{top: 1, right: 1, bottom: 1, left: 1}}
                showsUserLocation = {true}
                showsMyLocationButton = {true}

                /**
                 * Stupid hack to make the 'show user location' button appear on android
                 *  from https://github.com/react-native-community/react-native-maps/issues/1033
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

}
