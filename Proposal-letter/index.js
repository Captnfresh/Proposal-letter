if (window.jQuery) {
  $(function () {
    // Elements
    var envelope = $("#envelope");
    var instruction = $("#instruction");
    var openBoxBtn = $("#open-box-btn");
    var sweetWordsEl = $("#sweet-words");
    var secondPage = $("#second-page");
    var secondOptions = $("#second-options");
    var proposalSection = $("#proposal-section");
    var restartProposal = $("#restart-proposal");
    var backProposal = $("#back-proposal");
    var continueMore = $("#continue-more");
    var backBtn = $("#back-btn");

    // Sweet messages
    var sweetData = [
      "Talking to you makes all my worries disappear.",
      "You inspire me to grow and become my best self.",
      "I love every moment we spend playing games together.",
      "I want to experience every part of life with you.",
      "More than anything… I want you to be mine."
    ];

    // Music element
    var romanticMusic = document.getElementById("romantic-music"); // Banky W – Yes/No
    var fadeInterval;

    // Play music with smooth fade-in
    function playMusic() {
      if (romanticMusic) {
        romanticMusic.currentTime = 0;
        romanticMusic.volume = 0;
        romanticMusic.play();

        clearInterval(fadeInterval); // stop any previous fade
        var vol = 0;
        fadeInterval = setInterval(function () {
          if (vol < 1) {
            vol += 0.02;
            romanticMusic.volume = vol;
          } else {
            clearInterval(fadeInterval);
          }
        }, 100);
      }
    }

    // Stop music with smooth fade-out
    function stopMusic() {
      if (romanticMusic) {
        clearInterval(fadeInterval); // stop any ongoing fade
        var vol = romanticMusic.volume;
        fadeInterval = setInterval(function () {
          if (vol > 0) {
            vol -= 0.02;
            romanticMusic.volume = vol;
          } else {
            clearInterval(fadeInterval);
            romanticMusic.pause();
            romanticMusic.currentTime = 0;
          }
        }, 50); // faster fade-out
      }
    }

    // Open Envelope
    function openEnvelope() {
      envelope.addClass("open").removeClass("close");
      instruction.hide();
      secondPage.show();
      showFloatingImages();

      // Show first sweet message immediately
      sweetWordsEl.text(sweetData[0]).data("current", 0);

      // Start romantic music on first click
      playMusic();
    }

    // Floating images
    var floatingImagesSrc = ["her-photo1.jpg", "her-photo2.jpg", "her-photo3.jpg"];
    function showFloatingImages() {
      var container = $("#floating-images");
      container.empty();
      floatingImagesSrc.forEach(function (src, i) {
        var img = $('<img />', {
          src: src,
          class: 'float-img',
          alt: 'Her Photo',
          style: 'animation-delay:' + (i * 0.5) + 's;'
        });
        container.append(img);
      });
    }

    // Open box button
    openBoxBtn.on("click", openEnvelope);

    // Back to envelope from second page
    backBtn.on("click", function () {
      secondPage.hide();
      instruction.show();
      envelope.removeClass("open").addClass("close");
      stopMusic();
    });

    // Next sweet message / Proposal
    continueMore.on("click", function () {
      var current = sweetWordsEl.data("current") || 0;
      if (current < sweetData.length - 1) {
        current++;
        sweetWordsEl.text(sweetData[current]).data("current", current);
      } else {
        // Show final proposal
        secondOptions.hide();
        sweetWordsEl.html(
          '<span style="font-size:1.2rem; line-height:2; color:#d9534f; font-family:\'Dancing Script\', cursive;">' +
          'Maryam Sannoe,<br>will you be my girlfriend?' +
          '</span>'
        );
        proposalSection.show();
      }
    });

    // Back on Proposal (go back to last sweet word)
    backProposal.on("click", function () {
      proposalSection.hide();
      secondOptions.show();
      var lastIdx = sweetData.length - 1;
      sweetWordsEl.text(sweetData[lastIdx]).data("current", lastIdx);
      stopMusic();
    });

    // Restart Proposal
    restartProposal.on("click", function () {
      proposalSection.hide();
      secondPage.hide();
      sweetWordsEl.data("current", 0).text(sweetData[0]);
      secondOptions.show();
      instruction.show();
      envelope.removeClass("open").addClass("close");
      stopMusic();
    });

    // YES Proposal (celebration)
    $("#yes-proposal").on("click", function () {
      $("#celebration-overlay").fadeIn(400);
      animateLoveEmojis();
      setTimeout(function () {
        $("#celebration-overlay").fadeOut(1200);
      }, 4000);
    });

    function animateLoveEmojis() {
      var container = $("#flying-emojis");
      container.empty();
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
        container.append(emoji);
      }
    }

    // NO Proposal (gentle message)
    $("#no-proposal").on("click", function () {
      $("#no-overlay").fadeIn(400);
      setTimeout(function () {
        $("#no-overlay").fadeOut(1200);
      }, 3000);
      stopMusic();
    });
  });
} else {
  document.addEventListener("DOMContentLoaded", function () {
    alert("jQuery failed to load. Please check your internet connection.");
  });
}
