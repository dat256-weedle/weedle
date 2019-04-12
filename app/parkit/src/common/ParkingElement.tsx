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
            Image: { maxHeight: 40, maxWidth: 40, marginLeft: 15 },
            TextStyle: { marginTop: 15, fontWeight: "bold" },
        });
        return (<View style={{
            borderBottomWidth: 1,
            borderColor: "gray",
            borderStyle: "solid",
            flex: 1,
            flexDirection: "row",
            maxHeight: 50,
        }} >
            {RowItem(<Image source={require("../../assets/carpark.png")} style={style.Image} />)}
            {RowItem(<Text style={style.TextStyle}>ID: {id} </Text>)}
            {RowItem(<Text style={style.TextStyle}>Distance: {distance} km</Text>)}
            {RowItem(<Text style={style.TextStyle}>Price: {price} kr/h</Text>)}
        </View >);
    }
}

/*                 {distance ?
                    }
                Distance: {this.props.distance} {"\n"}
                Address: {this.props.address} {"\n"}
                Price: {this.props.price} {"\n"}
                Rules: {this.props.rules} {"\n"}
                Provider: {this.props.provider} {"\n"}
                <Image
                    source={require("../../assets/carpark.png")}
                    style={{width: 40, height: 40}}
                /> */
