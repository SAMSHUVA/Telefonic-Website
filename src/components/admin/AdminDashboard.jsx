import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalOffer, setGlobalOffer] = useState({ active: false, label: '' });
    const [isUpdatingSettings, setIsUpdatingSettings] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'phones',
        mrp: '',
        price: '',
        image_url: '',
        offer_label: '',
        is_dark: false,
        is_accent: false
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        setLoading(true);
        // Fetch Settings
        const { data: settingsData } = await supabase
            .from('settings')
            .select('*')
            .eq('key', 'global_offer')
            .single();

        if (settingsData) setGlobalOffer(settingsData.value);

        // Fetch Products
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching products:', error);
        } else {
            setProducts(data);
        }
        setLoading(false);
    }

    const updateGlobalOffer = async (newData) => {
        setIsUpdatingSettings(true);
        const { error } = await supabase
            .from('settings')
            .update({ value: newData })
            .eq('key', 'global_offer');

        if (error) {
            alert('Error updating settings');
        } else {
            setGlobalOffer(newData);
        }
        setIsUpdatingSettings(false);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            category: 'phones',
            mrp: '',
            price: '',
            image_url: '',
            offer_label: '',
            is_dark: false,
            is_accent: false
        });
        setEditingProduct(null);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description || '',
            category: product.category || 'phones',
            mrp: product.mrp || '',
            price: product.price,
            image_url: product.image_url || '',
            offer_label: product.offer_label || '',
            is_dark: product.is_dark || false,
            is_accent: product.is_accent || false
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting product');
        } else {
            fetchProducts();
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        // Note: Requires 'product-images' bucket to exist and be public
        const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(filePath, file);

        if (uploadError) {
            alert('File upload error: ' + uploadError.message);
            return;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

        setFormData(prev => ({ ...prev, image_url: publicUrl }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const payload = {
            ...formData,
            mrp: formData.mrp ? parseFloat(formData.mrp) : null,
            price: parseFloat(formData.price)
        };

        let error;
        if (editingProduct) {
            const { error: updateError } = await supabase
                .from('products')
                .update(payload)
                .eq('id', editingProduct.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from('products')
                .insert([payload]);
            error = insertError;
        }

        if (error) {
            alert('Error saving product: ' + error.message);
        } else {
            setShowForm(false);
            resetForm();
            fetchProducts();
        }
        setIsSaving(false);
    };

    return (
        <div className="min-h-screen bg-[#0c0c0c] pt-32 pb-20 px-4 md:px-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="font-serif text-4xl md:text-5xl text-white mb-2">Inventory Manager</h1>
                        <p className="text-white/40 font-mono uppercase tracking-[0.2em] text-xs">Direct Database Control</p>
                    </div>
                    <button
                        onClick={() => { resetForm(); setShowForm(true); }}
                        className="px-6 py-3 bg-white text-black font-sans font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/90 transition-all active:scale-95"
                    >
                        Add New Product
                    </button>
                </div>

                {/* Global Settings Manager */}
                <div className="mb-12 p-6 md:p-8 bg-white/5 border border-white/10 rounded-3xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex-1">
                            <h2 className="text-white text-lg font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                                <span>Festival Manager</span>
                                {globalOffer.active && (
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                )}
                            </h2>
                            <p className="text-white/40 text-xs">Apply a global offer label to all discounted items across the store.</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                            <input
                                type="text"
                                value={globalOffer.label}
                                onChange={(e) => setGlobalOffer({ ...globalOffer, label: e.target.value })}
                                placeholder="e.g. Valentine Offer"
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-white/30 flex-1 md:w-64"
                            />
                            <button
                                onClick={() => updateGlobalOffer({ ...globalOffer, active: !globalOffer.active })}
                                disabled={isUpdatingSettings}
                                className={`px-6 py-2.5 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all ${globalOffer.active
                                        ? 'bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20'
                                        : 'bg-white/5 text-white/40 border border-white/10 hover:text-white'
                                    }`}
                            >
                                {globalOffer.active ? 'Active' : 'Deactivated'}
                            </button>
                            <button
                                onClick={() => updateGlobalOffer(globalOffer)}
                                disabled={isUpdatingSettings}
                                className="px-6 py-2.5 bg-white text-black rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-white/90"
                            >
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group">
                                <div className="h-48 relative overflow-hidden">
                                    <img
                                        src={product.image_url || 'https://via.placeholder.com/400x300?text=No+Image'}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                                    />
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-white transition-colors"
                                        >
                                            ✎
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-red-400 transition-colors"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    {product.offer_label && (
                                        <div className="absolute bottom-4 left-4">
                                            <span className="bg-white text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
                                                {product.offer_label}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-serif text-xl text-white">{product.name}</h3>
                                        <span className="text-[10px] font-mono text-white/30 uppercase border border-white/10 px-2 py-0.5 rounded">
                                            {product.category}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-white font-mono text-lg">₹{product.price}</span>
                                        {product.mrp && product.mrp > product.price && (
                                            <span className="text-white/30 font-mono text-sm line-through">₹{product.mrp}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
                        <div className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-3xl p-6 md:p-10 relative max-h-[90vh] overflow-y-auto">
                            <button
                                onClick={() => setShowForm(false)}
                                className="absolute top-6 right-6 text-white/40 hover:text-white"
                            >
                                ✕
                            </button>
                            <h2 className="font-serif text-3xl text-white mb-8">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-white/40">Product Name</label>
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                                            placeholder="e.g. iPhone 17 Pro Max"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-white/40">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                                        >
                                            <option value="phones">Phones</option>
                                            <option value="watches">Watches</option>
                                            <option value="bags">Bags</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-white/40">Selling Price (₹)</label>
                                        <input
                                            required
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                                            placeholder="99000"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-white/40">MRP Price (₹) - For Strike</label>
                                        <input
                                            type="number"
                                            value={formData.mrp}
                                            onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                                            placeholder="109000"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40">Offer Label (Optional)</label>
                                    <input
                                        value={formData.offer_label}
                                        onChange={(e) => setFormData({ ...formData, offer_label: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                                        placeholder="e.g. Valentine's Day Offer"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={formData.is_dark}
                                            onChange={(e) => setFormData({ ...formData, is_dark: e.target.checked })}
                                            className="w-5 h-5 rounded border-white/10 bg-white/5 checked:bg-white transition-all"
                                        />
                                        <span className="text-xs uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Dark Mode Card</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={formData.is_accent}
                                            onChange={(e) => setFormData({ ...formData, is_accent: e.target.checked })}
                                            className="w-5 h-5 rounded border-white/10 bg-white/5 checked:bg-white transition-all"
                                        />
                                        <span className="text-xs uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Accent Border</span>
                                    </label>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40">Product Image</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="text-xs text-white/40 file:bg-white/10 file:text-white file:border-none file:px-4 file:py-2 file:rounded-full file:mr-4 file:hover:bg-white/20 cursor-pointer"
                                        />
                                        {formData.image_url && (
                                            <img src={formData.image_url} alt="Preview" className="w-12 h-12 rounded object-cover border border-white/20" />
                                        )}
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex-1 py-4 bg-white text-black font-sans font-bold uppercase tracking-widest rounded-xl hover:bg-white/90 transition-all disabled:opacity-50"
                                    >
                                        {isSaving ? 'Processing...' : editingProduct ? 'Update Product' : 'Create Product'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="flex-1 py-4 bg-white/5 text-white font-sans font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all border border-white/10"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
