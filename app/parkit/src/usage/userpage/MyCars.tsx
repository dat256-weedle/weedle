import React from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CarElement from "./CarElement";

interface IState {
    theCars: string[];
    temp: string;
    showAdd: boolean;
}

export default class NewCars extends React.Component <any, IState> {
    constructor(props: null) {
        super(props);
        this.state = { theCars: [], temp: "", showAdd: true};
    }

    public onPressSave = () => {
        const temp = this.state.temp;
        this.state.theCars.push(temp);
        this.setState({
            ...this.state,
            theCars: this.state.theCars,
        });
        if (this.state.theCars.length === 4) {
            this.setState({
                ...this.state,
                showAdd: false,
            });
        }
    }

    public onDelete = (x: any) => {
        const index = this.state.theCars.indexOf(x);
        const temp1 = this.state.theCars.splice(index, 1);
        this.setState({
            ...this.state,
            theCars: temp1},
        );
        if (this.state.theCars.length === 0) {
                        this.setState({
                ...this.state,
                showAdd: true,
            });
        }
    }

    public render() {
        if (this.state.showAdd) {
            return (
                <View style= {{alignItems: "center", backgroundColor: "white", flexDirection: "column",
                justifyContent: "center", marginTop: 20}}>
                    <View style= {{alignItems: "center"}}>
                        <Text style={styles.carTitle}>My Cars </Text>
                    </View>
                    <View style= {{flexDirection: "row"}}>
                        {this.state.theCars.map((reg: string, index: string | number | undefined) => (
                            <CarElement sendReg={reg} onDelete={this.onDelete.bind(this)} key={index}></CarElement>
                        ))}

                        <View style={{alignItems: "center", flexDirection: "column",
                        justifyContent: "flex-start", marginLeft: 10}}>
                            <Image source={require("../../assets/plus.png")} style={{height: 20, marginBottom: 2,
                                marginTop: 20, width: 20}}/>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <TextInput style={{height: 40}}
                                    placeholder="Enter Reg"
                                    onChangeText={(text) => this.setState({temp: text})}/>
                                <TouchableOpacity onPress={this.onPressSave}>
                                    <Image source={require("../../assets/save.png")} style={{ height: 20,
                                        marginLeft: 5, width: 20}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
        return (
            <View style= {{alignItems: "center", backgroundColor: "white", flexDirection: "column",
            justifyContent: "center", marginTop: 20}}>
                    <View style= {{alignItems: "center"}}>
                        <Text style={styles.carTitle}>My Cars </Text>
                    </View>
                    <View style= {{flexDirection: "row"}}>
                        {this.state.theCars.map((car: string, index: string | number | undefined) => (
                            <CarElement sendReg={car} onDelete={this.onDelete.bind(this)} key={index}></CarElement>
                        ))}
                    </View>
                </View>
        );
    }
}
const styles = StyleSheet.create({
    carTitle: {
        color: "rgb(100,210,110)",
        fontSize: 20,
        fontWeight: "bold",
    },
});
