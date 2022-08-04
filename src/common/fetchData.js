
const OKURL = ""

function getDataPromise() {
  return fetch(OKURL).then(response => response.json());
}

async function getDataAsync(url = OKURL) {
  const response = await fetch(url);
  return response.json();
}
