import { inject, observer } from "mobx-react";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-material-ui";
import { Store } from "../../backend/store/Store";

/**
 * id: id of the parking spot
 * store: the store, injected with @inject
 */
interface IProps {
    id: string;
    disabled: boolean;
    store?: Store;
}

/**
 * Button for renting a parking spot.
 * Text will change between 'Rent' and 'Finish' based on if the parking spot with id = props.id is rented or not.
 * @param IProps id of the parking spot.
 */
@inject("store")
@observer
export default class RentButton extends React.Component<IProps, {}> {
    private store: Store;

    constructor(props: IProps) {
        super(props);
        this.store = this.props.store!; // Since store is injected it should never be undefined
    }

    public render() {
        // if the parking spot is not rented return a 'rent' button

        const isBooked = this.store.bookedParkingSpots.find((item: string) => item === this.props.id) === undefined;
        return (
            <View>
                <Button raised primary disabled={this.props.disabled} text={isBooked ? "book" : "finish"} onPress={isBooked ? this.rent : this.finish} />
            </View>
        );

    }

    /**
     * Push parking spot to store
     */
    private rent = () => {
        this.store.bookParkingSpot(this.props.id);
    };

    /**
     * Remove the parking spot from store
     */
    private finish = () => {
        this.store.unBookParkingSpot(this.props.id);
    };
}


