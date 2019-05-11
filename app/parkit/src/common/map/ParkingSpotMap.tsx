import { action, reaction } from "mobx";
import { inject, observer } from "mobx-react";
import React from "react";
import MapView, { MapEvent, Region } from "react-native-maps";
import { Store } from "../../backend/store/Store";
import { IParkingSpot, IPosition } from "../../types";
import daymodeStyle from "./MapStyleDay.json";
import nightmodeStyle from "./MapStyleNight.json";
import ParkingSpotMarker from "./ParkingSpotMarker";
import RentPage from '../rentpage/RentPage';

interface IProps {
    store?: Store;
    nightmode?: boolean;
}

interface IState {
    width: number;
    renderRentPage: boolean;
    selectedImage?: string;
}

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
        return (this.state.renderRentPage ? this.renderRentPage() : this.renderMap());
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

    private snapShotParkingSpot(parkingSpot: IParkingSpot, callback: (file: string) => any) {
        this.theMap.current!.animateToRegion({ ...parkingSpot.position, latitudeDelta: defaultLatLong /4, longitudeDelta: defaultLatLong /4 }, 1)
        this.theMap.current!.takeSnapshot({
            width: 300,      // optional, when omitted the view-width is used
            height: 300,     // optional, when omitted the view-height is used
            format: "png",   // image formats: 'png', 'jpg' (default: 'png')
            quality: 0.8,    // image quality: 0..1 (only relevant for jpg, default: 1)
            result: "base64"   // result types: 'file', 'base64' (default: 'file')
        }).then((image: string) => {
            callback(image);
        })
    }

    private renderRentPage() {
        return (
            <RentPage parkingSpot={this.store.selectedParkingSpot!} image={this.state.selectedImage} />
        )
    }

    private renderMap() {
        return (
            <MapView
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

    @action
    private onPressEvent = (
        e: MapEvent<{ action: "marker-press"; id: string }>
    ) => {
        const { id } = e.nativeEvent;

        if (id) {
            this.store.selected = id;
            this.snapShotParkingSpot(this.store.allParkingSpots.get(id)!, (image: string) => { this.setState({ renderRentPage: true, selectedImage: image }) });
        }
    };

    /**
     * Checks if
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
