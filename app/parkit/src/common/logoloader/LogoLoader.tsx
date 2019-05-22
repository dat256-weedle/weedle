import React from "react";
import { Image, StyleSheet } from "react-native";
import { Providers } from "../../types";

const styles = StyleSheet.create({
    image: { maxHeight: 30, maxWidth: 40, resizeMode: "contain" }
});

/**
 * Logos of all parking providers
 */
const logos = {
    qpark: (
        <Image
            source={require("../../../assets/parking-providers/logo/qpark.png")}
            style={styles.image}
        />
    ),
    easypark: (
        <Image
            source={require("../../../assets/parking-providers/logo/easypark.png")}
            style={styles.image}
        />
    ),
    gothenburg: (
        <Image
            source={require("../../../assets/parking-providers/logo/gothenburg.png")}
            style={styles.image}
        />
    ),
    default: (
        <Image
            source={require("../../../assets/carpark.png")}
            style={styles.image}
        />
    )
};

const listLogos = {
    gothenburg: (
        <Image
            source={require("../../../assets/parking-providers/logo/gothenburg-list.png")}
        />
    )
};

/**
 * Returns the source of a parking providers logo
 * @param owner name of the owner
 */
export function getLogo(provider: Providers) {
    switch (provider) {
        case Providers.QPark:
            return logos.qpark;
        case Providers.EasyPark:
            return logos.easypark;
        case Providers.ParkeringGothenburg:
            return logos.gothenburg;
        default:
            return logos.default;
    }
}

/**
 * Used instead of getLogo if you want smaller logo
 * @param provider of parkingspot
 */
export function getListLogo(provider: Providers) {
    switch (provider) {
        case Providers.ParkeringGothenburg:
            return listLogos.gothenburg;
        default:
            return getLogo(provider);
    }
}
