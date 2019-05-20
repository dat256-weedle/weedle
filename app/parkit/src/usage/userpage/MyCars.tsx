import { action } from "mobx";
import { inject, observer } from "mobx-react";
import React, { RefObject } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { Store } from "../../backend/store/Store";
import { bigfont, primarycolor } from "../../styles";
import CarElement from "./CarElement";

interface IState {
    temp: string;
    showAdd: boolean;
}

interface IProps {
    store?: Store;
}

@inject("store")
@observer
export default class NewCars extends React.Component<IProps, IState> {
    private store: Store;
    private input: RefObject<TextInput>;
    constructor(props: IProps) {
        super(props);
        this.state = { temp: "", showAdd: true };
        this.store = this.props.store!;
        this.input = React.createRef();
    }

    @action
    public onPressSave = () => {
        const temp = this.state.temp;
        this.store.addCar(temp);
        if (this.store.cars.length === 4) {
            this.setState({
                ...this.state,
                temp: "",
                showAdd: false
            });
        }
        this.input.current!.clear();
    };

    @action
    public onDelete = (x: any) => {
        this.store.removeCar(x);
        if (this.store.cars.length === 0) {
            this.setState({
                ...this.state,
                showAdd: true
            });
        }
    };

    public render() {
        if (this.store.cars.length < 4) {
            return (
                <View style={styles.maincontainer}>
                    <View style={styles.centeralign}>
                        <Text style={styles.carTitle}>My Cars </Text>
                    </View>
                    <View style={styles.rowcontainer}>
                        {this.store.cars.map(
                            (
                                reg: string,
                                index: string | number | undefined
                            ) => (
                                <CarElement
                                    reg={reg}
                                    store={this.store}
                                    key={index}
                                />
                            )
                        )}

                        <View style={styles.column}>
                            <Image
                                source={require("../../../assets/plus.png")}
                                style={styles.image}
                            />
                            <View style={styles.row}>
                                <TextInput
                                    style={styles.text}
                                    placeholder="Enter Reg"
                                    onChangeText={text =>
                                        this.setState({ temp: text })
                                    }
                                    ref={this.input}
                                />
                                <TouchableOpacity onPress={this.onPressSave}>
                                    <Image
                                        source={require("../../../assets/save.png")}
                                        style={{
                                            height: 20,
                                            marginLeft: 5,
                                            width: 20
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            );

        } else {
            return (
                <View style={styles.maincontainer}>
                    <View style={styles.centeralign}>
                        <Text style={styles.carTitle}>My Cars </Text>
                    </View>
                    <View style={styles.simplerow}>
                        {this.store.cars.map(
                            (
                                car: string,
                                index: string | number | undefined
                            ) => (
                                <CarElement
                                    reg={car}
                                    store={this.props.store!}
                                    key={index}
                                />
                            )
                        )}
                    </View>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    carTitle: {
        color: primarycolor,
        fontSize: 20,
        fontWeight: "bold"
    },
    maincontainer: {
        alignItems: "center",
        backgroundColor: "white",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: 20
    },
    rowcontainer: {
        alignItems: "center",
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20
    },
    simplerow: {
        flexDirection: "row"
    },
    centeralign: {
        alignItems: "center"
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    column: {
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginLeft: 10
    },
    image: {
        height: 20,
        marginBottom: 2,
        marginTop: 20,
        width: 20
    },
    text: {
        height: bigfont,
        color: "black",
        margin: 5
    }
});
