# FreeCodeCamp URL Shortener 
## User stories:
1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
2. If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
3. When I visit that shortened URL, it will redirect me to my original link.

## Example creation usage:

```js
/new/https://
/new/http://
```

## Example creation output:

```js
{
  "original_url":"http://",
  "short_url":""
}
```

## Usage:

```
https://
```

### Will redirect to:

```
https://
```