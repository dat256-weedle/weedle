import React, { Component } from "react";
import {Image, Text, TouchableOpacity, View } from "react-native";

interface ICustomInputProps {
    sendReg: string;
    onDelete(reg: any): any;
}

interface IState {
    reg: string;
}

export default class CarElement extends Component<ICustomInputProps, IState> {
  constructor(props: ICustomInputProps) {
    super(props);
    this.state = {
        reg: props.sendReg,
    };
  }

    public onPressDelete = () => {
        this.props.onDelete(this.state.reg);
    }

    public render() {
        return (
            <View style={{alignItems: "center", flexDirection: "column",
                justifyContent: "flex-start", marginBottom: 10, marginLeft: 10}}>
                <Image source={require("../../assets/car.png")} style={{width: 50, height: 50}}/>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Text style={{fontWeight: "bold"}}>{this.state.reg}</Text>
                    <View>
                    <TouchableOpacity onPress={this.onPressDelete}>
                        <Image source={require("../../assets/delete.png")} style={{height: 20, marginBottom: 5,
                            marginLeft: 5,  width: 20}}/>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
