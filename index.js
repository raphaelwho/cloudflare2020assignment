 
addEventListener('fetch', event => 
{
  event.respondWith(handleRequest(event.request))
})
const links = [
    { name: "Pembroke Welsh Corgi", url: "https://www.akc.org/dog-breeds/pembroke-welsh-corgi/" },
    { name: "Cardigan Welsh Corgi", url: "https://www.akc.org/dog-breeds/cardigan-welsh-corgi/" },
    {  name: "Pembroke vs. Cardigan",
      url:"https://www.akc.org/expert-advice/lifestyle/cardigan-welsh-corgi-pembroke-welsh-corgi/" }
    ]

const socials = [{ icon: "https://simpleicons.org/icons/facebook.svg", url: "https://www.facebook.com"}] 

class LinksTransformer 
{
  constructor(links) 
  {
    this.links = links
  }

  async element(element) 
  {
    for(var i=0;i<links.length;i++)
    {
      element.append(`<a href=${links[i].url}>${links[i].name}</a>`,{html:true})
    }
  }
}
class SocialsTransformer 
{

  constructor(socials) 
  {
    this.socials = socials
  }

  async element(element) 
  {
    element.removeAttribute('style')
    for(var i=0;i<socials.length;i++)
    {
      element.append(`<a href=${socials[i].url}><img src="${socials[i].icon}"/></a>`,{html:true})
    }   
  }
}

class ElementHandler 
{
  element(element) 
  {
    console.log(`Incoming element: ${element.tagName}`)
    if(element.tagName=="title")
    {
    element.setInnerContent('Haoshen Li')
    }
    else if(element.tagName=="h1")
    {
      element.setInnerContent('hli482')
    }
    else if(element.tagName=="div")
    {
      element.removeAttribute('style')
    }
    else if(element.tagName=="img")
    {
      element.setAttribute('src', 'https://bloximages.newyork1.vip.townnews.com/thepilot.com/content/tncms/assets/v3/editorial/d/30/d3080ede-f7ff-11e8-b032-c75e0b5c6e8a/5c06dde1be28d.image.png')
    }
    else if (element.tagName=="body")
    {
      element.setAttribute("class", "bg-blue-200")
    }
  }
}




async function handleRequest(request) 
{
  let requestURL = new URL(request.url)
  let path = requestURL.pathname
  let response
  if (path === '/links') 
  {
    const linksJSON = JSON.stringify(links)
    response = new Response(linksJSON, 
    {
      'content-type': 'application/json'
    })
  } 
  else 
  {
    const res=await fetch("https://static-links-page.signalnerve.workers.dev")
      response = new HTMLRewriter()
        .on('div#links', new LinksTransformer())
        .on('div#social', new SocialsTransformer())
        .on('div#profile', new ElementHandler() )
        .on('img#avatar', new ElementHandler() )
        .on('h1#name', new ElementHandler())
        .on('title', new ElementHandler() )
        .on('body', new ElementHandler())
        .transform(res);
      response.headers.set('Content-Type', 'text/html')
    }
  return response
}

