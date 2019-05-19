import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
            reg: props.sendReg
        };
    }

    public onPressDelete = () => {
        this.props.onDelete(this.state.reg);
    };

    public render() {
        return (
            <View style={styles.maincontainer}>
                <Image source={require("../../../assets/car.png")} style={styles.image} />
                <View style={styles.secondarycontainer}>
                    <Text style={{ fontWeight: "bold" }}>{this.state.reg}</Text>
                    <View>
                        <TouchableOpacity onPress={this.onPressDelete}>
                            <Image
                                source={require("../../../assets/delete.png")}
                                style={styles.smallimage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    maincontainer: {
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginBottom: 10,
        marginLeft: 10
    },
    secondarycontainer: { 
        flexDirection: "row", 
        alignItems: "center" 
    },
    image: {
        width: 50,
        height: 50
    },
    smallimage: {
        height: 20,
        marginBottom: 5,
        marginLeft: 5,
        width: 20
    },
});
