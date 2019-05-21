import { inject, observer } from "mobx-react";
import React, { RefObject } from "react";
import { StyleSheet, View } from "react-native";
import {
    CreditCardInput,
    LiteCreditCardInput
} from "react-native-credit-card-input";
import { Store } from "../../backend/store/Store";

interface IProps {
    store?: Store;
}

interface IState {
    enterCardInfo: boolean;
    cardNumber: string;
    cardMonth: string;
    cardYear: string;
    cardCVC: string;
}

// Change to "false" to change visual presentation of credit card inputs
const USE_LITE_CREDIT_CARD_INPUT = true;

@inject("store")
@observer
export default class PaymentInfo extends React.Component<IProps, IState> {
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
                        autoFocus
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
