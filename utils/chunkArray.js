export default function chunkArrayWithAds(array, chunkSize) {
  var index = 0;
  var arrayLength = array.length;
  var tempArray = [];
  for (index = 0; index < arrayLength; index += chunkSize) {
    let chunk = array.slice(index, index + chunkSize);
    chunk.push('AD');
    tempArray.push(chunk);
  }
  return tempArray;
}
