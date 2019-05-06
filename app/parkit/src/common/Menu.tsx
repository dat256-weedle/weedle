import React from 'react';
import { BottomNavigation, Text } from "react-native-paper";

const Route1 = () => <Text>Placeholder1</Text>;
const Route2 = () => <Text>Placeholder2</Text>;
const Profile = () => <Text>Profile</Text>;

interface IState {
  index: number,
  routes: Array<{key: string, title: string, icon: string}>
}

export default class Menu extends React.Component<any,IState> {

  constructor(props: any){
    super(props)
    this.state = {
      index: 0,
      routes: [
        { key: 'heart', title: 'Placeholder1', icon: 'favorite' },
        { key: 'star', title: 'Placeholder2', icon: 'grade' },
        { key: 'profile', title: 'Profile', icon: 'person' },
      ],
    };
  }

  public render() {
    return (
      <BottomNavigation
        style={{width: "100%"}}
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }

  private _handleIndexChange = (index: number) => this.setState({ index });

  private _renderScene = BottomNavigation.SceneMap({
    heart: Route1,
    star: Route2,
    profile: Profile,
  }); 
}