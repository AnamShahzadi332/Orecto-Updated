var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var multer = require("multer");
var fs = require("fs");
var mysql = require("mysql");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

let live_url = `https://sell.staging.orecto.pk/api/v2`;
let base_url = `https://sell.orecto.pk/api/v2`;

//MYSQL Database Connection

//APIS Connections

router.post("/signin", async function (req, res, next) {
  const response = await fetch(`${base_url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer 0|9JT9AQh95G1aYPqiSgxQrMYPLoM838f2ulj6oZgi",
    },
    body: JSON.stringify(req.body),
  });

  let result = await response.json();
  res.send(result);
});

router.post("/signout", async function (req, res, next) {
  const response = await fetch(`${base_url}/auth/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${req.body.token}`,
    },
  });

  let result = await response.json();
  res.send(result);
});
router.post("/cartlist", async function (req, res, next) {
  const response = await fetch(`${base_url}/carts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": "en",
      Authorization: `Bearer ${req.body.token}`,
    },
  });
  let result = await response.json();
  res.send(result);
});

router.post("/deletecartitem", async function (req, res, next) {
  const response = await fetch(`${base_url}/carts${req.body.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": "en",
      Authorization: `Bearer ${req.body.token}`,
    },
  });
  let result = await response.json();
  res.send(result);
});

router.post("/courierlist", async function (req, res, next) {
  console.log(req.body.token);
  const response = await fetch(`${base_url}/delivery-info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",

      Authorization: `Bearer ${req.body.token}`,
    },
  });
  let result = await response.json();
  res.send(result);
});

router.post("/addtocart", async function (req, res, next) {
  const response = await fetch(`${base_url}/carts/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${req.body.token}`,
    },
    body: JSON.stringify({
      id: req.body.productid,
      variant: req.body.variantid,
      user_id: req.body.userid,
      quantity: req.body.quantity,
      cost_matrix: "AIzaSyBV4kEA8pVM3uEsz5bwIWmgdtHEOKNgsCU",
    }),
  });

  let result = await response.json();
  res.send(result);
});

router.get("/todays-deal", async function (req, res, next) {
  const response = await fetch(`${base_url}/products/todays-deal`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let result = await response.json();
  let data = result.data;
  res.send(data);
});

router.get("/best-selling", async function (req, res, next) {
  const response = await fetch(`${base_url}/products/best-seller`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let result = await response.json();
  let data = result.data;
  res.send(data);
});

router.get("/flashdeals", async function (req, res, next) {
  console.log(`${base_url}/flash-deals`);
  const response = await fetch(`${base_url}/flash-deals`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let result = await response.json();
  res.send(result);
});

router.post("/shoparrival", async function (req, res, next) {
  console.log(req.body.id);
  const response = await fetch(
    `${base_url}/shops/products/new/${req.body.id}`,
    {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );

  let result = await response.json();
  res.send(result);
});

router.post("/shopfeatured", async function (req, res, next) {
  console.log(req.body.id);
  const response = await fetch(
    `${base_url}/shops/products/featured/${req.body.id}`,
    {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );

  let result = await response.json();
  res.send(result);
});

router.get("/featurecategories", async function (req, res, next) {
  const response = await fetch(`${base_url}/categories/featured`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  let result = await response.json();
  res.send(result);
});
router.post("/Allproducts", async function (req, res, next) {
  const response = await fetch(
    `${base_url}/products?page=${req.body.page}&per_page=14`,
    {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );

  let result = await response.json();
  res.send(result);
});

router.post("/relatedproducts", async function (req, res, next) {
  const response = await fetch(`${base_url}/products/related/${req.body.id}`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  let result = await response.json();
  res.send(result);
});

router.post("/shopdetails", async function (req, res, next) {
  const response = await fetch(`${base_url}/shops/details/${req.body.id}`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  let result = await response.json();
  res.send(result);
});

router.post("/allproductsofseller", async function (req, res, next) {
  const response = await fetch(
    `${base_url}/products/seller/${req.body.id}?page=${req.body.page}`,
    {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );

  let result = await response.json();
  res.send(result);
});

router.post("/get-all-offers", async function (req, res, next) {
  const response = await fetch(`${base_url}/my-offers`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${req.body.token}`,
  });

  let result = await response.json();
  res.send(result);
});

router.post("/social-login", async function (req, res, next) {
  let data = {
    name: req.body.name,
    email: req.body.email,
    provider: req.body.provider,
    social_provider: req.body.social_provider,
    access_token: req.body.access_token,
  };
  const response = await fetch(`${base_url}/auth/social-login`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  let result = await response.json();
  res.send(result);
});

router.post("/sign-up", async function (req, res, next) {
  let data = {
    name: req.body.name,
    email_or_phone: req.body.value,
    password: req.body.password,
    passowrd_confirmation: req.body.password,
    register_by: req.body.type,
  };
  const response = await fetch(`${base_url}/auth/signup`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  let result = await response.json();
  res.send(result);
});

router.post("/sent-offer", async function (req, res, next) {
  let data = {
    user_id: req.body.user_id,
    seller_id: req.body.seller_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    offered_price: req.body.offered_price,
    current_price: req.body.current_price,
    status: 0,
  };
  console.log(data);
  const response = await fetch(`${base_url}/new-offer`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  let result = await response.json();
  res.send(result);
});

router.post("/productdetails", async function (req, res, next) {
  console.log(req.body.id);
  const response = await fetch(`${base_url}/products/${req.body.id}`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  let result = await response.json();

  res.send(result);
});

router.post("/categoryproducts", async function (req, res, next) {
  const response = await fetch(
    `${base_url}/products/category/${req.body.id}?page=${req.body.page}&name=`,
    {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );

  let result = await response.json();
  res.send(result);
});
router.get("/brands", async function (req, res, next) {
  const response = await fetch(`${base_url}/brands`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let result = await response.json();
  res.send(result);
});

router.get("/featureproducts", async function (req, res, next) {
  const response = await fetch(`${base_url}/products/featured`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let result = await response.json();
  res.send(result.data);
});

router.post("/Getaddress", async function (req, res, next) {
  const response = await fetch(`${base_url}/user/shipping/address`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  let result = await response.json();
  res.send(result);
});

router.post("/getcartcount", async function (req, res, next) {
  const response = await fetch(`${base_url}/cart-count`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  let result = await response.json();
  res.send(result);
});

router.post("/purchasehistory", async function (req, res, next) {
  const response = await fetch(
    `${base_url}/purchase-history?page=${req.body.page}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.body.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  let result = await response.json();
  res.send(result);
});

router.post("/userbargainoffers", async function (req, res, next) {
  const response = await fetch(`${base_url}/my-offers?page=${req.body.page}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  let result = await response.json();
  res.send(result);
});

router.post("/delete-userbargainoffer", async function (req, res, next) {
  const response = await fetch(`${base_url}/delete-offer/${req.body.id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  let result = await response.json();
  res.send(result);
});

router.post("/wishlist", async function (req, res, next) {
  const response = await fetch(`${base_url}/wishlists`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  let result = await response.json();
  res.send(result);
});

router.post("/wishlist-add", async function (req, res, next) {
  let data = {
    user_id: req.body.userid,
    product_id: req.body.productid,
  };
  console.log(data);
  const response = await fetch(`${base_url}/wishlists`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  let result = await response.json();
  res.send(result);
});

router.post("/wishlist-delete", async function (req, res, next) {
  const response = await fetch(`${base_url}/wishlists/${req.body.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  let result = await response.json();
  res.send(result);
});

router.post("/historyorderdetails", async function (req, res, next) {
  const response = await fetch(
    `${base_url}/purchase-history-items/${req.body.id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.body.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  let result = await response.json();
  res.send(result);
});

router.post("/historyitemdetails", async function (req, res, next) {
  const response = await fetch(
    `${base_url}/purchase-history-details/${req.body.id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.body.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  let result = await response.json();
  res.send(result);
});

router.post("/edit-profile", async function (req, res, next) {
  let data = {
    id: req.body.id,
    name: req.body.name,
    password: req.body.password,
    phone: req.body.phone,
  };
  const response = await fetch(`${base_url}/profile/update`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  let result = await response.json();
  res.send(result);
});

router.post("/edit-profile-image", async function (req, res, next) {
  console.log(req.body.files);
  let data = {
    id: id,
    filename: "crisp.jpg",
    image: req.body.files,
  };
  const response = await fetch(`${base_url}/profile/update-image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  let result = await response.json();
  res.send(result);
});

router.post("/resend-code", async function (req, res, next) {
  let data = {
    user_id: req.body.id,
    register_by: req.body.type,
  };
  console.log(data);
  const response = await fetch(`${base_url}/auth/resend_code`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify(data),
  });
  let result = await response.json();
  res.send(result);
});

router.post("/edit-offer", async function (req, res, next) {
  let data = { user_offer: req.body.price, id: req.body.id };
  const response = await fetch(`${base_url}/re-offer`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  let result = await response.json();
  res.send(result);
});

router.post("/dashboardsummary", async function (req, res, next) {
  const response = await fetch(`${base_url}/profile/counters/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  let result = await response.json();
  res.send(result);
});

router.post("/createorder", async function (req, res, next) {
  let data = {
    owner_id: req.body.ownerid,
    user_id: req.body.userid,
    payment_type: req.body.paymentmethod,
  };
  const response = await fetch(`${base_url}/order/store`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  let result = await response.json();
  res.send(result);
});

router.get("/paymentlist", async function (req, res, next) {
  const response = await fetch(
    `${base_url}/payment-types?mode=order&list=both`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  let result = await response.json();
  res.send(result);
});

router.post("/getcartsummary", async function (req, res, next) {
  const response = await fetch(`${base_url}/cart-summary`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  let result = await response.json();
  res.send(result);
});

router.post("/update-cart-items", async function (req, res, next) {
  let data = {
    cart_ids: req.body.id,
    cart_quantities: req.body.quantity,
  };
  const response = await fetch(`${base_url}/carts/process`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  let result = await response.json();
  res.send(result);
});

router.post("/verify-otp", async function (req, res, next) {
  let data = {
    user_id: req.body.id,
    verification_code: req.body.otp,
  };
  const response = await fetch(`${base_url}/auth/confirm_code`, {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data);
  let result = await response.json();
  res.send(result);
});

router.post("/resend-otp", async function (req, res, next) {
  let data = {
    user_id: req.body.id,
    register_by: req.body.type,
  };
  const response = await fetch(`${base_url}/auth/resend_code`, {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  let result = await response.json();
  res.send(result);
});

router.get("/categories", async function (req, res, next) {
  const response = await fetch(`${base_url}/categories`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let result = await response.json();
  res.send(result);
});

router.post("/productReviews", async function (req, res, next) {
  const response = await fetch(`${base_url}/reviews/product/${req.body.id}`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let result = await response.json();
  console.log(`${base_url}/reviews/product/${req.body.id}`);
  res.send(result);
});

router.get("/allsliders", async function (req, res, next) {
  const response = await fetch(`${base_url}/sliders`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let result = await response.json();
  res.send(result);
});
router.get("/slider-home-three", async function (req, res, next) {
  const response = await fetch(`${base_url}/home-slider-three`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let result = await response.json();
  res.send(result);
});
router.get("/slider-home-two", async function (req, res, next) {
  const response = await fetch(`${base_url}/home-slider-two`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let result = await response.json();
  res.send(result);
});

router.post("/searchproducts", async function (req, res, next) {
  console.log(req.body);
  const response = await fetch(
    `${base_url}/products/search?name=${req.body.name}`,
    {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );
  let result = await response.json();
  res.send(result);
});

router.post("/subcategories", async function (req, res, next) {
  const response = await fetch(`${base_url}/sub-categories/${req.body.id}`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let result = await response.json();
  res.send(result);
});

router.get("/banners", async function (req, res, next) {
  const response = await fetch(`${base_url}/banners`, {
    "Access-Control-Allow-Origin": "*",
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let result = await response.json();
  res.send(result.data);
});

router.get("/bannersTwo", async function (req, res, next) {
  const response = await fetch(`${base_url}/banners-two`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let result = await response.json();
  res.send(result.data);
});

router.get("/home-slider-one", async function (req, res, next) {
  const response = await fetch(`${base_url}/home-slider-one`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let result = await response.json();
  res.send(result.data);
});

router.get("/banners-three", async function (req, res, next) {
  const response = await fetch(`${base_url}/banners-three`, {
    method: "GET",
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let result = await response.json();
  res.send(result.data);
});

module.exports = router;
