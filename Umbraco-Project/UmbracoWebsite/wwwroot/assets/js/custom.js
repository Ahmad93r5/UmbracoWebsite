document.addEventListener("DOMContentLoaded", function () {
  // 1.1 Header section
  // Dropdown bar
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");
    dropdownMenu.style.maxHeight = "0";
    dropdown.addEventListener("mouseenter", () => {
      dropdownMenu.style.visibility = "visible";
      dropdownMenu.style.maxHeight = `${dropdownMenu.scrollHeight}px`;
    });
    dropdown.addEventListener("mouseleave", () => {
      dropdownMenu.style.visibility = "hidden";
      dropdownMenu.style.maxHeight = "0";
    });
  });

  // Search icon modal
  if (document.querySelector(".searchModal")) {
    document.getElementById('SearchModal').addEventListener('click', () => {
      const modal = document.querySelector(".searchModal");
      modal.style.display = "flex";
      document.body.classList.add("modal-open");
      setTimeout(() => {
        modal.classList.add("show");
      }, 10);
    });
    
    document.getElementById('closeSearchModal').addEventListener('click', () => {
      const modal = document.querySelector(".searchModal");
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
      }, 500);
    });

    document
      .querySelector(".SearchModal a")
      .addEventListener("click", window.openSearchModal);
  }

  // Aside navigation
  window.toggleMenu = function () {
    var menuBar = document.getElementById("menuBar");
    if (menuBar) menuBar.classList.toggle("active");
  };

  window.toggleDropdown = function () {
    var dropdown = document.querySelector(".dropdown");
    if (dropdown) dropdown.classList.toggle("active");
  };

  // 1.7 Projects section
  document.querySelectorAll(".Projects .fas.fa-search").forEach((icon) => {
    icon.addEventListener("click", () => {
      const imgSrc = icon.closest(".position-relative")?.querySelector("img")?.src;
      if (imgSrc) openFullscreenImage(imgSrc);
    });
  });

  function openFullscreenImage(src) {
    const modal = Object.assign(document.createElement("div"), {
      className: "project-image-modal",
      style: `position:fixed;top:0;left:0;width:100vw;height:100vh;
              background:rgba(0,0,0,0.8);display:flex;align-items:center;
              justify-content:center;z-index:1000;cursor:pointer;
              transition:opacity 0.3s ease;opacity:0;`,
      onclick: () => {
        modal.style.opacity = "0";
        modal.firstChild.style.transform = "scale(0.9)";
        setTimeout(() => modal.remove(), 300);
      },
    });

    const img = Object.assign(document.createElement("img"), {
      src,
      style: `width:90vw;height:90vh;object-fit:cover;
              transition:transform 0.3s ease;transform:scale(0.9);`,
    });

    modal.appendChild(img);
    document.body.appendChild(modal);
    setTimeout(() => {
      modal.style.opacity = "1";
      img.style.transform = "scale(1)";
    }, 10);
  }

  // 1.8 Experience section
  const counters = document.querySelectorAll(".Experience h4");
  counters.forEach((counter) => {
    let originalText = counter.textContent.trim();
    let target = parseInt(originalText.replace(/\D/g, "")) || 0;
    let count = 0;
    let speed = target / 100;
    let suffix = originalText.replace(/[\d\s]/g, "");

    const updateCounter = () => {
      count += speed;
      if (count < target) {
        counter.textContent = Math.floor(count) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    };

    updateCounter();
  });

  // 1.11 Testimonials section
  if (document.querySelector(".TestimonialSlider")) {
    $(".TestimonialSlider").slick({
      arrows: true,
      dots: false,
      infinite: false,
      autoplaySpeed: 10000,
      speed: 1000,
      cssEase: "linear",
      slidesToShow: 2,
      slidesToScroll: 1,
      pauseOnHover: true,
      draggable: true,
      responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 2 } },
        { breakpoint: 991, settings: { slidesToShow: 1 } },
        { breakpoint: 767, settings: { slidesToShow: 1 } },
      ],
    });
  }

  // 1.12 Partners section
  if (document.querySelector(".partnerSlider")) {
    $(".partnerSlider").slick({
      arrows: false,
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 1000,
      speed: 1000,
      cssEase: "linear",
      slidesToShow: 5,
      slidesToScroll: 1,
      pauseOnHover: true,
      draggable: true,
      responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 4 } },
        { breakpoint: 991, settings: { slidesToShow: 5 } },
        { breakpoint: 767, settings: { slidesToShow: 3 } },
        { breakpoint: 400, settings: { slidesToShow: 2 } },
      ],
    });
  }

  // 1.4 Services section
  const s = document.querySelector(".Services .col-lg-7, .Services .row");
  if (s) {
    s.querySelectorAll(".gap-2.text-center").forEach((c, i) => {
      if (c) {
        const w = document.createElement("div"),
          n = document.createElement("div"),
          d = document.createElement("div"),
          u = document.createElement("div");
        w.style.display = "flex";
        w.style.alignItems = "start";
        w.style.gap = "10px";
        n.classList.add("service-number-container");
        n.style.display = "flex";
        n.style.flexDirection = "column";
        n.style.alignItems = "start";
        d.textContent = (i + 1).toString().padStart(2, "0");
        d.style.fontWeight = "bold";
        d.style.color = "#9E9E9E";
        d.style.fontSize = "14px";
        u.style.width = "18px";
        u.style.height = "1px";
        u.style.background = "#9E9E9E";
        n.appendChild(d);
        n.appendChild(u);
        c.parentElement.insertBefore(w, c);
        w.appendChild(n);
        w.appendChild(c);
      }
    });
  }

  // 2.6 Choose Us section
  const chooseUsSection = document.querySelector(".Choose-us");
  if (chooseUsSection) {
    const accordionItems = chooseUsSection.querySelectorAll(".accordion-item");
    accordionItems.forEach((item, index) => {
      let header = item.querySelector(".accordion-header");
      if (header && !item.querySelector(".accordion-number")) {
        let numberSpan = document.createElement("span");
        numberSpan.classList.add("accordion-number");
        numberSpan.textContent = (index + 1).toString().padStart(2, "0");
        item.prepend(numberSpan);
      }
    });
  }

  // Footer form success modal
  if (document.querySelector("#footerForm")) {
    function showModal() {
      document.getElementById("footerModal").classList.add("active");
      document.querySelector(".modal-overlay").style.display = "block";
      setTimeout(hideModal, 3000);
    }

    function hideModal() {
      document.getElementById("footerModal").classList.remove("active");
      document.querySelector(".modal-overlay").style.display = "none";
    }

    document.getElementById("footerForm").addEventListener("submit", function (event) {
      event.preventDefault();
      showModal();
      document.getElementById("footerForm").reset();
    });

    document.getElementById("dismiss-footerModal").addEventListener("click", hideModal);
    document.querySelector(".modal-overlay").addEventListener("click", hideModal);
  }

  // Contact Us form modal
  if (document.querySelector(".ContactForm")) {
    function showContactModal(name) {
      document.getElementById("ContactModal").classList.add("active");
      document.querySelector(".modal-overlay").style.display = "block";
      document.getElementById("userNameDisplay").textContent = name || "User";
      setTimeout(hideContactModal, 3000);
    }

    function hideContactModal() {
      document.getElementById("ContactModal").classList.remove("active");
      document.querySelector(".modal-overlay").style.display = "none";
    }

    document.getElementById("ContactForm").addEventListener("submit", function (event) {
      event.preventDefault();
      const nameInput = document.querySelector("#ContactForm input[name='userName']");
      const name = nameInput ? nameInput.value.trim() : "";
      showContactModal(name);
      document.getElementById("ContactForm").reset();
    });

    document.getElementById("dismiss-ContactModal").addEventListener("click", hideContactModal);
    document.querySelector(".modal-overlay").addEventListener("click", hideContactModal);
  }

  // Feedback form modal
  if (document.querySelector(".FeedbackForm")) {
    function showFeedbackModal() {
      document.getElementById("FeedbackModal").classList.add("active");
      document.querySelector(".modal-overlay").style.display = "block";
      setTimeout(hideFeedbackModal, 3000);
    }

    function hideFeedbackModal() {
      document.getElementById("FeedbackModal").classList.remove("active");
      document.querySelector(".modal-overlay").style.display = "none";
    }

    document.getElementById("FeedbackForm").addEventListener("submit", function (event) {
      event.preventDefault();
      showFeedbackModal();
      document.getElementById("FeedbackForm").reset();
    });

    document.getElementById("dismiss-FeedbackModal").addEventListener("click", hideFeedbackModal);
    document.querySelector(".modal-overlay").addEventListener("click", hideFeedbackModal);
  }
});
