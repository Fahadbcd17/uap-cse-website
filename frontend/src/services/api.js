const fetchData = (async (url = '', method = 'GET', authenticated = false, data = {}, multipart = false) => {
    const fetch_body = multipart ? data : JSON.stringify(data)
    console.log("🚀 ~ file: api.js:16 ~ fetchData ~ authenticated:", authenticated)
    const response = await fetch(url, {
        method: method,
        headers: {
            ...(!multipart && { 'Content-Type': 'application/json' }),
            ...(authenticated && { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('access_token'))}` })
        },
        ...(method !== 'GET' && { body: fetch_body })
    })
    const body = await response.text();
    if (!response.ok) throw `${response.status}: ${body}`;
    if (method !== 'DELETE' && body === '') return body //throw new Error('Empty response from server');
    return JSON.parse(body);
})
export default fetchData