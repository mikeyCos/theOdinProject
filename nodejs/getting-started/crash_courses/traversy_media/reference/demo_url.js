import url from "url";

const some_url_0 = new URL("http://coolwebsite.com/main?id=100&status=active");

// href
console.log(some_url_0.href);
console.log(some_url_0.toString());

// origin
console.log(some_url_0.origin);

// hostname
// Does NOT include port
console.log(some_url_0.hostname);

// host
console.log(some_url_0.host);

// pathname
console.log(some_url_0.pathname);

// search
console.log(some_url_0.search);

// searchParams
console.log(some_url_0.searchParams);

// adding params
some_url_0.searchParams.append("abc", "123");
console.log(some_url_0.searchParams);

// looping through params
some_url_0.searchParams.forEach((value, key) =>
  console.log(`${key}: ${value}`)
);
