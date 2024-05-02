const color_service = {};

color_service.hex_to_rgba = function(hex, opacity) {

  const red = parseInt(hex.substring(1, 3), 16);
  const blue = parseInt(hex.substring(3, 5), 16);
  const green = parseInt(hex.substring(5, 7), 16);

  const rgba = `rgba(${red}, ${blue}, ${green}, ${opacity})`

  return rgba;

};
