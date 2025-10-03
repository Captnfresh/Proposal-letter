    // Proposal Back and Restart button handlers
    $("#back-proposal").on("click", function () {
      $("#proposal-section").hide();
      $("#second-options").show();
      // Show last sweet word and image
      var sweetData = [
        { text: "You light up my world!", img: "her-photo1.jpg" },
        { text: "Your smile brightens my day! 😊", img: "her-photo2.jpg" },
        { text: "I cherish every moment with you! 🌹", img: "her-photo3.jpg" },
        { text: "You are my sunshine and happiness! ☀️", img: "her-photo4.jpg" },
        { text: "Forever grateful for your love! 💕", img: "her-photo5.jpg" }
      ];
      var lastIdx = sweetData.length - 1;
      $("#sweet-words").text(sweetData[lastIdx].text).data("current", lastIdx);
      $("#sweet-words").next('img').attr('src', sweetData[lastIdx].img).show();
    });
    $("#restart-proposal").on("click", function () {
      $("#proposal-section").hide();
      $("#second-page").hide();
      $("#sweet-words").data("current", 0);
      $("#sweet-words").text("You light up my world!");
      $("#sweet-words").next('img').attr('src', "her-photo1.jpg").show();
      $("#second-options").show();
      $("#instruction").show();
      $("#envelope").removeClass("open").addClass("close");
    });

if (window.jQuery) {
  $(function () {
    var envelope = $("#envelope");
    var instruction = $("#instruction");
    var openBoxBtn = $("#open-box-btn");
    var proposalMessage = $("#proposal-message");
    var options = $("#options");
    var btn_yes = $("#yes");
    var btn_no = $("#no");
    var restartBtn = $("#restart-btn");
    var happyResponse = $("#happy-response");
    var romanticMusic = document.getElementById("romantic-music");

    function playMusic() {
      if (romanticMusic) {
        romanticMusic.currentTime = 0;
        romanticMusic.play();
      }
    }

    function openEnvelope() {
      // Hide first page, show second page
      envelope.addClass("open").removeClass("close");
      instruction.hide();
      playMusic();
      $("#second-page").show();
      showFloatingImages();
    }
    // Floating images placeholder data
    var floatingImagesSrc = [
      "her-photo1.jpg",
      "her-photo2.jpg",
      "her-photo3.jpg"
    ];

    function showFloatingImages() {
      var container = $("#floating-images");
      container.empty();
      floatingImagesSrc.forEach(function(src, i) {
        var img = $('<img />', {
          src: src,
          class: 'float-img',
          alt: 'Her Photo',
          style: 'animation-delay:' + (i * 0.5) + 's;'
        });
        container.append(img);
      });
    }

    // Navigation for second page
    $("#back-btn").on("click", function () {
      $("#second-page").hide();
      instruction.show();
      envelope.removeClass("open").addClass("close");
    });
    $("#continue-more").on("click", function () {
      // Cycle five sweet words and images, then show proposal
      var sweetData = [
        { text: "You light up my world!", img: "her-photo1.jpg" },
        { text: "Your smile brightens my day! 😊", img: "her-photo2.jpg" },
        { text: "I cherish every moment with you! 🌹", img: "her-photo3.jpg" },
        { text: "You are my sunshine and happiness! ☀️", img: "her-photo4.jpg" },
        { text: "Forever grateful for your love! 💕", img: "her-photo5.jpg" }
      ];
      var current = $("#sweet-words").data("current") || 0;
      if (current < sweetData.length - 1) {
        current++;
        $("#sweet-words").text(sweetData[current].text).data("current", current);
        $("#sweet-words").next('img').attr('src', sweetData[current].img);
      } else {
        // Show proposal section
  $("#second-options").hide();
  // Update the letter content with the new proposal message and beautify font size
  $("#sweet-words").html('<span style="font-size:1.1rem; line-height:2; color:#d9534f; font-family: \"Dancing Script\", cursive;">After all said and done,<br>Will you be my girlfriend?</span>');
  $("#sweet-words").next('img').hide();
  $("#proposal-section").show();
      }
    });

    // Proposal button handlers
    $("#yes-proposal").on("click", function () {
      // Show joyous celebration overlay
      $("#celebration-overlay").fadeIn(400);
      animateLoveEmojis();
      setTimeout(function() {
        $("#celebration-overlay").fadeOut(1200);
      }, 4000);
    });

    function animateLoveEmojis() {
      var emojiContainer = $("#flying-emojis");
      emojiContainer.empty();
      for (var i = 0; i < 18; i++) {
        var emoji = $('<span class="love-fly">💖</span>');
        var left = Math.random() * 90 + "%";
        var top = Math.random() * 60 + 20 + "%";
        var duration = 2 + Math.random() * 2;
        emoji.css({
          position: "absolute",
          left: left,
          top: top,
          fontSize: "2.2rem",
          animation: "flyLove " + duration + "s linear"
        });
        emojiContainer.append(emoji);
      }
    }
    $("#no-proposal").on("click", function () {
      // Show dimmed overlay with gentle message
      $("#no-overlay").fadeIn(400);
      setTimeout(function() {
        $("#no-overlay").fadeOut(1200);
      }, 3000);
    });

    openBoxBtn.on("click", function () {
      openEnvelope();
    });

    btn_yes.on("click", function () {
      happyResponse.show();
      showConfetti();
    });
    btn_no.on("click", function () {
      alert("Maybe another time. 😊");
    });
    restartBtn.on("click", function () {
      happyResponse.hide();
      proposalMessage.hide();
      options.hide();
      $("#yes").hide();
      $("#no").hide();
      instruction.show();
      envelope.removeClass("open").addClass("close");
    });

    function showConfetti() {
      var confetti = happyResponse.find(".confetti");
      confetti.empty();
      for (var i = 0; i < 20; i++) {
        var color = ["#d9534f", "#e60073", "#ff6f61", "#f5a3a2"][Math.floor(Math.random()*4)];
        var left = Math.random() * 90 + "%";
        var delay = Math.random() * 0.8;
        confetti.append('<span style="left:'+left+';background:'+color+';animation-delay:'+delay+'s;"></span>');
      }
    }
  });
} else {
  document.addEventListener("DOMContentLoaded", function () {
    alert("jQuery failed to load. Please check your internet connection.");
  });
}
