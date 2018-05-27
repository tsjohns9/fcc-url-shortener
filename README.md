# FreeCodeCamp URL Shortener 
## User stories:
1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
2. If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
3. When I visit that shortened URL, it will redirect me to my original link.

## Example creation usage:

```js
https://urls-shorten.herokuapp.com/new/https://google.com
https://urls-shorten.herokuapp.com/new/https://www.google.com
```

## Example creation output:

```js
{
  "original_url":"https://google.com",
  "short_url":"http://urls-shorten.herokuapp.com/3041"
}
```

## Usage:

```
https://urls-shorten.herokuapp.com/3041
```

### Will redirect to:

```
https://google.com
```
