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
        if (this.state.enterMail) {
            return (
                <View style={styles.maincontainer}>
                    <Image
                        source={require("../../../assets/mail.png")}
                        style={styles.imagemargin}
                    />
                    <TextInput
                        style={styles.text}
                        placeholder="Enter E-mail"
                        onChangeText={text => this.store.setEmail(text)}
                        value={this.store.email}
                    />
                    <TouchableOpacity onPress={this.onPressSave}>
                        <Image
                            source={require("../../../assets/save.png")}
                            style={styles.smallimage}
                        />
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={styles.maincontainer}>
                <Image
                    source={require("../../../assets/mail.png")}
                    style={styles.image}
                />
                <Text style={{ color: "rgb(100,210,110)", fontSize: 20 }}>
                    {this.store.email}
                </Text>
                <TouchableOpacity onPress={this.onPressEdit}>
                    <Image
                        source={require("../../../assets/edit.png")}
                        style={styles.smallimage}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    maincontainer: {
        alignItems: "center",
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10
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
        height: 40
    },
    smallimage: {
        width: 20,
        height: 20
    }
});
