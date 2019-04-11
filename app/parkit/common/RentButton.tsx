import React from "react";
import {Button, View} from "react-native";
import {Store, store} from "../Store"
import { inject, observer } from 'mobx-react';
import { number } from 'prop-types';

/**
 * id: id of the parking spot
 * store: the store
 */
interface IProps {
    id: number;
    store?: Store;
}

/**
 * Button for renting a parking spot
 */
@inject('store')
@observer  
export default class RentButton extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
    };

    public render() {
        //If the parkingspot is not rented return a 'rent' button
        if (store.bookedParkingSpots.find((item: Number) => {return(item == this.props.id)}) == undefined) {
            return (
                <View>
                    <Button title="Rent" onPress={this.rent}/>
                </View>
            )
        }
        //Else return a 'finish renting' button
        else {
            return (
                <View>
                    <Button title="Finish" onPress={this.finish}/>
                </View>
            )

        }
    };

    /**
     * 
     */
    private rent = () =>{
        store.bookParkingSpot(this.props.id);
    }

    private finish = () =>{
        store.unBookParkingSpot(this.props.id);
    }
}