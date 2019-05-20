import React from "react";
import { StyleSheet, View } from "react-native";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

interface IState {
    enterCardInfo: boolean;
    cardNumber: string;
    cardMonth: string;
    cardYear: string;
    cardCVC: string;
}

const s = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        marginTop: 10,
    },
    label: {
        color: "black",
        fontSize: 12,
    },
    input: {
        fontSize: 16,
        color: "black",
    },
});

// Change to "false" to change visual presentation of credit card inputs
const USE_LITE_CREDIT_CARD_INPUT = true;

export default class PaymentInfo extends React.Component<any, IState> {
    public render() {
        return (
            <View style={s.container}>
                {USE_LITE_CREDIT_CARD_INPUT ?
                    (<LiteCreditCardInput // The compact view
                        autoFocus
                        inputStyle={s.input}

                        validColor={"black"}
                        invalidColor={"red"}
                        placeholderColor={"darkgray"}

                        onFocus={this.onFocus}
                        onChange={this.onChange} />) :
                    (<CreditCardInput // The big and flashy view
                        autoFocus
                        requiresName
                        requiresCVC

                        labelStyle={s.label}
                        inputStyle={s.input}
                        validColor={"black"}
                        invalidColor={"red"}
                        placeholderColor={"darkgray"}

                        onFocus={this.onFocus}
                        onChange={this.onChange} />)
                }
            </View>
        );
    }

    private onChange = formData => {
        /* eslint no-console: 0 */
        console.log(JSON.stringify(formData, null, " "));
    };

    private onFocus = field => {
        /* eslint no-console: 0 */
        console.log(field);
    };
}