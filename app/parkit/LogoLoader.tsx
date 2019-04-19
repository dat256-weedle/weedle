
/**
 * Logos of all parking providers
 */
const logos = {
    qpark: require("./assets/parking-providers/logo/qpark.png"),
    default: require("./assets/carpark.png")
}

/**
 * Returns the source of a parking providers logo
 * @param owner name of the owner
 */
export function getLogo(owner: string) {
    switch(owner.toLowerCase()){
        case "q-park":
            return(logos.qpark);
        default:
            return(logos.default);
    }

}