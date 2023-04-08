import NotFoundView from './views/not-found-view.js';
import HomeView from './views/home-view.js';
import AboutView from './views/about-view.js';
import CompsView from './views/comps-view.js';
import CompsUnderView from './views/comps-under-view.js';
import LabView from './views/lab-view.js';
import LabUnderView from './views/lab-under-view.js';

const routes = {
  404: NotFoundView,
  '/': HomeView,
  '/about': AboutView,
  '/comps': CompsView,
  '/comps/:id': CompsUnderView,
  '/lab': LabView,
  '/lab/:id': LabUnderView,
};

const routerView: HTMLElement | null = document.querySelector('#router-view');
const progress: HTMLElement | null = document.querySelector('#router-progress');

const parseURL = () => {
  let url = location.pathname.slice(1).toLowerCase() || '/';
  let r = url.split('/');
  let parsedURL = {
    a: r[1],
    b: r[2],
    c: r[3],
  };

  return parsedURL;
};

const updateSPALinkActive = (location: string) => {
  document.querySelector('[router-on-this]')?.removeAttribute('router-on-this');
  document
    .querySelector(`[href="${location}"]`)
    ?.setAttribute('router-on-this', '');
};

const renderPage = async () => {
  progress?.removeAttribute('hidden');
  const parsedURL = parseURL();
  const location =
    (parsedURL.a ? '/' + parsedURL.a : '/') +
    (parsedURL.b ? '/:id' : '') +
    (parsedURL.c ? '/' + parsedURL.c : '');
  const route = routes[location] || routes[404];
  const data = await route.render();

  if (routerView) {
    routerView.innerHTML = data;
    document.title = document.querySelector('h1')?.textContent!;
    await route.afterRender?.();
  }
  progress?.setAttribute('hidden', '');
  updateSPALinkActive(location);
};

const useRoute = (link: string) => {
  window.history.pushState({ page: window.location.pathname }, '', link);
  renderPage();
};

// NOTE: Maybe cause perf problem
const handleClick = (e: MouseEvent) => {
  let temp: HTMLElement | null = e.target as HTMLElement;
  do {
    if (temp.hasAttribute('router-link')) {
      e.preventDefault();
      useRoute((temp as HTMLLinkElement).href);
      break;
    } else temp = temp.parentNode as HTMLElement | null;
  } while (temp?.hasAttribute);
};
window.addEventListener('click', handleClick);

window.onpopstate = renderPage;
// @ts-ignore
window.useRoute = useRoute;
renderPage();

import '../src/m3/icon/animated-icon.js';
