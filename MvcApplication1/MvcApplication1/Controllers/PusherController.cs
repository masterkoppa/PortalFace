using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PusherServer;

namespace MvcApplication1.Controllers
{
    public class PusherController : Controller
    {
        //
        // GET: /Pusher/Auth
        public ActionResult Auth(string channel_name, string socket_id)
        {
            var pusher = new Pusher('43416', 'ab3a6a2e93203b02ee34', '634586f75f28130dbdef');
            var auth = pusher.Authenticate(channel_name, socketId);
            var json = auth.ToJson();
            return new ContentResult { Content = json, ContentType = "application/json" };
        }

    }
}
