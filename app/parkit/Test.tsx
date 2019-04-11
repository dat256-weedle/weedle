import React from "react";

interface IProps {
    text: string;
}
interface IState {
    int: number;
}

export default class Example extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            int: 0,
        };
    }

    public render() {
        return (<div>{this.props.text}</div>);
    }
}
