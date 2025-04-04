const fetch = require('node-fetch');
const { URL } = require('url');

exports.handler = async (event) => {
  const targetUrl = event.queryStringParameters.url;
  if (!targetUrl) {
    return {
      statusCode: 400,
      body: "Missing 'url' parameter."
    };
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': event.headers['user-agent'] || 'Mozilla/5.0'
      }
    });
    let content = await response.text();
    const baseUrl = new URL(targetUrl).origin;

    // Rewrites URLs to stay within the proxy
    content = content.replace(/(href|src)=\"(.*?)\"/g, (match, attr, url) => {
      if (url.startsWith('http')) {
        return `${attr}=\"/access?url=${encodeURIComponent(url)}\"`;
      } else {
        return `${attr}=\"/access?url=${encodeURIComponent(baseUrl + '/' + url)}\"`;
      }
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: content
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error fetching the URL: ${error.message}`
    };
  }
};