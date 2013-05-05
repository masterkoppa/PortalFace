using System;
using System.Web;

namespace MvcApplication1
{
    public class  WSHttpHandler : IHttpHandler
    {
        using System;
 
using System.Collections.Generic;
 
using System.Linq;
 
using System.Web;
 
using Microsoft.Web.WebSockets;
 
namespace WebSockets
 
{
 
public class WSHttpHandler : IHttpHandler
 
{
 
public void ProcessRequest(HttpContext context)
 
{
 
if (context.IsWebSocketRequest)
 
context.AcceptWebSocketRequest(new TestWebSocketHandler());
 
}
 
public bool IsReusable
 
{
 
get
 
{
 
return false;
 
}
 
}
 
}
 
}
}
