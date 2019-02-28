import React from 'react';
import PropTypes from 'prop-types';

class Family extends React.Component{
  render(){
    const {name, value} = this.props.details;
    return(
      <div className="flex justify-between">
        <span className='text-lg'>{name}</span>
        <span className="text-grey">{value}</span>
      </div>
    )
  }
}

Family.propTypes = {
  name:PropTypes.string,
  value:PropTypes.string,
}

export default Family;
