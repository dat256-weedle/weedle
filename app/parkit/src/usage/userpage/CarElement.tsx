import { observer } from "mobx-react";
import React, { Component } from "react";
import {Image, Text, TouchableOpacity, View } from "react-native";
import { Store } from "../../backend/store/Store";

interface ICustomInputProps {
    reg: string;
    store: Store;
}

interface IState {
    reg: string;
}

@observer
export default class CarElement extends Component<ICustomInputProps, IState> {
  constructor(props: ICustomInputProps) {
    super(props);
    this.state = {
        reg: props.reg,
    };
  }

    public render() {
        return (
            <View style={{alignItems: "center", flexDirection: "column",
                justifyContent: "flex-start", marginBottom: 10, marginLeft: 10}}>
                <Image source={require("../../../assets/car.png")} style={{width: 50, height: 50}}/>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Text style={{fontWeight: "bold"}}>{this.props.reg}</Text>
                    <View>
                    <TouchableOpacity onPress={() => this.props.store.removeCar(this.props.reg)}>
                        <Image source={require("../../../assets/delete.png")} style={{height: 20, marginBottom: 5,
                            marginLeft: 5,  width: 20}}/>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
