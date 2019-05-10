import { inject, observer } from "mobx-react";
import React from "react";
import { Image, Text, View, Picker, StyleSheet } from "react-native";
import { Button } from "react-native-material-ui";
import { IParkingSpot } from "types";
import { Store } from "../../backend/store/Store";
import RentButton from "./RentButton";
import { getLogo } from '../logoloader/LogoLoader';
import RNPickerSelect from 'react-native-picker-select';

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
            selectedCar: "steve"
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
                <RentButton id={id} />
                <View>
                    <RNPickerSelect
                        placeholder={{}}
                        items={hasCars ? this.store.theCars.map((car) =>({value: car, label: car})) : [{value: "nocar", label: "No Cars"}]}
                        onValueChange={value => {
                            this.setState({
                                selectedCar: value,
                            });
                        }}
                        style={pickerSelectStyles}
                        value={this.state.selectedCar}
                    />
                </View>
            </View>
        );

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
