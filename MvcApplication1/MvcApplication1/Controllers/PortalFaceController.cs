using Facebook;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication1.Controllers
{
    public class PortalFaceController : Controller
    {
        //
        // GET: /PortalFace/

        public ActionResult Index()
        {
            //Start FB Connection
            if (Session["AccessToken"] != null)
            {
                var accessToken = Session["AccessToken"].ToString();
                try
                {
                    var client = new FacebookClient(accessToken);
                    dynamic result = client.Get("me", new { fields = "name,id" });
                    string name = result.name;
                    ViewBag.Name = name;
                }
                catch (FacebookOAuthException)
                {
                    Response.Redirect("/");
                    Session["AccessToken"] = null;
                    return null;
                }
                ViewBag.AccessToken = Session["AccessToken"];
                
            }
            else
            {
                Response.Redirect("/");
                Session["AccessToken"] = null;
                return null;
            }
            return View();
        }

        //
        // GET: /PortalFace/Status

        public ActionResult Status()
        {
            return View();
        }

        [HttpPost]
        public void AddFriend(int id)
        {
           
        }

        //
        // GET: /PortalFace/Stocks

        public ActionResult Stocks()
        {
            return View();
        }

        public ActionResult NewsFeed()
        {
            return View();
        }

        //
        // GET: /PortalFace/NewsItem?title= , content= , pictureURL= 
        // pictureURL is optional

        public ActionResult NewsItem(String title, String content, String pictureURL)
        {
            @ViewBag.title = title;
            @ViewBag.content = content;
            if (pictureURL != null)
            {
                @ViewBag.picture = pictureURL;
            }
            return View();
        }

        //
        // POST: /PortalFace/PostStatus/status

        [HttpPost]
        public void PostStatus(String status)
        {
            System.Diagnostics.Debug.WriteLine("Request Recieved");
            //Start FB Connection
            if (Session["AccessToken"] != null)
            {
                var accessToken = Session["AccessToken"].ToString();
                try
                {
                    var client = new FacebookClient(accessToken);
                    dynamic result = client.Post("/me/feed", new { message = status });
                    System.Diagnostics.Debug.WriteLine("Post Sent");
                }
                catch (FacebookOAuthException)
                {
                    Session["AccessToken"] = null;
                    Response.Redirect("/");
                }
                ViewBag.AccessToken = Session["AccessToken"];

            }
            else
            {
                Session["AccessToken"] = null;
                Response.Redirect("/");
            }
        }

        
        public ActionResult StockInfo(String stockSymbol)
        {
            String url = "http://finance.yahoo.com/d/quotes.csv?s=" + stockSymbol + "&f=nshgb";

            WebClient t = new WebClient();
            System.Diagnostics.Debug.WriteLine(url);

            String response = t.DownloadString(url);

            if(response.Contains("Missing Symbols List"))
            {
                //@ViewBag.symbol = "Symbol Not Found";

                //@ViewBag.name = "ERROR";

                return View();
            }


            String[] respsonseArray = response.Split(',');

            @ViewBag.symbol = stockSymbol;

            @ViewBag.name = respsonseArray[0];

            @ViewBag.dayHigh = respsonseArray[2];

            @ViewBag.dayLow = respsonseArray[3];

            @ViewBag.current = respsonseArray[4];

            return View();
        }



        //
        // GET: /PortalFace/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /PortalFace/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /PortalFace/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /PortalFace/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /PortalFace/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /PortalFace/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /PortalFace/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
