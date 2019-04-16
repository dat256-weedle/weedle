import React from "react";
// import MapView from "react-native-maps";
import { MapView } from 'expo';
import { Store } from "../../Store";

interface IProps {
    store?: Store;
}

export default class Map extends React.Component<IProps, {}> {

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
              }}/>
        );
    }

}
