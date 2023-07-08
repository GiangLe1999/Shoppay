import Swal from "sweetalert2";

const Popup = (
  title,
  text,
  type,
  comfirmButtonText,
  callback,
  results,
  detail
) => {
  Swal.fire({
    title: title,
    text: text,
    icon: type,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: comfirmButtonText || "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await callback();
      Swal.fire(results, detail, "success");
    }
  });
};

export default Popup;
