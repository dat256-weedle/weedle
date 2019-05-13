import { action, reaction } from "mobx";
import { inject, observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import MapView, { MapEvent, Region } from "react-native-maps";
import { Store } from "../../backend/store/Store";
import {  IPosition } from "../../types";
import RentPage from "../rentpage/RentPage";
import daymodeStyle from "./MapStyleDay.json";
import nightmodeStyle from "./MapStyleNight.json";
import ParkingSpotMarker from "./ParkingSpotMarker";

/**
 * @param nightmode: dark mode enabled or not
 */
interface IProps {
    store?: Store;
    nightmode?: boolean;
}

/**
 * @field width: stupid hack for android https://github.com/react-native-community/react-native-maps/issues/1033
 * @field renderRentPage: if true render a RentPage on top of map
 */
interface IState {
    width: number;
    renderRentPage: boolean;
}

// Δlatitude & Δlongitude for initial map position
const defaultLatLong = 0.092;

@inject("store")
@observer
export default class ParkingSpotMap extends React.Component<IProps, IState> {
    private store: Store;
    private theMap = React.createRef<MapView>();
    private currentRegion?: Region;

    constructor(props: IProps) {
        super(props);
        this.store = this.props.store!; // Since store is injected it should never be undefined
        this.state = {
            width: 1,
            renderRentPage: false
        };
    }

    public render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderMap()}
                {this.state.renderRentPage && this.renderRentPage()}
            </View>
        );
    }

    public componentDidMount() {
        // Move view to user's current location
        navigator.geolocation.getCurrentPosition(position => {
            this.theMap.current!.animateToRegion(
                {
                    latitude: position.coords.latitude,
                    latitudeDelta: defaultLatLong,
                    longitude: position.coords.longitude,
                    longitudeDelta: defaultLatLong
                },
                1
            );
        });

        // When a new parking spot is selected if this.positionIsInCurrentRegion returns false for the new parking spot
        // then move the map to center on the new parking spot
        reaction(
            () => this.store.selectedParkingSpot,
            parkingSpot => {
                if (
                    parkingSpot &&
                    !this.positionIsInCurrentRegion(parkingSpot.position)
                ) {
                    this.theMap.current!.animateToCoordinate(
                        parkingSpot.position
                    );
                }
            }
        );
    }

    /**
     * Render a rent page based on the selectedParkingSpot from the store
     */
    private renderRentPage() {
        return (
            <RentPage parkingSpot={this.store.selectedParkingSpot!} onCloseButtonPress={() => this.setState({ renderRentPage: false })} />
        )
    }

    /**
     * Render the map
     */
    private renderMap() {
        return (
            <MapView
                provider={"google"}
                style={{
                    alignItems: "center",
                    flex: 1,
                    marginBottom: this.state.width,
                    // position: 'absolute',
                    justifyContent: "center",
                }}
                // Show user location button isn't implemented with Apple MapKit => use google instead
                ref={this.theMap}
                mapPadding={{ top: 1, right: 1, bottom: 1, left: 1 }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                pitchEnabled={false}
                onRegionChangeComplete={region => (this.currentRegion = region)}
                onPress={e => this.onPressEvent(e as any)}
                customMapStyle={
                    this.props.nightmode ? nightmodeStyle : daymodeStyle
                }
                // Stupid hack to make the 'show user location' button appear on android
                // from https://github.com/react-native-community/react-native-maps/issues/1033
                onMapReady={() => this.setState({ width: 0 })}
            >
                {this.store.allParkingSpotsList.map(parkingSpot => {
                    return (
                        <ParkingSpotMarker
                            parkingSpot={parkingSpot}
                            key={parkingSpot.id}
                            isSelected={this.store.selected === parkingSpot.id}
                        />
                    );
                })}
            </MapView>
        );
    }

    /**
     * Method for when the user touches the map
     */
    @action
    private onPressEvent = (
        e: MapEvent<{ action: "marker-press"; id: string }>) => {
        // Identifier for ParkingSpotMarkers are set to their id
        const { id } = e.nativeEvent;
        // If the user pressed on a parking spot marker
        if (id) {
            // select the parking spot
            this.store.selected = id;
            // render the RentPage
            this.setState({ renderRentPage: true });
        }
    };

    /**
     * Checks if the position is in the current map region
     */
    private positionIsInCurrentRegion = (position: IPosition) => {
        if (!this.currentRegion) {
            return false;
        }

        const {
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
        } = this.currentRegion;
        
        const latMax = latitude + latitudeDelta / 2;
        const latMin = latitude - latitudeDelta / 2;
        const lonMax = longitude + longitudeDelta / 2;
        const lonMin = longitude - longitudeDelta / 2;

        if (position.latitude > latMax || position.latitude < latMin) {
            return false;
        }
        if (position.longitude > lonMax || position.longitude < lonMin) {
            return false;
        }
        return true;
    };
}
