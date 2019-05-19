import { action } from "mobx";
import { inject, observer } from "mobx-react";
import React from "react";
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

    constructor(props: IProps) {
        super(props);
        this.state = { temp: "", showAdd: true };
        this.store = this.props.store!;
    }

    @action
    public onPressSave = () => {
        const temp = this.state.temp;
        this.store.theCars.push(temp);
        if (this.store.theCars.length === 4) {
            this.setState({
                ...this.state,
                showAdd: false
            });
        }
    };

    @action
    public onDelete = (x: any) => {
        const index = this.store.theCars.indexOf(x);
        const temp1 = this.store.theCars.splice(index, 1);
        if (this.store.theCars.length === 0) {
            this.setState({
                ...this.state,
                showAdd: true
            });
        }
    };

    public render() {
        if (this.state.showAdd) {
            return (
                <View style={styles.maincontainer}>
                    <View style={styles.centeralign}>
                        <Text style={styles.carTitle}>My Cars </Text>
                    </View>
                    <View style={styles.maincontainer}>
                        {this.store.theCars.map(
                            (
                                reg: string,
                                index: string | number | undefined
                            ) => (
                                <CarElement
                                    sendReg={reg}
                                    onDelete={this.onDelete.bind(this)}
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
        }
        return (
            <View style={styles.maincontainer}>
                <View style={styles.centeralign}>
                    <Text style={styles.carTitle}>My Cars </Text>
                </View>
                <View style={styles.rowcontainer}>
                    {this.store.theCars.map(
                        (car: string, index: string | number | undefined) => (
                            <CarElement
                                sendReg={car}
                                onDelete={this.onDelete.bind(this)}
                                key={index}
                            />
                        )
                    )}
                </View>
            </View>
        );
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
        margin: 5,
    }
});
