import React from "react";
import {Text, Button, View} from "react-native";
import {Store, store} from "../Store"
import { inject, observer } from 'mobx-react';

interface IProps {
    id: number;
    store?: Store;
}
interface IState {
    store: Store;
}

@inject('store')
@observer  
export default class BookingButton extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        console.log('test')
    };

    public render() {
        if (store.bookedParkingSpots.find((item) => {return(item == this.props.id)}) == undefined) {
            console.log(store.bookedParkingSpots.find((item) => {return(item == this.props.id)}));
            return (
                <View>
                    <Button title="Book" onPress={this.book}></Button>
                </View>
            )
        }
        else {
            return (
                <View>
                    <Button title="Unbook" onPress={this.unBook}></Button>
                </View>
            )

        }
    };

    private book = () =>{
        store.bookParkingSpot(this.props.id);
        console.log(store.bookedParkingSpots);        
    }

    private unBook = () =>{
        store.unBookParkingSpot(this.props.id);
        console.log(store.bookedParkingSpots);        
    }
}