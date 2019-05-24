import { action } from "mobx";
import { inject, observer } from "mobx-react";
import moment from "moment";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-material-ui";
import { IParkingSession, IParkingSpot } from "types";
import { Store } from "../../backend/store/Store";
import { bigfont, primarycolor } from "../../styles";

/**
 * @param isParked: has the user already booked the parking spot
 * @param store: the store, injected with @inject
 * @param car: the selected car
 * @param endDate: the selected end date
 * @param parkingSpot: the selected parking spot
 */
interface IProps {
    isParked: boolean;
    parkingSpot: IParkingSpot;
    car?: string;
    store?: Store;
    finishAction: () => void;
}

/**
 * Button for renting a parking spot.
 * Text will change between 'Rent' and 'Finish' based on isParked
 */
@inject("store")
@observer
export default class RentButton extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { isParked, car } = this.props;
        return (
            <View>
                <Button
                    raised
                    primary
                    disabled={!car && !isParked}
                    text={!isParked ? "rent" : "end parking"}
                    onPress={!isParked ? this.rent : this.finish}
                    style={{
                        container: {
                            backgroundColor: primarycolor,
                            margin: 5,
                            padding: 5,
                            height: 60
                        },
                        text: {
                            color: "white",
                            fontSize: bigfont
                        }
                    }}
                />
            </View>
        );
    }

    /**
     * Push parking session based on props to store
     */
    @action
    private rent = () => {
        this.props.store!.currentParkingSessions.push({
            parkingSpot: this.props.parkingSpot,
            car: this.props.car!,
            endTime: moment().toDate(),
            startTime: moment().toDate()
        });
    };

    /**
     * Remove the parking session based on props from store
     */
    @action
    private finish = () => {
        this.props.store!.currentParkingSessions = this.props.store!.currentParkingSessions.filter(
            (item: IParkingSession) => {
                if (this.props.parkingSpot.id === item.parkingSpot.id) {
                    item.endTime = moment().toDate();
                    this.props.store!.oldParkingSessions.push(item);
                    return false;
                }
                return true;
            }
        );
        this.props.finishAction();
    };
}
