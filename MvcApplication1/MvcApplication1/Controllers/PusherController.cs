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
            var pusher = new Pusher(APP_ID, APP_KEY, APP_SECRET);
            var auth = pusher.Authenticate(channel_name, socketId);
            var json = auth.ToJson();
            return new ContentResult { Content = json, ContentType = "application/json" };
        }

    }
}
