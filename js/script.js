(function() {
    'use strict';

    // =========================================================
    //  STATE
    // =========================================================
    let products = [];
    let currentLang = 'ur';
    let currentCategory = 'all';
    let isAdminOpen = false;
    let editingId = null;

    // =========================================================
    //  DOM REFS
    // =========================================================
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const els = {
        productsGrid: $('#productsGrid'),
        countNum: $('#countNum'),
        adminPanel: $('#adminPanel'),
        adminToggle: $('#adminToggle'),
        adminClose: $('#adminClose'),
        adminForm: $('#adminForm'),
        formTitle: $('#formTitle'),
        submitLabel: $('#submitLabel'),
        cancelLabel: $('#cancelLabel'),
        formSubmit: $('#formSubmit'),
        formCancel: $('#formCancel'),
        editId: $('#editId'),
        pName: $('#pName'),
        pPrice: $('#pPrice'),
        pCategory: $('#pCategory'),
        pGender: $('#pGender'),
        pDesc: $('#pDesc'),
        pImage: $('#pImage'),
        adminProductList: $('#adminProductList'),
        modal: $('#detailModal'),
        modalClose: $('#modalClose'),
        modalTitle: $('#modalTitle'),
        modalSub: $('#modalSub'),
        modalBody: $('#modalBody'),
        modalWhatsapp: $('#modalWhatsapp'),
        toast: $('#toast'),
        langUr: $('#langUr'),
        langEn: $('#langEn'),
        footerAdminLink: $('#footerAdminLink'),
        catAll: $('#catAll'),
        catMen: $('#catMen'),
        catWomen: $('#catWomen'),
        catShoes: $('#catShoes'),
        catKhussa: $('#catKhussa'),
        catClothing: $('#catClothing'),
    };

    // =========================================================
    //  TRANSLATIONS (مکمل - پہلے کی طرح)
    // =========================================================
    const t = {
        ur: {
            whatsappLabel: 'WhatsApp',
            heroTitle: 'Mani <span>Collection</span>',
            heroDesc: 'ہمارے سٹور پر آپ کو مردانہ اور زنانہ کپڑے، جوتے، کھیڑی اور ہر قسم کے فیشن آئٹمز ملیں گے۔ معیار اور سٹائل کا بہترین مجموعہ۔',
            heroShop: 'خریداری کریں',
            heroWhatsapp: 'واٹس ایپ پر رابطہ',
            hClothing: 'کپڑے',
            hShoes: 'جوتے',
            hMen: 'مردانہ',
            hWomen: 'زنانہ',
            productsTitle: 'ہماری <span>پروڈکٹس</span>',
            productsSub: 'اعلیٰ معیار کے فیشن آئٹمز جو آپ کے سٹائل کو مکمل کریں',
            productCount: 'کل <strong id="countNum">0</strong> پروڈکٹس',
            adminTitle: 'ایڈمن پینل',
            adminCloseLabel: 'بند کریں',
            formTitle: '➕ نئی پروڈکٹ شامل کریں',
            fNameLabel: 'پروڈکٹ کا نام *',
            fPriceLabel: 'قیمت (روپے) *',
            fCategoryLabel: 'کیٹیگری *',
            fGenderLabel: 'جنس',
            fDescLabel: 'مختصر تفصیل',
            fImageLabel: 'تصویر (URL یا ایموجی)',
            submitLabel: 'محفوظ کریں',
            cancelLabel: 'منسوخ کریں',
            adminListTitle: '📋 موجودہ پروڈکٹس',
            footerDesc: 'پاکستان کا پریمیم فیشن سٹور۔ مردانہ اور زنانہ کپڑے، جوتے، کھیڑی اور ہر قسم کے فیشن آئٹمز۔ معیار ہماری پہچان۔',
            footerQuick: 'فوری لنکس',
            fLink1: 'پروڈکٹس',
            fLink2: 'ہوم',
            fLink3: 'واٹس ایپ',
            footerContact: 'رابطہ',
            footerLocation: 'پاکستان',
            footerCopy: '© 2026 Mani Collection. تمام حقوق محفوظ ہیں۔',
            footerAdmin: '⚡ ایڈمن پینل',
            modalTitle: 'پروڈکٹ کی تفصیل',
            modalSub: 'مکمل معلومات حاصل کریں',
            modalWhatsapp: 'واٹس ایپ پر آرڈر کریں',
            toastAdded: 'پروڈکٹ شامل کر دی گئی!',
            toastUpdated: 'پروڈکٹ اپ ڈیٹ کر دی گئی!',
            toastDeleted: 'پروڈکٹ ڈیلیٹ کر دی گئی!',
            toastError: 'براہ کرم تمام ضروری فیلڈز پُر کریں',
            emptyProducts: 'کوئی پروڈکٹ نہیں ہے۔ پہلی پروڈکٹ شامل کریں!',
            categoryAll: '✨ سب',
            categoryMen: '👔 مردانہ',
            categoryWomen: '👗 زنانہ',
            categoryShoes: '👟 جوتے',
            categoryKhussa: '🥿 کھیڑی',
            categoryClothing: '🧥 کپڑے',
            detailName: 'نام',
            detailPrice: 'قیمت',
            detailCategory: 'کیٹیگری',
            detailGender: 'جنس',
            detailDesc: 'تفصیل',
            editBtn: 'ترمیم',
            deleteBtn: 'حذف',
            noProductsAdmin: 'کوئی پروڈکٹ نہیں ہے',
        },
        en: {
            whatsappLabel: 'WhatsApp',
            heroTitle: 'Mani <span>Collection</span>',
            heroDesc: 'At our store you will find men\'s and women\'s clothing, shoes, khussa and all kinds of fashion items. The best combination of quality and style.',
            heroShop: 'Shop Now',
            heroWhatsapp: 'Contact on WhatsApp',
            hClothing: 'Clothing',
            hShoes: 'Shoes',
            hMen: 'Men',
            hWomen: 'Women',
            productsTitle: 'Our <span>Products</span>',
            productsSub: 'Premium quality fashion items to complete your style',
            productCount: 'Total <strong id="countNum">0</strong> products',
            adminTitle: 'Admin Panel',
            adminCloseLabel: 'Close',
            formTitle: '➕ Add New Product',
            fNameLabel: 'Product Name *',
            fPriceLabel: 'Price (Rs.) *',
            fCategoryLabel: 'Category *',
            fGenderLabel: 'Gender',
            fDescLabel: 'Short Description',
            fImageLabel: 'Image (URL or Emoji)',
            submitLabel: 'Save',
            cancelLabel: 'Cancel',
            adminListTitle: '📋 Current Products',
            footerDesc: 'Pakistan\'s premium fashion store. Men\'s and women\'s clothing, shoes, khussa and all kinds of fashion items. Quality is our identity.',
            footerQuick: 'Quick Links',
            fLink1: 'Products',
            fLink2: 'Home',
            fLink3: 'WhatsApp',
            footerContact: 'Contact',
            footerLocation: 'Pakistan',
            footerCopy: '© 2026 Mani Collection. All rights reserved.',
            footerAdmin: '⚡ Admin Panel',
            modalTitle: 'Product Details',
            modalSub: 'Get complete information',
            modalWhatsapp: 'Order on WhatsApp',
            toastAdded: 'Product added!',
            toastUpdated: 'Product updated!',
            toastDeleted: 'Product deleted!',
            toastError: 'Please fill all required fields',
            emptyProducts: 'No products yet. Add your first product!',
            categoryAll: '✨ All',
            categoryMen: '👔 Men',
            categoryWomen: '👗 Women',
            categoryShoes: '👟 Shoes',
            categoryKhussa: '🥿 Khussa',
            categoryClothing: '🧥 Clothing',
            detailName: 'Name',
            detailPrice: 'Price',
            detailCategory: 'Category',
            detailGender: 'Gender',
            detailDesc: 'Description',
            editBtn: 'Edit',
            deleteBtn: 'Delete',
            noProductsAdmin: 'No products',
        }
    };

    function getText(key) { return t[currentLang]?.[key] || key; }
    function generateId() { return 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6); }
    function formatPrice(price) { return 'Rs. ' + Number(price).toLocaleString(); }
    function getCategoryLabel(cat) {
        const map = { men: currentLang === 'ur' ? 'مردانہ' : 'Men', women: currentLang === 'ur' ? 'زنانہ' : 'Women', shoes: currentLang === 'ur' ? 'جوتے' : 'Shoes', khussa: currentLang === 'ur' ? 'کھیڑی' : 'Khussa', clothing: currentLang === 'ur' ? 'کپڑے' : 'Clothing' };
        return map[cat] || cat;
    }
    function getGenderLabel(g) {
        const map = { men: currentLang === 'ur' ? 'مردانہ' : 'Men', women: currentLang === 'ur' ? 'زنانہ' : 'Women', unisex: currentLang === 'ur' ? 'یونیسیکس' : 'Unisex' };
        return map[g] || g;
    }
    function getGenderBadge(g) {
        const map = { men: 'badge-men', women: 'badge-women', unisex: 'badge-unisex' };
        return map[g] || 'badge-unisex';
    }
    function getProductName(p) { return currentLang === 'ur' ? p.name : (p.nameEn || p.name); }
    function getProductDesc(p) { return currentLang === 'ur' ? p.description : (p.descriptionEn || p.description); }
    function getCategoryEmoji(cat) {
        const map = { men: '👔', women: '👗', shoes: '👟', khussa: '🥿', clothing: '🧥' };
        return map[cat] || '📦';
    }
    function getImageHtml(p) {
        const img = p.image || '';
        if (img && (img.startsWith('http') || img.startsWith('data:'))) {
            return `<img src="${img}" alt="${getProductName(p)}" loading="lazy" />`;
        }
        const emoji = img || getCategoryEmoji(p.category);
        return `<div class="img-placeholder">${emoji}</div>`;
    }

    // =========================================================
    //  TOAST
    // =========================================================
    let toastTimeout;
    function showToast(msg, type = 'success') {
        const el = els.toast;
        el.textContent = msg;
        el.className = 'toast ' + type;
        clearTimeout(toastTimeout);
        void el.offsetWidth;
        el.classList.add('show');
        toastTimeout = setTimeout(() => { el.classList.remove('show'); }, 3000);
    }

    // =========================================================
    //  DATA LOADING (from JSON or localStorage)
    // =========================================================
    function loadProductsFromStorage() {
        try {
            const data = localStorage.getItem('mani_products');
            if (data) {
                const parsed = JSON.parse(data);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    products = parsed;
                    return true;
                }
            }
        } catch (e) { /* ignore */ }
        return false;
    }

    function saveProductsToStorage() {
        try {
            localStorage.setItem('mani_products', JSON.stringify(products));
        } catch (e) { /* ignore */ }
    }

    // ڈیفالٹ ڈیٹا JSON فائل سے لوڈ کریں (اگر localStorage خالی ہو)
    async function loadDefaultProductsFromJSON() {
        try {
            const res = await fetch('data/products.json');
            if (!res.ok) throw new Error('JSON not found');
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                products = data;
                saveProductsToStorage();
                return true;
            }
        } catch (e) {
            console.warn('Default JSON not loaded, using hardcoded fallback.');
            // فال بیک ڈیٹا (اگر JSON نہ ملے)
            products = [
                { id: 'p1', name: 'پریمیئم کاٹن شرٹ', nameEn: 'Premium Cotton Shirt', price: 2499, category: 'clothing', gender: 'men', description: 'اعلیٰ معیار کا کاٹن شرٹ', descriptionEn: 'Premium cotton shirt', image: '👔' },
                { id: 'p2', name: 'کلاسک ڈینم جینز', nameEn: 'Classic Denim Jeans', price: 3999, category: 'clothing', gender: 'men', description: 'پائیدار ڈینم جینز', descriptionEn: 'Durable denim jeans', image: '👖' },
                { id: 'p3', name: 'فارمل بلیزر', nameEn: 'Formal Blazer', price: 7499, category: 'clothing', gender: 'men', description: 'پیشہ ورانہ بلیزر', descriptionEn: 'Professional blazer', image: '🧥' },
                { id: 'p4', name: 'فلورل پرنٹ ڈریس', nameEn: 'Floral Print Dress', price: 4499, category: 'clothing', gender: 'women', description: 'خوبصورت فلورل ڈریس', descriptionEn: 'Beautiful floral dress', image: '👗' },
                { id: 'p5', name: 'لیتھر آکسفورڈ جوتے', nameEn: 'Leather Oxford Shoes', price: 6499, category: 'shoes', gender: 'men', description: 'پریفیم لیتھر آکسفورڈ', descriptionEn: 'Premium leather Oxford', image: '👞' },
                { id: 'p6', name: 'روایتی کھیڑی', nameEn: 'Traditional Khussa', price: 2499, category: 'khussa', gender: 'men', description: 'پاکستانی روایتی کھیڑی', descriptionEn: 'Pakistani traditional khussa', image: '🥿' },
            ];
            saveProductsToStorage();
        }
        return false;
    }

    async function initializeData() {
        const hasStorage = loadProductsFromStorage();
        if (!hasStorage) {
            await loadDefaultProductsFromJSON();
        }
        renderAll();
    }

    // =========================================================
    //  RENDER FUNCTIONS (پہلے کی طرح)
    // =========================================================
    function renderProducts() {
        const grid = els.productsGrid;
        let filtered = [...products];
        if (currentCategory !== 'all') {
            filtered = filtered.filter(p => p.category === currentCategory);
        }
        els.countNum.textContent = filtered.length;
        if (filtered.length === 0) {
            grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><i class="fas fa-box-open"></i><h3>${getText('emptyProducts')}</h3><p style="color:var(--text-light);font-size:0.9rem;">${currentLang === 'ur' ? 'پہلی پروڈکٹ شامل کرنے کے لیے ایڈمن پینل استعمال کریں' : 'Use the admin panel to add your first product'}</p></div>`;
            return;
        }
        grid.innerHTML = filtered.map(p => {
            const name = getProductName(p);
            const desc = getProductDesc(p);
            const price = formatPrice(p.price);
            const catLabel = getCategoryLabel(p.category);
            const genderLabel = getGenderLabel(p.gender);
            const genderBadge = getGenderBadge(p.gender);
            const imgHtml = getImageHtml(p);
            const isAdmin = isAdminOpen;
            return `
                <div class="product-card" data-id="${p.id}">
                    <div class="card-img">
                        ${imgHtml}
                        <span class="badge ${genderBadge} card-badge">${genderLabel}</span>
                    </div>
                    <div class="card-body">
                        <div class="product-category">${catLabel}</div>
                        <div class="product-name">${name}</div>
                        <div class="product-price">${price}</div>
                        <div class="card-actions">
                            <button class="btn-whatsapp-small" data-whatsapp="${p.id}"><i class="fab fa-whatsapp"></i> ${currentLang === 'ur' ? 'آرڈر' : 'Order'}</button>
                            <button class="btn-details" data-detail="${p.id}"><i class="fas fa-eye"></i> ${currentLang === 'ur' ? 'تفصیل' : 'Details'}</button>
                        </div>
                        ${isAdmin ? `<div class="admin-actions"><button class="btn-edit" data-edit="${p.id}"><i class="fas fa-pen"></i> ${getText('editBtn')}</button><button class="btn-delete" data-delete="${p.id}"><i class="fas fa-trash"></i> ${getText('deleteBtn')}</button></div>` : ''}
                    </div>
                </div>
            `;
        }).join('');

        // Event bindings
        grid.querySelectorAll('[data-whatsapp]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.whatsapp;
                const p = products.find(x => x.id === id);
                if (p) {
                    const name = getProductName(p);
                    const msg = encodeURIComponent(`Hello! I want to order: ${name} (${formatPrice(p.price)}) from Mani Collection.`);
                    window.open(`https://wa.me/923046420259?text=${msg}`, '_blank');
                }
            });
        });
        grid.querySelectorAll('[data-detail]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.detail;
                const p = products.find(x => x.id === id);
                if (p) openDetailModal(p);
            });
        });
        if (isAdminOpen) {
            grid.querySelectorAll('[data-edit]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    editProduct(btn.dataset.edit);
                });
            });
            grid.querySelectorAll('[data-delete]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (confirm(currentLang === 'ur' ? 'کیا آپ واقعی یہ پروڈکٹ ڈیلیٹ کرنا چاہتے ہیں؟' : 'Are you sure?')) {
                        deleteProduct(btn.dataset.delete);
                    }
                });
            });
        }
    }

    function renderAdminList() {
        const container = els.adminProductList;
        if (products.length === 0) {
            container.innerHTML = `<p style="color:var(--text-light);padding:16px;">${getText('noProductsAdmin')}</p>`;
            return;
        }
        container.innerHTML = products.map(p => {
            const name = getProductName(p);
            return `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:#fff;border-radius:8px;border:1px solid #eee;gap:12px;flex-wrap:wrap;">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <span style="font-size:1.5rem;">${p.image || getCategoryEmoji(p.category)}</span>
                        <div><div style="font-weight:600;">${name}</div><div style="font-size:0.8rem;color:var(--text-light);">${formatPrice(p.price)} · ${getCategoryLabel(p.category)}</div></div>
                    </div>
                    <div style="display:flex;gap:8px;">
                        <button class="btn-edit" data-edit="${p.id}" style="padding:6px 14px;border-radius:50px;font-size:0.7rem;font-weight:600;background:var(--accent);color:#fff;border:none;cursor:pointer;">${getText('editBtn')}</button>
                        <button class="btn-delete" data-delete="${p.id}" style="padding:6px 14px;border-radius:50px;font-size:0.7rem;font-weight:600;background:var(--secondary);color:#fff;border:none;cursor:pointer;">${getText('deleteBtn')}</button>
                    </div>
                </div>
            `;
        }).join('');
        container.querySelectorAll('[data-edit]').forEach(btn => {
            btn.addEventListener('click', () => editProduct(btn.dataset.edit));
        });
        container.querySelectorAll('[data-delete]').forEach(btn => {
            btn.addEventListener('click', () => {
                if (confirm(currentLang === 'ur' ? 'کیا آپ واقعی یہ پروڈکٹ ڈیلیٹ کرنا چاہتے ہیں؟' : 'Are you sure?')) {
                    deleteProduct(btn.dataset.delete);
                }
            });
        });
    }

    // =========================================================
    //  CRUD
    // =========================================================
    function addProduct(data) {
        const newProduct = { id: generateId(), name: data.name, nameEn: data.nameEn || data.name, price: Number(data.price), category: data.category, gender: data.gender || 'unisex', description: data.description || '', descriptionEn: data.descriptionEn || data.description || '', image: data.image || '' };
        products.push(newProduct);
        saveProductsToStorage();
        renderAll();
        showToast(getText('toastAdded'));
    }

    function updateProduct(id, data) {
        const idx = products.findIndex(p => p.id === id);
        if (idx === -1) return;
        const p = products[idx];
        p.name = data.name;
        p.nameEn = data.nameEn || data.name;
        p.price = Number(data.price);
        p.category = data.category;
        p.gender = data.gender || 'unisex';
        p.description = data.description || '';
        p.descriptionEn = data.descriptionEn || data.description || '';
        p.image = data.image || '';
        saveProductsToStorage();
        renderAll();
        showToast(getText('toastUpdated'));
    }

    function deleteProduct(id) {
        products = products.filter(p => p.id !== id);
        saveProductsToStorage();
        renderAll();
        showToast(getText('toastDeleted'));
    }

    function editProduct(id) {
        const p = products.find(x => x.id === id);
        if (!p) return;
        editingId = id;
        els.editId.value = id;
        els.pName.value = p.name;
        els.pPrice.value = p.price;
        els.pCategory.value = p.category;
        els.pGender.value = p.gender || 'unisex';
        els.pDesc.value = p.description || '';
        els.pImage.value = p.image || '';
        els.formTitle.textContent = currentLang === 'ur' ? '✏️ پروڈکٹ میں ترمیم کریں' : '✏️ Edit Product';
        els.submitLabel.textContent = currentLang === 'ur' ? 'اپ ڈیٹ کریں' : 'Update';
        els.formSubmit.innerHTML = `<i class="fas fa-save"></i> ${currentLang === 'ur' ? 'اپ ڈیٹ کریں' : 'Update'}`;
        els.adminForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        els.pName.focus();
    }

    function resetForm() {
        els.pName.value = '';
        els.pPrice.value = '';
        els.pCategory.value = 'clothing';
        els.pGender.value = 'unisex';
        els.pDesc.value = '';
        els.pImage.value = '';
        els.editId.value = '';
        editingId = null;
        els.formTitle.textContent = getText('formTitle');
        els.submitLabel.textContent = getText('submitLabel');
        els.formSubmit.innerHTML = `<i class="fas fa-save"></i> ${getText('submitLabel')}`;
        els.pName.focus();
    }

    // =========================================================
    //  MODAL
    // =========================================================
    function openDetailModal(p) {
        const name = getProductName(p);
        const desc = getProductDesc(p);
        const price = formatPrice(p.price);
        const cat = getCategoryLabel(p.category);
        const gender = getGenderLabel(p.gender);
        const imgHtml = getImageHtml(p);
        els.modalTitle.textContent = name;
        els.modalBody.innerHTML = `
            <div style="display:flex;justify-content:center;font-size:4rem;padding:16px 0;background:var(--bg);border-radius:var(--radius-sm);margin-bottom:16px;">${imgHtml}</div>
            <div class="modal-detail-item"><span class="label">${getText('detailName')}</span><span class="value">${name}</span></div>
            <div class="modal-detail-item"><span class="label">${getText('detailPrice')}</span><span class="value">${price}</span></div>
            <div class="modal-detail-item"><span class="label">${getText('detailCategory')}</span><span class="value">${cat}</span></div>
            <div class="modal-detail-item"><span class="label">${getText('detailGender')}</span><span class="value">${gender}</span></div>
            ${desc ? `<div class="modal-detail-item" style="flex-direction:column;gap:4px;"><span class="label">${getText('detailDesc')}</span><span class="value" style="text-align:${currentLang === 'ur' ? 'right' : 'left'};">${desc}</span></div>` : ''}
        `;
        els.modalWhatsapp.href = `https://wa.me/923046420259?text=${encodeURIComponent(`Hello! I want to order: ${name} (${price}) from Mani Collection.`)}`;
        els.modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        els.modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // =========================================================
    //  LANGUAGE
    // =========================================================
    function setLanguage(lang) {
        currentLang = lang;
        els.langUr.classList.toggle('active', lang === 'ur');
        els.langEn.classList.toggle('active', lang === 'en');
        document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;

        document.getElementById('whatsappLabel').textContent = getText('whatsappLabel');
        document.getElementById('heroTitle').innerHTML = getText('heroTitle');
        document.getElementById('heroDesc').textContent = getText('heroDesc');
        document.querySelector('#heroShopBtn span').textContent = getText('heroShop');
        document.querySelector('#heroShopBtn + .btn-gold span').textContent = getText('heroWhatsapp');
        document.getElementById('hClothing').textContent = getText('hClothing');
        document.getElementById('hShoes').textContent = getText('hShoes');
        document.getElementById('hMen').textContent = getText('hMen');
        document.getElementById('hWomen').textContent = getText('hWomen');
        document.getElementById('productsTitle').innerHTML = getText('productsTitle');
        document.getElementById('productsSub').textContent = getText('productsSub');

        document.getElementById('catAll').innerHTML = getText('categoryAll');
        document.getElementById('catMen').innerHTML = getText('categoryMen');
        document.getElementById('catWomen').innerHTML = getText('categoryWomen');
        document.getElementById('catShoes').innerHTML = getText('categoryShoes');
        document.getElementById('catKhussa').innerHTML = getText('categoryKhussa');
        document.getElementById('catClothing').innerHTML = getText('categoryClothing');

        document.getElementById('adminTitle').textContent = getText('adminTitle');
        document.getElementById('adminCloseLabel').textContent = getText('adminCloseLabel');
        document.getElementById('formTitle').textContent = getText('formTitle');
        document.getElementById('fNameLabel').textContent = getText('fNameLabel');
        document.getElementById('fPriceLabel').textContent = getText('fPriceLabel');
        document.getElementById('fCategoryLabel').textContent = getText('fCategoryLabel');
        document.getElementById('fGenderLabel').textContent = getText('fGenderLabel');
        document.getElementById('fDescLabel').textContent = getText('fDescLabel');
        document.getElementById('fImageLabel').textContent = getText('fImageLabel');
        document.getElementById('submitLabel').textContent = getText('submitLabel');
        document.getElementById('cancelLabel').textContent = getText('cancelLabel');
        document.getElementById('adminListTitle').textContent = getText('adminListTitle');

        document.getElementById('footerDesc').textContent = getText('footerDesc');
        document.getElementById('footerQuick').textContent = getText('footerQuick');
        document.getElementById('fLink1').textContent = getText('fLink1');
        document.getElementById('fLink2').textContent = getText('fLink2');
        document.getElementById('fLink3').textContent = getText('fLink3');
        document.getElementById('footerContact').textContent = getText('footerContact');
        document.getElementById('footerLocation').textContent = getText('footerLocation');
        document.getElementById('footerCopy').textContent = getText('footerCopy');
        document.getElementById('footerAdminLink').textContent = getText('footerAdmin');

        document.getElementById('modalTitle').textContent = getText('modalTitle');
        document.getElementById('modalSub').textContent = getText('modalSub');
        document.getElementById('modalWhatsapp').innerHTML = `<i class="fab fa-whatsapp"></i> ${getText('modalWhatsapp')}`;

        if (!editingId) {
            els.submitLabel.textContent = getText('submitLabel');
            els.formSubmit.innerHTML = `<i class="fas fa-save"></i> ${getText('submitLabel')}`;
        }
        renderAll();
    }

    // =========================================================
    //  ADMIN TOGGLE
    // =========================================================
    function toggleAdmin(open) {
        isAdminOpen = (open !== undefined) ? open : !isAdminOpen;
        els.adminPanel.classList.toggle('open', isAdminOpen);
        els.adminToggle.classList.toggle('active', isAdminOpen);
        document.body.classList.toggle('admin-mode', isAdminOpen);
        if (isAdminOpen) {
            renderAdminList();
            setTimeout(() => { els.adminPanel.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 150);
        }
        renderProducts();
    }

    // =========================================================
    //  FORM HANDLING
    // =========================================================
    function handleFormSubmit(e) {
        e.preventDefault();
        const name = els.pName.value.trim();
        const price = els.pPrice.value.trim();
        const category = els.pCategory.value;
        const gender = els.pGender.value;
        const description = els.pDesc.value.trim();
        const image = els.pImage.value.trim();
        const editIdVal = els.editId.value;

        if (!name || !price) {
            showToast(getText('toastError'), 'error');
            return;
        }
        const data = { name, nameEn: name, price: Number(price), category, gender, description, descriptionEn: description, image };
        if (editIdVal) {
            updateProduct(editIdVal, data);
            resetForm();
        } else {
            addProduct(data);
            resetForm();
        }
    }

    // =========================================================
    //  RENDER ALL
    // =========================================================
    function renderAll() {
        renderProducts();
        if (isAdminOpen) renderAdminList();
    }

    // =========================================================
    //  INIT
    // =========================================================
    async function init() {
        await initializeData();
        setLanguage('ur');

        // Event listeners
        els.langUr.addEventListener('click', () => setLanguage('ur'));
        els.langEn.addEventListener('click', () => setLanguage('en'));
        els.adminToggle.addEventListener('click', () => toggleAdmin());
        els.adminClose.addEventListener('click', () => toggleAdmin(false));
        els.footerAdminLink.addEventListener('click', () => toggleAdmin());

        const catButtons = { catAll: 'all', catMen: 'men', catWomen: 'women', catShoes: 'shoes', catKhussa: 'khussa', catClothing: 'clothing' };
        Object.keys(catButtons).forEach(key => {
            const btn = document.getElementById(key);
            if (btn) {
                btn.addEventListener('click', () => {
                    currentCategory = catButtons[key];
                    document.querySelectorAll('.nav-list button').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    renderProducts();
                });
            }
        });

        els.formSubmit.addEventListener('click', handleFormSubmit);
        els.formCancel.addEventListener('click', resetForm);
        els.modalClose.addEventListener('click', closeModal);
        els.modal.addEventListener('click', (e) => { if (e.target === els.modal) closeModal(); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { closeModal(); }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isAdminOpen) { toggleAdmin(false); }
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();
