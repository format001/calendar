export function createTrs (count) {
  const trArr = [];

  for (var i = 0; i < count; i ++) {
    const oTr = document.createElement('tr');
    trArr.push(oTr);
  }

  return trArr;
}

export function getDateInfo (timeStamp) {
  var date = timeStamp ? new Date(timeStamp) : new Date();

  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ]
}