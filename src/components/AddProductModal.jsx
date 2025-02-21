import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/productService";

const schema = yup.object({
  name: yup.string().required("Le nom du produit est obligatoire"),
  price: yup
    .number()
    .typeError("Le prix doit être un nombre")
    .required("Le prix est obligatoire")
    .positive("Le prix doit être positif"),
  size: yup.string().required("La taille est obligatoire"),
  sex: yup
    .string()
    .oneOf(["male", "female", "other"], "Sélectionnez un sexe valide")
    .required("Le sexe est obligatoire"),
  description: yup.string().required("La description est obligatoire"),
}).required();

export default function AddProductModal({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Create a FormData object for file upload
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("size", data.size);
    formData.append("sex", data.sex);
    formData.append("description", data.description);
    // Append the file if provided. data.image is an array of files.
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    addProduct(formData)
      .then(() => {
        onClose();
        navigate("/admin/dashboard");
      })
      .catch((error) => console.error("Erreur :", error));
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Ajouter un produit
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name")}
              placeholder="Nom du produit"
              className="w-full border px-3 py-2 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              type="number"
              {...register("price")}
              placeholder="Prix"
              className="w-full border px-3 py-2 rounded"
            />
            {errors.price && (
              <p className="text-red-500 text-xs">{errors.price.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("size")}
              placeholder="Taille"
              className="w-full border px-3 py-2 rounded"
            />
            {errors.size && (
              <p className="text-red-500 text-xs">{errors.size.message}</p>
            )}
          </div>
          <div>
            <select {...register("sex")} className="w-full border px-3 py-2 rounded">
              <option value="">Sélectionnez le sexe</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
              <option value="other">Autre</option>
            </select>
            {errors.sex && (
              <p className="text-red-500 text-xs">{errors.sex.message}</p>
            )}
          </div>
          <div>
            <textarea
              {...register("description")}
              placeholder="Description"
              className="w-full border px-3 py-2 rounded"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Image du produit</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
