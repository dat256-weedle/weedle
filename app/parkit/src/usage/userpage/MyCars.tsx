import { action } from "mobx";
import { inject, observer } from "mobx-react";
import React from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Store } from "../../backend/store/Store";
import CarElement from "./CarElement";

interface IState {
    temp: string;
    showAdd: boolean;
}

interface IProps {
    store?: Store;
}

@inject("store")
@observer
export default class NewCars extends React.Component <IProps, IState> {
    private store: Store;

    constructor(props: IProps) {
        super(props);
        this.state = { temp: "", showAdd: true};
        this.store = this.props.store!;
    }

    @action
    public onPressSave = () => {
        const temp = this.state.temp;
        this.store.theCars.push(temp);
        if (this.store.theCars.length === 4) {
            this.setState({
                ...this.state,
                showAdd: false,
            });
        }
    }

    @action
    public onDelete = (x: any) => {
        const index = this.store.theCars.indexOf(x);
        const temp1 = this.store.theCars.splice(index, 1);
        if (this.store.theCars.length === 0) {
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
                        {this.store.theCars.map((reg: string, index: string | number | undefined) => (
                            <CarElement sendReg={reg} onDelete={this.onDelete.bind(this)} key={index}></CarElement>
                        ))}

                        <View style={{alignItems: "center", flexDirection: "column",
                        justifyContent: "flex-start", marginLeft: 10}}>
                            <Image source={require("../../../assets/plus.png")} style={{height: 20, marginBottom: 2,
                                marginTop: 20, width: 20}}/>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <TextInput style={{height: 40}}
                                    placeholder="Enter Reg"
                                    onChangeText={(text) => this.setState({temp: text})}/>
                                <TouchableOpacity onPress={this.onPressSave}>
                                    <Image source={require("../../../assets/save.png")} style={{ height: 20,
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
                        {this.store.theCars.map((car: string, index: string | number | undefined) => (
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
