import React from "react";
import {Text, Button} from "react-native";

interface IProps {
    id: number;
}
interface IState {

}

@observer  
export default class BookingButton extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    };

    public render() {
        return (<Button title="Book" onPress={this.onPress}><Text>Rent</Text></Button>)
    };

    onPress(){

    }

}