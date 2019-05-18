import React from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const contactEmail = "contact@park.it"
const contactPhone = "+46 031 123 12 12"
const issuesURL = "https://github.com/dat256-weedle/weedle/issues"

export default class About extends React.Component {
    public render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "stretch", }}>
                <Text style={styles.textTitle}>
                    Contact:
                </Text>
                <TouchableOpacity onPress={() => Linking.openURL("mailto:mailto@" + contactEmail)}>
                    <Text style={{ ...styles.text, color: "blue" }} >
                        {contactEmail}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Linking.openURL("tel:" + contactPhone)}>
                    <Text style={{ ...styles.text, color: "blue" }} >
                        {contactPhone}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.textTitle}>
                    Report Bugs:
                </Text>

                <TouchableOpacity onPress={() => Linking.openURL(issuesURL)}>
                    <Text style={{ ...styles.text, color: "blue" }} >
                        Github Issues
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: "center",
        paddingTop: 10
    },
    textTitle: {
        fontSize: 30,
        textAlign: "center",
        paddingTop: 30
    }

})
