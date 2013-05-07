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

        private String[] colors = { "color-yellow", "color-red", "color-blue", "color-white", "color-orange", "color-green" };
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
                    ViewBag.pic = proPic_link;
                    Session["Name"] = name;
                    Session["Pic"] = proPic_link;

                   

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

        /*//imgur method
        [HttpPost]
        public ActionResult UploadImage(HttpPostedFileBase uploadFile)
        {
            if (uploadFile.ContentLength > 0)
            {
                var imgService = new ImgUrImageService();
                byte[] fileBytes = new byte[uploadFile.InputStream.Length];
                Int64 byteCount = uploadFile.InputStream.Read(fileBytes, 0, (int)uploadFile.InputStream.Length);
                uploadFile.InputStream.Close();
                string fileContent = Convert.ToBase64String(fileBytes, 0, fileBytes.Length);
                var response = imgService.Upload(fileContent);
            }
            return View();
        }*/

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

        [HttpPost]
        public void BuyStocks(String symbol, String amount, String price)
        {
            System.Diagnostics.Debug.WriteLine("Making Purchase");
            CalendarEntities db = new CalendarEntities();
            StocksOwned newStock = new StocksOwned();

            newStock.Price = Decimal.Parse(price);
            newStock.Symbol = symbol;
            newStock.Amount = Int32.Parse(amount);
            newStock.Id = db.StocksOwneds.Count();
            db.StocksOwneds.Add(newStock);
            db.SaveChanges();

            System.Diagnostics.Debug.WriteLine("Submited new Purchase");
           // db.StocksOwneds.Add()
        }

        /**
         * Returns a list of 3 random stocks owned 
         */
        [HttpGet]
        public JsonResult getRandom3()
        {
            CalendarEntities db = new CalendarEntities();
            
            StocksOwned[] stocksList = db.StocksOwneds.ToArray();
            Decimal[] difference = getAllDiferences();


            StocksOwned[] results = new StocksOwned[3];
            Decimal[] resultsDifference = new Decimal[3];
            Random r = new Random();

            HashSet<int> index = new HashSet<int>();

            while (index.ToArray().Length < 3)
            {
                index.Add(r.Next(stocksList.Length));
            }

            int[] finalIndex = index.ToArray();

            for (int i = 0; i < 3; i++)
            {
                int ind = finalIndex[i];
                results[i] = stocksList[ind];
                resultsDifference[i] = difference[ind];
            }
            

            return Json(new {results, resultsDifference}, JsonRequestBehavior.AllowGet);
        }


        //
        // GET: /PortalFace/Stocks?stockSymbol

        public ActionResult StockInfo(String stockSymbol)
        {
            //Additional info: www.gummy-stuff.org/Yahoo-data.htm
            String url = "http://finance.yahoo.com/d/quotes.csv?s=" + stockSymbol + "&f=nshgb";

            WebClient t = new WebClient();
            //System.Diagnostics.Debug.WriteLine(url);

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

        private Decimal[] getAllDiferences()
        {
            CalendarEntities db = new CalendarEntities();

            StocksOwned[] stocksList = db.StocksOwneds.ToArray();

            String symbols = "";

            for (int i = 0; i < stocksList.Length; i++)
            {
                symbols += stocksList[i].Symbol + "+";
            }

            symbols = symbols.Remove(symbols.Length - 1);

            //Additional info: www.gummy-stuff.org/Yahoo-data.htm
            String url = "http://finance.yahoo.com/d/quotes.csv?s=" + symbols + "&f=b";

            WebClient t = new WebClient();
            System.Diagnostics.Debug.WriteLine(url);

            String response = t.DownloadString(url);

            String[] bids = response.Split('\n');

            Decimal[] difference = new Decimal[stocksList.Length];

            for (int i = 0; i < stocksList.Length; i++)
            {

                try
                {
                    difference[i] = (Decimal.Parse(bids[i]) - stocksList[i].Price) * stocksList[i].Amount;
                }
                catch (Exception ex)
                {
                    //Assume market is closed, difference of 0
                    difference[i] = 0;
                }
            }

            return difference;
        }

        /**
         * Returns a JSON Array with the winnings/losses for each stock owned
         */
        [HttpGet]
        public JsonResult getMargins()
        {
            Decimal[] difference = getAllDiferences();

            return Json(difference, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ManageStocks()
        {
            ViewBag.Name = Session["name"];
            ViewBag.pic = Session["Pic"];

            CalendarEntities db = new CalendarEntities();

            StocksOwned[] stocksList = db.StocksOwneds.ToArray();
            HashSet<string> symbols = new HashSet<string>();

            for (int i = 0; i < stocksList.Length; i++)
            {
                symbols.Add(stocksList[i].Symbol);
            }


            String[] stocks = symbols.ToArray();

            System.Diagnostics.Debug.WriteLine(stocks.Length);
            int leftStocks = 0;
            int rightStocks = 0;

            String[] leftList;
            String[] rightList;

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

            leftList = new String[leftStocks];
            rightList = new String[rightStocks];

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
            @ViewBag.stocks = db.StocksOwneds.ToArray();
            @ViewBag.colors = colors;
            @ViewBag.random = new Random(leftList.Length);

            return View();
        }

    }

    
}
