const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const connection = require("./config");
const port = 5620;
// import config from "./config.js";

const db = connection;
app.use(
  cors({
    origin: "https://bco3.github.io",
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://bco3.github.io");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With, X-Api-Key"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(express.json());

// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '****',
//     database: 'wizard_pizza',
// });

// app.use((req, res, next) => {  res.header("Access-Control-Allow-Origin", '*');  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  next();});

// const userRouter = require('./routes/orders');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/pizzas_waiting", (req, res) => {
  const pizzaswaiting =
    "select JSON_LENGTH(orderCheckout) from orders where scheduledtime between  now() and now() + interval 40 minute and orderstatus = 1  ;";
  db.query(pizzaswaiting, (err, result) => {
    console.log(err);
    res.send(result);
  });
});
app.get("/orders", (req, res) => {
  const pizzaOrders =
    "select order_id, orderstatus, customer_name, phone, scheduledtime, orderCheckout, otherorders, subtotal, discount, tax, total, orderstatus from orders where orderstatus < 6 order by scheduledtime , order_id;";
  db.query(pizzaOrders, (err, result) => {
    console.log(err);
    res.send(result);
  });
});
// app.get('/orderid', (req, res) => {
//     const orderId = 'SELECT MAX(order_id) from orders;';
//     const orderId = 'SELECT LAST_INSERT_ID();';
//     db.query(orderId,(err, result) => {
//         console.log(err);
//         res.send(result);
//     })
// });
app.get("/pizzas", (req, res) => {
  const pizzas =
    "select orderCheckout from orders where orderstatus < 6 order by scheduledtime , order_id;";
  db.query(pizzas, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

app.post("/orders", (req, res) => {
  const name = req.body.customer.name;
  const email = req.body.customer.email;
  const phone = req.body.customer["phone number"];
  const status = 1;
  const scheduledTime = req.body.scheduledTime;
  const subTotal = req.body.totals["sub-total"];
  const discount = req.body.totals.discount;
  const tax = req.body.totals.tax;
  const total = req.body.totals.total;
  const orderCheckout = req.body.orderCheckout;
  const otherOrders = req.body.otherOrders;

  const sqlinsert =
    "INSERT INTO orders (customer_name, email, phone, orderstatus, subtotal, discount, tax, total, orderCheckout,scheduledtime, otherorders) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
  db.query(
    sqlinsert,
    [
      name,
      email,
      phone,
      status,
      subTotal,
      discount,
      tax,
      total,
      orderCheckout,
      scheduledTime,
      otherOrders,
    ],
    (err, result) => {
      console.log(err);
      res.send(result);
    }
  );
  // res.send(console.log('order received'));
});

app.post("/updateStatus", (req, res) => {
  const status = req.body.status;
  db.query(status, (err, result) => {
    console.log(err);
  });
  res.send(console.log("order received"));
});
app.post("/updatePromoStatus", (req, res) => {
  const status = req.body.status;
  db.query(status, (err, result) => {
    console.log(err);
  });
  res.send(console.log("promo change received"));
});

app.get("/orderStatus", (req, res) => {
  const statusCheck = req.query.status;
  db.query(statusCheck, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

app.get("/hours", (req, res) => {
  const hours = "select * from hours;";
  db.query(hours, (err, result) => {
    console.log(err);
    res.send(result);
  });
});
app.get("/currentHours", (req, res) => {
  const hours = req.query.hours;
  db.query(hours, (err, result) => {
    console.log(err);
    res.send(result);
  });
});
app.post("/updateHours", (req, res) => {
  const status = req.body.status;
  db.query(status, (err, result) => {
    console.log(err);
  });
  res.send(console.log("hours updated"));
});

app.get("/deals", (req, res) => {
  const deals =
    "select deals_id, deal_title, deal_description, deal_name, img_name, discount from deals where deal_active = 1 and time_out > curtime() or deal_active = 1 and weekday = dayofweek(curdate()) or deal_active = 1 and date_in <= curdate() and date_out >= curdate() or deal_active = 1 and weekday is null and time_in is null and date_in IS NULL;";
  db.query(deals, (err, result) => {
    console.log(err);
    res.send(result);
  });
});
app.get("/drinks", (req, res) => {
  const drinks = "select * from drinks;";
  db.query(drinks, (err, result) => {
    console.log(err);
    res.send(result);
  });
});
app.get("/drinkInventory", (req, res) => {
  const drinks = "select name, size, inventory, drink_id from drinks;";
  db.query(drinks, (err, result) => {
    console.log(err);
    res.send(result);
  });
});
app.post("/updateDrinks", (req, res) => {
  const status = req.body.status;
  db.query(status, (err, result) => {
    console.log(err);
  });
  res.send(console.log("drinks updated"));
});

app.get("/desserts", (req, res) => {
  const desserts = "select * from desserts;";
  db.query(desserts, (err, result) => {
    console.log(err);
    res.send(result);
  });
});
app.get("/dessertInventory", (req, res) => {
  const desserts = "select name, size, inventory, dessert_id from desserts;";
  db.query(desserts, (err, result) => {
    console.log(err);
    res.send(result);
  });
});
app.post("/updateDesserts", (req, res) => {
  const status = req.body.status;
  db.query(status, (err, result) => {
    console.log(err);
  });
  res.send(console.log("desserts updated"));
});

app.get("/order_deal", (req, res) => {
  const deal = req.query.orderdeal;
  db.query(deal, (err, result) => {
    console.log(err);
    res.send(result);
  });
});
app.get("/promos", (req, res) => {
  const deals = "select * from deals;";
  db.query(deals, (err, result) => {
    console.log(err);
    res.send(result);
  });
});
// app.use('/orders', userRouter);

// app.listen(4000);

app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on port ${port}`);
});
