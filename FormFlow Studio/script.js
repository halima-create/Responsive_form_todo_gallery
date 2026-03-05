// ===== CONTACT FORM VALIDATION =====
document.addEventListener("DOMContentLoaded", function () {
  // Get form elements
  const contactForm = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const nameGroup = document.getElementById("nameGroup");
  const emailGroup = document.getElementById("emailGroup");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation functions
  function validateName() {
    const nameValue = nameInput.value.trim();

    if (nameValue === "") {
      nameGroup.classList.add("invalid");
      nameError.textContent = "Name is required";
      return false;
    } else if (nameValue.length < 2) {
      nameGroup.classList.add("invalid");
      nameError.textContent = "Name must be at least 2 characters";
      return false;
    } else {
      nameGroup.classList.remove("invalid");
      nameError.textContent = "";
      return true;
    }
  }

  function validateEmail() {
    const emailValue = emailInput.value.trim();

    if (emailValue === "") {
      emailGroup.classList.add("invalid");
      emailError.textContent = "Email is required";
      return false;
    } else if (!emailRegex.test(emailValue)) {
      emailGroup.classList.add("invalid");
      emailError.textContent = "Please enter a valid email";
      return false;
    } else {
      emailGroup.classList.remove("invalid");
      emailError.textContent = "";
      return true;
    }
  }

  // Add input event listeners
  if (nameInput) {
    nameInput.addEventListener("input", validateName);
  }

  if (emailInput) {
    emailInput.addEventListener("input", validateEmail);
  }

  // Form submit handler
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();

      if (isNameValid && isEmailValid) {
        alert(
          `✅ Form submitted successfully!\n\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}`,
        );
        contactForm.reset();
        nameGroup.classList.remove("invalid");
        emailGroup.classList.remove("invalid");
      } else {
        alert("❌ Please fix the errors before submitting.");
      }
    });
  }

  // ===== TO-DO LIST =====
  const todoInput = document.getElementById("todoInput");
  const addTodoBtn = document.getElementById("addTodoBtn");
  const todoList = document.getElementById("todoList");

  // Function to create new todo item
  function createTodoItem(text) {
    const li = document.createElement("li");
    li.className = "todo-item";

    const span = document.createElement("span");
    span.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "✕";
    deleteBtn.setAttribute("aria-label", "Remove task");

    // Add delete functionality
    deleteBtn.addEventListener("click", function () {
      li.style.animation = "slideIn 0.3s ease reverse";
      setTimeout(() => li.remove(), 280);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
  }

  // Function to add todo
  function addTodo() {
    if (!todoInput || !todoList) return;

    const taskText = todoInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task");
      return;
    }

    const newTodo = createTodoItem(taskText);
    todoList.appendChild(newTodo);
    todoInput.value = "";
    todoInput.focus();
  }

  // Event listeners for todo
  if (addTodoBtn) {
    addTodoBtn.addEventListener("click", addTodo);
  }

  if (todoInput) {
    todoInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        addTodo();
      }
    });
  }

  // Add delete functionality to existing todo items
  document.querySelectorAll(".todo-item .delete-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const item = this.closest(".todo-item");
      if (item) {
        item.style.animation = "slideIn 0.3s ease reverse";
        setTimeout(() => item.remove(), 280);
      }
    });
  });

  // ===== IMAGE GALLERY =====
  const imageInput = document.getElementById("imageInput");
  const addImageBtn = document.getElementById("addImageBtn");
  const galleryGrid = document.getElementById("galleryGrid");

  // Function to create gallery item
  function createGalleryItem(url) {
    const div = document.createElement("div");
    div.className = "gallery-item";

    const img = document.createElement("img");
    img.src = url;
    img.alt = "Gallery image";
    img.loading = "lazy";

    // Handle image load errors
    img.onerror = function () {
      this.src = `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
      this.alt = "Fallback image";
    };

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-image";
    removeBtn.innerHTML = "✕";
    removeBtn.setAttribute("aria-label", "Remove image");

    // Add remove functionality
    removeBtn.addEventListener("click", function () {
      div.style.transform = "scale(0)";
      div.style.opacity = "0";
      div.style.transition = "all 0.3s ease";
      setTimeout(() => div.remove(), 280);
    });

    div.appendChild(img);
    div.appendChild(removeBtn);

    return div;
  }

  // Function to add image
  function addImage() {
    if (!imageInput || !galleryGrid) return;

    let imageUrl = imageInput.value.trim();

    if (imageUrl === "") {
      // Use random image if input is empty
      imageUrl = `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
    }

    const newImage = createGalleryItem(imageUrl);
    galleryGrid.appendChild(newImage);

    // Scroll to new image
    newImage.scrollIntoView({ behavior: "smooth", block: "nearest" });

    imageInput.value = "";
    imageInput.focus();
  }

  // Event listeners for gallery
  if (addImageBtn) {
    addImageBtn.addEventListener("click", addImage);
  }

  if (imageInput) {
    imageInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        addImage();
      }
    });
  }

  // Add remove functionality to existing gallery items
  document.querySelectorAll(".gallery-item .remove-image").forEach((btn) => {
    btn.addEventListener("click", function () {
      const item = this.closest(".gallery-item");
      if (item) {
        item.style.transform = "scale(0)";
        item.style.opacity = "0";
        item.style.transition = "all 0.3s ease";
        setTimeout(() => item.remove(), 280);
      }
    });
  });

  // ===== ADDITIONAL FEATURES =====

  // Smooth scroll for navigation
  document.querySelectorAll(".nav-bar a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Responsive console logger
  function logScreenSize() {
    const width = window.innerWidth;
    if (width <= 400) {
      console.log("📱 Mobile (small) view");
    } else if (width <= 600) {
      console.log("📱 Mobile view");
    } else if (width <= 900) {
      console.log("📟 Tablet view");
    } else {
      console.log("🖥️ Desktop view");
    }
  }

  window.addEventListener("resize", logScreenSize);
  logScreenSize(); // Log initial size

  console.log("✅ All features loaded successfully!");
});
