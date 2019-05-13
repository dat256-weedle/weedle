import React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import SearchList from "../searchlist/SearchList";
import Screen from "../userpage/Screen";

/**
 * Decides what will happen when one of the menu buttons are pressed
 */
const ShowMap = () => <SearchList />;
const ActiveParking = () => (
    <Text>Placeholder for the active parking spot page</Text>
);
const History = () => <Text>Placeholder for the history page</Text>;
const Profile = () => <Screen />;

interface IState {
    index: number;
    routes: Array<{ key: string; title: string; icon: string }>;
}

export default class Menu extends React.Component<any, IState> {
    /**
     * Connects the key-value of a button to its specific action
     */
    private renderScene = BottomNavigation.SceneMap({
        showMap: ShowMap,
        activeParking: ActiveParking,
        history: History,
        profile: Profile
    });

    /**
     * Constructor that creates the menu and its four buttons.
     *
     * @param key The key-value for that specific button, which is used to give each button a unique action when pressed.
     * @param title Text that is visible below the icon when the icon is selected.
     * @param icon Fetches an icon matching the string from this library: https://material.io/tools/icons/?style=baseline
     */
    constructor(props: any) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: "showMap", title: "Map", icon: "map" },
                {
                    key: "activeParking",
                    title: "Active p-spots",
                    icon: "timelapse"
                },
                { key: "history", title: "History", icon: "history" },
                { key: "profile", title: "Profile", icon: "person" }
            ]
        };
    }

    public render() {
        return (
            <BottomNavigation
                style={{ width: "100%" }}
                navigationState={this.state}
                onIndexChange={this.handleIndexChange}
                renderScene={this.renderScene}
            />
        );
    }

    private handleIndexChange = (index: number) => this.setState({ index });
}
