function hashCode(str) {
  var hash = 0;
  for(var i=0; i<str.length; i++) {
    var chr = str.charCodeAt(i);
    hash = ((hash<<5)-hash)+chr;
    hash = hash & hash;
  }
  return hash
}

function intToRGB(i) {
  var c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
}

function inverseColor(hexcode) {
  var color = parseInt(hexcode, 16);
  color = 0xFFFFFF ^ color;
  color = color.toString();
  return ("000000"+color).slice(-6); 
}

function hashColor(str) {
  if(window.XXH) {
    return XXH.h32(str, 0xABCD).toString(16).slice(-6);
  } else {
    return intToRGB(hashCode(str));
  }
}

function hashColorLabel(str) {
  var bg = hashColor(str);
  return "<span class='label' style='color:#"+inverseColor(bg)+";background-color:#"+bg+"'>"+str+"</span>";
}

function hashColorLine(str) {
  return "<span style='border-bottom:2px solid #"+hashColor(str)+";'>"+str+"</span>";
}


