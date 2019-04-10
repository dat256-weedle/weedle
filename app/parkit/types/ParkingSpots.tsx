import React from "react";

export interface IPosition {
  longitude: Number;
  latitude: Number;
}

export interface IParkingSpot {
  position: IPosition;
  name: String;
  distance: Number;
  city: String;
  owner: String;
}
