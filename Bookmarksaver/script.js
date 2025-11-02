const boookmarkButton = document.getElementById("add-bookmark");
const bookmarknameEl = document.getElementById("bookmark-name");
const bookmarkurlEl = document.getElementById("bookmark-url");
const bookmarkListEl = document.getElementById("bookmark-list");

const createBookmarkItem = () => {
  bookmarkListEl.innerHTML = "";
  let newSavedBookMarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  console.log("New saved bookmarks:", newSavedBookMarks);
  newSavedBookMarks.forEach((bookmark) => {
    const li = document.createElement("li");
    const link = document.createElement("a");

    link.href = bookmark.url;
    link.target = "_blank";
    link.textContent = bookmark.name + " ";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "x";
    deleteBtn.onclick = () => deleteBookmark(bookmark.id);
    li.appendChild(link);
    li.appendChild(deleteBtn);

    bookmarkListEl.appendChild(li);
  });
};

const deleteBookmark = (id) => {
  console.log("Deleting bookmark with id:", id);
  let newSavedBookMarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const filteredBookMarks = newSavedBookMarks.filter(
    (bookmark) => bookmark.id !== id
  );

  localStorage.setItem("bookmarks", JSON.stringify(filteredBookMarks));
  createBookmarkItem();
};

boookmarkButton.addEventListener("click", (e) => {
  const name = bookmarknameEl.value.trim();
  const url = bookmarkurlEl.value.trim();
  if (name === "" || url === "") {
    alert("Please enter valid bookmark name and url");
    return;
  } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
    alert("Please enter a valid URL that starts with http:// or https://");
    return;
  }
  const newBookmark = { id: Date.now(), name, url };
  const savedBookMarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  savedBookMarks.push(newBookmark);
  localStorage.setItem("bookmarks", JSON.stringify(savedBookMarks));

  createBookmarkItem();

  bookmarknameEl.value = "";
  bookmarkurlEl.value = "";
});

createBookmarkItem();
