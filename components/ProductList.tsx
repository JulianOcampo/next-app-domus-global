"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Product, ProductUpsertRequest } from "@/lib/api";

export default function ProductList() {
    const [searchName, setSearchName] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [editForm, setEditForm] = useState<ProductUpsertRequest>({ name: "", price: 0 });

    const { products, metadata, isLoading, updateProduct, deleteProduct } = useProducts({
        name: searchName || undefined,
        page: currentPage,
        size: 10,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(0); // Reset to first page when searching
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setEditForm({ name: product.name, price: product.price });
    };

    const handleSaveEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProduct) {
            await updateProduct.mutateAsync({
                id: editingProduct.id,
                product: editForm,
            });
            setEditingProduct(null);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            await deleteProduct.mutateAsync(id);
        }
    };

    const totalPages = metadata ? Math.ceil(metadata.total / metadata.size) : 0;

    if (isLoading) return <p className="text-center mt-4 text-[var(--heading)]">Cargando productos...</p>;

    return (
        <div className="max-w-4xl mx-auto mt-6">
            <h2 className="text-xl font-semibold mb-4 text-[var(--heading)]">
                Lista de productos
            </h2>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="flex-1 border border-[var(--border)] bg-transparent text-[var(--foreground)] p-2 rounded focus:ring-2 focus:ring-[var(--primary)]"
                    />
                    <button
                        type="submit"
                        className="bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Buscar
                    </button>
                </div>
            </form>

            {/* Products Table */}
            <div className="bg-[var(--card)] rounded-xl shadow border border-[var(--border)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="text-left p-4 text-[var(--card-foreground)]">Nombre</th>
                                <th className="text-left p-4 text-[var(--card-foreground)]">Precio</th>
                                <th className="text-center p-4 text-[var(--card-foreground)]">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-t border-[var(--border)] hover:bg-gray-800 transition">
                                    <td className="p-4 text-[var(--card-foreground)]">
                                        {editingProduct?.id === product.id ? (
                                            <input
                                                type="text"
                                                value={editForm.name}
                                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                className="w-full border border-[var(--border)] bg-transparent text-[var(--card-foreground)] p-1 rounded"
                                            />
                                        ) : (
                                            product.name
                                        )}
                                    </td>
                                    <td className="p-4 text-[var(--card-foreground)]">
                                        {editingProduct?.id === product.id ? (
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={editForm.price}
                                                onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) || 0 })}
                                                className="w-full border border-[var(--border)] bg-transparent text-[var(--card-foreground)] p-1 rounded"
                                            />
                                        ) : (
                                            `$${product.price.toFixed(2)}`
                                        )}
                                    </td>
                                    <td className="p-4 text-center">
                                        {editingProduct?.id === product.id ? (
                                            <div className="flex gap-2 justify-center">
                                                <button
                                                    onClick={handleSaveEdit}
                                                    disabled={updateProduct.isPending}
                                                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
                                                >
                                                    {updateProduct.isPending ? "Guardando..." : "Guardar"}
                                                </button>
                                                <button
                                                    onClick={() => setEditingProduct(null)}
                                                    className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex gap-2 justify-center">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    disabled={deleteProduct.isPending}
                                                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50"
                                                >
                                                    {deleteProduct.isPending ? "Eliminando..." : "Eliminar"}
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {metadata && totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button
                        onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                        disabled={currentPage === 0}
                        className="bg-[var(--primary)] text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Anterior
                    </button>
                    
                    <span className="text-[var(--heading)] px-3">
                        Página {currentPage + 1} de {totalPages}
                    </span>
                    
                    <button
                        onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                        disabled={currentPage >= totalPages - 1}
                        className="bg-[var(--primary)] text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Siguiente
                    </button>
                </div>
            )}

            {/* Results info */}
            {metadata && (
                <p className="text-center mt-2 text-[var(--heading)] text-sm">
                    Mostrando {products.length} de {metadata.total} productos
                </p>
            )}
        </div>
    );
}
