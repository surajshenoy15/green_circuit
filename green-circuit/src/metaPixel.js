export const META_PIXEL_ID = 'YOUR_PIXEL_ID_HERE';

export function initMetaPixel() {
  if (!META_PIXEL_ID || META_PIXEL_ID === 'YOUR_PIXEL_ID_HERE') return;

  if (window.fbq) return;

  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js'
  );

  window.fbq('init', META_PIXEL_ID);
}

export function trackPageView() {
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
}

export function trackLead(eventName = 'Lead') {
  if (window.fbq) {
    window.fbq('track', eventName);
  }
}