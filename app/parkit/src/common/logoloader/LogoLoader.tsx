import { Providers } from "../../types";
import { logicalExpression } from "@babel/types";

/**
 * Logos of all parking providers
 */
const logos = {
    qpark: require("../../../assets/parking-providers/logo/qpark.png"),
    easypark: require("../../../assets/parking-providers/logo/easypark.png"),
    gothenburg: require("../../../assets/parking-providers/logo/gothenburg.png"),
    default: require("../../../assets/carpark.png")
};

const listLogos = {
    gothenburg: require("../../../assets/parking-providers/logo/gothenburg-list.png")
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

export function getListLogo(provider: Providers) {
    switch (provider) {
        case Providers.ParkeringGothenburg:
            return listLogos.gothenburg;
        default:
            return getLogo(provider);
    }
}
