// --- كائن الترجمة الشامل ---
const translations = {
    'ar': {
        lang_locale: 'ar-EG', lang_direction: 'rtl',
        app_title: 'RZ Invoice', nav_new_receipt: 'إيصال جديد', nav_settings: 'إعدادات', nav_about: 'وصف',
        lbl_delegate_info_title: 'بيانات المندوب والإذن', lbl_optional_info_title: 'بيانات إضافية (اختياري)',
        lbl_delegate_name: 'اسم المندوب:', lbl_voucher_id: 'رقم الإذن:', lbl_creation_date: 'تاريخ الإنشاء:',
        lbl_company_name: 'اسم الشركة:', lbl_delegate_code: 'كود المندوب:', title_invoices: 'الفواتير',
        lbl_total: 'الإجمالي الكلي:', btn_add_invoice: 'إضافة فاتورة',
        btn_print_pdf: 'فتح الإيصال وطباعته (A4)', btn_reset: 'إعادة ضبط',
        ph_delegate_name: 'اسم المندوب (إجباري)', ph_company_name: 'اسم الشركة', ph_delegate_code: 'كود المندوب',
        ph_invoice_number: 'رقم الفاتورة', ph_customer_name: 'اسم العميل',
        th_value: 'القيمة (ج.م)', th_number: 'رقم الفاتورة', th_date: 'تاريخ الفاتورة', th_customer: 'اسم العميل',
        alert_delegate_name: 'يرجى إدخال اسم المندوب أولاً.', alert_no_invoices: 'يرجى إضافة فاتورة واحدة على الأقل.',
        alert_popups: 'يرجى السماح بفتح النوافذ المنبثقة لفتح الإيصال وطباعته.',
        settings_theme_title: 'الوضع واللغة', settings_theme_mode: 'الوضع:', theme_dark: 'ليلي', theme_light: 'نهاري',
        settings_language: 'اللغة:', lang_ar: 'العربية (Arabic)', lang_en: 'الإنجليزية (English)',
        about_title: 'حول التطبيق', about_description: 'تطبيق RZ Invoice هو أداة بسيطة وفعالة لإنشاء وتتبع فواتير وإيصالات الاستلام.',
        about_version: 'الإصدار:', about_developed_by: 'تم التطوير بواسطة:',
        pdf_title: 'إيصال استلام فواتير', pdf_lbl_unique_id: 'رقم الإذن:', pdf_lbl_delegate_name: 'المندوب:', 
        pdf_lbl_creation_date: 'تاريخ الإذن:', pdf_lbl_print_date: 'تاريخ الطباعة:', pdf_lbl_company: 'الشركة:',
        pdf_lbl_delegate_code: 'كود المندوب:', pdf_th_value: 'القيمة (ج.م)', pdf_th_number: 'رقم الفاتورة',
        pdf_th_date: 'تاريخ الفاتورة', pdf_th_customer: 'اسم العميل', pdf_lbl_total: 'الإجمالي:',
        pdf_lbl_signature_delegate: 'توقيع المندوب', pdf_lbl_signature_recipient: 'توقيع المستلم',
    },
    'en': {
        lang_locale: 'en-US', lang_direction: 'ltr',
        app_title: 'RZ Invoice', nav_new_receipt: 'New Receipt', nav_settings: 'Settings', nav_about: 'About',
        lbl_delegate_info_title: 'Delegate & Voucher Info', lbl_optional_info_title: 'Optional Information',
        lbl_delegate_name: 'Delegate Name:', lbl_voucher_id: 'Voucher ID:', lbl_creation_date: 'Creation Date:',
        lbl_company_name: 'Company Name:', lbl_delegate_code: 'Delegate Code:', title_invoices: 'Invoices',
        lbl_total: 'Grand Total:', btn_add_invoice: 'Add Invoice',
        btn_print_pdf: 'Open & Print Receipt (A4)', btn_reset: 'Reset',
        ph_delegate_name: 'Delegate Name (Required)', ph_company_name: 'Company Name', ph_delegate_code: 'Delegate Code',
        ph_invoice_number: 'Invoice Number', ph_customer_name: 'Customer Name',
        th_value: 'Value (EGP)', th_number: 'Invoice No.', th_date: 'Invoice Date', th_customer: 'Customer Name',
        alert_delegate_name: 'Please enter the delegate name first.', alert_no_invoices: 'Please add at least one invoice.',
        alert_popups: 'Please allow pop-ups to open and print the receipt.',
        settings_theme_title: 'Theme & Language', settings_theme_mode: 'Theme:', theme_dark: 'Dark', theme_light: 'Light',
        settings_language: 'Language:', lang_ar: 'Arabic', lang_en: 'English (English)',
        about_title: 'About App', about_description: 'RZ Invoice is a simple and effective tool for creating and tracking invoices and receipts.',
        about_version: 'Version:', about_developed_by: 'Developed By:',
        pdf_title: 'Invoice Receipt', pdf_lbl_unique_id: 'Voucher ID:', pdf_lbl_delegate_name: 'Delegate:', 
        pdf_lbl_creation_date: 'Voucher Date:', pdf_lbl_print_date: 'Print Date:', pdf_lbl_company: 'Company:',
        pdf_lbl_delegate_code: 'Delegate Code:', pdf_th_value: 'Value (EGP)', pdf_th_number: 'Invoice No.',
        pdf_th_date: 'Invoice Date', pdf_th_customer: 'Customer Name', pdf_lbl_total: 'Total:',
        pdf_lbl_signature_delegate: 'Delegate Signature', pdf_lbl_signature_recipient: 'Recipient Signature',
    }
};

let currentLang = 'ar';
let currentTheme = 'dark';
let invoiceItemsContainer, delegateNameInput, companyNameInput, delegateCodeInput,
    voucherIdDisplay, creationDateDisplay, totalAmountSpan;

// --- 1. وظائف التحكم في اللغة والتصميم والإجمالي ---

const updateLanguage = (lang) => {
    currentLang = lang;
    const dict = translations[lang];
    document.body.dir = dict.lang_direction;
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (dict[key]) { element.textContent = dict[key]; }
    });
    document.querySelectorAll('[data-placeholder_key]').forEach(input => {
        const key = input.getAttribute('data-placeholder_key');
        if (dict[key]) { input.setAttribute('placeholder', dict[key]); }
    });
    updateTotals();
};

const updateTheme = (theme) => {
    currentTheme = theme;
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(`${theme}-mode`);
};

const updateTotals = () => {
    const container = invoiceItemsContainer;
    const valueInputs = container.querySelectorAll('.invoice-value');
    let total = 0;

    valueInputs.forEach(input => {
        const value = parseFloat(input.value) || 0;
        total += value;
    });

    totalAmountSpan.textContent = total.toLocaleString(translations[currentLang].lang_locale, {	
        style: 'currency',	
        currency: 'EGP'	
    });
};

const createInvoiceRow = () => {
    const template = document.getElementById('invoice-row-template');
    const newRow = template.content.cloneNode(true);
    
    newRow.querySelector('.invoice-date').value = new Date().toISOString().split('T')[0];

    newRow.querySelectorAll('.invoice-value').forEach(input => {
        input.addEventListener('input', updateTotals);
    });
    
    newRow.querySelector('.remove-invoice-btn').addEventListener('click', (e) => {
        e.target.closest('.invoice-row').remove();
        updateTotals();
    });
    
    invoiceItemsContainer.appendChild(newRow);
    updateLanguage(currentLang); 
    updateTotals();
};

const initializeVoucher = () => {
    const today = new Date();
    const dict = translations[currentLang];
    
    const formattedDate = today.toLocaleDateString(dict.lang_locale, {
        year: 'numeric', month: '2-digit', day: '2-digit'
    });
    
    const randomNum = Math.floor(Math.random() * 90000) + 10000;
    voucherIdDisplay.textContent = `R-${randomNum}`;
    creationDateDisplay.textContent = formattedDate;
    
    delegateNameInput.value = '';
    companyNameInput.value = '';
    delegateCodeInput.value = '';
    
    invoiceItemsContainer.innerHTML = '';
    createInvoiceRow();	
    updateTotals();
};

// --- 2. وظيفة الطباعة الجديدة ---

const generatePrintHTML = () => {
    const dict = translations[currentLang];
    const delegateName = delegateNameInput.value.trim();
    
    const allRows = invoiceItemsContainer.querySelectorAll('.invoice-row');
    const invoiceRowsHTML = Array.from(allRows).map(row => {
        const value = row.querySelector('.invoice-value') ? parseFloat(row.querySelector('.invoice-value').value) || 0 : 0;
        const rowData = {
            customer: row.querySelector('.invoice-customer') ? row.querySelector('.invoice-customer').value.trim() || "---" : "---",
            date: row.querySelector('.invoice-date') ? row.querySelector('.invoice-date').value || "---" : "---",
            number: row.querySelector('.invoice-number') ? row.querySelector('.invoice-number').value.trim() || "---" : "---",
            value: value.toLocaleString(dict.lang_locale, { style: 'currency', currency: 'EGP' })
        };
        
        return `<tr>
                    <td style="width: 20%;">${rowData.value}</td>
                    <td style="width: 25%;">${rowData.number}</td>
                    <td style="width: 35%;">${rowData.customer}</td>
                    <td style="width: 20%;">${rowData.date}</td>
                </tr>`;
    }).join('');

    const formattedTotal = totalAmountSpan.textContent; 
    const formattedPrintDate = new Date().toLocaleDateString(dict.lang_locale);
    const delegateCode = delegateCodeInput.value.trim();
    const companyName = companyNameInput.value.trim();

    const detailsTopHTML = `
        <div style="margin-bottom: 10px; font-size: 11pt; border-bottom: 1px solid #ccc; padding-bottom: 8px;">
            <p style="margin: 0; display: block;"><strong>${dict.pdf_lbl_unique_id}</strong> <span style="margin-right: 20px;">${voucherIdDisplay.textContent}</span></p>
            <p style="margin: 5px 0 0 0; display: block;"><strong>${dict.pdf_lbl_delegate_name}</strong> <span style="margin-right: 20px;">${delegateName}</span></p>
            <p style="margin: 5px 0 0 0; display: block;"><strong>${dict.pdf_lbl_creation_date}</strong> <span style="margin-right: 20px;">${creationDateDisplay.textContent}</span></p>
            <p style="margin: 5px 0 0 0; display: block;"><strong>${dict.pdf_lbl_print_date}</strong> <span style="margin-right: 20px;">${formattedPrintDate}</span></p>
        </div>
    `;

    let optionalDetails = '';
    if (companyName || delegateCode) {
        optionalDetails = `<div style="margin-top: 5px; font-size: 9pt; color: #555; padding-bottom: 10px; border-bottom: 1px dashed #A0A0A0;">`;
        if (companyName) {
            optionalDetails += `<p style="display:inline-block; margin-inline-end: 15px;"><strong>${dict.pdf_lbl_company}</strong> <span>${companyName}</span></p>`;
        }
        if (delegateCode) {
            optionalDetails += `<p style="display:inline-block;"><strong>${dict.pdf_lbl_delegate_code}</strong> <span>${delegateCode}</span></p>`;
        }
        optionalDetails += '</div>';
    }

    const delegateSignatureContent = `<div style="width: 40%; text-align: center;"><p style="font-size: 10pt; margin-bottom: 5px;">${dict.pdf_lbl_signature_delegate}</p><div style="height: 30px; font-family: 'Rakkas', cursive; font-size: 24pt; color: #000; text-align: center; margin-bottom: 5px;">${delegateName}</div><div class="line" style="border-bottom: 1px solid #000; margin-top: 5px;"></div></div>`;
    const recipientSignatureContent = `<div style="width: 40%; text-align: center;"><p style="font-size: 10pt; margin-bottom: 5px;">${dict.pdf_lbl_signature_recipient}</p><div style="height: 30px; margin-bottom: 5px;"></div><div class="line" style="border-bottom: 1px solid #000; margin-top: 5px;"></div></div>`;

    return `
        <div class="summary-header-print">${dict.pdf_title}</div>
        ${detailsTopHTML}
        ${optionalDetails}
        <table class="summary-table-print">
            <thead><tr>
                <th style="width: 20%;">${dict.pdf_th_value}</th>
                <th style="width: 25%;">${dict.pdf_th_number}</th>
                <th style="width: 35%;">${dict.pdf_th_customer}</th>
                <th style="width: 20%;">${dict.pdf_th_date}</th>
            </tr></thead>
            <tbody>${invoiceRowsHTML}</tbody>
        </table>
        <div style="text-align: right; font-size: 14pt; font-weight: bold; margin-top: 15px; padding-top: 10px; border-top: 1px solid #333;">
            ${dict.pdf_lbl_total} ${formattedTotal}
        </div>
        <div style="display: flex; flex-direction: row; justify-content: space-around; margin-top: 40px;">
            ${delegateSignatureContent}
            ${recipientSignatureContent}
        </div>
    `;
};

const openAndPrintReceipt = () => {
    const dict = translations[currentLang];
    
    if (delegateNameInput.value.trim() === '') {
        alert(dict.alert_delegate_name);
        return;
    }
    if (invoiceItemsContainer.querySelectorAll('.invoice-row').length === 0) {
        alert(dict.alert_no_invoices);
        return;
    }

    const receiptContentHTML = generatePrintHTML();
    // 🛑 الحصول على تنسيقات الطباعة من وسم <style> في ملف HTML الرئيسي
    const styleContent = document.querySelector('style').textContent;
    
    // 🛑 تضمين الخطوط هنا بشكل صريح للنافذة المنبثقة
    const fontLinkHTML = `<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;600;700;800&family=Roboto:wght@400;700&family=Rakkas&display=swap" rel="stylesheet">`;

    const printWindowContent = `
        <!DOCTYPE html>
        <html lang="${currentLang}" dir="${dict.lang_direction}">
        <head>
            <meta charset="UTF-8">
            <title>${dict.pdf_title} - ${voucherIdDisplay.textContent}</title>
            ${fontLinkHTML}
            <style>
                ${styleContent}
            </style>
        </head>
        <body style="direction: ${dict.lang_direction}; font-family: 'Tajawal', Tahoma, Arial, sans-serif;">
            ${receiptContentHTML}
            <script>
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                    }, 500); // زيادة فترة التأخير
                };
            </script>
        </body>
        </html>
    `;

    const newWindow = window.open('', '_blank', 'width=900,height=800');
    if (newWindow) {
        newWindow.document.write(printWindowContent);
        newWindow.document.close();
    } else {
        alert(dict.alert_popups);
    }
};


// --- 3. التهيئة وربط الأحداث ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. تعريف العناصر
    invoiceItemsContainer = document.getElementById('invoice-items-container');
    delegateNameInput = document.getElementById('delegate-name-input');
    companyNameInput = document.getElementById('company-name-input');
    delegateCodeInput = document.getElementById('delegate-code-input');
    voucherIdDisplay = document.getElementById('voucher-id-display');
    creationDateDisplay = document.getElementById('creation-date-display');
    totalAmountSpan = document.getElementById('total-amount-span');
    const themeSelect = document.getElementById('theme-select');
    const langSelect = document.getElementById('lang-select');
    
    // 2. التهيئة الأولية
    updateTheme(currentTheme);
    updateLanguage(currentLang);
    initializeVoucher(); 
    
    // 3. ربط أحداث الإعدادات
    themeSelect.value = currentTheme;
    themeSelect.addEventListener('change', (e) => updateTheme(e.target.value));
    
    langSelect.value = currentLang;
    langSelect.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
        initializeVoucher(); 
    });

    // 4. ربط أحداث الإيصال
    document.getElementById('print-pdf-btn').addEventListener('click', openAndPrintReceipt);
    document.getElementById('reset-form-btn').addEventListener('click', () => {
        if (confirm(translations[currentLang].btn_reset + '?')) {
            initializeVoucher();
        }
    });
    document.getElementById('add-invoice-btn').addEventListener('click', createInvoiceRow);
    
    // 5. ربط أحداث التنقل
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.app-screen').forEach(screen => screen.classList.remove('active'));
            document.getElementById(e.currentTarget.getAttribute('data-target')).classList.add('active');
            
            document.querySelectorAll('.nav-btn').forEach(nav => nav.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });
});