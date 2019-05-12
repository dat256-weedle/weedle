import { Ionicons } from "@expo/vector-icons";
import { inject, observer } from "mobx-react";
import moment from "moment";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import DatePicker from "react-native-datepicker"
import { Divider } from "react-native-material-ui";
import RNPickerSelect from "react-native-picker-select";
import { IParkingSpot } from "types";
import { Store } from "../../backend/store/Store";
import { getLogo } from "../logoloader/LogoLoader";
import { snapshotMap } from "../mapsnapshotter/MapSnapshotter";
import RentButton from "./RentButton";

/**
 * @param parkingSpot: the selected parking spot
 * @callback onCloseButtonPress: when the close button is pressed
 * @param store: the store, injected with @inject
 */
interface IProps {
    parkingSpot: IParkingSpot;
    onCloseButtonPress: () => void;
    store?: Store;
}

/**
 * @field selectedCar: the car the user has selected
 * @field endDate: the end date the user has selected
 */
interface IState {
    selectedCar: string;
    endDate?: Date;
}

/**
 * Fullscreen page for showing details about a parking spot and renting it
 */
@inject("store")
@observer
export default class RentPage extends React.Component<IProps, IState> {
    private store: Store;

    constructor(props: IProps) {
        super(props);
        this.store = this.props.store!; // Since store is injected it should never be undefined
        // checks if the parking spot from props is in the currentParkingSessions in the store
        const isParked = (this.store.currentParkingSessions.find((item) => item.parkingSpot.id === this.props.parkingSpot.id));
        this.state = {
            selectedCar: isParked ? isParked.car : "",
            endDate: isParked ? isParked.endTime : undefined
        }
    }

    public render() {

        const { name, description, distance, provider, price, id } = this.props.parkingSpot;
        const isParked = (this.store.currentParkingSessions.find((item) => item.parkingSpot.id === id));
        const image = snapshotMap(this.props.parkingSpot);
        return (
            <View style={{ flex: 1, justifyContent: "center", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "white" }}>

                <ScrollView style={{ flexGrow: 1 }}>
                    <View style={styles.bigBox}>
                        <Text style={styles.titleText}>{name}</Text>
                        <View style={styles.subBox}>
                            <View>
                                <Text style={styles.sectionTitleText}>Price</Text>
                                <Text style={styles.text}>{price}</Text>
                                <Text style={styles.sectionTitleText}>Distance</Text>
                                <Text style={styles.text}>{distance}</Text>
                            </View>
                            {image && <Image source={{ uri: image }} style={styles.imageMap} />}
                        </View>

                        <Divider />
                        <Text style={styles.descriptionText}>{description}</Text>
                        <Divider />

                        <Text style={styles.sectionTitleText}>Car</Text>
                        {this.carSelector(!!isParked)}
                        <Text style={styles.sectionTitleText}>End date</Text>
                        {this.endDatePicker(!!isParked)}
                        <Divider />

                        <RentButton
                            isParked={!!isParked}
                            parkingSpot={this.props.parkingSpot}
                            car={this.state.selectedCar}
                            endDate={this.state.endDate}
                        />
                        <Image source={getLogo(provider)} style={styles.image} />

                    </View>
                </ScrollView>
                <View style={{ alignItems: "flex-end", padding: 10, position: "absolute", top: 0, right: 0, zIndex: 10 }}>
                    <Ionicons name="md-close" size={32} onPress={this.props.onCloseButtonPress} ></Ionicons>
                </View>
            </View>
        );

    }
    /**
     * Returns a calendar version a the date (e.g. (2019/05/12, 15:13) => (Today: 15:13))
     * @param date: a Date
     */
    public getCalendarDateFormat = (date: Date) => {
        const formatDate = moment(date).calendar(undefined, {
            lastDay: "[Yesterday at] HH:mm",
            sameDay: "[Today at] HH:mm",
            nextDay: "[Tomorrow at] HH:mm",
            lastWeek: "[last] dddd [at] HH:mm",
            nextWeek: "dddd [at] HH:mm",
            sameElse: "YYYY/MM/DD [at] HH:mm"
        });

        return (formatDate);
    }

    /**
     * Component to pick day, hour, and minute of when to end the parking session.
     * Date is read and saved in the state.endDate
     * @param isParked has the user already parked on the parking spot, disables component if true
     */
    private endDatePicker(isParked: boolean) {
        return (
            <DatePicker
                style={{ width: "100%", height: "auto", paddingBottom: 20, borderRadius: 4, }}
                date={this.state.endDate}
                mode="datetime"
                placeholder="Select time"
                minDate={moment().toDate()}
                maxDate={moment().add("1 week").toDate()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                is24Hour={true}
                onDateChange={(datestr: string, date: any) => { this.setState({ endDate: date }) }}
                getDateStr={(date: Date) => this.getCalendarDateFormat(date)}
                showIcon={false}
                disabled={isParked}
            />
        );
    }

    /**
     * Selector for cars. Reads cars from store, saves the user choice in state.car
     * @param isParked has the user already parked on the parking spot, disables component if true
     */
    private carSelector(isParked: boolean) {
        const hasCars = this.store.theCars.length !== 0;
        return (
            <RNPickerSelect
                placeholder={{ value: "", label: "Select car" }}
                items={hasCars ? this.store.theCars.map((car) => ({ value: car, label: car })) : [{ value: "", label: "No Cars" }]}
                onValueChange={value => {
                    this.setState({
                        selectedCar: value,
                    });
                }}
                style={!!isParked ? pickerSelectStylesDisabled : pickerSelectStyles}
                value={this.state.selectedCar}
                disabled={isParked}
            />
        )
    }
}


const styles = StyleSheet.create({
    /**
     * Stylesheet for the bottom provider logo
     */
    image: {
        flex: 1,
        height: 50,
        width: "40%",
        alignSelf: "center",
        resizeMode: "contain",
    },
    /**
     * Stylesheet for the map snapshot
     */
    imageMap: {
        flex: 2,
        width: 200,
        height: 200,
        resizeMode: "contain",

    },
    /**
     * Stylesheet for price and distance
     */
    text: {
        flex: 1,
        width: 200,
        fontSize: 20,
        textAlign: "left",
    },
    /**
     * Stylesheet for section titles (e.g. Car, End Date)
     */
    sectionTitleText: {
        fontSize: 25,
        textAlign: "left",
        paddingTop: 10
    },
    /**
     * Stylesheet for description text
     */
    descriptionText: {
        fontSize: 20,
        textAlign: "left",
        margin: 20
    },
    /**
     * Stylesheet for the main view
     */
    bigBox: {
        padding: 10,
        backgroundColor: "white",
    },
    /**
     * Stylesheet for horizontal box
     */
    subBox: {
        justifyContent: "space-between",
        width: "100%",
        flexDirection: "row",
        padding: 10,
        marginTop: 5,
        marginBottom: 5
    },
    /**
     * Stylesheet for parking spot title
     */
    titleText: {
        fontSize: 30,
        textAlign: "center"

    },

});

/**
 * Stylesheet for car picker
 */
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 4,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: "red",
        borderRadius: 8,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

/**
 * Stylesheet for disabled car picker
 */
const pickerSelectStylesDisabled = StyleSheet.create({
    inputIOS: { ...pickerSelectStyles.inputIOS, backgroundColor: "#F5F5F5" },
    inputAndroid: { ...pickerSelectStyles.inputAndroid, backgroundColor: "#F5F5F5" },
});
