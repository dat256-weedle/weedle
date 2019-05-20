import React from "react";
import { Image, Text, View } from "react-native";
import { Button } from "react-native-material-ui";
import About from "../aboutpage/About";
import Email from "./Email";
import MyCars from "./MyCars";
import PaymentInfo from "./PaymentInfo";

/**
 * @field renderAboutPage should the about page be rendered or not
 */
interface IState {
    renderAboutPage: boolean;
}
export default class Screen extends React.Component<any, IState> {

    constructor(props: any) {
        super(props)
        this.state = {
            renderAboutPage: false,
        }
    }

    public render() {
        return (
            // if renderAboutPage is true render the about page instead
            this.state.renderAboutPage ? <About onCloseButtonPress={() => this.setState({renderAboutPage: false})}/> : this.renderUserPage()
        );
    }

    private renderUserPage() {
        return (
            <View style={{ flex: 2, flexDirection: "column" }}>
                <View style={{ alignItems: "center", backgroundColor: "rgb(100,210,110)" }}>
                    <Image source={require("../../../assets/user.png")} style={{
                        height: 70, width: 70, marginTop: 10, marginBottom: 10}}/>
                    <View style= {{alignItems: "center", marginTop: 10, marginBottom: 10}}>
                        <Text style={{color: "black", fontSize: 30, fontWeight: "bold"}}>John Doe </Text>
                    </View>
                </View>
                <View style ={{flex: 3, backgroundColor: "lightgrey"}}>
                    <Email/>
                    <PaymentInfo/>
                    <MyCars/>
                </View>
                <Button primary onPress={() => this.setState({ renderAboutPage: true })} text="About us" />
            </View>)
    }
}
