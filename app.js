import { Github } from "./github.js";
import { UI } from "./ui.js";

// class'ın örneğini oluşturma
const github = new Github();
const ui = new UI();

//! Html'den gelenler
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

//! olay izleyicileri
searchButton.addEventListener("click", getInput);

//! methodlar
function getInput() {
  // arama terimi dolu ise çalışır
  if (searchInput.value) {
    // api 'isteği atar
    github
      .fetchUserData(searchInput.value)
      .then((res) => {
        // eğer kullanıcı bulunamadıysa
        if (res.data.message === "Not Found") {
          alert("Kullanıcı Bulunumadı");
        } else {
          // kullanıcı bulunduysa
          ui.renderProfile(res.data);
          ui.renderProjects(res.repos);
        }
      })
      .catch((err) => console.log(err));

    return;
  }

  // arama terimi boş ise çalışır
  alert("Lütfen isim giriniz..");
}
