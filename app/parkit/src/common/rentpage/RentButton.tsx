import { action } from "mobx";
import { inject, observer } from "mobx-react";
import moment from "moment";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-material-ui";
import { IParkingSpot } from "types";
import { Store } from "../../backend/store/Store";

/**
 * session: preliminary parking session
 * store: the store, injected with @inject
 */
interface IProps {
    isBooked: boolean;
    parkingSpot: IParkingSpot;
    car?: string;
    endDate?: Date;
    store?: Store;
}

/**
 * Button for renting a parking spot.
 * Text will change between 'Rent' and 'Finish' based on if the parking spot with session.id = props.id is rented or not.
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
        const {isBooked, endDate, car} = this.props;
        return (
            <View>
                <Button raised primary 
                    disabled={(!(isBooked || !(!car || !endDate)))} 
                    text={!isBooked ? "rent" : "finish"} 
                    onPress={!isBooked ? this.rent : this.finish} 
                    />
            </View>
        );

    }

    /**
     * Push parking spot to store
     */
    @action
    private rent = () => {
        this.store.currentParkingSessions.push({
            parkingSpot: this.props.parkingSpot,
            car: this.props.car!,
            endTime: this.props.endDate!,
            startTime: moment().toDate(),
        });
    };

    /**
     * Remove the parking spot from store
     */
    @action
    private finish = () => {
        this.store.currentParkingSessions = this.store.currentParkingSessions.filter(
            (item) => this.props.parkingSpot.id !== item.parkingSpot.id
        );
    };
}


