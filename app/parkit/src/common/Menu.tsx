import React from "react";
import { BottomNavigation, Text } from "react-native-paper";

const NavigationMap = () => <Text>ConstText1</Text>;
const ActiveParking = () => <Text>ConstText2</Text>;
const History = () => <Text>ConstText3</Text>;
const Profile = () => <Text>ConstText4</Text>;

interface IState {
  index: number,
  routes: Array<{key: string, title: string, icon: string}>
}

export default class Menu extends React.Component<any,IState> {

  private renderScene = BottomNavigation.SceneMap({
    navigationMap: NavigationMap,
    activeParking: ActiveParking,
    history: History,
    profile: Profile,
  });

  constructor(props: any){
    super(props)
    this.state = {
      index: 0,
      routes: [
        { key: "navigationMap", title: "Map", icon: "map" },
        { key: "activeParking", title: "Active parking", icon: "timelapse" },
        { key: "history", title: "History", icon: "history" },
        { key: "profile", title: "Profile", icon: "person" },
      ],
    };
  }
  
  public render() {
    return (
      <BottomNavigation
        style={{width: "100%"}}
        navigationState={this.state}
        onIndexChange={this.handleIndexChange}
        renderScene={this.renderScene}
      />
    );
  }

  private handleIndexChange = (index: number) => this.setState({ index });
}