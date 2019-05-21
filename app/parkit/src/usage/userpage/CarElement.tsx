import { observer } from "mobx-react";
import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Store } from "../../backend/store/Store";

interface ICustomInputProps {
    reg: string;
    store: Store;
}

@observer
export default class CarElement extends Component<ICustomInputProps, {}> {
    constructor(props: ICustomInputProps) {
        super(props);
    }

    public render() {
        return (
            <View style={styles.maincontainer}>
                <Image
                    source={require("../../../assets/car.png")}
                    style={styles.image}
                />
                <View style={styles.secondarycontainer}>
                    <Text style={{ fontWeight: "bold" }}>{this.props.reg}</Text>
                    <View>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.store.removeCar(this.props.reg)
                            }
                        >
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
    }
});
