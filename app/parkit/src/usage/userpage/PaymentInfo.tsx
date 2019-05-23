import { inject, observer } from "mobx-react";
import React, { RefObject } from "react";
import { StyleSheet, View } from "react-native";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import { Store } from "../../backend/store/Store";


interface IProps {
    store?: Store;
}

@inject("store")
@observer
export default class PaymentInfo extends React.Component<IProps, {}> {
    private card: RefObject<LiteCreditCardInput>;
    private store: Store;

    constructor(props: IProps) {
        super(props);
        this.store = this.props.store!; // Since store is injected it should never be undefined
        this.card = React.createRef<LiteCreditCardInput>();
    }

    public componentDidMount() {
        this.card.setValues(this.store.creditCard);
    }

    public render() {
        return (
            <View style={styles.container}>
                <LiteCreditCardInput
                    ref={(c: LiteCreditCardInput) => (this.card = c)}
                    autofocus
                    inputStyle={styles.input}
                    validColor={"black"}
                    invalidColor={"red"}
                    placeholderColor={"darkgray"}
                    onChange={this.saveCardDetails}
                />
            </View>
        );
    }

    private saveCardDetails = (formData: any) => {
        this.store.setCreditCard(formData.values);
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        marginTop: 10
    },
    label: {
        color: "black",
        fontSize: 12
    },
    input: {
        fontSize: 16,
        color: "black"
    }
});
