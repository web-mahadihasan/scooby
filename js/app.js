
// Hamburger function

document.getElementById("hamburger-btn").addEventListener("click", () => {
  document.getElementById("open").classList.toggle("hidden");
  document.getElementById("close").classList.toggle("hidden");
  document.getElementById("hamburger-menu").classList.toggle("hidden");
});
// get Data 
const discussPostContainer = document.getElementById("discuss-post-container");
const loadingContainer = document.getElementById("loading-container");


// get All discuss data
// const getDiscussData = async () => {
//   const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
//   const data = await res.json();
//   const postData = data.posts;
//   displayDiscuss(postData);
// }

// get search query data 
const getDiscussData = async (searchText = "") => {
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText?searchText:""}`);
  const data = await res.json();
  const searchData = data.posts;
  displayDiscuss(searchData);
}

// Lasted post 
const lastedPostData = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
  const data = await res.json();
  const lastedPost = data;
  displayLastedPost(lastedPost);
  // console.log(lastedPost)
}

// Handel Search
const handelSearch = () => {
  const searchText = document.getElementById("search-query").value;
  loadingContainer.classList.remove("hidden");

  setTimeout(() => {
      getDiscussData(searchText);
  }, 3000);
}




// Display all discuss post
const displayDiscuss = (postData) => {
  discussPostContainer.innerHTML = "";
  loadingContainer.classList.add("hidden");


  postData.forEach((post) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="discuss-card flex flex-col overflow-hidden bg-[#F3F3F5] shadow-md sm:flex-row text-slate-500 shadow-slate-200 p-8 rounded-xl ">
            <!-- Image -->
            <figure class="">
              <img src="${post.image}" alt="user name" title="user name"
                class="w-16 h-16 rounded-md" />
            </figure>
            <div class="flex-1 sm:mx-6 sm:px-0">
              <div class="flex gap-8 text-[#12132D] font-medium mb-2">
                <p>
                  <span>#</span>
                  <span>${post.category}</span>
                </p>
                <p>
                  <span>Author:</span>
                  <span>${post.author?.name}</span>
                </p>
              </div>
              <div class="gap-4 pb-4 border-b-2 border-dashed">
                  <h3 class="text-xl mb-3 font-bold text-[#12132D]">${post.title}</h3>
                  <p class="font-normal text-base">
                    ${post.description}
                  </p>
              </div>
              <div class="flex justify-between mt-4">

               <div class="flex-1 flex gap-6 items-center">
                <div>
                  <span><i class="ri-message-2-line text-xl align-middle"></i></span>
                  <span>${post.comment_count}</span>
                </div>
                <div>
                  <span><i class="ri-eye-line text-xl align-middle"></i></span>
                  <span id="view-${post.id}">${post.view_count}</span>
                </div>
                <div>
                  <span><i class="ri-history-line text-xl align-middle"></i></span>
                  <span>${post.posted_time}</span>
                </div>

               </div>
               <div class="">
                <button onclick="markReadBtn(${post.id})" class="flex flex-col">
                  <a id="read-${post.id}" class=""><i class="ri-mail-close-line text-xl align-middle p-1 bg-green-400 rounded-full text-white"></i></a>
                  <a id="unread-${post.id}" class="hidden"><i class="ri-mail-open-line text-xl align-middle p-1 bg-green-400 rounded-full text-white"></i></a>
                </button>
               </div>


              </div>
            </div>
          </div>
    `;

    discussPostContainer.append(div);
  });
}

// one active card color 
//border border-[#797DFC]


const displayLastedPost = (lastedPost) => {
  const lastedPostContainer = document.getElementById("lasted-post-container");

  lastedPost.forEach((data) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="p-4 h-full bg-base-100 shadow border border-gray-100 rounded-xl">
        <figure>
          <img src="${data.cover_image}" alt="Shoes" class="rounded-xl"/>
        </figure>
        <div class=" py-4 space-y-3">
          <p class="text-gray-400">
          <span><i class="ri-calendar-todo-line text-lg align-middle"></i></span>
          <span>${data.author?.posted_date || "No publish Date"}</span>
          </p>
          <h2 class="font-extrabold text-lg text-[#12132D]">${data.title}</h2>
          <p class="text-gray-500">${data.description}</p>
          <div class="flex gap-4">
            <img src="${
              data.profile_image
            }" alt="" class="w-12 h-12 rounded-full">
          <div>
            <h4 class="text-[#12132D] text-base font-bold">${
              data.author?.name || "Unknown"
            }</h4>
            <p class="text-gray-500">${
              data.author?.designation || "Unknown"
            }</p>
          </div>
          </div>
        </div>
      </div>
    `;

    lastedPostContainer.append(div);
  });
};

const markReadBtn = (postID) => {
  // console.log(postID)
  document.getElementById(`read-${postID}`).classList.add("hidden");
  const unread = document.getElementById(`unread-${postID}`);
  unread.classList.remove("hidden");
  // console.log(unread.parentElement.parentElement.parentElement);
  getTitle(postID);
}

const getTitle = async(id) => {
  const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
  const data = await res.json();
  const getTitleData = data.posts;
  // console.log(getTitleData)
  const titles = getTitleData.filter(items => items.id === id);
  showTitle(titles);
}

let readCountArray = []

const showTitle = (titles) => {
  const readHistoryBtn = document.getElementById("read-history-btn");
  // const div = document.createElement("div");
    const viewCountContainer = document.getElementById(`view-${titles[0].id}`).innerText;
  let countView = Number(viewCountContainer);
  if(!readCountArray.includes(titles[0].id)){
    countView++; 
  }
  readCountArray.push(titles[0].id);
  console.log(countView);
  document.getElementById(`view-${titles[0].id}`).innerText = countView;

  document.getElementById("read-count-display").innerText = readCountArray.length;
  const readCountText = document.getElementById("read-count-text-color");
  
  if(readCountArray.length > 0){
    readCountText.classList.add("text-green-500");
    readCountText.classList.remove("text-gray-400");
  }

  
  readHistoryBtn.innerHTML += `
    <div class="flex bg-white gap-4 p-4 items-center rounded-xl">
      <p class="text-[#12132D] font-medium">${titles[0].title}</p>
      <p class="flex gap-2 text-gray-500">
        <span class="align-middle text-xl"><i class="ri-eye-line"></i></span>
        <span>${titles[0].view_count}</span>
      </p>
    </div>
  `; 

}

getDiscussData("");
lastedPostData();