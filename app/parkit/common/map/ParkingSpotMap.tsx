import React from "react";
import MapView, { Marker } from "react-native-maps";
import { Store } from "../../Store";
import { observer, inject } from "mobx-react";

interface IProps {
    store?: Store;
}

@inject("store")
@observer
export default class ParkingSpotMap extends React.Component<IProps, {}> {

    private store: Store;

    constructor(props: IProps) {
        super(props);
        this.store = this.props.store!; // Since store is injected it should never be undefined
    }

    public render() {
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 37.78825,
                    latitudeDelta: 0.0922,
                    longitude: -122.4324,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation = {true}>
                {this.store.allParkingSpots.map(pSpot => (
                    <Marker
                        coordinate={pSpot.position}
                        key={pSpot.id}
                    />
                ))}

            </MapView>
        );
    }

}
