const endpointUrl = "https://fi3si9acoa.execute-api.ap-southeast-1.amazonaws.com/";

export function fetchData(username: string, password: string) {
  return fetch(`${endpointUrl}?id=${username}-${password}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => data.data)
    .catch(() => null);
}
