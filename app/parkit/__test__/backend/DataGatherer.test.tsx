import { IPosition } from "../../types/ParkingSpots";
import { getDistance } from "../../backend/DataGatherer";

let pos1: IPosition = {
    latitude: 57.617,
    longitude: 12.0662
};

let pos2: IPosition = {
    latitude: 57.5963,
    longitude: 12.0156
};

testDistanceCalc(pos1, pos2, 3803); // The 'accurate distance' according to wolfram alpha

function testDistanceCalc(
    pos1: IPosition,
    pos2: IPosition,
    accurateDistance: number,
    errorMargin: number = 20
) {
    test(
        "The distance between (" +
            pos1.latitude +
            ", " +
            pos1.longitude +
            ") and (" +
            pos2.latitude +
            ", " +
            pos2.longitude +
            ") should be within " +
            errorMargin +
            " kilometers of " +
            accurateDistance,
        () => {
            expect(
                Math.abs(getDistance(pos1, pos2) - accurateDistance)
            ).toBeLessThan(errorMargin);
        }
    );
}
