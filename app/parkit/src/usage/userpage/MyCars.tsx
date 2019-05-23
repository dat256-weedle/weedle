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
import { primarycolor } from "../../styles";
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
        if (this.store.cars.length === 3) {
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
        return (
            <View style={styles.mainContainer}>
                <View style={styles.carTitleContainer}>
                    <Text style={styles.carTitle}>My Cars</Text>
                </View>
                <View style={styles.seperator} />
                <View style={styles.carsContainer}>
                    {this.store.cars.map((reg: string, index: number) => (
                        <View style={styles.itemContainer} key={index} s>
                            <CarElement reg={reg} store={this.store} />
                        </View>
                    ))}
                    {this.store.cars.length < 3 && (
                        <View style={styles.itemContainer}>
                            <View style={asd.maincontainer}>
                                <Image
                                    source={require("../../../assets/plus.png")}
                                    style={asd.image}
                                />
                                <View style={asd.secondarycontainer}>
                                    <TextInput
                                        style={styles.text}
                                        placeholder="Enter Reg"
                                        onChangeText={text =>
                                            this.setState({ temp: text })
                                        }
                                        ref={this.input}
                                    />
                                    <View>
                                        <TouchableOpacity
                                            onPress={this.onPressSave}
                                        >
                                            <Image
                                                source={require("../../../assets/save.png")}
                                                style={asd.smallimage}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

const asd = StyleSheet.create({
    maincontainer: {
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-start"
    },

    secondarycontainer: {
        flexDirection: "row",
        alignItems: "center"
    },

    image: {
        width: 50,
        height: 50
    },

    smallimage: {
        height: 20,
        marginBottom: 5,
        marginLeft: 5,
        width: 20
    }
});

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 10,
        backgroundColor: "white",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch"
    },

    seperator: {
        height: 1,
        backgroundColor: "#AAAAAA",
        margin: 10,
        marginTop: 0
    },

    carTitleContainer: {
        width: "100%"
    },

    carTitle: {
        margin: 5,
        color: primarycolor,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },

    addCarContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },

    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    plusImage: {
        width: 50,
        height: 50
    },

    image: {
        height: 20,
        margin: 10,
        width: 20
    },

    text: {
        fontWeight: "bold"
    },

    carsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        padding: 5
    },

    itemContainer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        width: 0,
        marginRight: 5,
        marginLeft: 5,
        padding: 10
    }
});
