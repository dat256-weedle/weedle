import React from "react";
import { Animated, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { AnimatedValue } from "react-navigation";
import { primarycolor, secondarycolor } from "../../styles";
import { IParkingSpot } from "../../types";
import { getLogo } from "../logoloader/LogoLoader";

interface IProps {
    parkingSpot: IParkingSpot;
    isSelected: boolean;
    key: any;
}

class ParkingSpotMarker extends React.Component<IProps, {}> {
    private selectedAnimation: AnimatedValue = new Animated.Value(0);

    public componentDidUpdate() {
        if (this.props.isSelected) {
            Animated.timing(this.selectedAnimation, {
                duration: 100,
                toValue: 1
            }).start();
        } else {
            this.selectedAnimation.setValue(0);
        }
    }

    public render() {
        const background = this.selectedAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ["white", secondarycolor]
        });

        const border = this.selectedAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [secondarycolor, primarycolor]
        });

        const borderWidth = this.selectedAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 4]
        });

        const paddingHorizontal = this.selectedAnimation.interpolate({
            inputRange: [0, 0.7, 1],
            outputRange: [4, 8 * 1.1, 4 * 2]
        });

        const paddingVertical = this.selectedAnimation.interpolate({
            inputRange: [0, 0.7, 1],
            outputRange: [2, 4 * 1.1, 4]
        });

        const { position, provider, id } = this.props.parkingSpot;
        return (
            <Marker
                coordinate={position}
                identifier={id}
                zIndex={this.props.isSelected ? 1 : 0}
            >
                <Animated.View style={[styles.container]}>
                    <Animated.View
                        style={[
                            styles.bubble,
                            {
                                backgroundColor: "white",
                                borderColor: primarycolor,
                                borderWidth,
                                paddingHorizontal,
                                paddingVertical
                            }
                        ]}
                    >
                        {getLogo(provider)}
                    </Animated.View>
                    <Animated.View
                        style={[styles.arrowBorder, { borderTopColor: border }]}
                    />
                    <Animated.View
                        style={[styles.arrow, { borderTopColor: background }]}
                    />
                </Animated.View>
            </Marker>
        );
    }
}

const styles = StyleSheet.create({
    arrow: {
        alignSelf: "center",
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderTopColor: "#FFFFFF",
        borderWidth: 4,
        marginTop: -9
    },
    arrowBorder: {
        alignSelf: "center",
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderTopColor: "#000000",
        borderWidth: 4,
        marginTop: -0.5
    },
    bubble: {
        alignSelf: "flex-start",
        backgroundColor: "#FFFFFF",
        borderColor: "#000000",
        borderRadius: 4,
        borderWidth: 0.5,
        flex: 0,
        flexDirection: "row",
        paddingHorizontal: 4,
        paddingVertical: 2
    },
    container: {
        alignSelf: "flex-start",
        flexDirection: "column"
    },
    image: { maxHeight: 30, maxWidth: 40, resizeMode: "contain" },
    selectedArrow: {
        borderTopColor: primarycolor
    },
    selectedArrowBorder: {
        borderTopColor: secondarycolor
    },
    selectedBubble: {
        backgroundColor: primarycolor,
        borderColor: secondarycolor
    }
});

export default ParkingSpotMarker;
