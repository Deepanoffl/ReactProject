export const transformModal = (evt) => {
  if (evt.target.classList.contains("backdrop")) {
    const modal = evt.currentTarget.querySelector(".modal-box");
    if (modal) {
      modal.classList.add("scale-105");
      setTimeout(() => {
        modal.classList.remove("scale-105");
      }, 200);
    }
  }
};
