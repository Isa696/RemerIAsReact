const AppID = "3912183453726646";
const ClientSecret = "s0SOkfYiYZqPDGB3LFf1GUATy3Gkzt3V"

let baseUrl = "https://fakestoreapi.com";

async function fetchFromApi(path) {
  const res = await fetch(`${baseUrl}/${path}`);
  const data = await res.json();
  return data;
}
const MlUrl = "https://api.mercadolibre.com/sites/MLA/";
const pathMl = "search?seller_id=277820846";

async function fetchFromML(pathMl) {
  const res = await fetch(`${MlUrl}/${pathMl}`);
  const dataMl = await res.json();
  console.log(dataMl);
  return dataMl;
}

fetchFromML(pathMl);
export default fetchFromApi;