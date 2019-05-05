import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default class Menu extends React.Component<any> {

    public render() {
            return (
              <Button title="Solid Button"/>
            )
        }
    }

/*
<Button title="Solid Button"/>

<Button title="Clear button" type="clear"/>

<Button title="Outline button" type="outline"/>
*/

/*
<Button icon=
  {<Icon name="arrow-right" size={15} color="white"/>}
title="Button with icon component"/>

<Button
  icon={{
    name: "arrow-right",
    size: 15,
    color: "white"
  }}
  title="Button with icon object"
/>

<Button
  icon={
    <Icon
      name="arrow-right"
      size={15}
      color="white"
    />
  }
  iconRight
  title="Button with right icon"
/>

<Button title="Loading button" loading/>
*/

/*
constructor () {
    super()
    this.state = {
      selectedIndex: 2
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }
  
  render () {
    const buttons = ['Hello', 'World', 'Buttons']
    const { selectedIndex } = this.state
  
    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height: 100}}
      />
    )
  }
  */