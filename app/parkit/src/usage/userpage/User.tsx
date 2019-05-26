import { Store } from "backend/store/Store";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Image, TextInput, View } from "react-native";
import { secondarycolor } from "../../styles";

interface IProps {
    store?: Store;
}

@inject("store")
@observer
export default class User extends Component<IProps> {
    private store: Store;

    constructor(props: IProps) {
        super(props);
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
                        style={{
                            color: "white",
                            fontSize: 25,
                            fontWeight: "bold",
                            textAlign: "center"
                        }}
                        // Save the username to the store
                        onChangeText={text => {
                            this.store.setUserName(text);
                        }}
                    />
                </View>
            </View>
        );
    }
}
