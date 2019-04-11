import React from "react";
import { Text, View } from "react-native";
import { Image } from "react-native";

interface IProps {
    distance: number;
    address: string;
    price: number;
    rules: string;
    provider: string;
    image: string;
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
        return (<View style={{ backgroundColor: "skyblue", flex: 1, flexDirection: "row", maxHeight: 50 }}>
            {RowItem(<Image source={require("../../assets/carpark.png")} style={{ maxHeight: 40, maxWidth: 40, marginLeft: 15}} />)}
            {RowItem(<Text style={{marginTop: 15, fontWeight: 'bold'}}>ID: {id} </Text>)} 
            {RowItem(<Text style={{marginTop: 15, fontWeight: 'bold'}}>Distance: {distance} km</Text>)}
            {RowItem(<Text style={{marginTop: 15, fontWeight: 'bold'}}>Price: {price} kr/h</Text>)}
        </View>);
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
