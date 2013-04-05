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
            if (Session["AccessToken"] != null)
            {
                Response.Redirect("/PortalFace");
                return null;
            }
            else
            {
                return View();
            }
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

        public ActionResult StockPage()
        {
            return View();
        }

        public ActionResult CalendarPage()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public void Login()
        {
            var accessToken = Request.Form["accessToken"];
            Session["AccessToken"] = accessToken;

            Response.Redirect("/PortalFace");
        }
    }
}
