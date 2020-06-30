const arrayBufferToBase64 = (buffer) => {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
};

export default (getImageResult) => {
  if (!getImageResult) {
    return "";
  }
  var base64Flag = "data:image/jpeg;base64,";
  var imageStr = arrayBufferToBase64(getImageResult.data);
  const bufff = base64Flag + imageStr;
  return bufff;
};
