import React from "react";
import {Button, View} from "react-native";
import {Store} from "../Store"
import { inject, observer } from 'mobx-react';
import { number } from 'prop-types';

/**
 * id: id of the parking spot
 * store: the store, injected with @inject
 */
interface IProps {
    id: number;
    store?: Store;
}

/**
 * Button for renting a parking spot.
 * Text will change between 'Rent' and 'Finish' based on if the parking spot with id = props.id is rented or not.
 */
@inject('store')
@observer  
export default class RentButton extends React.Component<IProps, {}> {

    private store : Store;

    constructor(props: IProps) {
        super(props);
        this.store = this.props.store!; // Since store is injected it should never be undefined
    };

    public render() {
        //If the parkingspot is not rented return a 'rent' button
        if (this.store.bookedParkingSpots.find((item: Number) => {return(item == this.props.id)}) == undefined) {
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
     * Push parking spot to store
     */
    private rent = () =>{
        this.store.bookParkingSpot(this.props.id);
    }

    /**
     * Remove the parking spot from store
     */
    private finish = () =>{
        this.store.unBookParkingSpot(this.props.id);
    }
}