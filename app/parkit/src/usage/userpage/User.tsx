import { Store } from "backend/store/Store";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { secondarycolor } from "../../styles";

interface IState {
    hasText: boolean;
}

interface IProps {
    store?: Store;
}

@inject("store")
@observer
export default class User extends Component<IProps, IState> {
    private store: Store;

    constructor(props: IProps) {
        super(props);
        this.state = { hasText: false };
        this.store = this.props.store!;
    }

    public render() {
        return (
            <View
                style={{
                    alignItems: "center",
                    backgroundColor: secondarycolor
                }}
            >
                <View
                    style={{
                        height: 80,
                        width: 80,
                        backgroundColor: "white",
                        borderRadius: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 10
                    }}
                >
                    <Image
                        source={require("../../../assets/user.png")}
                        style={{
                            height: 70,
                            width: 70,
                            marginTop: 10,
                            marginBottom: 10
                        }}
                    />
                </View>
                <View
                    style={{
                        alignItems: "center",
                        marginTop: 10,
                        marginBottom: 10
                    }}
                >
                    <TextInput
                        value={this.store.userName}
                        placeholder="Enter name"
                        // If there is any input, use normal style. Otherwise use placeholder-style.
                        style={
                            this.state.hasText
                                ? styles.textstyle
                                : placeholderStyles.textstyle
                        }
                        // Checks if there is any text everytime the text is changed
                        onChangeText={text => {
                            this.setState({ hasText: text.length !== 0 });
                            this.store.setUserName(text);
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textstyle: {
        color: "white",
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold"
    }
});

const placeholderStyles = StyleSheet.create({
    textstyle: {
        color: "white",
        fontSize: 25,
        textAlign: "center"
    }
});


// Old working code that doesn't have a different style for the placeholder text
/*    public render() {
        return(
        <View style={{ alignItems: "center", backgroundColor: "rgb(100,210,110)" }}>
                    <Image source={require("../../../assets/user.png")} style={{
                        height: 70, width: 70, marginTop: 10, marginBottom: 10}}/>
                    <View style= {{alignItems: "center", marginTop: 10, marginBottom: 10}}>
                        <TextInput
                            style={{color: "white", fontSize: 25, fontWeight: "bold", textAlign: "center"}}
                            placeholder="Enter username" />
                    </View>
                </View>
    )}
*/
