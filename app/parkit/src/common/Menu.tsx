import React from 'react';
// import { BottomNavigation, Text } from "react-native-paper";
import { Button } from "react-native-elements" // For old code

/* Code that works with JavaScript but not TypeScript
const Route1 = () => <Text>Placeholder1</Text>;
const Route2 = () => <Text>Placeholder2</Text>;
const Profile = () => <Text>Profile</Text>;

export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'heart', title: 'Placeholder1', icon: 'favorite' },
      { key: 'star', title: 'Placeholder2', icon: 'grade' },
      { key: 'profile', title: 'Profile', icon: 'person' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    heart: Route1,
    star: Route2,
    profile: Profile,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}
*/

// Old code that renders a button (WORKS)
export default class Menu extends React.Component<any> {

    public render() {
            return (
              <Button title="Solid Button"/>
            )
        }
    }
