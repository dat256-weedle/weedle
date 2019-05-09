
/**
 * Logos of all parking providers
 */
const logos = {
    qpark: require("../../../assets/parking-providers/logo/qpark.png"),
    easypark: require("../../../assets/parking-providers/logo/easypark.png"),
    gothenburg: require("../../../assets/parking-providers/logo/gothenburg.png"),
    default: require("../../../assets/carpark.png")
}

/**
 * Returns the source of a parking providers logo
 * @param owner name of the owner
 */
export function getLogo(owner: string) {
    switch (owner.toLowerCase()) {
        case "q-park":
            return (logos.qpark);
        case "easypark":
            return (logos.easypark);
        case "parkeringgothenburg":
            return (logos.gothenburg);
        default:
            return (logos.default);
    }

}