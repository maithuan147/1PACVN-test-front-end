import React from "react";
import { toast } from "react-toastify";

const toastOptions = {
  autoClose: 3000,
  pauseOnFocusLoss: false,
};

export function alertSuccess(response) {
  if (typeof response === "string") {
    toast.success(<span>{response}</span>, toastOptions);
  }
  if (
    typeof response === "object" &&
    (response.message || response.meta?.custom?.message)
  ) {
    toast.success(
      <span>{response.message ?? response.meta?.custom?.message}</span>,
      toastOptions
    );
  }
}

export function alertError(error) {
  if (typeof error === "string") {
    toast.error(<span>{error}</span>, toastOptions);
  }
  if (typeof error === "object") {
    toast.error(
      <span>{error.response?.data?.message ?? error.message}</span>,
      toastOptions
    );
  }
}
