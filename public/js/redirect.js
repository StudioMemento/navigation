const destination = new URL(document.currentScript.dataset.destination,location.origin);
destination.search=location.search;
location.replace(destination.href);
