import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

interface IState {
    enterCardInfo: boolean;
    cardNumber: string;
    cardMonth: string;
    cardYear: string;
    cardCVC: string;
}

export default class PaymentInfo extends React.Component<any, IState> {
    constructor(props: Readonly<IState>) {
        super(props);
        this.state = { enterCardInfo: true, cardNumber: "", cardYear: "", cardMonth: "", cardCVC: "" };
    }

    public onPressEdit = () => {
        this.setState({
            enterCardInfo: true,
        });
    }
    
    public onPressSave = () => {
        this.setState({
            enterCardInfo: false,
        });
    }

    public render() {
        if (this.state.enterCardInfo) {
            return (
                <View style={{alignItems: "center", backgroundColor: "white", flexDirection: "row",
                justifyContent: "space-around", marginTop: 10}}>
                    <Image source={require("../../../assets/creditcard.png")} style={{width: 40, height: 40, marginLeft: 10}}/>
                    <TextInput style={{height: 40}}
                        placeholder="Enter card number"
                        maxLength = {16}
                        keyboardType = {"numeric"}
                        onChangeText={(textInput) => this.onChanged(textInput)}/>
                    <TextInput style={{height: 40}}
                        placeholder="MM"
                        maxLength = {2}
                        keyboardType = {"numeric"}
                        onChangeText={(textInput) => this.setState({cardMonth: textInput.replace(/[^0-9]/g, "")})}/>
                    <TextInput style={{height: 40}}
                        placeholder="YY"
                        maxLength = {2}
                        keyboardType = {"numeric"}
                        onChangeText={(textInput) => this.setState({cardYear: textInput})}/>
                    <TextInput style={{height: 40}}
                        placeholder="CVC"
                        maxLength = {3}
                        keyboardType = {"numeric"}
                        secureTextEntry = {true}
                        onChangeText={(textInput) => this.setState({cardCVC: textInput})}/>
                    <TouchableOpacity onPress={this.onPressSave}>
                        <Image source={require("../../../assets/save.png")} style={{width: 20, height: 20}}/>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={{alignItems: "center", backgroundColor: "white", justifyContent: "space-around",
                marginTop: 10, rection: "row"}}>
                <Image source={require("../../../assets/creditcard.png")} style={{width: 40, height: 40}}/>
                <Text style={{color: "rgb(100,210,110)", fontSize: 20}}>
                    Card: {this.state.cardNumber}
                </Text>
                <Text style={{color: "rgb(100,210,110)", fontSize: 20}}>
                    MM/YY: {this.state.cardMonth}/{this.state.cardYear}
                </Text>
                <TouchableOpacity onPress={this.onPressEdit}>
                    <Image source={require("../../../assets/edit.png")} style={{width: 20, height: 20}}/>
                </TouchableOpacity>
            </View>
        );
    }

    private onChanged(textInput: any){
        let newText = "";
        const numbers = "0123456789";
    
        for (var i=0; i < textInput.length; i++) {
            if(numbers.indexOf(textInput[i]) > -1 ) {
                newText = newText + textInput[i];
            }
            else {
                // your call back function
                alert("please enter numbers only");
            }
        }
        this.setState({ cardNumber: newText });
    }
}