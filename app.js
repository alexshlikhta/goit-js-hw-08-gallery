const galleryItems = [
	{
		preview: "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
		original: "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
		description: "Hokkaido Flower",
	},
	{
		preview: "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
		original: "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
		description: "Container Haulage Freight",
	},
	{
		preview: "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
		original: "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
		description: "Aerial Beach View",
	},
	{
		preview: "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
		original: "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
		description: "Flower Blooms",
	},
	{
		preview: "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
		original: "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
		description: "Alpine Mountains",
	},
	{
		preview: "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
		original: "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
		description: "Mountain Lake Sailing",
	},
	{
		preview: "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
		original: "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
		description: "Alpine Spring Meadows",
	},
	{
		preview: "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
		original: "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
		description: "Nature Landscape",
	},
	{
		preview: "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
		original: "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
		description: "Lighthouse Coast Sea",
	},
];

const galleryEl = document.querySelector(".js-gallery");
const modalBox = document.querySelector(".js-lightbox");
const modalBoxCloseBtn = modalBox.querySelector("button[data-action='close-lightbox']");
const modalBoxOverlay = modalBox.querySelector(".lightbox__overlay");
const modalBoxImg = modalBox.querySelector("img");
let imgCounter = 0, imgNumber, nextEl, prevEl;

const setNewElement = galleryItems
	.map(({ original, preview, description }) => {
		return `<li class="gallery__item"><a class="gallery__link" href="${original}"><img data-number="${imgCounter++}" class="gallery__image" data-original="${original}" src="${preview}" alt="${description}" width="500" height="auto"></a></li>`;
	})
	.join("");

galleryEl.insertAdjacentHTML("afterbegin", setNewElement);

function getOriginSize(event) {
	let originImgSize = event.target.dataset.original;
	return originImgSize;
}

function closeModal() {
  modalBox.classList.remove("is-open");
  modalBoxImg.attributes.src.value = "";
}

function openModal(event) {
	event.preventDefault();

	if (event.target.tagName === "IMG") {
    imgNumber = parseInt(event.target.dataset.number);
		modalBox.classList.add("is-open");
		modalBoxImg.attributes.src.value = getOriginSize(event);
	}
}

function keyAction(event) {

  switch (event.keyCode) {
    case 27:
      closeModal();
      break;

    case 37:
      prevImage();
      break;
      
    case 39:
      nextImage();
      break;
  
    default:
      break;
  }
}

function setNextImageElement(nextElNumber) {
	nextEl = galleryEl.querySelector(`[data-number="${nextElNumber}"]`);
    modalBoxImg.attributes.src.value = nextEl.attributes['data-original'].value;
}

function nextImage() {
  if( imgNumber < galleryItems.length - 1 ) {
    imgNumber++;
	setNextImageElement(imgNumber);
  }
}

function prevImage() {
  if( imgNumber !== 0 ) {
    imgNumber--;
	setNextImageElement(imgNumber);
  }
}

galleryEl.addEventListener("click", openModal);
modalBoxCloseBtn.addEventListener("click", closeModal);
modalBoxOverlay.addEventListener("click", closeModal);
window.addEventListener("keydown", keyAction);
