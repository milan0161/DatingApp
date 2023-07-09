import * as Swal from "sweetalert2";

export const showSucces = (message: string): void => {
  const Toast = Swal.default.mixin({
    toast: true,
    position: "top",
    showConfirmButton: true,
    timer: 3000,
    timerProgressBar: true,
  });
  Toast.fire({
    icon: "success",
    title: message,
  });
};

export const showError = (message: string) => {
  const Toast = Swal.default.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  Toast.fire({
    icon: "error",
    title: message,
  });
};
export const showApiError = (message: any) => {
  const Toast = Swal.default.mixin({
    toast: true,
    position: "bottom-right",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  Toast.fire({
    icon: "error",
    title: message.data,
  });
};
