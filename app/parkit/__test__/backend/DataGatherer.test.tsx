import { getDistance } from "../../src/backend/datagatherer/DataGatherer";
import { IPosition } from "../../src/types";

const pos1: IPosition = {
    latitude: 57.617,
    longitude: 12.0662
};

const pos2: IPosition = {
    latitude: 57.5963,
    longitude: 12.0156
};

testDistanceCalc(pos1, pos2, 3803); // The 'accurate distance' according to wolfram alpha

function testDistanceCalc(
    posOne: IPosition,
    posTwo: IPosition,
    accurateDistance: number,
    errorMargin: number = 20
) {
    test(
        "The distance between (" +
            posOne.latitude +
            ", " +
            posOne.longitude +
            ") and (" +
            posTwo.latitude +
            ", " +
            posTwo.longitude +
            ") should be within " +
            errorMargin +
            " kilometers of " +
            accurateDistance,
        () => {
            expect(
                Math.abs(getDistance(posOne, posTwo) - accurateDistance)
            ).toBeLessThan(errorMargin);
        }
    );
}
