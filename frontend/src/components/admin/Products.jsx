import axios from "axios";
import { useEffect, useState } from "react";
import { LuPackagePlus } from "react-icons/lu";

const API_URL = import.meta.env.VITE_API_URL;

const Products = () => {
    const [products, setProducts] = useState([]);
    const [viewAllProducts, setViewAllProducts] = useState(false);
    const [createNewProduct, setCreateNewProduct] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [productForm, setProductForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        image: "",
        stock: ""
    });
    const [errors, setErrors] = useState({});

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/products`);
            setProducts(response.data || []);
            console.log(response.data )
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleProductEdit = async (productId) => {
        setViewAllProducts(false);
        setEditProductId(productId);
        setCreateNewProduct(true);  // Reusing the form for editing
        
        try {
            const response = await axios.get(`${API_URL}/api/products/${productId}`);
            setProductForm(response.data);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    const handleProductDelete = async (productId) => {
        try {
            await axios.delete(`${API_URL}/api/products/${productId}`);
            fetchProducts();
        } catch (error) {
            console.error("Error Deleting products:", error);
        }
    };

    const handleInputChange = (e) => {
        setProductForm({
            ...productForm,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!productForm.name) formErrors.name = "Name is required";
        if (!productForm.description) formErrors.description = "Description is required";
        if (!productForm.price || productForm.price <= 0) formErrors.price = "Price should be a positive number";
        if (!productForm.category) formErrors.category = "Category is required";
        if (!productForm.brand) formErrors.brand = "Brand is required";
        if (!productForm.stock || productForm.stock < 0) formErrors.stock = "Stock should be a non-negative number";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleCreateOrUpdateProduct = async () => {
        try {
            if (editProductId) {
                await axios.put(`${API_URL}/api/products/${editProductId}`, productForm);
            } else {
                if (!validateForm()) return;
                await axios.post(`${API_URL}/api/products`, productForm);
            }

            fetchProducts();
            setCreateNewProduct(false);  // Close the form after adding or updating the product
            setEditProductId(null);  // Reset edit mode
            setProductForm({  // Reset form values
                name: "",
                description: "",
                price: "",
                category: "",
                brand: "",
                image: "",
                stock: ""
            });
        } catch (error) {
            console.error("Error creating/updating product:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="text-white dark:bg-gray-900 min-h-screen">
            <div className="text-5xl text-center font-bold py-10 bg-black min-w-full border-gray-600 rounded-xl">
                Admin Products Panel
            </div>
            <div className="relative">
                <div className="flex flex-wrap gap-5 items-center justify-center mx-10 py-10">
                    <div className="w-[16rem] h-[21rem] flex flex-col gap-2 items-center justify-center rounded-lg shadow-lg shadow-white cursor-pointer"
                        onClick={() => {
                            setCreateNewProduct(!createNewProduct);
                            setEditProductId(null);  // Ensure it's a new product creation
                            setProductForm({  // Reset form values for new product
                                name: "",
                                description: "",
                                price: "",
                                category: "",
                                brand: "",
                                image: "",
                                stock: ""
                            });
                        }}
                    >
                        Add product
                        <LuPackagePlus size={30} />
                    </div>
                    {Array.isArray(products) && (viewAllProducts ? products : products.slice(0, 6))
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((product) => (
                        <div key={product._id} className="w-[16rem] h-[21rem] px-1 flex flex-col items-center border bg-gray-50 text-black rounded-lg shadow-md shadow-orange-500">
                            <img src={product.image} alt="projectImg*" className="w-[10rem] h-[10rem] object-contain" />
                            <div className="flex flex-col gap-1">
                                <h1 className="text-orange-500 text-xl">{product.name}</h1>
                                <p className="w-[12rem] truncate text-lg">{product.description}</p>
                                <div className="flex items-center justify-between text-lg">
                                    <span className="font-bold">{product.price}</span>
                                    <span className="font-semibold">{product.category}</span>
                                </div>
                                <div>Stock: {product.stock}</div>
                                <div className="flex items-center justify-between">
                                    <div onClick={() => handleProductEdit(product._id)} className="hover:border bg-orange-500 text-white hover:text-orange-500 hover:bg-transparent border-orange-500 px-2 py-1 rounded-lg">Edit</div>
                                    <div onClick={() => handleProductDelete(product._id)} className="border border-orange-500 bg-transparent hover:bg-orange-500 hover:text-white px-2 py-1 rounded-lg">Delete</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {!products.length<6 &&
                        <div className="w-[16rem] h-[21rem] flex items-center justify-center rounded-lg shadow-lg shadow-white cursor-pointer"
                            onClick={() => setViewAllProducts(!viewAllProducts)}
                        >
                            {viewAllProducts ? "View less" : "View All"}
                        </div>
                    }
                </div>
                {createNewProduct && (
                    <div className="absolute left-0 right-0 top-0 pb-32 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white text-black p-8 rounded-lg w-[30rem] shadow-lg">
                            <h2 className="text-2xl font-bold mb-6 text-center text-black">
                                {editProductId ? "Edit Product" : "Add New Product"}
                            </h2>

                            <div className="flex flex-col gap-4 items-center">
                                <input
                                    type="text"
                                    name="name"
                                    value={productForm.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter product name"
                                    className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                                <textarea
                                    name="description"
                                    value={productForm.description}
                                    onChange={handleInputChange}
                                    placeholder="Product Description"
                                    className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

                                <input
                                    type="number"
                                    name="price"
                                    value={productForm.price}
                                    onChange={handleInputChange}
                                    placeholder="Price"
                                    className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                />
                                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

                                <input
                                    type="text"
                                    name="category"
                                    value={productForm.category}
                                    onChange={handleInputChange}
                                    placeholder="Category"
                                    className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                />
                                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

                                <input
                                    type="text"
                                    name="brand"
                                    value={productForm.brand}
                                    onChange={handleInputChange}
                                    placeholder="Brand"
                                    className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                />
                                {errors.brand && <p className="text-red-500 text-sm">{errors.brand}</p>}

                                <input
                                    type="text"
                                    name="image"
                                    value={productForm.image}
                                    onChange={handleInputChange}
                                    placeholder="Image URL"
                                    className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                />

                                <input
                                    type="number"
                                    name="stock"
                                    value={productForm.stock}
                                    onChange={handleInputChange}
                                    placeholder="Stock"
                                    className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                />
                                {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}

                                <div className="flex items-center justify-between w-full mt-4">
                                    <button
                                        onClick={handleCreateOrUpdateProduct}
                                        className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600"
                                    >
                                        {editProductId ? "Update Product" : "Create Product"}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setCreateNewProduct(false);
                                            setErrors({});
                                        }}
                                        className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
