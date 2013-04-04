using Facebook;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //Start FB Connection
            var client = new FacebookClient();
            dynamic me = client.Get("totten");
            

            ViewBag.Message = me.first_name;

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Chat()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public void Login()
        {
            var accessToken = Request.Form["accessToken"];
            Session["AccessToken"] = accessToken;

            Response.Redirect("/");
        }
    }
}
