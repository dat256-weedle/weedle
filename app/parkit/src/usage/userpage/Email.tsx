import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
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
    this.state = { enterMail: true};
    this.store = this.props.store!;
}

public onPressEdit = () => {
    this.setState({
        enterMail: true,
    });
}

public onPressSave = () => {
    this.setState({
        enterMail: false,
    });
}

  public render() {
        if (this.state.enterMail) {
            return (
                <View style={{alignItems: "center", backgroundColor: "white", flexDirection: "row",
                justifyContent: "space-around", marginTop: 10}}>
                    <Image source={require("../../../assets/mail.png")} style={{width: 40, height: 40, marginLeft: 10}}/>
                    <TextInput style={{height: 40}}
                        placeholder="Enter E-mail"
                        onChangeText={(text) => this.store.setEmail(text)}/>
                    <TouchableOpacity onPress={this.onPressSave}>
                        <Image source={require("../../../assets/save.png")} style={{width: 20, height: 20}}/>
                    </TouchableOpacity>
                </View>
            );
          }

        return (
            <View style={{alignItems: "center", backgroundColor: "white", justifyContent: "space-around",
                marginTop: 10, rection: "row"}}>
                <Image source={require("../../../assets/mail.png")} style={{width: 40, height: 40}}/>
                <Text style={{color: "rgb(100,210,110)", fontSize: 20}}>{this.store.email}</Text>
                <TouchableOpacity onPress={this.onPressEdit}>
                    <Image source={require("../../../assets/edit.png")} style={{width: 20, height: 20}}/>
                </TouchableOpacity>
            </View>
    );
  }
}
