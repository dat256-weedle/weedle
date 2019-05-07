import React from "react";
import { Image, StyleSheet, Text, View, ViewProps } from "react-native";

interface IProps extends ViewProps {
    /** The distance to the parking space */
    distance: number;
    /** The price of the parking space */
    price: number;
    /** The id of the parking space */
    id: string;
}

const RowItem = (element: React.ReactElement) => {
    return (<View style={{ flexGrow: 1 }}>{element}</View>);
};
/**
 * ParkingElement is a component that shows parking space information
 */
export default class ParkingElement extends React.Component<IProps> {

    /**
     * @param props the props of the parking element
     */
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { distance, price, id } = this.props;
        const style = StyleSheet.create({
            container: {
                borderBottomWidth: 1,
                borderColor: "gray",
                borderStyle: "solid",
                flex: 1,
                flexDirection: "row",
                maxHeight: 50,
            },
            image: { maxHeight: 40, maxWidth: 40, marginLeft: 15 },
            textstyle: { marginTop: 15, fontWeight: "bold" },
        });
        return (<View style={style.container} >
            {RowItem(<Image source={require("../../assets/carpark.png")} style={style.image} />)}
            {RowItem(<Text style={style.textstyle}>ID: {id} </Text>)}
            {RowItem(<Text style={style.textstyle}>Distance: {distance} km</Text>)}
            {RowItem(<Text style={style.textstyle}>Price: {price} kr/h</Text>)}
        </View >);
    }
}
