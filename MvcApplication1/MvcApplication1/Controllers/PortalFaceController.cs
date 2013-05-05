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
            ViewBag.MainPage = true;

            //Start FB Connection
            if (Session["AccessToken"] != null)
            {
                var accessToken = Session["AccessToken"].ToString();
                try
                {
                    var client = new FacebookClient(accessToken);
                    dynamic result = client.Get("me", new { fields = "name,id" });
                    string name = result.name;

                    /*This is how I'm trying to access the Profile Picture, Please look over (Not Working)*/
                    var proPic_link = "http://graph.facebook.com/" + result.id + "/picture";


                    ViewBag.Name = name;
                    Session["Name"] = name;

                   

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

        // POST: /PortalFace/PostPhoto
        [HttpPost]
        public ActionResult PostPhoto ( )
        {
            System.Diagnostics.Debug.WriteLine("Request Recieved");
            //Start FB Connection
            if (Session["AccessToken"] != null)
            {
                var accessToken = Session["AccessToken"].ToString();
                try
                {
                    var client = new FacebookClient(accessToken);
                    //dynamic result = client.Post("/me/feed", new { message = status });
                    //System.Diagnostics.Debug.WriteLine("Post Sent");
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
            return View();
        }

        //
        // GET: /PortalFace/Stocks

        public ActionResult Stocks()
        {
            //Load the info that we want to show
            //The top 3 stocks should be loaded from the DB
            ViewBag.stock1 = "GOOG";
            ViewBag.stock2 = "APPL";
            ViewBag.stock3 = "TEST";

            return View();
        }

        public ActionResult Timeline()
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


        //
        // GET: /PortalFace/Stocks?stockSymbol

        public ActionResult StockInfo(String stockSymbol)
        {
            //Additional info: www.gummy-stuff.org/Yahoo-data.htm
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

        public ActionResult ManageStocks()
        {
            @ViewBag.Name = Session["name"];

            CalendarEntities db = new CalendarEntities();

            StocksOwned[] stocks = db.StocksOwneds.ToArray();

            int leftStocks = 0;
            int rightStocks = 0;

            StocksOwned[] leftList;
            StocksOwned[] rightList;

            if (stocks.Length % 2 != 0)
            {
                leftStocks = (stocks.Length + 1) / 2;
                rightStocks = (stocks.Length - 1) / 2;
            }
            else
            {
                leftStocks = (stocks.Length) / 2;
                rightStocks = (stocks.Length) / 2;
            }

            //System.Diagnostics.Debug.WriteLine("Left: " + leftStocks);
            //System.Diagnostics.Debug.WriteLine("Right: " + rightStocks);

            leftList = new StocksOwned[leftStocks];
            rightList = new StocksOwned[rightStocks];

            for (int i = 0; i < leftStocks; i++)
            {
                leftList[i] = stocks[i];
            }

            for (int i = leftStocks; i < stocks.Length; i++)
            {
                rightList[i-leftStocks] = stocks[i];
            }

            @ViewBag.leftList = leftList;
            @ViewBag.rightList = rightList;

            return View();
        }

    }

    
}
