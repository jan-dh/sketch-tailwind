function calculatePosition(index, basePosition, length){
  if (index === basePosition) {
    return 'base';
  } else if (index === basePosition - 1 ){
    return 'sm';
  } else if (index === basePosition - 2 ){
  return 'xs';
  } else if (index === basePosition + 1){
    return 'lg'
  } else if (index === basePosition + 2){
    return 'xl';
  } else if (index < basePosition - 2) {
    const numberOfSmaller =  length-(length - (basePosition - 2));
    const position = -(index - (numberOfSmaller + 1));
    return position +  'xs';
  } else if (index > basePosition + 2){
    const numberOfBigger = length - (basePosition + 3);
    const position = numberOfBigger - (length - (index + 2));
    return position + 'xl';
  }
}

export default calculatePosition;