import * as React from 'react';

export interface IErrorProps {
    value: string
}

export default class Error extends React.Component<IErrorProps> {
  public render() {
    return (
      <div className="error alert alert-danger col-4" role="alert">
          {this.props.value}
      </div>
    );
  }
}
