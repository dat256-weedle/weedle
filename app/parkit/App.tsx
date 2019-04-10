import React from "react";
import { StyleSheet, Text, View } from "react-native";
import List from "./use-cases/main/list/List";
import data from "./assets/temp.json";

export interface IPosition {
  longitude: Number;
  latitude: Number;
}

export class ParkingSpot {
  position?: IPosition;
  name?: String;
  distance?: Number;
  city?: String;
  owner?: String;
}

export interface IParkingSpot {
  position: IPosition;
  name: String;
  distance: Number;
  city: String;
  owner: String;
}

export default class App extends React.Component {
  constructor(props: any) {
    super(props);

    let spots = data.parkingspots as Array<IParkingSpot>;
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center"
  }
});
