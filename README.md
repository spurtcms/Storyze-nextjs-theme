# Storyz Template 

The Storyz Template is a sleek and engaging design for creating and showcasing visual storytelling content.

![Screenshot of spurtCMS using Presentation Tool to do Visual Editing](https://dev.spurtcms.com/image-resize?name=media/blog2.png)

The Storyz Template is a visually stunning and interactive layout designed for showcasing stories, portfolios, or creative projects. It offers a responsive, user-friendly design with smooth transitions and customizable sections to present your content in a dynamic and engaging way. Ideal for creators looking to highlight their work in an immersive storytelling format.

The Studio connects to  [spurtcms](https://spurtcms.com), which gives you hosted content APIs with a flexible query language, on-demand image transformations, powerful patching, and more. You can use this starter to kick-start a blog or learn these technologies.

## Features

- Next.js v14
- Next.js App Router
- Styling with Tailwind CSS
- Dark & Light Mode
- Mobile Responsive
- skeleton loader 
- Optimized for SEO using Next.js's Metadata
- infinite scroll pagination
- New fetching and caching paradigms
- Server Actions for mutations





## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/spurtcms/nextjs-blog2-theme&demo-title=nextjs-blog2-theme&env=next_public_spurtcms_nextjs_starter_apikey)


## Set up environment variables

Open .env and set  NEXT_PUBLIC_SPURTCMS_NEXTJS_STARTER_THEME_BASEURL  to  be the URL to your GraphQL endpoint in spurtCMS. 

```bash
NEXT_PUBLIC_SPURTCMS_NEXTJS_STARTER_THEME_BASEURL="https://your-graphql-endpoint-url"
```

 
## Step 1. Steps to get API Key
 
 Before starting our Next JS blog template we need to go inside our spurtCMS Admin and get the default token that we will be using for displaying our content.

1.Inside your spurtCMS Admin Panel [spurtcms](https://dev.spurtcms.com) navigate to API Keys.

![API Key 1 (1)](https://github.com/user-attachments/assets/b3806e8f-1dcd-4f75-88fe-8366b3036d47)



2.Click on the Action key

![API Key 2 (1)](https://github.com/user-attachments/assets/7976ebe4-40f9-4c65-b99b-195e73ca2f9a)

3.Copy the api key

![API Key 3](https://github.com/user-attachments/assets/a3d34ac1-7243-4931-8a09-6c40c2d005b4)



Once you have your token add it to your env and it should look like this:



```bash
NEXT_PUBLIC_SPURTCMS_NEXTJS_STARTER_THEME_TOKEN="your-api-token"
```





## Step 2. Run Next.js in development mode
```bash
npm install 
```
```bash
npm run dev
```
Your blog should be up and running on [http://localhost:3000!](http://localhost:3000!)


## Step 3. Run Next.js in production mode
```bash
npm run prod
```


## Feedback and Questions
If you have feedback or questions about this starter, please use the Github Issues on this repo, [(https://github.com/spurtcms/Storyze-nextjs-theme/issues)]
or Send Email to us [(support@spurtcms.com)]
