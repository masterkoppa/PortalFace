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

        public ActionResult Status()
        {
            return View();
        }

        [HttpPost]
        public void AddFriend(int id)
        {
           
        }

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
                    dynamic result = client.Post("/me/feed", new { message = "Hello There!" });
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

        [HttpPost]
        public void GetStock(String stockSymbol)
        {
            WebRequest myRequest = WebRequest.Create("http://finance.yahoo.com/d/quotes.csv?" + stockSymbol);

            WebResponse response = myRequest.GetResponse();

            System.Diagnostics.Debug.WriteLine(response.ToString());

            
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
