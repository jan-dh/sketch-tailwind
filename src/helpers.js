export function getLastPart(name){
  if (name.indexOf('/') !== -1 ) {
    name = name.substr(name.lastIndexOf('/') + 1);
  }
  return name.toLowerCase();
}