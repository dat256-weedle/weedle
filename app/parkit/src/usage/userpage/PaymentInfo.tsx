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
                        keyboardType = {"phone-pad"}
                        onChangeText={(textInput) => this.onChanged(textInput, "cardNumber")}/>
                    <TextInput style={{height: 40}}
                        placeholder="MM"
                        maxLength = {2}
                        keyboardType = {"phone-pad"}
                        onChangeText={(textInput) => this.onChanged(textInput, "cardMonth")}/>
                    <TextInput style={{height: 40}}
                        placeholder="YY"
                        maxLength = {2}
                        keyboardType = {"phone-pad"}
                        onChangeText={(textInput) => this.onChanged(textInput, "cardYear")}/>
                    <TextInput style={{height: 40}}
                        placeholder="CVC"
                        maxLength = {3}
                        keyboardType = {"numeric"}
                        secureTextEntry = {true}
                        onChangeText={(textInput) => this.onChanged(textInput, "cardCVC")}/>
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

    private onChanged(textInput: any, str: string){
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

        switch(str) { 
            case "cardNumber": {
                this.setState({ cardNumber: newText });
               break;
            }
            case "cardMonth": { 
                this.setState({ cardMonth: newText });
               break;
            }
            case "cardYear": { 
                this.setState({ cardYear: newText });
                break;
            }
            case "cardCVC": { 
                this.setState({ cardCVC: newText });
                break;
            }
            default: {
               console.error("onChanged: Got an input that doesn't match switch statement");
               break;
            }
        }
    }
}