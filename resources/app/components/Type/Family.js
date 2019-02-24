import React from 'react';

class Family extends React.Component{
  render(){
    return(
      <div>
        <h4>{this.props.name}</h4>
      </div>
    )
  }
}

export default Family;