export function updateTheDOMSomehow(data) {
  document.getElementById('content').innerHTML = data
}

// TODO: FETCH THE NEXT PAGE FOR IDENTIFY THE NEW VIEW
export async function fetchNextPage(url) {
  // OBTAIN THE HTML OF THE NEXT PAGE
  const response = await fetch(url);
  const text = await response.text();
  // OBTAIN THE BODY OF THE NEXT PAGE
  // const data = text.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1];
  return text;
}

export function checkIsNavigationSupported() {
  return Boolean(document.startViewTransition);
}
