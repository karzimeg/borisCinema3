$(".movie").mouseout(function() {
  $(".more_info", this).css("display", "none");
});

$(".movie").mouseover(function() {
  $(".more_info", this).css("display", "block");
});

(function() {
  (function() {
    var logo, logo_css;
    logo =
      '<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>codepen-logo</title><path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zM7.139 21.651l1.35-1.35a.387.387 0 0 0 0-.54l-3.49-3.49a.387.387 0 0 0-.54 0l-1.35 1.35a.39.39 0 0 0 0 .54l3.49 3.49a.38.38 0 0 0 .54 0zm6.922.153l2.544-2.543a.722.722 0 0 0 0-1.018l-6.582-6.58a.722.722 0 0 0-1.018 0l-2.543 2.544a.719.719 0 0 0 0 1.018l6.58 6.579c.281.28.737.28 1.019 0zm14.779-5.85l-7.786-7.79a.554.554 0 0 0-.788 0l-5.235 5.23a.558.558 0 0 0 0 .789l7.79 7.789c.216.216.568.216.785 0l5.236-5.236a.566.566 0 0 0 0-.786l-.002.003zm-3.89 2.806a.813.813 0 1 1 0-1.626.813.813 0 0 1 0 1.626z" fill="#FFF" fill-rule="evenodd"/></svg>';
    logo_css =
      ".mM{display:block;border-radius:50%;box-shadow:0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);position:fixed;bottom:1em;right:1em;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-transition:all 240ms ease-in-out;transition:all 240ms ease-in-out;z-index:9999;opacity:0.75}.mM svg{display:block}.mM:hover{opacity:1;-webkit-transform:scale(1.125);transform:scale(1.125)}";
    document.head.insertAdjacentHTML(
      "beforeend",
      "<style>" + logo_css + "</style>"
    );
  })();

  $(".gallery-link").magnificPopup({
    type: "image",
    closeOnContentClick: true,
    closeBtnInside: false,
    mainClass: "mfp-with-zoom mfp-img-mobile",
    image: {
      verticalFit: true,
      titleSrc: function(item) {
        return item.el.find("figcaption").text() || item.el.attr("title");
      }
    },
    zoom: {
      enabled: true
    },
    // duration: 300
    gallery: {
      enabled: true,
      navigateByImgClick: false,
      tCounter: ""
    },
    disableOn: function() {
      if ($(window).width() < 640) {
        return false;
      }
      return true;
    }
  });
}.call(this));

var firstSeatLabel = 1;

$(document).ready(function() {
  var $cart = $("#selected-seats"),
    $counter = $("#counter"),
    $total = $("#total"),
    sc = $("#seat-map").seatCharts({
      map: [
        "ppppppppppppppppppppppppppppppppppppp_______________________",
        "",
        "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
        "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
        "",
        "___________iiiiiiiiiiiiiiiiiiiii",
        "___________hhhhhhhhhhhhhhhhhhhhh",
        "___________ggggggggggggggggggggg",
        "",
        "cccccccccccccccccccccccccccccccccccccccccccccccccccccccc"
      ],
      seats: {
        p: {
          price: 5000,
          classes: "vip-class",
          category: "VIP Ticket"
        },
        k: {
          price: 2500,
          classes: "standard-balcony-class",
          category: "Standard Ticket (Balcony)"
        },
        j: {
          price: 2500,
          classes: "standard-balcony-class",
          category: "Standard Ticket (Balcony)"
        },
        i: {
          price: 2500,
          classes: "standard-ground-class",
          category: "Standard Ticket (Ground)"
        },
        h: {
          price: 2500,
          classes: "standard-ground-class",
          category: "Standard Ticket (Ground)"
        },
        g: {
          price: 2500,
          classes: "standard-ground-class",
          category: "Standard Ticket (Ground)"
        },
        c: {
          price: 1250,
          classes: "student-class",
          category: "Student Ticket"
        }
      },
      naming: {
        rows: ["P", "", "K", "J", "", "I", "H", "G", "", "C"],
        top: false,
        getLabel: function(character, row, column) {
          if (row == "P") {
            return column;
          } else if (row == "K" || row == "J") {
            return column;
          } else if (row == "I" || row == "H" || row == "G") {
            return column;
          } else if (row == "C") {
            return column;
          }
        }
      },
      legend: {
        node: $("#legend"),
        items: [
          ["p", "available", "VIP Ticket"],
          ["k", "available", "Standard Ticket (Balcony)"],
          ["i", "available", "Standard Ticket (Ground)"],
          ["c", "available", "Student Ticket"],
          ["f", "unavailable", "Already Booked"]
        ]
      },
      click: function() {
        if (this.status() == "available") {
          //let's create a new <li> which we'll add to the cart items
          $(
            "<li>" +
              this.data().category +
              " Seat # " +
              this.settings.label +
              ": <b>Rs." +
              this.data().price +
              '</b> <a href="#" class="cancel-cart-item">[cancel]</a></li>'
          )
            .attr("id", "cart-item-" + this.settings.id)
            .data("seatId", this.settings.id)
            .appendTo($cart);

          /*
           * Lets update the counter and total
           *
           * .find function will not find the current seat, because it will change its stauts only after return
           * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
           */
          $counter.text(sc.find("selected").length + 1);
          $total.text(recalculateTotal(sc) + this.data().price);

          return "selected";
        } else if (this.status() == "selected") {
          //update the counter
          $counter.text(sc.find("selected").length - 1);
          //and total
          $total.text(recalculateTotal(sc) - this.data().price);

          //remove the item from our cart
          $("#cart-item-" + this.settings.id).remove();

          //seat has been vacated
          return "available";
        } else if (this.status() == "unavailable") {
          //seat has been already booked
          return "unavailable";
        } else {
          return this.style();
        }
      }
    });

  //this will handle "[cancel]" link clicks
  $("#selected-seats").on("click", ".cancel-cart-item", function() {
    //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
    sc.get(
      $(this)
        .parents("li:first")
        .data("seatId")
    ).click();
  });

  //let's pretend some seats have already been booked
  sc.get(["1_2", "4_1", "7_1", "7_2"]).status("unavailable");
});

function recalculateTotal(sc) {
  var total = 0;

  //basically find every selected seat and sum its price
  sc.find("selected").each(function() {
    total += this.data().price;
  });

  return total;
}
