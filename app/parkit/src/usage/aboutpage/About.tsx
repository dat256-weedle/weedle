import React from "react";
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const contactEmail = "contact@park.it"
const contactPhone = "+46 031 123 12 12"
const issuesURL = "https://github.com/dat256-weedle/weedle/issues"

/**
 * @param onCloseButtonPress: function called when close button is pressed
 */
interface IProps {
    onCloseButtonPress: () => void
}

/**
 * About us page which shows the user usefull information for contacting the company
 */
export default class About extends React.Component<IProps> {
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

                <View style={{ alignItems: "flex-end", padding: 10, position: "absolute", top: 0, right: 0, zIndex: 10 }}>
                    <TouchableOpacity onPress={this.props.onCloseButtonPress}>
                        <Image source={require("../../../assets/closebutton.png")} style={{ width: 32, height: 32 }} />
                    </TouchableOpacity>
                </View>
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
