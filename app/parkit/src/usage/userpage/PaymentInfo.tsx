import { inject, observer } from "mobx-react";
import React from "react";
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
    private store: Store;

    constructor(props: IProps) {
        super(props);
        this.store = this.props.store!; // Since store is injected it should never be undefined
    }

    public render() {
        return (
            <View style={styles.container}>
                {USE_LITE_CREDIT_CARD_INPUT ? (
                    <LiteCreditCardInput // The compact view
                        autoFocus
                        inputStyle={styles.input}
                        validColor={"black"}
                        invalidColor={"red"}
                        placeholderColor={"darkgray"}
                        onFocus={this.onFocus}
                        onChange={this.onChange}
                    />
                ) : (
                    <CreditCardInput // The big and flashy view
                        requiresName
                        requiresCVC
                        labelStyle={styles.label}
                        inputStyle={styles.input}
                        validColor={"black"}
                        invalidColor={"red"}
                        placeholderColor={"darkgray"}
                        onFocus={this.onFocus}
                        onChange={this.onChange}
                    />
                )}
            </View>
        );
    }

    private onChange = (formData: any) => {
        /* eslint no-console: 0 */
        console.log(JSON.stringify(formData, null, " "));
    };

    private onFocus = (field: any) => {
        /* eslint no-console: 0 */
        console.log(field);
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
