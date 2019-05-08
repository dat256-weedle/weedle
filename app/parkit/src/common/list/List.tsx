import React from "react";
import { StyleSheet, View } from 'react-native';

export const List: React.FunctionComponent<any> = ({children}) => (
    <View style={styles.listContainer}>
        {children}
    </View>
);

const styles = StyleSheet.create({
    listContainer: {
        display: "flex",
        flexDirection: "column",
        margin: 0,
        flexGrow: 1,
        width: "100%"
    }
});


export default List;