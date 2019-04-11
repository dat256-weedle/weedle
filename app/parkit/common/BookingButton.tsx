import React from "react";
import {Text, Button, View} from "react-native";
import {Store} from "../Store"
import { inject, observer } from 'mobx-react';

interface IProps {
    id: number;
    store?: Store;
}
interface IState {
    store: Store;
}

@observer  
@inject('Store')
export default class BookingButton extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    };

    public render() {
        return (
            <View>
                <Button title="Book" onPress={this.onPress}><Text>Rent</Text></Button>
            </View>
        )};

    private onPress(){
    }

}