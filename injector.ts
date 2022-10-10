declare const browser: any;

var s = document.createElement('script');
s.src = browser.runtime.getURL('music-control.js');

(document.head||document.documentElement).appendChild(s);