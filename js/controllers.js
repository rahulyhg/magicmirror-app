var ref = 0;
angular.module('starter.controllers', ['myservices'])

.controller('TabCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {
            //get total cart
            $scope.obj = 0;
            var totalcartsuccess = function (data, status) {
                console.log(data);
                MyServices.setobj(parseInt(data));
                $scope.obj = MyServices.getobj();
                if (data == 0) {
                    var alertPopup = $ionicPopup.show({
                        title: 'Your Cart is Empty',
                    });
                    $timeout(function () {
                        alertPopup.close(); //close the popup after 3 seconds for some reason
                    }, 2000);
                } else {
                    console.log("else");
                    $location.url("/tab/cart");
                }
            }
            $scope.gotocheckout = function () {
			  
                if ($.jStorage.get("user")) {
                    $location.url("tab/cart/checkout");
                } else {
                    $location.url("tab/account/login");
                }
            }
                //popup for cart

                $scope.showAlert = function () {
                    MyServices.gettotalcart().success(totalcartsuccess);

                };
            })

        .controller('HomeCtrl', function ($scope, $stateParams, MyServices, $window) {

            if (refreshhome == 1) {
                refreshhome = 0;
                $window.location.reload(true);
            }

            var slidersuccess = function (data, status) {
                $scope.sliders = data;
            };
            MyServices.getallslider().success(slidersuccess);

            $scope.sliderss = [{
                "id": "1",
                "image": "img/up1.png",
                "link": "AD-NECKLACE-SET",
                "name": "Bangle"

    }, {
                "id": "2",
                "image": "img/up2.png",
                "link": "AD-NECKLACE-SET",
                "name": "Necklace"

    }, {
                "id": "3",
                "image": "img/up3.png",
                "link": "FingerRing",
                "name": "Rings"

    }, {
                "id": "4",
                "image": "img/up4.png",
                "link": "Corporate-Earings",
                "name": "Earings"

    }, {
                "id": "5",
                "image": "img/up5.png",
                "link": "AQ-JUDA",
                "name": "Juda"

    }, {
                "id": "6",
                "image": "img/up6.png",
                "link": "AD-PAYAL",
                "name": "Payal"
    }];
            $scope.slidersss = [{
                "id": "1",
                "image": "img/jwel1.png",
                "link": "AD-NECKLACE-SET",
                "name": "American Diamond"

    }, {
                "id": "2",
                "image": "img/jwel2.png",
                "link": "Pearl-Mala",
                "name": "Pearl"

    }, {
                "id": "3",
                "image": "img/adiamond.png",
                "link": "AQ-VICTORIA-SET",
                "name": "Antique"

    }, {
                "id": "4",
                "image": "img/wedding-jwellery.png",
                "link": "MICRO-SET",
                "name": "Micro Set"

    }];

            //newsletter
            var newslettersaved = function (data, status) {
                if (data == "true") {
                    console.log("Thank You For Subscribe");
                } else {
                    console.log("No Thank You For Subscribe");
                }
            };
            $scope.newsletter = function (uemail) {
                if (!uemail) {
                    alert("Please Enter Email");
                } else {
                    MyServices.newsletter("", uemail, "").success(newslettersaved);
                }
            };
            //newsletter

        })

        .controller('DashCtrl', function ($scope, $stateParams, MyServices, $location, $anchorScroll) {

            var authenticate = function (data, status) {
                console.log(data);
                if (data != "false") {
                    $scope.loginlogouttext = "Logout";
                }
            };
            MyServices.authenticate().success(authenticate);

            //    $scope.gotoBottom = function (hashid) {
            //        // set the location.hash to the id of
            //        // the element you wish to scroll to.
            //        $location.hash(hashid);
            //
            //        // call $anchorScroll()
            //        $anchorScroll();
            //    };

        })



        .controller('ItemCtrl', function ($scope, $stateParams, MyServices, $ionicModal) {

            $scope.filter = {
                color: "",
                pricemin: 0,
                pricemax: 500000,
                orderby: "new"
            };

            // USING LODASH
            var users = [{
                'user': 'barney',
                'age': "36"
    }, {
                'user': 'fred',
                'age': "40"
    }];

            //    $scope.dashvar = _.min(users, function(chr) {
            //        return chr.age;
            //    });
            //    console.log($scope.dashvar);

            var authenticate = function (data, status) {
                console.log(data);
                if (data != "false") {
                    $scope.loginlogouttext = "Logout";
                }
            };
            $scope.imagewidth = {};
            $scope.imagewidth.width = window.innerWidth / 3 - 15;

            $(window).resize(function () {
                $scope.imagewidth.width = window.innerWidth / 3 - 15;
                console.log("Resized is called");
                $scope.$apply();
            });


            MyServices.authenticate().success(authenticate);


            var categoryId = $stateParams.cid;

            $scope.productItem = [];
            var change = 11;
            var counter = 0;
            $scope.products = [];
            $scope.pageno = 1;
            $scope.loadshow = true;
            var onsuccess = function (data, status) {
                console.log(data);
                for (var i = 0; i < data.queryresult.length; i++) {

                    $scope.productItem.push(data.queryresult[i]);
                }


                if (data.lastpage > $scope.pageno) {
                    $scope.pageno = $scope.pageno + 1;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                } else {
                    $scope.loadshow = false;
                }

                console.log($scope.productItem);

                $scope.minimum = _.max($scope.productItem, function (prod) {
                    return prod.price;
                });

                console.log("minimum price");
                console.log($scope.minimum.price);

            };
            MyServices.getproductbycategory(categoryId).success(onsuccess);
            var oldpage = 1;
            $scope.loadMore = function () {

                console.log("ADD MORE: " + oldpage);
                if (oldpage != $scope.pageno) {
                    oldpage = $scope.pageno;
                    MyServices.getproductbycategory(categoryId, $scope.pageno).success(onsuccess);
                }
                // var sum = counter + change;
                // if (sum > $scope.products.product.length) {
                //     sum = $scope.products.product.length;
                // }
                // for (var i = counter; i <= sum; i++) {
                //     $scope.productItem.push($scope.products.product[i]);
                // };
                // counter += change + 1;
                // $scope.$broadcast('scroll.infiniteScrollComplete');
            };
            //    $scope.loadMore();
            $ionicModal.fromTemplateUrl('templates/filter.html', {
                id: '1',
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal1 = modal;
            });

            $scope.openfilter = function () {
                $scope.modal2.show();
                console.log("1");
            };

            $scope.closefilter = function () {
                $scope.modal1.hide();
            };

            $ionicModal.fromTemplateUrl('templates/sortby.html', {
                id: '2',
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal2 = modal;
            });

            $scope.opensort = function () {
                $scope.modal1.show();
                console.log("2");
            };

            $scope.closesort = function () {
                $scope.modal2.hide();
            };


            //FILTER SAVE

            $scope.filtersave = function (filter) {
                console.log("before filte");
                console.log(filter);
                MyServices.setfilter(filter);
                console.log("after filte");
                console.log(MyServices.getfilters());
                $scope.productItem = [];
                $scope.modal1.hide();
                MyServices.getproductbycategory(categoryId).success(onsuccess);
            };

            $scope.orderbychange = function (filter) {
                console.log(filter);
                $scope.filter.orderby = filter;
                MyServices.setfilter($scope.filter);
                $scope.productItem = [];
                $scope.modal2.hide();
                MyServices.getproductbycategory(categoryId).success(onsuccess);
            };
        })

        .controller('ProductCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, $ionicPopup, $timeout, $ionicLoading, MyServices, $location, $state) {
            //addtowishlist

            $scope.userid = '';

            if (MyServices.getjuser() && MyServices.getjuser != "") {
                $scope.useremail = MyServices.getjuser().email;
            }

            $scope.showbutton = $state.current.name;

            $scope.addtowishlist = function () {
                MyServices.addtowishlist($scope.userid, $scope.item.product.id, function (data, status) {
                    console.log(data);
                });
                $scope.wishlistPopup();
            }

            var authenticate = function (data, status) {
                console.log("authenticate");
                console.log(data);
                $scope.userid = data.id;
            };
            MyServices.authenticate().success(authenticate);
            //addtowishlist popup
            $scope.wishlistPopup = function () {
                $scope.data = {}

                // An elaborate, custom popup
                var myPopup = $ionicPopup.show({
                    template: '<div class="text-center"><h1 class="ion-ios7-heart assertive"></h1><p>' + $scope.item.product.name + ' added to wishlist!</p>',
                    title: 'Added to wishlist!',
                    scope: $scope,

                });
                $timeout(function () {
                    myPopup.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            };


            //addtocart popup
            $scope.showPopup = function () {
                $scope.data = {}

                // An elaborate, custom popup
                var myPopup = $ionicPopup.show({
                    template: '<div class="text-center"><h1 class="ion-ios7-checkmark balanced"></h1><p>' + $scope.item.product.name + ' added to cart!</p>',
                    title: 'Added to cart!',
                    scope: $scope,

                });
                $timeout(function () {
                    myPopup.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            };

            //Loader
            $ionicLoading.show({
                template: 'Loading...',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 500
            });

            var productId = $stateParams.pid;

            var onsuccess = function (data, status) {
                $scope.item = data;
                $scope.item.product.quantity2 = 1;
                console.log(data);
            };
            MyServices.getproductdetails(productId).success(onsuccess);

            var totalcartsuccess = function (data, status) {
                MyServices.setobj(parseInt(data));
                $scope.obj = MyServices.getobj();
            }
            var cartsuccess = function () {
                MyServices.gettotalcart().success(totalcartsuccess);

            };
            //Add to cart
            $scope.addtocart = function (id, name, price, quantity) {
//			  console.log("********************");
                MyServices.addtocart(id, name, price, quantity).success(cartsuccess);
                $scope.showPopup();
                //get total cart

            };

            //SLIDE BOX
            $scope.nextSlide = function () {
                $ionicSlideBoxDelegate.next();
            };
            $scope.prevSlide = function () {
                $ionicSlideBoxDelegate.previous();
            };
            $timeout(function () {
                $ionicSlideBoxDelegate.update();
                $ionicLoading.hide();
            }, 2000);

            var changelocation = function (data) {
                $location.url("/tab/dash/categories/product/" + data.id);
            };
            $scope.next = function (product) {
                MyServices.nextproduct(product, 1).success(changelocation);
            };
            $scope.previous = function (product) {
                MyServices.nextproduct(product, 0).success(changelocation);
            };

            //share this popup
            $scope.sharePopup = function () {
                $scope.data = {}

                // An elaborate, custom popup
                var myPopup = $ionicPopup.show({
                    templateUrl: 'templates/share.html',
                    title: 'Share!',
                    scope: $scope,

                });
                $scope.closeShare = function () {
                    myPopup.close();
                };
            };


        })


        .controller('ShareProductCtrl', function ($scope, $stateParams, MyServices) {
            //get share it
            //console.log("Chutia banauya");
            stButtons.makeButtons();
            stLight.options({
                publisher: "4c832d7b-fb34-487d-801e-84e56649a4b0",
                doNotHash: false,
                doNotCopy: false,
                hashAddressBar: false
            });

        })


        .controller('ThankyouCtrl', function ($scope, $stateParams, MyServices) {
            //get share it
            //console.log("Chutia banauya");

        })


        .controller('WishlistCtrl', function ($scope, $stateParams, MyServices) {
            //get wishlist
            $scope.wishlists = [];
            $scope.userid = MyServices.getjuser().id;


            var onwishlistsuccess = function (data, status) {
                    console.log(data);
                    $scope.wishlists = data;
                }
                //    var authenticate = function(data, status) {
                //        $scope.userid = data.id;
            MyServices.showwishlist($scope.userid).success(onwishlistsuccess);
            //    };
            //    MyServices.authenticate().success(authenticate);


        })

        .controller('AccountCtrl', function ($scope) {

        })
        .controller('WelcomeCtrl', function ($scope) {

        })
        .controller('MissuniCtrl', function ($scope) {

        })

        .controller('CartCtrl', function ($scope, $stateParams, MyServices, $ionicLoading, $location) {
            //Product details
            $scope.subtotal = 0;
            $scope.cart = [];
            var onproductsuccess = function (data, status) {

                for (var i = 0; i < $scope.products.length; i++) {
                    if ($scope.products[i].id == data.product.id) {
                        $scope.products[i].image = data.productimage[0].image;
                    }
                }
            };

            $scope.gotocheckout = function () {
                if ($.jStorage.get("user")) {
                    $location.url("tab/cart/checkout");
                } else {
                    $location.url("tab/account/login");
                }
            }

            $scope.newquantity = [];
            var showcart = function (data, status) {
                console.log(data);
                $scope.cart = data;
                console.log("Values in cart");
                // console.log($scope.cart[0].qty);
                console.log($scope.cart.length);

                for (var i = 0; i < $scope.cart.length; i++) {
                    $scope.newquantity[i] = $scope.cart[i].qty;

                }
                console.log("values in newquantity");
                console.log($scope.newquantity);
            };
            MyServices.getcart().success(showcart);

            var getsubtotal = function (data, status) {
                console.log(data);
                $scope.subtotal = parseFloat(data);
                calcdiscountamount();

            };
            //    var getsubtotal = function (data, status) {
            //        $scope.subtotal = data;
            //    };
            var cartt = function (data, status) {
                console.log(data);
                MyServices.gettotalcart().success(MyServices.gettotalproductsincart);
                MyServices.totalcart().success(getsubtotal);
            };
            $scope.addtocart = function (id, name, price, quantity, index) {
                // console.log(id+name+price+quantity);
                $scope.cart[index].subtotal = price * quantity;
                MyServices.addtocart(id, name, price, quantity).success(cartt);
            };

            $scope.subproductcart = function (id, name, price, quantity, index) {
                console.log(id + name + price + quantity);
                quantity = parseInt(quantity) - 1;
                $scope.newquantity[index] = quantity;
                $scope.cart[index].subtotal = price * quantity;
                MyServices.addtocart(id, name, price, quantity).success(cartt);
            };
            $scope.addproductcart = function (id, name, price, quantity, index) {
                //        console.log(id + name + price + quantity);
                console.log("id=" + id + "name=" + name + "price=" + price + "quantity=" + quantity);
                quantity = parseInt(quantity) + 1;
                $scope.newquantity[index] = quantity;
                $scope.cart[index].subtotal = price * quantity;
                MyServices.addtocart(id, name, price, quantity).success(cartt);
            };

            MyServices.totalcart().success(getsubtotal);
            var onsuccess = function (data, status) {
                $ionicLoading.hide();
                $scope.products = data;
                $scope.cart = data;
                for (var i = 0; i < data.length; i++) {
                    MyServices.getproductdetails(data[i].id).success(onproductsuccess);
                }

            };
            MyServices.getcart().success(onsuccess);
            //coupon

            var deletefromcart = function () {
                MyServices.gettotalcart().success(MyServices.gettotalproductsincart);
                MyServices.totalcart().success(getsubtotal);
                console.log("Subtotal should change");
            };

            $scope.deletecart = function (id) {
                //console.log(cart);
                for (var i = 0; i < $scope.cart.length; i++) {
                    if ($scope.cart[i].id == id) {
                        $scope.cart.splice(i, 1);
                    }
                }
                //console.log(cart);
                $scope.subtotal = 0;
                console.log($scope.cart);
                for (var i = 0; i < $scope.cart.length; i++) {
                    $scope.subtotal += parseInt($scope.cart[i].qty) * parseFloat($scope.cart[i].price);
                }

                MyServices.deletecartfromsession(id).success(deletefromcart);

            };


            //Loader
            $ionicLoading.show({
                template: 'Loading...',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 500
            });

            $scope.discountamount = 0;

            function calcdiscountamount() {
                var data = MyServices.getcoupondetails();
                var subtotal = parseFloat($scope.subtotal);
                console.log($scope.subtotal);
                console.log(data);
                if (data.coupontype == '1') {
                    if (data.discountpercent != '0') {
                        $scope.ispercent = parseFloat(data.discountpercent);
                        $scope.discountamount = (subtotal * $scope.ispercent / 100);
                    } else {
                        $scope.isamount = parseFloat(data.discountamount);
                        $scope.discountamount = $scope.isamount;
                    }
                }
                if (data.coupontype == '2') {
                    console.log($scope.cart);

                    var totallength = 0;
                    _.each($scope.cart, function (cart) {
                        totallength += parseInt(cart.qty);
                    });
                    var xproducts = parseInt(data.xproducts);
                    var yproducts = parseInt(data.yproducts);
                    var itter = Math.floor(totallength / xproducts) * yproducts;
                    console.log("ITTER " + itter);
                    var newcart = _.sortBy($scope.cart, function (cart) {
                        cart.price = parseFloat(cart.price);
                        cart.qty2 = parseInt(cart.qty);
                        return parseFloat(cart.price);
                    });
                    var newcart = _.sortBy($scope.cart, function (cart) {
                        cart.price = parseFloat(cart.price);
                        cart.qty2 = parseInt(cart.qty);
                        return parseFloat(cart.price);
                    });

                    //newcart=_.each(newcart, function(cart){  cart.price=parseFloat(cart.price);cart.qty=parseFloat(cart.qty); });
                    console.log(newcart);
                    $scope.discountamount = 0;
                    for (var i = 0; i < itter; i++) {
                        if (newcart[i].qty2 != 0) {
                            newcart[i].qty2--;
                            $scope.discountamount += newcart[i].price;
                        }

                    }
                }
                if (data.coupontype == 4) {
                    $scope.isfreedelivery = "Free Delivery";
                    $scope.discountamount = 0;
                }
            };


            var couponsuccess = function (data, status) {
                console.log(data);
                if (data == 'false') {
                    //$scope.validcouponcode = 0;
                } else {
                    console.log("Show it");
                    //$scope.validcouponcode = 1;

                    MyServices.setcoupondetails(data);
                    calcdiscountamount();

                }
            }



            $scope.checkcoupon = function (couponcode) {
                MyServices.getdiscountcoupon(couponcode).success(couponsuccess);
            };
            var totalcartsuccess = function (data, status) {
                MyServices.setobj(parseInt(data));
            };

            //Remove item
            //    var ondeletesuccess = function () {
            //        MyServices.getcart().success(onsuccess);
            //        MyServices.gettotalcart().success(totalcartsuccess);
            //    };
            //    $scope.deletecart = function (id) {
            //        MyServices.deletecartfromsession(id).success(ondeletesuccess);
            //        //get total cart
            //
            //
            //    };

            //Total
            var ontotalsuccess = function (data, status) {
                $scope.gettotal = data;
            };
            MyServices.totalcart().success(ontotalsuccess);

        })

        .controller('ContactCtrl', function ($scope, $ionicPopup, $timeout, MyServices) {

            $scope.contact = {
                name: "",
                phone: "",
                email: "",
                comment: ""
            };
            $scope.showPopup = function () {

                // An elaborate, custom popup
                var myPopup = $ionicPopup.show({
                    template: '<div class="text-center"><h1 class="ion-ios7-checkmark balanced"></h1><p>Thank you for your comment.</p>',
                    title: 'Message Sent!',
                    scope: $scope,

                });
                $timeout(function () {
                    myPopup.close(); //close the popup after 1.5 seconds for some reason
                }, 1500);
            };

            var contactfun = function (data, status) {
                console.log(data);
                $scope.contact = {
                    name: "",
                    phone: "",
                    email: "",
                    comment: ""
                };
            };
            $scope.usercontact = function (data) {

                MyServices.usercontact("", data.name, data.email, data.phone, data.comment).success(contactfun);
                $scope.showPopup();
            };

        })

        .controller('CheckoutCtrl', function ($scope, MyServices, $interval, $ionicLoading) {

            $scope.showpaywithcard = false;
            $scope.showplaceorder = true;
            $scope.cart = [];
            var onsuccess = function (data, status) {
                $scope.products = data;
                $scope.cart = data;
                for (var i = 0; i < data.length; i++) {
                    MyServices.getproductdetails(data[i].id).success(onproductsuccess);
                }

            };
            MyServices.getcart().success(onsuccess);
            var ontotalsuccess = function (data, status) {
                $scope.gettotal = data;
            };
            MyServices.totalcart().success(ontotalsuccess);
            $scope.showshippingmethods = 0;
            $scope.diffadd = false;
            $scope.form = {};
            $scope.form.shipdifferent = 1;
            $scope.orcontinue = true;
            $scope.deliverypayment = false;
            $scope.allvalidation = [];

            $scope.paymentorderemail = "";
            $scope.paymentorderid = 0;


            $scope.continueformshipping = function () {


                $scope.allvalidation = [{
                    field: $scope.form.firstname,
                    validation: ""
        }, {
                    field: $scope.form.lastname,
                    validation: ""
        }, {
                    field: $scope.form.email,
                    validation: ""
        }, {
                    field: $scope.form.billingaddress,
                    validation: ""
        }, {
                    field: $scope.form.phone,
                    validation: ""
        }, {
                    field: $scope.form.billingpincode,
                    validation: ""
        }, {
                    field: $scope.form.billingcountry,
                    validation: ""
        }, {
                    field: $scope.form.billingcity,
                    validation: ""
        }, {
                    field: $scope.form.shippingaddress,
                    validation: ""
        }, {
                    field: $scope.form.shippingpincode,
                    validation: ""
        }, {
                    field: $scope.form.shippingcountry,
                    validation: ""
        }, {
                    field: $scope.form.shippingcity,
                    validation: ""
        }];


                var check = formvalidation();
                console.log(check);
                if (check) {

                    console.log("completed");
                    console.log("Myform:");
                    $scope.deliverypayment = true;
                }

            };
            $scope.continuenoshipping = function () {


                $scope.allvalidation = [{
                    field: $scope.form.firstname,
                    validation: ""
        }, {
                    field: $scope.form.lastname,
                    validation: ""
        }, {
                    field: $scope.form.company,
                    validation: ""
        }, {
                    field: $scope.form.email,
                    validation: ""
        }, {
                    field: $scope.form.billingaddress,
                    validation: ""
        }, {
                    field: $scope.form.billingcity,
                    validation: ""
        }, {
                    field: $scope.form.billingstate,
                    validation: ""
        }, {
                    field: $scope.form.billingpincode,
                    validation: ""
        }, {
                    field: $scope.form.billingcountry,
                    validation: ""
        }, {
                    field: $scope.form.phone,
                    validation: ""
        }];


                var check = formvalidation();
                console.log(check);
                if (check) {

                    console.log("completed");
                    console.log("Myform:");
                    $scope.deliverypayment = true;
                }


            };
            $scope.hidediffaddress = function () {

                $scope.diffadd = false;
                $scope.orcontinue = true;
            }
            $scope.showdiffaddress = function () {


                $scope.allvalidation = [{
                    field: $scope.form.firstname,
                    validation: ""
        }, {
                    field: $scope.form.lastname,
                    validation: ""
        }, {
                    field: $scope.form.company,
                    validation: ""
        }, {
                    field: $scope.form.email,
                    validation: ""
        }, {
                    field: $scope.form.billingaddress,
                    validation: ""
        }, {
                    field: $scope.form.billingcity,
                    validation: ""
        }, {
                    field: $scope.form.billingstate,
                    validation: ""
        }, {
                    field: $scope.form.billingpincode,
                    validation: ""
        }, {
                    field: $scope.form.billingcountry,
                    validation: ""
        }, {
                    field: $scope.form.phone,
                    validation: ""
        }];


                var check = formvalidation();
                console.log(check);
                if (check) {

                    console.log("completed");
                    console.log("Myform:");
                    $scope.diffadd = true;
                    $scope.orcontinue = false;
                }


            };

            //    start shipping to different address fucntion


            function formvalidation() {
                var isvalid2 = true;
                for (var i = 0; i < $scope.allvalidation.length; i++) {
                    console.log("checking");
                    console.log($scope.allvalidation[i].field);
                    if ($scope.allvalidation[i].field == "" || !$scope.allvalidation[i].field) {
                        $scope.allvalidation[i].validation = "ng-dirty";
                        isvalid2 = false;
                    }
                }
                return isvalid2;
            }

            $scope.payment = {};
            $scope.orderplacedid = false;

            $scope.orderid = 0;
            $scope.amount = 0;
            //place order on countinue
            var orderplaced = function (data, status) {
                console.log("place order returns");
                console.log(data);
                $scope.orderplacedid = true;
                $scope.paymentorderid = data;
                $scope.payment.orderid = data;
                console.log(data);
                $scope.payment.amount = $scope.subtotal;
                console.log($scope.payment);
                $ionicLoading.hide();
            };
            $scope.continuepayment = function (form) {
                if ($scope.diffadd == true) {
                    $scope.allvalidation = [{
                        field: $scope.form.firstname,
                        validation: ""
            }, {
                        field: $scope.form.lastname,
                        validation: ""
            }, {
                        field: $scope.form.company,
                        validation: ""
            }, {
                        field: $scope.form.email,
                        validation: ""
            }, {
                        field: $scope.form.billingaddress,
                        validation: ""
            }, {
                        field: $scope.form.billingcity,
                        validation: ""
            }, {
                        field: $scope.form.billingstate,
                        validation: ""
            }, {
                        field: $scope.form.billingpincode,
                        validation: ""
            }, {
                        field: $scope.form.billingcountry,
                        validation: ""
            }, {
                        field: $scope.form.phone,
                        validation: ""
            }, {
                        field: $scope.form.shippingname,
                        validation: ""
            }, {
                        field: $scope.form.shippingtel,
                        validation: ""
            }, {
                        field: $scope.form.shippingaddress,
                        validation: ""
            }, {
                        field: $scope.form.shippingcity,
                        validation: ""
            }, {
                        field: $scope.form.shippingstate,
                        validation: ""
            }, {
                        field: $scope.form.shippingpincode,
                        validation: ""
            }, {
                        field: $scope.form.customernote,
                        validation: ""
            }];

                } else {

                    $scope.allvalidation = [{
                        field: $scope.form.firstname,
                        validation: ""
            }, {
                        field: $scope.form.lastname,
                        validation: ""
            }, {
                        field: $scope.form.company,
                        validation: ""
            }, {
                        field: $scope.form.email,
                        validation: ""
            }, {
                        field: $scope.form.billingaddress,
                        validation: ""
            }, {
                        field: $scope.form.billingcity,
                        validation: ""
            }, {
                        field: $scope.form.billingstate,
                        validation: ""
            }, {
                        field: $scope.form.billingpincode,
                        validation: ""
            }, {
                        field: $scope.form.billingcountry,
                        validation: ""
            }, {
                        field: $scope.form.phone,
                        validation: ""
            }];

                }

                var check = formvalidation();
                console.log(check);
                if (check) {
                    $ionicLoading.show({
                        template: 'Loading...',
                        animation: 'fade-in',
                        showBackdrop: false,
                        maxWidth: 200,
                        showDelay: 500
                    });
                    $scope.paywithcard = 1;
                    $scope.form.finalamount = $scope.subtotal;
                    $scope.paymentorderemail = $scope.form.email;
                    console.log($scope.cart);
                    $scope.form.cart = $scope.cart;
                    $scope.form.user = $scope.id;
                    $scope.form.status = $scope.status;
                    MyServices.placeorder(form).success(orderplaced);
                }



            }

            //    end shipping to different address fucntion
            function calcdiscountamount() {
                var data = MyServices.getcoupondetails();
                var subtotal = parseFloat($scope.subtotal);
                console.log($scope.subtotal);
                console.log(data);
                if (data.coupontype == '1') {
                    if (data.discountpercent != '0') {
                        $scope.ispercent = parseFloat(data.discountpercent);
                        $scope.discountamount = (subtotal * $scope.ispercent / 100);
                    } else {
                        $scope.isamount = parseFloat(data.discountamount);
                        $scope.discountamount = $scope.isamount;
                    }
                }
                if (data.coupontype == '2') {
                    console.log($scope.cart);

                    var totallength = 0;
                    _.each($scope.cart, function (cart) {
                        totallength += parseInt(cart.qty);
                    });
                    var xproducts = parseInt(data.xproducts);
                    var yproducts = parseInt(data.yproducts);
                    var itter = Math.floor(totallength / xproducts) * yproducts;
                    console.log("ITTER " + itter);
                    var newcart = _.sortBy($scope.cart, function (cart) {
                        cart.price = parseFloat(cart.price);
                        cart.qty2 = parseInt(cart.qty);
                        return parseFloat(cart.price);
                    });
                    var newcart = _.sortBy($scope.cart, function (cart) {
                        cart.price = parseFloat(cart.price);
                        cart.qty2 = parseInt(cart.qty);
                        return parseFloat(cart.price);
                    });

                    //newcart=_.each(newcart, function(cart){  cart.price=parseFloat(cart.price);cart.qty=parseFloat(cart.qty); });
                    console.log(newcart);
                    $scope.discountamount = 0;
                    for (var i = 0; i < itter; i++) {
                        if (newcart[i].qty2 != 0) {
                            newcart[i].qty2--;
                            $scope.discountamount += newcart[i].price;
                        }

                    }
                }
                if (data.coupontype == 4) {
                    $scope.isfreedelivery = "Free Delivery";
                    $scope.discountamount = 0;
                }
            };

            //check out chart
            var onproductsuccess = function (data, status) {
                for (var i = 0; i < $scope.products.length; i++) {
                    if ($scope.products[i].id == data.product.id) {
                        $scope.products[i].image = data.productimage[0].image;
                    }
                }
            };

            var onsuccess = function (data, status) {
                $scope.products = data;

                for (var i = 0; i < data.length; i++) {
                    MyServices.getproductdetails(data[i].id).success(onproductsuccess);
                }

            };
            MyServices.getcart().success(onsuccess);
            //check out chart


            //    var handler = StripeCheckout.configure({
            //        key: 'pk_live_I1udSOaNJK4si3FCMwvHsY4g',
            //        //key: 'pk_test_4etgLi16WbODEDr4YBFdcbP0',
            //        image: 'img/logo.jpg',
            //        currency: 'GBP',
            //        token: function (token) {
            //            MyServices.chargestripe(token.id, $scope.form.email, ($scope.subtotal + $scope.form.shippingcost - $scope.discountamount), ($scope.form.firstname + " " + $scope.form.lastname)).success(paymentcomplete);
            //            //window.location.href="http://www.lylaloves.co.uk/#/thankyou";
            //            // Use the token to create the charge with a server-side script.
            //            // You can access the token ID with `token.id`
            //        }
            //    });
            //
            //    $scope.StipePaymentGen = function (amount) {
            //
            //
            //        handler.open({
            //            name: 'Lyla Loves',
            //            description: 'Total Amount: £ ' + amount,
            //            amount: amount * 100,
            //
            //        });
            //
            //    };

            $scope.newquantity = [];
            var showcart = function (data, status) {
                console.log(data);
                $scope.cart = data;
                console.log($scope.cart[0].qty);
                console.log($scope.cart.length);

                for (var i = 0; i < $scope.cart.length; i++) {
                    $scope.newquantity[i] = $scope.cart[i].qty;
                    console.log($scope.newquantity[i]);
                }
            };
            MyServices.getcart().success(showcart);
            var getsubtotal = function (data, status) {
                console.log(data);
                $scope.subtotal = parseFloat(data);
                calcdiscountamount();

            };
            MyServices.totalcart().success(getsubtotal);
            // free
            $scope.free = function (country, subtotal, shipping) {
                console.log("MAaaaza");
                console.log(country);
                console.log(subtotal);
                console.log(shipping);
                var coupondetails = MyServices.getcoupondetails();
                console.log("coupon,,,,,");
                console.log(coupondetails);
                if (coupondetails && MyServices.getcoupondetails().coupontype == "4") {
                    console.log("ABC");
                    $scope.showshippingmethods = 5;
                    $scope.form.shippingcost = 0;
                    $scope.form.shippingmethod = 6;
                    return 0;
                } else if (shipping == "1") {
                    if (country == "United Kingdom") {
                        if (subtotal >= 15) {
                            $scope.showshippingmethods = 1;
                            $scope.form.shippingmethod = 1;
                            $scope.form.shippingcost = 0;
                        } else {
                            $scope.showshippingmethods = 2;
                            $scope.form.shippingmethod = 2;
                            $scope.form.shippingcost = 3;
                        }

                    } else {
                        if (subtotal >= 20) {
                            $scope.showshippingmethods = 3;
                            $scope.form.shippingmethod = 4;
                            $scope.form.shippingcost = 0;
                        } else {
                            $scope.showshippingmethods = 4;
                            $scope.form.shippingmethod = 5;
                            $scope.form.shippingcost = 5;
                        }

                    }
                }

            };
            $scope.free2 = function (country, subtotal, shipping) {
                console.log(country);
                console.log(subtotal);
                console.log(shipping);
                var coupondetails = MyServices.getcoupondetails();
                if (coupondetails && MyServices.getcoupondetails().coupontype == "4") {
                    $scope.showshippingmethods = 5;
                    $scope.form.shippingcost = 0;
                    $scope.form.shippingmethod = 6;
                    return 0;
                } else if (shipping == "2") {
                    if (country == "United Kingdom") {
                        if (subtotal >= 15) {
                            $scope.showshippingmethods = 1;
                            $scope.form.shippingmethod = 1;
                            $scope.form.shippingcost = 0;
                        } else {
                            $scope.showshippingmethods = 2;
                            $scope.form.shippingmethod = 2;
                            $scope.form.shippingcost = 3;
                        }

                    } else {
                        if (subtotal >= 20) {

                            $scope.showshippingmethods = 3;
                            $scope.form.shippingmethod = 4;
                            $scope.form.shippingcost = 0;
                        } else {
                            $scope.showshippingmethods = 4;
                            $scope.form.shippingmethod = 5;
                            $scope.form.shippingcost = 5;
                        }

                    }
                }

            };
            // free
            $scope.form.shippingcost = 0;
            $scope.changeshippingcost = function (value) {
                console.log(value);
                $scope.form.shippingcost = value;
            };

            var paymentcomplete = function (data, status) {
                console.log(data);
                MyServices.orderemail($scope.paymentorderemail, $scope.paymentorderid).success(orderemailsend);
                window.location.href = "http://localhost/lyla-touch/#/tab/thankyou";
            };

            var handler = StripeCheckout.configure({
                key: 'pk_live_I1udSOaNJK4si3FCMwvHsY4g',
                //key: 'pk_test_4etgLi16WbODEDr4YBFdcbP0',
                image: 'img/logo.jpg',
                currency: 'GBP',
                token: function (token) {
                    MyServices.chargestripe(token.id, $scope.form.email, ($scope.subtotal + $scope.form.shippingcost - $scope.discountamount), ($scope.form.firstname + " " + $scope.form.lastname)).success(paymentcomplete);
                    //window.location.href="http://www.lylaloves.co.uk/#/thankyou";
                    // Use the token to create the charge with a server-side script.
                    // You can access the token ID with `token.id`
                }
            });



            //    var placeordersuccess = function(data, status) {
            //        console.log(data);
            //        $scope.paymentorderid = data;
            //        $scope.showpaywithcard = true;
            //        $scope.showplaceorder = false;
            //    };
            //
            //    $scope.placeorder = function(amount, form) {
            //        console.log("strippaymentGen form");
            //
            //        $scope.paywithcard = 1;
            //        $scope.form.finalamount = $scope.subtotal;
            //        console.log($scope.cart);
            //        //MainJson.orderitem($scope.cart);
            //        $scope.form.cart = $scope.cart;
            //        $scope.form.user = $scope.id;
            //        $scope.form.status = $scope.status;
            //        $scope.paymentorderemail = $scope.form.email;
            //        MyServices.placeorder(form).success(placeordersuccess);
            //    };

            $scope.StipePaymentGen = function (amount, form) {
                console.log("strippaymentGen form");

                $scope.paywithcard = 1;
                $scope.form.finalamount = $scope.subtotal;
                console.log($scope.cart);
                //MainJson.orderitem($scope.cart);
                $scope.form.cart = $scope.cart;
                $scope.form.user = $scope.id;
                $scope.form.status = $scope.status;
                //        console.log($scope.getmessage);
                console.log(form);
                console.log("amount:" + amount);
                handler.open({
                    name: 'Magic Mirror',
                    description: 'Total Amount: Rs ' + amount,
                    amount: amount * 100,

                });
            };

            //place order
            var orderemailsend = function (data, status) {
                console.log(data);
                //alert("Email send");
            };



            //NEW CHECKOUT

            var stopinterval = 0;
            var checkstate = function (data, status) {
                console.log(data);
                if (data == "1") {
                    console.log("Facebook Login");
                    $interval.cancel(stopinterval);
                    ref.close();
                } else {
                    console.log("Do nothing");
                }
            };

            var callAtInterval = function () {
                console.log("hey hey in inerval");
                MyServices.checkStatus($scope.payment.orderid, checkstate);
            };

            $scope.newCheckout = function () {
                console.log($scope.payment);
                console.log($scope.form);
                //JAGRUTI PAYUMONEY
                //			ref = window.open("http://localhost/magicmirror/paymentgateway/paymentgateway.php?orderid=" + $scope.payment.orderid + "&amount=" +$scope.payment.amount +  "&firstname=" + $scope.form.firstname + "&lastname=" + $scope.form.lastname + "&billingaddress=" + $scope.form.billingaddress + "&billingstate=" + $scope.form.billingstate+ "&billingcity=" + $scope.form.billingcity+ "&billingpincode=" + $scope.form.billingpincode+ "&phone=" + $scope.form.phone+ "&email=" + $scope.form.email+ "&shippingname=" + $scope.form.shippingname+ "&shippingaddress=" + $scope.form.shippingaddress+ "&shippingcity=" + $scope.form.shippingcity+ "&shippingstate=" + $scope.form.shippingstate+ "&shippingpincode=" + $scope.form.shippingpincode+ "&shippingtel=" + $scope.form.shippingtel , '_blank', 'location=no');

                ref = window.open("http://magicmirror.in/admin/index.php/json/getorderforpayment?orderid=" + $scope.payment.orderid + "&amount=" + $scope.payment.amount + "&firstname=" + $scope.form.firstname + "&lastname=" + $scope.form.lastname + "&billingaddress=" + $scope.form.billingaddress + "&billingstate=" + $scope.form.billingstate + "&billingcity=" + $scope.form.billingcity + "&billingpincode=" + $scope.form.billingpincode + "&phone=" + $scope.form.phone + "&email=" + $scope.form.email + "&shippingname=" + $scope.form.shippingname + "&shippingaddress=" + $scope.form.shippingaddress + "&shippingcity=" + $scope.form.shippingcity + "&shippingstate=" + $scope.form.shippingstate + "&shippingpincode=" + $scope.form.shippingpincode + "&shippingtel=" + $scope.form.shippingtel, '_blank', 'location=no');

                //        ref = window.open("http://magicmirror.in/paymentgetwayfile/index.php?orderid=604&amount=90" , '_blank', 'location=no');

                stopinterval = $interval(callAtInterval, 2000);
                ref.addEventListener('exit', function (event) {
                    $interval.cancel(stopinterval);
                });

            };


        })

        .controller('LoginCtrl', function ($scope, $location, MyServices) {
            //Authenticate
            $scope.demo = "demo";
            $scope.useremail = 0;
            $scope.login = [];
            //$scope.android="Android";

            var cartdata = function (data, status) {};
            var authenticate = function (data, status) {
                console.log(data);
                MyServices.getusercart(data.id).success(cartdata);
                if (data != "false") {
                    $scope.loginlogouttext = "Logout";
                    $scope.getlogin2 = false;
                    //            $scope.useremail = data.email;
                }
            };
            MyServices.authenticate().success(authenticate);

            var emailsend = function (data, status) {
                console.log(data);
                refreshhome = 1;
                $location.url('tab/home');
                //        alert("Email send to you");
            };

            //login
            $scope.emptydata = "";
            $scope.getlogin2 = true;
            if (MyServices.getjuser() && MyServices.getjuser != "") {
                $scope.useremail = MyServices.getjuser().email;
			  $scope.getlogin2 = true;
            }
            if ($scope.useremail != 0) {
                $scope.getlogin2 = false;
            }

            var getlogin = function (data, status) {
                $scope.emptydata = data;
                if (data != "false") {
                    //$scope.msg = "Login Successful";
                    $scope.useremail = data.email;
                    MyServices.setuseremail(data);
                    $scope.getlogin2 = false;
                    $scope.login.email = " ";
                    $scope.login.password = " ";
                    $location.path('tab/home');
                } else {
				 $scope.getlogin2 = false;
                    $scope.msg = "Invalid Email Or Password";
                }
            };

            $scope.userlogin = function (login) {
                console.log(login);
                MyServices.loginuser(login.email, login.password).success(getlogin);
            };

            //logout
            var logoutsuccess = function (data, status) {
                if (data != "false") {
                    $scope.getlogin2 = true;
                    $scope.emptydata = "false";
                    MyServices.setuseremail("");
                };
            }
            $scope.logout = function () {
                MyServices.logout().success(logoutsuccess);
            };

            //Signup
            var getsignup = function (data, status) {
                if (data != "false") {
                    $scope.msgr = "Registered Successful";

                    $scope.useremail = data.email;
                    MyServices.setuseremail(data);
                    $scope.getlogin2 = false;
                    //            $location.url("#/account/login");
                    MyServices.signupemail(data.email).success(emailsend);
                } else {
                    $scope.msgr = "This Email is already registered with us.";
                }
            };
            $scope.signup = function (register) {
                console.log(register);
                if (register.password === register.confirmpassword) {
                    MyServices.registeruser(register.firstname, register.lastname, register.email, register.password).success(getsignup);
                } else {
                    alert("Passwords doesn't match !!");
                }
            };

        })

        .controller('OrderCtrl', function ($scope) {});