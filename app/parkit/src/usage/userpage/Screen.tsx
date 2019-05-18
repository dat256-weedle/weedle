import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { bigfont, primarycolor } from "../../styles";
import Email from "./Email";
import MyCars from "./MyCars";

export default class Screen extends React.Component {
    public render() {
        return (
            <View style={styles.maincontainer}>
                <View style={styles.primarycontainer}>
                    <Image
                        source={require("../../../assets/user.png")}
                        style={styles.imagestyle}
                    />
                    <View
                        style={{
                            alignItems: "center",
                            marginTop: 10,
                            marginBottom: 20
                        }}
                    >
                        <Text style={styles.textstyle}>John Doe </Text>
                    </View>
                </View>
                <View style={styles.secondarycontainer}>
                    <Email />
                    <MyCars />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 2,
        flexDirection: "column"
    },
    primarycontainer: {
        alignItems: "center",
        backgroundColor: primarycolor
    },
    secondarycontainer: {
        flex: 3,
        backgroundColor: "lightgrey",
    },
    imagestyle: {
        height: 100,
        marginLeft: 10,
        marginTop: 100,
        width: 100
    },
    textstyle: {
        color: "black",
        fontSize: bigfont,
        fontWeight: "bold"
    }
})
