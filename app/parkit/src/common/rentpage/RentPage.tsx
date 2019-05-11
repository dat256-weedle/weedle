import { inject, observer } from "mobx-react";
import moment from "moment";
import React from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import DatePicker from "react-native-datepicker"
import RNPickerSelect from "react-native-picker-select";
import { IParkingSpot } from "types";
import { Store } from "../../backend/store/Store";
import { getLogo } from "../logoloader/LogoLoader";
import RentButton from "./RentButton";
import { Divider } from 'react-native-material-ui';


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
            <ScrollView style={{ backgroundColor: "silver" }}>
                    <View style={styles.bigBox}>
                        <Text style={styles.titleText}>{name}</Text>
                        <View style={styles.subBox}>
                            <View>
                                <Text style={styles.sectionTitleText}>Price</Text>
                                <Text style={styles.text}>{price}</Text>
                                <Text style={styles.sectionTitleText}>Distance</Text>
                                <Text style={styles.text}>{distance}</Text>
                            </View>
                            <Image source={getLogo(provider)} style={styles.imageMap} />
                        </View>

                        <Divider />
                        <Text style={styles.descriptionText}>{description}</Text>
                        <Divider />

                        <Text style={styles.sectionTitleText}>Car</Text>
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
                        <Text style={styles.sectionTitleText}>End date</Text>
                        <DatePicker
                            style={{ width: "100%", height: "auto", paddingBottom: 20 }}
                            date={this.state.endDate}
                            mode="datetime"
                            placeholder="Select time"
                            minDate={moment().format()}
                            maxDate=""
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            is24hour={true}
                            onDateChange={(datestr: string, date: any) => { this.setState({ endDate: date }) }}
                            getDateStr={(date: string) => this.getCalendarDateFormat(date)}
                            showIcon={false}
                        />
                        <Divider />

                        <RentButton id={id} disabled={!(hasCars && this.state.endDate)} />
                        <Image source={getLogo(provider)} style={styles.image} />



                    </View>
            </ScrollView>
        );

    }

    public getCalendarDateFormat = (date: string) => {
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

    public updateUser = (user: string) => {
        this.setState({ selectedCar: user })
    }
}


const styles = StyleSheet.create({

    image: {
        flex: 1,
        height: 50,
        width: "40%",
        alignSelf: "center",
        resizeMode: "contain",
    },
    imageMap: {
        maxWidth: "40%",
        height: "auto",
        resizeMode: "contain"
    },

    text: {
        fontSize: 20,
        textAlign: "left",
    },

    sectionTitleText: {
        fontSize: 25,
        textAlign: "left",
        paddingTop: 10
    },

    descriptionText: {
        fontSize: 20,
        textAlign: "left",
        margin: 20
    },

    bigBox: {
        margin: 10,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },

    subBox: {
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 10,
        marginTop: 5,
        marginBottom: 5
    },

    titleText: {
        fontSize: 30,
        textAlign: "center"

    },

});

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
