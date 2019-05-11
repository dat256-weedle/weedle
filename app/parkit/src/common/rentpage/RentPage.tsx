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
import RentButton from "./RentButton";


/**
 * id: id of the parking spot
 * store: the store, injected with @inject
 */
interface IProps {
    parkingSpot: IParkingSpot;
    store?: Store;
    image?: string;
}

interface IState {
    selectedCar: string;
    endDate?: Date;
}


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
        const isParked = !(this.store.bookedParkingSpots.find((item: string) => item === id) === undefined);
        const image = this.props.image;
        return (
            <View style={{flex: 1, justifyContent : "center"}}>
            <ScrollView style={{flexGrow: 1}}>
                    <View style={styles.bigBox}>
                        <Text style={styles.titleText}>{name}</Text>
                        <View style={styles.subBox}>
                            <View>
                                <Text style={styles.sectionTitleText}>Price</Text>
                                <Text style={styles.text}>{price}</Text>
                                <Text style={styles.sectionTitleText}>Distance</Text>
                                <Text style={styles.text}>{distance}</Text>
                            </View>   
                            {image && <Image source={{uri: image}} style={styles.imageMap} />}
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
                            style={isParked ? pickerSelectStylesDisabled : pickerSelectStyles}
                            value={this.state.selectedCar}
                            disabled={isParked}
                        />
                        <Text style={styles.sectionTitleText}>End date</Text>
                        <DatePicker
                            style={{ width: "100%", height: "auto", paddingBottom: 20, borderRadius: 4, }}
                            date={this.state.endDate}
                            mode="datetime"
                            placeholder="Select time"
                            minDate={moment().format()}
                            maxDate=""
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            is24Hour={true}
                            onDateChange={(datestr: string, date: any) => { this.setState({ endDate: date }) }}
                            getDateStr={(date: Date) => this.getCalendarDateFormat(date)}
                            showIcon={false}
                            disabled={isParked}
                        />
                        <Divider />

                        <RentButton id={id} disabled={!(hasCars && this.state.endDate)} />
                        <Image source={getLogo(provider)} style={styles.image} />



                    </View>
            </ScrollView>
            </View>
        );

    }

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
        flex: 2,
        maxWidth: "40%",
        height: "auto",
        resizeMode: "contain",

    },

    text: {
        flex: 1,
        width: 200,
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
        padding: 10,
        backgroundColor: "white",
    },

    subBox: {
        justifyContent: "space-between",
        width: "100%",
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

const pickerSelectStylesDisabled = StyleSheet.create({
    inputIOS: {...pickerSelectStyles.inputIOS, backgroundColor: "#F5F5F5"},
    inputAndroid: {...pickerSelectStyles.inputAndroid, backgroundColor: "#F5F5F5"},
});
