import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    TextInput,
    View
} from "react-native";

interface IState {
    hasText: boolean;
}

export default class User extends Component<IState> {
    constructor(props: Readonly<IState>) {
        super(props);
        this.state = {hasText: false}
    }

    public render() {
        return (
        <View style={{ alignItems: "center", backgroundColor: "rgb(100,210,110)" }}>
            <Image source={require("../../../assets/user.png")} style={{
                height: 70, width: 70, marginTop: 10, marginBottom: 10}}/>
            <View style= {{alignItems: "center", marginTop: 10, marginBottom: 10}}>
                <TextInput
                    placeholder = "Enter name"
                    // If there is any input, use normal style. Otherwise use placeholder-style.
                    style={this.state.hasText ? styles.textstyle : placeholderStyles.textstyle}
                    // Checks if there is any text everytime the text is changed
                    onChangeText={(text) => this.setState({hasText: text.length !== 0})} />
            </View>
        </View>
    )}
}

const styles = StyleSheet.create({
    textstyle: {
        color: "black",
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold"
    }
})

const placeholderStyles = StyleSheet.create({
    textstyle: {
        color: "black",
        fontSize: 25,
        textAlign: "center"
    }
})


// Old working code that doesn't have a different style for the placeholder text
/*    public render() {
        return(
        <View style={{ alignItems: "center", backgroundColor: "rgb(100,210,110)" }}>
                    <Image source={require("../../../assets/user.png")} style={{
                        height: 70, width: 70, marginTop: 10, marginBottom: 10}}/>
                    <View style= {{alignItems: "center", marginTop: 10, marginBottom: 10}}>
                        <TextInput
                            style={{color: "black", fontSize: 25, fontWeight: "bold", textAlign: "center"}}
                            placeholder="Enter username "
                            // placeholderTextColor="rgb(200,100,150)"
                            />
                    </View>
                </View>
    )}
*/      
