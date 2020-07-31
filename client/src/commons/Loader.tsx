import * as React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export interface ILoaderContainerProps {
    type?: string
    color?: string
    height?: number
    width?: number
    timeout?: number
}

export default class LoaderContainer extends React.Component<ILoaderContainerProps> {
    public render() {
        return (
            <div>
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000}
                />
            </div>
        );
    }
}
