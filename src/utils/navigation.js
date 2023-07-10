import {
  checkIsNavigationSupported,
  fetchNextPage,
  updateTheDOMSomehow,
} from './utils.js';

let prevPageScroll = 0;

navigation.addEventListener('navigate', event => {
  if (!checkIsNavigationSupported()) return;
  const toUrl = new URL(event.destination.url);
  // IS A EXTERNAL PAGE
  if (toUrl.origin !== location.origin) return;
  // IS A CARD
  if (toUrl.pathname.includes('/card/')) {
    return navigateToCard(event, toUrl);
  } else {
    return navigateToHome(event, toUrl);
  }
});

function navigateToCard(event, toUrl) {
  event.intercept({
    scroll: 'manual',
    async handler() {
      const data = await fetchNextPage(toUrl.pathname);

      // Save the page scroll to restore it on the way back
      prevPageScroll = document.documentElement.scrollTop;

      // VIEW TRANSITION API
      document.startViewTransition(() => {
        updateTheDOMSomehow(data);
        document.documentElement.scrollTop = 0;
      });
    },
  });
}

function navigateToHome(event, toUrl) {
  event.intercept({
    scroll: 'manual',
    async handler() {
      const data = await fetchNextPage(toUrl.pathname);

      // VIEW TRANSITION API
      document.startViewTransition(() => {
        updateTheDOMSomehow(data);
        // Restore page scroll
        if (prevPageScroll) {
          document.documentElement.scrollTop = prevPageScroll;
        }
      });
    },
  });
}
