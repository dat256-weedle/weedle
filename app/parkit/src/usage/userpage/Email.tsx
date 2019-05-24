import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { Store } from "../../backend/store/Store";

interface IState {
    enterMail: boolean;
}

interface IProps {
    store?: Store;
}

@inject("store")
@observer
export default class Email extends Component<IProps, IState> {
    private store: Store;

    constructor(props: IProps) {
        super(props);
        this.store = this.props.store!;
        this.state = { enterMail: this.store.email === "" ? true : false };
    }

    public onPressEdit = () => {
        this.setState({
            enterMail: true
        });
    };

    public onPressSave = () => {
        this.setState({
            enterMail: false
        });
    };

    public render() {
        return (
            <View style={styles.maincontainer}>
                <Image
                    source={require("../../../assets/mail_black.png")}
                    style={styles.imagemargin}
                />
                {this.state.enterMail ? (
                    <TextInput
                        placeholder="Enter E-mail"
                        onChangeText={text => this.store.setEmail(text)}
                        value={this.store.email}
                    />
                ) : (
                    <Text>{this.store.email}</Text>
                )}
                {this.state.enterMail ? (
                    <TouchableOpacity onPress={this.onPressSave}>
                        <Image
                            source={require("../../../assets/save.png")}
                            style={styles.smallimage}
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={this.onPressEdit}>
                        <Image
                            source={require("../../../assets/edit.png")}
                            style={styles.smallimage}
                        />
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    maincontainer: {
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        paddingRight: 10
    },
    imagemargin: {
        width: 40,
        height: 40,
        marginLeft: 10
    },
    image: {
        width: 40,
        height: 40
    },
    text: {
        height: 30,
        backgroundColor: "blue"
    },
    smallimage: {
        width: 20,
        height: 20
    }
});
