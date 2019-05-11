import { inject, observer } from "mobx-react";
import React from "react";
import { Image, Text, View, Picker, StyleSheet } from "react-native";
import { Button } from "react-native-material-ui";
import { IParkingSpot } from "types";
import { Store } from "../../backend/store/Store";
import RentButton from "./RentButton";
import { getLogo } from '../logoloader/LogoLoader';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';


/**
 * id: id of the parking spot
 * store: the store, injected with @inject
 */
interface IProps {
    parkingSpot: IParkingSpot;
    store?: Store;
}

interface IState {
    selectedCar: string;
    endDate?: any;
}

/**
 * Button for renting a parking spot.
 * Text will change between 'Rent' and 'Finish' based on if the parking spot with id = props.id is rented or not.
 * @param IProps id of the parking spot.
 */
@inject("store")
@observer
export default class RentPage extends React.Component<IProps, IState> {
    private store: Store;

    constructor(props: IProps) {
        super(props);
        this.store = this.props.store!; // Since store is injected it should never be undefined
        this.state = {
            selectedCar: "nocar",

        }
    }

    public render() {

        const { name, description, distance, provider, price, id } = this.props.parkingSpot;
        const hasCars = this.store.theCars.length !== 0;
        return (
            <View style={{ flex: 1 }}>
                <Text>{name}</Text>
                <Text>{description}</Text>
                <Text>{distance}</Text>
                <Image source={getLogo(provider)} style={styles.image} />
                <Text>{price}</Text>
                <RNPickerSelect
                    placeholder={{}}
                    items={hasCars ? this.store.theCars.map((car) => ({ value: car, label: car })) : [{ value: "nocar", label: "No Cars" }]}
                    onValueChange={value => {
                        this.setState({
                            selectedCar: value,
                        });
                    }}
                    style={pickerSelectStyles}
                    value={this.state.selectedCar}
                />
                <DatePicker
                    style={{ width: 200 }}
                    date={this.state.endDate}
                    mode="datetime"
                    placeholder="Select time"
                    minDate={moment().format()}
                    maxDate=""
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    is24hour={true}
                    onDateChange={(datestr: string, date) => { this.setState({ endDate: date }) }}
                    getDateStr={(date: string) => this.getCalendarDateFormat(date)}
                />

                <RentButton id={id} disabled={!(hasCars && this.state.endDate)} />

            </View>
        );

    }

    getCalendarDateFormat = (date: string) => {
        const formatDate = moment(date).calendar(undefined, {
            lastDay: '[Yesterday at] HH:mm',
            sameDay: '[Today at] HH:mm',
            nextDay: '[Tomorrow at] HH:mm',
            lastWeek: '[last] dddd [at] HH:mm',
            nextWeek: 'dddd [at] HH:mm',
            sameElse: 'YYYY/MM/DD [at] HH:mm'
        });

        return (formatDate);
    }

    updateUser = (user: string) => {
        this.setState({ selectedCar: user })
    }
}


const styles = StyleSheet.create({

    image: { maxHeight: 30, maxWidth: 40, resizeMode: "contain" },
    selectedArrow: {
        borderTopColor: "#4da2ab"
    },

    text: {
        fontSize: 30,
        alignSelf: 'center',
        color: 'red'
    }

});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'red',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
