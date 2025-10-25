"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useProducts } from "@/hooks/useProducts";
import { ProductUpsertRequest } from "@/lib/api";

const ProductSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es obligatorio"),
    price: Yup.number().positive("Debe ser un número positivo").required("El precio es obligatorio"),
});

export default function ProductForm() {
    const { createProduct } = useProducts();

    return (
        <div className="max-w-md mx-auto p-6 bg-[var(--card)] rounded-xl shadow border border-[var(--border)]">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--card-foreground)]">Agregar Producto</h2>
            <Formik
                initialValues={{ name: "", price: 0 }}
                validationSchema={ProductSchema}
                onSubmit={(values: ProductUpsertRequest, { resetForm }) => {
                    createProduct.mutate(values);
                    resetForm();
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <label className="block font-medium text-[var(--card-foreground)]">Nombre</label>
                            <Field
                                name="name"
                                className="border border-[var(--border)] bg-transparent text-[var(--card-foreground)] p-2 rounded w-full focus:ring-2 focus:ring-[var(--primary)]"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-400 text-sm" />
                        </div>

                        <div>
                            <label className="block font-medium text-[var(--card-foreground)]">Precio</label>
                            <Field
                                name="price"
                                type="number"
                                className="border border-[var(--border)] bg-transparent text-[var(--card-foreground)] p-2 rounded w-full focus:ring-2 focus:ring-[var(--primary)]"
                            />
                            <ErrorMessage name="price" component="div" className="text-red-400 text-sm" />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || createProduct.isPending}
                            className="w-full bg-[var(--primary)] text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {createProduct.isPending ? "Guardando..." : "Guardar"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>

    );
}
