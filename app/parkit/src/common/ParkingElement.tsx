import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface IProps {
    distance: number;
    address?: string;
    price: number;
    rules?: string;
    provider?: string;
    image?: string;
    id: string;
}

const RowItem = (props: any) => {
    return (<View style={{ flexGrow: 1 }}>{props}</View>);
};

export default class ParkingElement extends React.Component<IProps> {
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
