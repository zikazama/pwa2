getMatchById();
      window.onload = function () {
        //hide the preloader
        document.querySelector(".loading").style.display = "none";
      };
      // REGISTER SERVICE WORKER
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
          navigator.serviceWorker
            .register("/service-worker.js")
            .then(function () {
              console.log("Pendaftaran ServiceWorker berhasil");
            })
            .catch(function () {
              console.log("Pendaftaran ServiceWorker gagal");
            });
        });
      } else {
        console.log("ServiceWorker belum didukung browser ini.");
      }

      // REQUEST API UNTUK PERTAMA KALI
      document.addEventListener("DOMContentLoaded", function () {
        var urlParams = new URLSearchParams(window.location.search);
        var isFromSaved = urlParams.get("saved");
        var btnSave = document.getElementById("save");
        if (isFromSaved) {
          // Hide fab jika dimuat dari indexed db
          btnSave.style.display = "none";

          // ambil artikel lalu tampilkan
          getMatchById();
        } else {
          var item = getMatchById();
        }
        btnSave.onclick = function () {
          console.log("Tombol FAB di klik.");
          M.toast({ html: "Pertandingan Tersimpan" });
          item.then(function (match) {
            saveForLater(match);
          });
        };
      });