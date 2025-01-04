export const apiinstance = async (url, options) => {
  const headers = {
    'Content-Type': 'application/json',
    "Authorization": process.env.NEXT_PUBLIC_SPURTCMS_NEXTJS_STARTER_THEME_TOKEN,
    "ApiKey": process.env.NEXT_PUBLIC_SPURTCMS_NEXTJS_STARTER_APIKEY
  }

  const config = {
    method: options.method || 'GET',
    headers,
    ...options,
  }

  if (config.method === 'GET') {
    delete config.body
  } else {
    config.body = config.body
  }


  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SPURTCMS_NEXTJS_STARTER_THEME_BASEURL}${url}`, config);
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}