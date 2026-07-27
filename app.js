document.addEventListener('DOMContentLoaded', () => {
    // === ESTADO GLOBAL DEL PORTAL ===
    let currentRole = 'estudiante';
    let selectedVacancy = null;
    let activeCompanyVacancy = null;
    let activeApplicant = null;
    let activeAdminVacancy = null;
    let activeAdminCompany = null;
    let uploadedFileName = '';
    let editingVacancyId = null;

    // === BASE DE DATOS MOCK DE VACANTES ===
    const vacancies = [
        {
            id: 1,
            title: "Pasante de Desarrollo Full-Stack",
            company: "Banco de Occidente, S.A.",
            logoIcon: "business",

            department: "Francisco Morazán",
            category: "Ingeniería",
            career: "Ingeniería en Ciencias de la Computación",
            careersList: ["Ingeniería en Ciencias de la Computación"],
            published: "Hace 2 días",
            publishedDateStr: "25 de julio, 2026",
            deadline: "3 días",
            rawDeadline: "30 de Nov, 2026",
            description: "Buscamos un estudiante apasionado por el desarrollo web para unirse a nuestro equipo de ingeniería. Trabajarás con tecnologías modernas como React, Tailwind CSS y Node.js en proyectos reales de alto impacto.",
            requirements: [
                "Estudiante de último año de Ingeniería en Ciencias de la Computación.",
                "Conocimientos básicos de HTML, CSS y JS.",
                "Familiaridad con frameworks modernos (React/Node).",
                "Proactividad y ganas de aprender."
            ],
            companyOwner: "Banco de Occidente, S.A.",
            status: "Activa",
            applicants: []
        },
        {
            id: 2,
            title: "Asistente Legal Junior",
            company: "Bufete Valladares & Asociados",
            logoIcon: "corporate_fare",
            department: "Choluteca",
            category: "Derecho",
            career: "Derecho",
            careersList: ["Derecho", "Ciencias Jurídicas"],
            published: "15 Oct",
            publishedDateStr: "15 de octubre, 2026",
            deadline: "30 Nov",
            rawDeadline: "30 de Nov, 2026",
            description: "Únete a nuestro bufete como asistente legal junior para brindar apoyo en la redacción de contratos, investigación de jurisprudencia y preparación de expedientes judiciales.",
            requirements: [
                "Estudiante de último año de la carrera de Derecho.",
                "Excelentes habilidades de redacción y análisis.",
                "Responsabilidad y confidencialidad."
            ],
            companyOwner: "Bufete Valladares & Asociados",
            status: "Activa",
            applicants: []
        },
        {
            id: 3,
            title: "Practicante de Mercadeo Digital",
            company: "Supermercados La Colonia",
            logoIcon: "store",
            department: "Cortés",
            category: "Marketing",
            career: "Marketing",
            careersList: ["Marketing", "Comunicaciones"],
            published: "Hace 4 horas",
            publishedDateStr: "26 de julio, 2026",
            deadline: "mañana",
            rawDeadline: "30 de Nov, 2026",
            description: "Buscamos un estudiante creativo para colaborar en la gestión de redes sociales, creación de contenido digital y monitoreo de campañas de mercadeo.",
            requirements: [
                "Estudiante de las carreras de Mercadotecnia o Comunicación.",
                "Conocimientos básicos de herramientas de diseño (Canva, Photoshop).",
                "Buena ortografía y creatividad."
            ],
            companyOwner: "Supermercados La Colonia",
            status: "Activa",
            applicants: []
        },
        {
            id: 4,
            title: "Analista de Sistemas Junior",
            company: "TechNova Solutions",
            logoIcon: "computer",
            department: "Francisco Morazán",
            category: "Ingeniería",
            career: "Ingeniería en Ciencias de la Computación",
            careersList: ["Ingeniería en Ciencias de la Computación"],
            published: "el 12 de julio, 2026",
            publishedDateStr: "12 de julio, 2026",
            deadline: "30 Nov",
            rawDeadline: "30 de Nov, 2026",
            description: "Buscamos un pasante de Ingeniería de Sistemas capaz de colaborar con el análisis, pruebas y documentación de sistemas empresariales. Se valorarán conocimientos de SQL y bases de datos relacionales.",
            requirements: [
                "Estudiante de último año de Ingeniería en Ciencias de la Computación.",
                "Conocimientos básicos en consultas de bases de datos relacionales.",
                "Capacidad de redactar documentación de especificaciones.",
                "Proactividad y habilidades de trabajo en equipo."
            ],
            companyOwner: "TechNova Solutions",
            status: "Activa",
            applicants: [
                { id: 101, name: "María López", career: "Ingeniería en Ciencias de la Computación", date: "25 julio 2026", fileName: "CV_Maria_Lopez.pdf", status: "Recibida" },
                { id: 102, name: "Carlos Rodríguez", career: "Ingeniería en Ciencias de la Computación", date: "24 julio 2026", fileName: "CV_Carlos_Rodrig.pdf", status: "En revisión" },
                { id: 103, name: "Andrea Martínez", career: "Ingeniería en Ciencias de la Computación", date: "23 julio 2026", fileName: "CV_Andrea_Mart.pdf", status: "Seleccionado" },
                { id: 104, name: "Juan Pérez", career: "Ingeniería en Ciencias de la Computación", date: "22 julio 2026", fileName: "CV_Juan_Perez.pdf", status: "Rechazado" }
            ]
        },
        {
            id: 5,
            title: "Asistente Contable y Auditoría",
            company: "TechNova Solutions",
            logoIcon: "account_balance_wallet",

            department: "Francisco Morazán",
            category: "Negocios",
            career: "Administración de Empresas",
            careersList: ["Contaduría Pública y Finanzas"],
            published: "el 10 de julio, 2026",
            publishedDateStr: "10 de julio, 2026",
            deadline: "30 Nov",
            rawDeadline: "30 de Nov, 2026",
            description: "Apoyo en el área contable de la corporación para conciliaciones, registros de facturas y preparación de auditorías internas del período actual.",
            requirements: [
                "Estudiante de Contaduría Pública y Finanzas.",
                "Excelente manejo de Microsoft Excel.",
                "Ordenado y comprometido."
            ],
            companyOwner: "TechNova Solutions",
            status: "Activa",
            applicants: []
        },
        {
            id: 6,
            title: "Diseñador Gráfico UI/UX",
            company: "TechNova Solutions",
            logoIcon: "brush",

            department: "Cortés",
            category: "Marketing",
            career: "Marketing",
            careersList: ["Diseño Gráfico", "Comunicaciones"],
            published: "el 25 de junio, 2026",
            publishedDateStr: "25 de junio, 2026",
            deadline: "Pasado",
            rawDeadline: "25 de julio, 2026",
            description: "Creación de piezas gráficas para redes sociales y diseño de prototipos de aplicaciones móviles usando Figma.",
            requirements: [
                "Estudiante de Diseño Gráfico o Comunicaciones.",
                "Portafolio en Figma o Adobe Illustrator.",
                "Capacidad creativa."
            ],
            companyOwner: "TechNova Solutions",
            status: "Cerrada",
            applicants: []
        },
        {
            id: 7,
            title: "Pasante de Recursos Humanos",
            company: "TechNova Solutions",
            logoIcon: "psychology",

            department: "Francisco Morazán",
            category: "Negocios",
            career: "Administración de Empresas",
            careersList: ["Psicología", "Administración de Empresas"],
            published: "el 05 de julio, 2026",
            publishedDateStr: "05 de julio, 2026",
            deadline: "30 Nov",
            rawDeadline: "30 de Nov, 2026",
            description: "Colaborar en procesos de reclutamiento, revisión inicial de hojas de vida e inducción a nuevos empleados en prácticas.",
            requirements: [
                "Estudiante de Psicología o Administración.",
                "Habilidades comunicativas y empáticas.",
                "Responsabilidad organizativa."
            ],
            companyOwner: "TechNova Solutions",
            status: "Activa",
            applicants: []
        }
    ];

    // === VACANTES PENDIENTES DEL ADMINISTRADOR ===
    const pendingVacancies = [
        {
            id: 201,
            title: "Desarrollador Web Junior",
            company: "Tech Solutions S.A.",
            logoIcon: "business",

            department: "Francisco Morazán",
            category: "Ingeniería",
            career: "Ingeniería en Ciencias de la Computación",
            careersList: ["Ingeniería en Ciencias de la Computación"],
            published: "15 Oct, 2024",
            publishedDateStr: "15 Oct, 2024",
            deadline: "30 Nov, 2026",
            rawDeadline: "30 de Nov, 2026",
            description: "Buscamos un estudiante que colabore en proyectos frontend con HTML/CSS/JS y frameworks modernos de JS.",
            requirements: [
                "Conocimientos sólidos en maquetación interactiva y CSS.",
                "Estudiante avanzado en Ingeniería en Ciencias de la Computación.",
                "Deseos de superación."
            ]
        },
        {
            id: 202,
            title: "Asistente de Auditoría",
            company: "Firma Contable & Asociados",
            logoIcon: "account_balance",

            department: "Cortés",
            category: "Negocios",
            career: "Contaduría Pública",
            careersList: ["Contaduría Pública y Finanzas"],
            published: "14 Oct, 2024",
            publishedDateStr: "14 Oct, 2024",
            deadline: "30 Nov, 2026",
            rawDeadline: "30 de Nov, 2026",
            description: "Asistente contable junior encargado de inventarios, conciliación de caja y auditorías preliminares.",
            requirements: [
                "Estudiante de Contaduría Pública y Finanzas.",
                "Manejo avanzado de Excel.",
                "Analítico y responsable."
            ]
        },
        {
            id: 203,
            title: "Diseñador Gráfico Jr",
            company: "Global Media Corp",
            logoIcon: "palette",

            department: "Comayagua",
            category: "Marketing",
            career: "Diseño Gráfico",
            careersList: ["Diseño Gráfico", "Comunicaciones"],
            published: "12 Oct, 2024",
            publishedDateStr: "12 Oct, 2024",
            deadline: "30 Nov, 2026",
            rawDeadline: "30 de Nov, 2026",
            description: "Buscamos pasante para la conceptualización y diseño de marcas para campañas en redes sociales.",
            requirements: [
                "Estudiante de Diseño Gráfico o Publicidad.",
                "Manejo de Adobe Photoshop e Illustrator.",
                "Creatividad demostrable."
            ]
        },
        {
            id: 204,
            title: "Pasante de Recursos Humanos",
            company: "Industrial del Norte",
            logoIcon: "groups",

            department: "Choluteca",
            category: "Negocios",
            career: "Psicología",
            careersList: ["Psicología", "Administración de Empresas"],
            published: "10 Oct, 2024",
            publishedDateStr: "10 Oct, 2024",
            deadline: "30 Nov, 2026",
            rawDeadline: "30 de Nov, 2026",
            description: "Apoyo en el filtrado de currículums, llamadas telefónicas y coordinación de entrevistas.",
            requirements: [
                "Estudiante de Psicología o Administración.",
                "Habilidades interpersonales excepcionales.",
                "Disponibilidad inmediata."
            ]
        },
        {
            id: 205,
            title: "Ingeniero Industrial (Práctica)",
            company: "Manufacturas S.A.",
            logoIcon: "factory",

            department: "Francisco Morazán",
            category: "Ingeniería",
            career: "Ingeniería Industrial",
            careersList: ["Ingeniería Industrial"],
            published: "08 Oct, 2024",
            publishedDateStr: "08 Oct, 2024",
            deadline: "30 Nov, 2026",
            rawDeadline: "30 de Nov, 2026",
            description: "Práctica profesional en planta manufacturera enfocada en la optimización de procesos de línea de ensamblaje.",
            requirements: [
                "Estudiante de último año de Ingeniería Industrial.",
                "Conocimientos en diagramación de procesos (BPMN).",
                "Disponibilidad de tiempo completo."
            ]
        }
    ];

    // === BASE DE DATOS MOCK DE EMPRESAS ===
    const companies = [
        { id: 301, name: "TechNova Solutions", sector: "Tecnología", rep: "Ing. Roberto Cardona", date: "12 de julio, 2024", status: "Activa" },
        { id: 302, name: "Banco de Occidente, S.A.", sector: "Banca y Finanzas", rep: "Lic. Sandra Mejía", date: "15 de enero, 2025", status: "Activa" },
        { id: 303, name: "Bufete Valladares & Asociados", sector: "Servicios Legales", rep: "Abog. Manuel Valladares", date: "22 de marzo, 2025", status: "Activa" },
        { id: 304, name: "Supermercados La Colonia", sector: "Comercio y Retail", rep: "Ing. Patricia Castro", date: "30 de abril, 2025", status: "Pendiente" },
        { id: 305, name: "Global Media Corp", sector: "Publicidad", rep: "Lic. Daniel Erazo", date: "01 de junio, 2025", status: "Inactiva" }
    ];

    // Historial de postulaciones local del estudiante Sasha
    const userAppliedVacancies = [];

    // === SELECTORES DE PANTALLAS (RUTAS) ===
    const screens = {
        home: document.getElementById('home-screen'),
        login: document.getElementById('login-screen'),
        success: document.getElementById('success-screen'),
        studentExplore: document.getElementById('student-explore-screen'),
        studentDetail: document.getElementById('student-detail-screen'),
        studentPostulaciones: document.getElementById('student-postulaciones-screen'),
        companyVacancies: document.getElementById('company-vacancies-screen'),
        companyPostulaciones: document.getElementById('company-postulaciones-screen'),
        adminVacancies: document.getElementById('admin-vacancies-screen'),
        adminCompanies: document.getElementById('admin-companies-screen')
    };

    // === SELECTORES DE BOTONES GENERALES ===
    const buttons = {
        portalPracticas: document.getElementById('portal-practicas-btn'),
        loginSubmit: document.getElementById('btn-login-submit'),
        homeLogout: document.getElementById('btn-home-logout'),
        successBackPortal: document.getElementById('btn-success-back-portal'),
        successLogout: document.getElementById('btn-success-logout')
    };

    const form = document.getElementById('formulariologinunicah');
    const demoBtns = document.querySelectorAll('[data-demo-role]');

    // Inputs del login
    const usernameInput = document.getElementById('UsrUsr');
    const passwordInput = document.getElementById('UsrPwd');

    // Menú de Login top-bar
    const loginMenuBtn = document.getElementById('btn-login-menu');
    const userMenu = document.getElementById('user-menu');

    // Éxito de otros roles (Admin)
    const successUserName = document.getElementById('success-user-name');
    const successUserRole = document.getElementById('success-user-role');
    const successUserId = document.getElementById('success-user-id');
    const successUserAvatar = document.getElementById('success-user-avatar');

    // Toast Global
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');

    // === SELECTORES ESPECÍFICOS DEL ESTUDIANTE ===
    const studentElements = {
        exploreList: document.getElementById('vacancies-list-container'),
        emptyState: document.getElementById('vacancies-empty-state'),
        showingCount: document.getElementById('showing-count'),
        filterCarrera: document.getElementById('filter-carrera'),
        filterDepartamento: document.getElementById('filter-departamento'),
        btnSearch: document.getElementById('btn-search-vacancies'),
        btnClearFilters: document.getElementById('btn-clear-filters'),

        detailCard: document.getElementById('vacancy-detail-card'),
        btnBackToExplore: document.getElementById('btn-back-to-explore'),

        postulacionesList: document.getElementById('postulaciones-list-container'),
        postulacionesEmpty: document.getElementById('postulaciones-empty-state'),
        btnEmptyGoExplore: document.getElementById('btn-empty-go-explore'),

        modal: document.getElementById('student-postular-modal'),
        btnCancelModal: document.getElementById('btn-cancel-modal'),
        btnCloseModal: document.getElementById('btn-close-modal'),
        btnSubmitModal: document.getElementById('btn-enviar-postulacion'),
        dropZone: document.getElementById('drop-zone-cv'),
        fileInput: document.getElementById('file-input-cv'),
        progressContainer: document.getElementById('upload-progress-container'),
        progressBar: document.getElementById('upload-progress-bar'),
        progressText: document.getElementById('upload-progress-text'),
        uploadIcon: document.getElementById('upload-icon'),
        uploadText: document.getElementById('upload-text'),
        btnSelectFile: document.getElementById('btn-select-file'),
        modalVacancyCompany: document.getElementById('modal-vacancy-company')
    };

    // === SELECTORES ESPECÍFICOS DE LA EMPRESA ===
    const companyElements = {
        vacanciesList: document.getElementById('company-vacancies-list'),
        btnCreateVacancy: document.getElementById('btn-company-create-vacancy'),

        btnBackVacancies: document.getElementById('btn-company-back-vacancies'),
        postulantesTbody: document.getElementById('company-postulantes-tbody'),
        tableFooterText: document.getElementById('comp-table-footer-text'),

        summaryTitle: document.getElementById('comp-summary-title'),
        summaryCareers: document.getElementById('comp-summary-careers'),
        summaryDate: document.getElementById('comp-summary-date'),
        summaryCount: document.getElementById('comp-summary-count'),

        modalCreate: document.getElementById('company-create-vacancy-modal'),
        btnCloseModal: document.getElementById('btn-comp-close-modal'),
        btnCancelModal: document.getElementById('btn-comp-cancel-modal'),
        btnSaveVacancy: document.getElementById('btn-comp-save-vacancy'),
        formCreate: document.getElementById('form-company-create-vacancy'),

        popover: document.getElementById('status-popover')
    };

    // === SELECTORES ESPECÍFICOS DEL ADMINISTRADOR ===
    const adminElements = {
        vacanciesTbody: document.getElementById('admin-vacancies-tbody'),
        vacanciesPendingCount: document.getElementById('admin-pending-count'),
        tableFooterText: document.getElementById('admin-table-footer-text'),

        searchVacancies: document.getElementById('admin-search-vacancies'),
        filterDept: document.getElementById('admin-filter-dept'),

        navVacancies: document.getElementById('admin-nav-vacancies'),
        navCompanies: document.getElementById('admin-nav-companies'),
        navVacancies2: document.getElementById('admin-nav-vacancies-2'),
        navCompanies2: document.getElementById('admin-nav-companies-2'),

        companiesTbody: document.getElementById('admin-companies-tbody'),
        searchCompanies: document.getElementById('admin-search-companies'),
        btnCreateCompany: document.getElementById('btn-admin-create-company'),
        statusFilters: document.getElementById('company-status-filters'),

        modalCreateCompany: document.getElementById('admin-create-company-modal'),
        btnCloseModalCompany: document.getElementById('btn-admin-close-modal'),
        btnCancelModalCompany: document.getElementById('btn-admin-cancel-modal'),
        btnSaveCompany: document.getElementById('btn-admin-save-company'),
        formCreateCompany: document.getElementById('form-admin-create-company'),

        modalReviewVacancy: document.getElementById('admin-review-vacancy-modal'),
        btnCloseReview: document.getElementById('btn-admin-close-review'),
        btnCancelReview: document.getElementById('btn-admin-cancel-review'),
        btnApproveVacancy: document.getElementById('btn-admin-approve'),
        btnRejectVacancy: document.getElementById('btn-admin-reject'),

        reviewLogo: document.getElementById('admin-review-logo'),
        reviewTitle: document.getElementById('admin-review-title'),
        reviewCompany: document.getElementById('admin-review-company'),
        reviewDept: document.getElementById('admin-review-dept'),
        reviewCareers: document.getElementById('admin-review-careers'),
        reviewDesc: document.getElementById('admin-review-desc'),
        reviewReqList: document.getElementById('admin-review-req-list'),

        popoverCompany: document.getElementById('admin-company-status-popover')
    };

    // Credenciales mock
    const mockCredentials = {
        estudiante: {
            user: 'sasha.flores@unicah.edu',
            pass: 'estudiante2026',
            name: 'Sasha Flores',
            roleName: 'Estudiante (Ingeniería en Ciencias de la Computación)',
            avatar: 'school'
        },
        empresa: {
            user: 'contacto@techsolutions.com',
            pass: 'techsolutions2026',
            name: 'TechNova Solutions',
            roleName: 'Empresa (TechNova Solutions)',
            avatar: 'business'
        },
        administrador: {
            user: 'admin.castro',
            pass: 'adminunicah',
            name: 'Lic. María Castro',
            roleName: 'Administrador (Coordinación)',
            avatar: 'admin_panel_settings'
        }
    };

    // === SISTEMA DE ROUTING INTERNO ===
    function showScreen(screenKey) {
        Object.keys(screens).forEach(key => {
            if (screens[key]) {
                screens[key].classList.remove('active');
                setTimeout(() => {
                    if (!screens[key].classList.contains('active')) {
                        screens[key].style.display = 'none';
                    }
                }, 300);
            }
        });

        const targetScreen = screens[screenKey];
        if (targetScreen) {
            targetScreen.style.display = 'block';
            setTimeout(() => {
                targetScreen.classList.add('active');
            }, 50);
        }
    }

    // === MANEJO DE TOASTS ===
    function showToast(message, isError = false) {
        toastMessage.textContent = message;
        toast.style.borderLeftColor = isError ? '#EF4444' : '#10B981';
        toast.querySelector('i').textContent = isError ? 'error_outline' : 'check_circle';
        toast.querySelector('i').className = isError ? 'material-icons text-red-500' : 'material-icons text-emerald-500';

        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // === NAVEGACIÓN Y LOGOUT GENERAL ===
    if (loginMenuBtn && userMenu) {
        loginMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu.classList.toggle('active');
        });
        document.addEventListener('click', () => {
            userMenu.classList.remove('active');
        });
    }

    // Al pulsar en "Portal de Prácticas"
    buttons.portalPracticas.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentRole === 'estudiante') {
            showScreen('studentExplore');
            renderVacancies(vacancies);
        } else if (currentRole === 'empresa') {
            showScreen('companyVacancies');
            renderCompanyVacancies();
        } else if (currentRole === 'administrador') {
            showScreen('adminVacancies');
            renderAdminVacancies();
        } else {
            showScreen('success');
        }
    });

    buttons.homeLogout.addEventListener('click', () => {
        form.reset();
        showScreen('login');
        showToast('Sesión cerrada');
    });

    buttons.successBackPortal.addEventListener('click', () => showScreen('home'));
    buttons.successLogout.addEventListener('click', () => {
        form.reset();
        showScreen('login');
        showToast('Sesión cerrada');
    });

    // === NAVEGACIÓN ESTUDIANTE ===
    document.querySelectorAll('.btn-back-portal-menu').forEach(btn => {
        btn.addEventListener('click', () => showScreen('home'));
    });

    document.querySelectorAll('.btn-student-logout-action').forEach(btn => {
        btn.addEventListener('click', () => {
            form.reset();
            showScreen('login');
            showToast('Sesión cerrada');
        });
    });

    document.querySelectorAll('.btn-go-to-explore').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen('studentExplore');
            renderVacancies(vacancies);
        });
    });

    document.querySelectorAll('.btn-go-to-postulaciones').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen('studentPostulaciones');
            renderAppliedVacancies();
        });
    });

    studentElements.btnEmptyGoExplore.addEventListener('click', () => {
        showScreen('studentExplore');
        renderVacancies(vacancies);
    });

    // === NAVEGACIÓN SOCIO / EMPRESA ===
    document.querySelectorAll('.btn-company-logout-action').forEach(btn => {
        btn.addEventListener('click', () => {
            form.reset();
            showScreen('login');
            showToast('Sesión cerrada');
        });
    });

    companyElements.btnBackVacancies.addEventListener('click', () => {
        showScreen('companyVacancies');
        renderCompanyVacancies();
    });

    // === NAVEGACIÓN ADMINISTRADOR ===
    document.querySelectorAll('.btn-admin-logout-action').forEach(btn => {
        btn.addEventListener('click', () => {
            form.reset();
            showScreen('login');
            showToast('Sesión cerrada');
        });
    });

    document.querySelectorAll('.btn-admin-back-portal').forEach(btn => {
        btn.addEventListener('click', () => showScreen('home'));
    });

    // Intercambio de pestañas del Administrador
    if (adminElements.navVacancies) {
        adminElements.navVacancies.addEventListener('click', (e) => { e.preventDefault(); showScreen('adminVacancies'); renderAdminVacancies(); });
        adminElements.navCompanies.addEventListener('click', (e) => { e.preventDefault(); showScreen('adminCompanies'); renderAdminCompanies(); });
        adminElements.navVacancies2.addEventListener('click', (e) => { e.preventDefault(); showScreen('adminVacancies'); renderAdminVacancies(); });
        adminElements.navCompanies2.addEventListener('click', (e) => { e.preventDefault(); showScreen('adminCompanies'); renderAdminCompanies(); });
    }

    // === RENDERIZAR EXPLORACIÓN DEL ESTUDIANTE ===
    function renderVacancies(list) {
        studentElements.exploreList.innerHTML = '';

        // Filtrar vacantes activas
        const activeList = list.filter(v => v.status === 'Activa');
        studentElements.showingCount.textContent = activeList.length;

        if (activeList.length === 0) {
            studentElements.exploreList.classList.add('hidden');
            studentElements.emptyState.classList.remove('hidden');
            studentElements.emptyState.classList.add('flex');
            return;
        }

        studentElements.exploreList.classList.remove('hidden');
        studentElements.emptyState.classList.add('hidden');
        studentElements.emptyState.classList.remove('flex');

        activeList.forEach(vac => {
            let deadlineClass = 'text-gray-500 font-semibold';
            let deadlineText = `Cierra el ${vac.rawDeadline.split(',')[0]}`;

            if (vac.deadline.includes('día') || vac.deadline.includes('mañana')) {
                deadlineClass = 'text-[#DC2626] font-bold';
                deadlineText = `Cierra en ${vac.deadline}`;
            } else if (vac.deadline === 'mañana') {
                deadlineClass = 'text-[#DC2626] font-bold';
                deadlineText = `Cierra mañana`;
            }

            const card = document.createElement('div');
            card.className = "bg-white p-2 md:p-3 rounded-lg border border-[#D1D5DB] card-shadow flex flex-col md:flex-row items-center hover:border-primary-container transition-colors group gap-4";
            card.innerHTML = `
                <div class="w-full md:flex-1 flex flex-col gap-xs">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-gray-50 rounded flex items-center justify-center border border-outline-variant shrink-0">
                            <span class="material-symbols-outlined text-primary text-[24px]">${vac.logoIcon}</span>
                        </div>
                        <div class="flex-1">
                            <h3 class="font-bold text-body-main text-[#002080] group-hover:underline cursor-pointer leading-tight btn-view-detail" data-id="${vac.id}">
                                ${vac.title}
                            </h3>
                            <p class="text-xs font-semibold text-on-surface">${vac.company}</p>
                            <div class="flex flex-wrap gap-x-4 gap-y-1 items-center text-on-surface-variant text-[11px] mt-1">
                                <div class="flex items-center gap-1">
                                    <span class="material-symbols-outlined text-[13px]">location_on</span>
                                    <span>${vac.department}</span>
                                </div>
                                <div class="flex items-center gap-1">
                                    <span class="material-symbols-outlined text-[13px]">school</span>
                                    <span>${vac.careersList.join(', ')}</span>
                                </div>
                                <div class="flex items-center gap-1">
                                    <span class="material-symbols-outlined text-[13px]">calendar_today</span>
                                    <span>${vac.published}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 mt-2 md:mt-0 md:pl-4 md:border-l border-outline-variant self-stretch">
                    <div class="flex items-center gap-1 ${deadlineClass}">
                        <span class="material-symbols-outlined text-[15px]">alarm</span>
                        <span class="text-[11px]">${deadlineText}</span>
                    </div>
                    <button class="bg-[#002080] hover:bg-[#001A5E] text-white px-4 h-8 rounded font-bold text-xs btn-transition btn-view-detail" data-id="${vac.id}">Ver Detalle</button>
                </div>
            `;

            studentElements.exploreList.appendChild(card);
        });

        document.querySelectorAll('.btn-view-detail').forEach(el => {
            el.addEventListener('click', () => {
                const id = parseInt(el.getAttribute('data-id'));
                openVacancyDetail(id);
            });
        });
    }

    // BUSCADOR DE VACANTES ESTUDIANTE
    studentElements.btnSearch.addEventListener('click', () => {
        const carrera = studentElements.filterCarrera.value;
        const depto = studentElements.filterDepartamento.value;

        let filtered = vacancies;

        if (carrera) {
            filtered = filtered.filter(v => v.careersList.some(c => c.includes(carrera) || carrera.includes(c)));
        }

        if (depto) {
            filtered = filtered.filter(v => v.department === depto);
        }

        renderVacancies(filtered);
    });

    studentElements.btnClearFilters.addEventListener('click', () => {
        studentElements.filterCarrera.value = "";
        studentElements.filterDepartamento.value = "";
        renderVacancies(vacancies);
    });

    // DETALLE DE VACANTE
    function openVacancyDetail(id) {
        const vac = vacancies.find(v => v.id === id);
        if (!vac) return;
        selectedVacancy = vac;

        const badgesHTML = vac.careersList.map(c => `
            <span class="px-3 py-1 bg-gray-50 text-[#002080] rounded-full text-xs font-bold border border-gray-200">${c}</span>
        `).join('');

        const requirementsHTML = vac.requirements.map(req => `
            <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-[#002080] mt-0.5 text-lg">check_circle</span>
                <span class="text-gray-600 text-sm md:text-base">${req}</span>
            </li>
        `).join('');

        studentElements.detailCard.innerHTML = `
            <div class="p-6 md:p-10">
                <div class="mb-8">
                    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div class="flex-grow flex items-center gap-4">
                            <div class="shrink-0 w-16 h-16 bg-white rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center">
                                <span class="material-symbols-outlined text-[#002080] text-4xl">${vac.logoIcon}</span>
                            </div>
                            <div>
                                <h1 class="text-2xl md:text-3xl font-bold text-[#002080] leading-tight mb-1">${vac.title}</h1>
                                <h2 class="text-lg md:text-xl font-semibold text-gray-600">${vac.company}</h2>
                            </div>
                        </div>
                        <div class="shrink-0">
                            <div class="flex items-center gap-2 text-[#DC2626] bg-[#FEF2F2] px-4 py-2 rounded-lg font-bold border border-[#FEE2E2]">
                                <span class="material-symbols-outlined text-lg">alarm</span>
                                <span class="text-xs md:text-sm">Límite: ${vac.rawDeadline}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex flex-wrap gap-x-6 gap-y-2 text-gray-500 text-xs md:text-sm items-center mb-6">
                        <div class="flex items-center gap-1">
                            <span class="material-symbols-outlined text-lg text-gray-400">location_on</span>
                            <span>${vac.department}</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <span class="material-symbols-outlined text-lg text-gray-400">corporate_fare</span>
                            <span>${vac.category}</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <span class="material-symbols-outlined text-lg text-gray-400">calendar_today</span>
                            <span>Publicado ${vac.published}</span>
                        </div>
                    </div>
                    
                    <div class="flex flex-wrap items-center gap-2">
                        <span class="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">Carreras:</span>
                        ${badgesHTML}
                    </div>
                </div>
                
                <hr class="border-gray-100 mb-8">
                
                <div class="space-y-8">
                    <section>
                        <h3 class="text-lg font-bold text-[#002080] mb-4 flex items-center gap-2">
                            <span class="material-symbols-outlined text-xl">description</span>
                            Descripción de la Práctica
                        </h3>
                        <div class="text-sm md:text-base text-gray-600 leading-relaxed max-w-none prose">
                            <p>${vac.description}</p>
                        </div>
                    </section>
                    
                    <hr class="border-gray-100">
                    
                    <section>
                        <h3 class="text-lg font-bold text-[#002080] mb-4 flex items-center gap-2">
                            <span class="material-symbols-outlined text-xl">fact_check</span>
                            Requisitos
                        </h3>
                        <ul class="space-y-3">
                            ${requirementsHTML}
                        </ul>
                    </section>
                </div>
                
                <div class="mt-10 border-t border-gray-100 pt-6">
                    <button id="btn-apply-now" class="w-full h-[54px] bg-[#002080] hover:bg-[#001A5E] text-white text-base md:text-lg font-bold rounded-xl shadow-md btn-transition flex items-center justify-center gap-2">
                        <span class="material-symbols-outlined">send</span>
                        Postularme ahora
                    </button>
                </div>
            </div>
        `;

        document.getElementById('btn-apply-now').addEventListener('click', () => {
            const alreadyApplied = userAppliedVacancies.some(v => v.id === selectedVacancy.id);
            if (alreadyApplied) {
                showToast('Ya te has postulado a esta vacante previamente', true);
                return;
            }
            openApplyModal();
        });

        showScreen('studentDetail');
    }

    studentElements.btnBackToExplore.addEventListener('click', () => {
        showScreen('studentExplore');
    });

    // MODAL POSTULARSE
    function openApplyModal() {
        if (!selectedVacancy) return;
        studentElements.modalVacancyCompany.textContent = `Postulación para ${selectedVacancy.title} en ${selectedVacancy.company}`;
        resetUploadZone();
        studentElements.modal.style.display = 'flex';
        setTimeout(() => studentElements.modal.classList.remove('hidden'), 50);
    }

    function closeApplyModal() {
        studentElements.modal.classList.add('hidden');
        setTimeout(() => studentElements.modal.style.display = 'none', 300);
    }

    function resetUploadZone() {
        studentElements.fileInput.value = '';
        uploadedFileName = '';
        studentElements.btnSubmitModal.disabled = true;

        studentElements.dropZone.className = "border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:border-[#002080] hover:bg-blue-50/10 transition-all cursor-pointer group text-center gap-3";
        studentElements.uploadIcon.textContent = 'cloud_upload';
        studentElements.uploadIcon.className = "material-symbols-outlined text-[#002080] text-[44px] transition-transform group-hover:scale-110";
        studentElements.uploadText.innerHTML = `
            <span class="text-sm font-bold text-gray-800">Arrastra tu archivo PDF aquí o haz clic para buscar</span>
            <span class="text-xs text-gray-400 mt-0.5">Formato admitido: PDF (Máx. 5MB)</span>
        `;
        studentElements.btnSelectFile.style.display = 'inline-block';
        studentElements.progressContainer.style.display = 'none';
        studentElements.progressBar.style.width = '0%';
        studentElements.progressText.textContent = 'Subiendo archivo... 0%';
    }

    studentElements.btnCancelModal.addEventListener('click', closeApplyModal);
    studentElements.btnCloseModal.addEventListener('click', closeApplyModal);

    studentElements.dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        studentElements.dropZone.classList.add('bg-blue-50/30', 'border-[#002080]');
    });

    studentElements.dropZone.addEventListener('dragleave', () => {
        studentElements.dropZone.classList.remove('bg-blue-50/30', 'border-[#002080]');
    });

    studentElements.dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        studentElements.dropZone.classList.remove('bg-blue-50/30', 'border-[#002080]');
        if (e.dataTransfer.files.length > 0) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    });

    studentElements.dropZone.addEventListener('click', () => {
        studentElements.fileInput.click();
    });

    studentElements.fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });

    function handleFileUpload(file) {
        if (file.type !== 'application/pdf') {
            showToast('Selecciona únicamente archivos en formato PDF', true);
            resetUploadZone();
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            showToast('El archivo supera los 5MB permitidos', true);
            resetUploadZone();
            return;
        }

        uploadedFileName = file.name;
        studentElements.btnSelectFile.style.display = 'none';
        studentElements.progressContainer.style.display = 'block';

        let progress = 0;
        const interval = setInterval(() => {
            progress += 20;
            studentElements.progressBar.style.width = `${progress}%`;
            studentElements.progressText.textContent = `Subiendo archivo... ${progress}%`;

            if (progress >= 100) {
                clearInterval(interval);
                studentElements.dropZone.className = "border-2 border-solid border-emerald-400 rounded-lg p-8 flex flex-col items-center justify-center bg-emerald-50/10 transition-all cursor-pointer group text-center gap-3";
                studentElements.uploadIcon.textContent = 'check_circle';
                studentElements.uploadIcon.className = "material-symbols-outlined text-emerald-500 text-[44px]";
                studentElements.uploadText.innerHTML = `
                    <span class="text-sm font-bold text-emerald-800">¡Archivo cargado con éxito!</span>
                    <span class="text-xs text-gray-500 mt-0.5">${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                `;
                studentElements.progressContainer.style.display = 'none';
                studentElements.btnSubmitModal.disabled = false;
            }
        }, 120);
    }

    // ENVIAR POSTULACIÓN DEL ALUMNO
    studentElements.btnSubmitModal.addEventListener('click', () => {
        if (!selectedVacancy || !uploadedFileName) return;

        studentElements.btnSubmitModal.disabled = true;
        const originalText = studentElements.btnSubmitModal.innerHTML;
        studentElements.btnSubmitModal.innerHTML = `<span>Enviando...</span><div class="spinner ml-2"></div>`;

        setTimeout(() => {
            userAppliedVacancies.push({
                id: selectedVacancy.id,
                title: selectedVacancy.title,
                company: selectedVacancy.company,
                logoIcon: selectedVacancy.logoIcon,
                appliedDate: new Date().toLocaleDateString('es-HN', { day: 'numeric', month: 'short', year: 'numeric' }),
                fileName: uploadedFileName,
                status: 'Recibida'
            });

            const globalVac = vacancies.find(v => v.id === selectedVacancy.id);
            if (globalVac) {
                globalVac.applicants.push({
                    id: Date.now(),
                    name: "Sasha Flores",
                    career: "Ingeniería en Ciencias de la Computación",
                    date: new Date().toLocaleDateString('es-HN', { day: 'numeric', month: 'short', year: 'numeric' }),
                    fileName: uploadedFileName,
                    status: 'Recibida'
                });
            }

            studentElements.btnSubmitModal.disabled = false;
            studentElements.btnSubmitModal.innerHTML = originalText;
            closeApplyModal();
            showToast(`¡Postulación enviada correctamente a ${selectedVacancy.company}!`);

            setTimeout(() => {
                showScreen('studentPostulaciones');
                renderAppliedVacancies();
            }, 400);

        }, 1200);
    });

    // RENDERIZAR HISTORIAL DE POSTULACIONES
    function renderAppliedVacancies() {
        studentElements.postulacionesList.innerHTML = '';

        if (userAppliedVacancies.length === 0) {
            studentElements.postulacionesList.classList.add('hidden');
            studentElements.postulacionesEmpty.classList.remove('hidden');
            studentElements.postulacionesEmpty.classList.add('flex');
            return;
        }

        studentElements.postulacionesList.classList.remove('hidden');
        studentElements.postulacionesEmpty.classList.add('hidden');
        studentElements.postulacionesEmpty.classList.remove('flex');

        userAppliedVacancies.forEach(app => {
            const globalVac = vacancies.find(v => v.id === app.id);
            let activeStatus = app.status;
            if (globalVac) {
                const sashaApp = globalVac.applicants.find(a => a.name === "Sasha Flores");
                if (sashaApp) {
                    activeStatus = sashaApp.status;
                    app.status = sashaApp.status;
                }
            }

            let badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200";
            if (activeStatus === 'En revisión') {
                badgeStyle = "bg-blue-50 text-blue-700 border-blue-200";
            } else if (activeStatus === 'Rechazado') {
                badgeStyle = "bg-red-50 text-red-700 border-red-200";
            }

            const card = document.createElement('div');
            card.className = "bg-white rounded-xl border border-gray-200 p-5 card-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-[#002080]/30";
            card.innerHTML = `
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-blue-50 text-[#002080] rounded-lg flex items-center justify-center border border-gray-100 shrink-0">
                        <span class="material-symbols-outlined text-2xl">${app.logoIcon}</span>
                    </div>
                    <div>
                        <h3 class="text-base font-bold text-gray-800 leading-tight">${app.title}</h3>
                        <p class="text-sm font-semibold text-gray-500 mt-0.5">${app.company}</p>
                        <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[11px] text-gray-400 font-medium">
                            <span class="flex items-center gap-1">
                                <span class="material-symbols-outlined text-sm">calendar_today</span>
                                Postulado el: ${app.appliedDate}
                            </span>
                            <span class="flex items-center gap-1">
                                <span class="material-symbols-outlined text-sm">description</span>
                                CV: ${app.fileName}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex sm:flex-col items-end gap-2 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 justify-between">
                    <span class="status-badge ${badgeStyle} border flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">check_circle</span>
                        ${activeStatus}
                    </span>
                    <button class="text-xs text-[#002080] hover:underline flex items-center gap-1 font-bold btn-download-mock-cv" data-file="${app.fileName}">
                        <span class="material-symbols-outlined text-sm">download</span>
                        Descargar CV
                    </button>
                </div>
            `;

            studentElements.postulacionesList.appendChild(card);
        });

        document.querySelectorAll('.btn-download-mock-cv').forEach(btn => {
            btn.addEventListener('click', () => {
                const file = btn.getAttribute('data-file');
                showToast(`Descargando archivo: ${file}...`);
                setTimeout(() => {
                    const blob = new Blob(["Simulated PDF Content"], { type: "application/pdf" });
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = file;
                    link.click();
                }, 800);
            });
        });
    }

    // === INTERACTIVIDAD DEL SOCIO / EMPRESA ===

    function renderCompanyVacancies() {
        companyElements.vacanciesList.innerHTML = '';
        const myVacancies = vacancies.filter(v => v.companyOwner === 'TechNova Solutions');

        myVacancies.forEach(vac => {
            let badgeClass = "bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase";
            if (vac.status === 'Cerrada') {
                badgeClass = "bg-gray-100 text-gray-500 border border-gray-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase";
            } else if (vac.status === 'Pendiente') {
                badgeClass = "bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase";
            }

            const card = document.createElement('div');
            card.className = "bg-white p-5 rounded-xl card-shadow border border-outline-variant/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:shadow-md";

            let btnPostulantes = `
                <button class="flex-1 md:flex-none h-10 px-6 rounded-lg bg-[#002080] hover:bg-[#001A5E] text-white text-xs font-bold hover:bg-on-primary-fixed-variant transition-colors shadow-sm btn-comp-view-applications" data-id="${vac.id}">
                    Ver postulaciones
                </button>
            `;
            if (vac.status === 'Cerrada') {
                btnPostulantes = `
                    <button class="flex-1 md:flex-none h-10 px-6 rounded-lg bg-gray-100 text-gray-400 text-xs font-bold cursor-not-allowed" disabled>
                        Ver postulaciones
                    </button>
                `;
            }

            let statusBtn = '';
            if (vac.status === 'Activa' || vac.status === 'Pendiente') {
                statusBtn = `
                    <button class="flex-1 md:flex-none h-10 px-4 rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-100/50 text-xs font-bold btn-comp-toggle-status" data-id="${vac.id}" data-action="close">
                        Finalizar
                    </button>
                `;
            } else if (vac.status === 'Cerrada') {
                statusBtn = `
                    <button class="flex-1 md:flex-none h-10 px-4 rounded-lg border border-green-200 text-green-600 bg-green-50 hover:bg-green-100/50 text-xs font-bold btn-comp-toggle-status" data-id="${vac.id}" data-action="activate">
                        Reactivar
                    </button>
                `;
            }

            card.innerHTML = `
                <div class="flex gap-4 items-start">
                    <div class="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-150 shadow-sm">
                        <span class="material-symbols-outlined text-[#002080] text-3xl">${vac.logoIcon}</span>
                    </div>
                    <div class="space-y-1">
                        <div class="flex items-center gap-2 flex-wrap">
                            <h3 class="text-base font-bold text-gray-800 leading-tight">${vac.title}</h3>
                            <span class="${badgeClass}">${vac.status}</span>
                        </div>
                        <p class="text-xs text-gray-600">
                            <span class="font-bold">Carreras:</span> ${vac.careersList.join(', ')}
                        </p>
                        <div class="flex items-center gap-1 text-gray-400 text-[11px]">
                            <span class="material-symbols-outlined text-sm">calendar_today</span>
                            <span>Publicado: ${vac.publishedDateStr}</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-2 w-full md:w-auto mt-4 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 flex-wrap">
                    <button class="flex-1 md:flex-none h-10 px-4 rounded-lg border border-gray-300 text-[#002080] text-xs font-bold hover:bg-gray-50 transition-colors btn-comp-edit-vacancy" data-id="${vac.id}">
                        Editar
                    </button>
                    ${statusBtn}
                    ${btnPostulantes}
                </div>
            `;

            companyElements.vacanciesList.appendChild(card);
        });

        document.querySelectorAll('.btn-comp-view-applications').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                openCompanyPostulaciones(id);
            });
        });

        document.querySelectorAll('.btn-comp-toggle-status').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                const action = btn.getAttribute('data-action');
                const vac = vacancies.find(v => v.id === id);
                if (vac) {
                    if (action === 'close') {
                        vac.status = 'Cerrada';
                        showToast(`Oferta "${vac.title}" finalizada / desactivada con éxito`);
                    } else {
                        vac.status = 'Activa';
                        showToast(`Oferta "${vac.title}" reactivada con éxito`);
                    }
                    renderCompanyVacancies();
                }
            });
        });

        document.querySelectorAll('.btn-comp-edit-vacancy').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                const vac = vacancies.find(v => v.id === id);
                if (vac) {
                    editingVacancyId = vac.id;

                    // Llenar formulario
                    document.getElementById('comp-vacancy-title').value = vac.title;
                    document.getElementById('comp-vacancy-dept').value = vac.department || "Francisco Morazán";
                    document.getElementById('comp-vacancy-desc').value = vac.description;
                    document.getElementById('comp-vacancy-req').value = vac.requirements.join('\n');
                    document.getElementById('comp-vacancy-deadline').value = "2026-11-30";

                    document.querySelectorAll('input[name="comp-careers"]').forEach(chk => {
                        chk.checked = vac.careersList.includes(chk.value);
                    });

                    // Modificar encabezados del modal
                    const modalTitle = document.querySelector('#company-create-vacancy-modal h2');
                    const modalSubtitle = document.querySelector('#company-create-vacancy-modal p');
                    const saveBtn = document.getElementById('btn-comp-save-vacancy');

                    if (modalTitle) modalTitle.textContent = "Editar vacante";
                    if (modalSubtitle) modalSubtitle.textContent = "Modifica los detalles de esta vacante.";
                    if (saveBtn) saveBtn.textContent = "Guardar Cambios";

                    // Abrir modal
                    companyElements.modalCreate.style.display = 'flex';
                    setTimeout(() => companyElements.modalCreate.classList.remove('hidden'), 50);
                }
            });
        });
    }

    function openCompanyPostulaciones(id) {
        const vac = vacancies.find(v => v.id === id);
        if (!vac) return;
        activeCompanyVacancy = vac;

        companyElements.summaryTitle.textContent = vac.title;
        companyElements.summaryCareers.textContent = `Carreras: ${vac.careersList.join(', ')}`;
        companyElements.summaryDate.textContent = `Publicado: ${vac.publishedDateStr}`;
        companyElements.summaryCount.textContent = vac.applicants.length;

        renderCompanyApplicants(vac);
        showScreen('companyPostulaciones');
    }

    function renderCompanyApplicants(vac) {
        companyElements.postulantesTbody.innerHTML = '';
        companyElements.tableFooterText.textContent = `Mostrando 1-${vac.applicants.length} de ${vac.applicants.length} postulantes`;

        if (vac.applicants.length === 0) {
            companyElements.postulantesTbody.innerHTML = `
                <tr>
                    <td colspan="5" class="px-6 py-10 text-center text-gray-400 text-sm font-semibold">
                        Aún no se han recibido postulaciones para esta vacante.
                    </td>
                </tr>
            `;
            companyElements.tableFooterText.textContent = 'Mostrando 0 de 0 postulantes';
            return;
        }

        vac.applicants.forEach(app => {
            let badgeStyle = "bg-amber-50 text-amber-700 border-amber-200";
            if (app.status === 'En revisión') {
                badgeStyle = "bg-blue-50 text-blue-700 border-blue-200";
            } else if (app.status === 'Seleccionado') {
                badgeStyle = "bg-green-100 text-green-800 border border-green-200";
            } else if (app.status === 'Rechazado') {
                badgeStyle = "bg-gray-100 text-gray-500 border border-gray-200";
            }

            const initials = app.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

            const row = document.createElement('tr');
            row.className = "hover:bg-gray-50/50 transition-colors group";
            row.innerHTML = `
                <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-full bg-blue-50 text-[#002080] flex items-center justify-center font-bold text-xs shrink-0 border border-blue-100">
                            ${initials}
                        </div>
                        <div>
                            <div class="font-bold text-gray-800 text-sm">${app.name}</div>
                            <div class="text-[11px] text-gray-500">${app.career}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 text-xs text-gray-500">${app.date}</td>
                <td class="px-6 py-4">
                    <button class="flex items-center gap-1 text-[#002080] font-bold hover:underline transition-all text-xs btn-comp-view-cv" data-file="${app.fileName}">
                        <span class="material-symbols-outlined text-sm">description</span>
                        <span>Ver CV</span>
                    </button>
                </td>
                <td class="px-6 py-4 text-center">
                    <span class="status-badge ${badgeStyle} border">
                        ${app.status}
                    </span>
                </td>
                <td class="px-6 py-4 text-right">
                    <button class="btn-comp-change-status text-gray-400 hover:text-primary transition-colors p-1.5 rounded-full hover:bg-gray-100" data-id="${app.id}">
                        <span class="material-symbols-outlined text-base">edit</span>
                    </button>
                </td>
            `;

            companyElements.postulantesTbody.appendChild(row);
        });

        document.querySelectorAll('.btn-comp-view-cv').forEach(btn => {
            btn.addEventListener('click', () => {
                const file = btn.getAttribute('data-file');
                showToast(`Visualizando currículum: ${file}`);
            });
        });

        document.querySelectorAll('.btn-comp-change-status').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const applicantId = parseInt(btn.getAttribute('data-id'));
                const applicant = vac.applicants.find(a => a.id === applicantId);

                if (applicant) {
                    activeApplicant = applicant;

                    const rect = btn.getBoundingClientRect();
                    companyElements.popover.style.top = `${rect.bottom + window.scrollY + 6}px`;
                    companyElements.popover.style.left = `${rect.left - 160}px`;
                    companyElements.popover.classList.toggle('hidden');
                }
            });
        });
    }

    companyElements.popover.querySelectorAll('[data-status]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const status = item.getAttribute('data-status');

            if (activeApplicant && activeCompanyVacancy) {
                activeApplicant.status = status;
                showToast(`Estado de postulación: ${status}`);
                companyElements.popover.classList.add('hidden');
                renderCompanyApplicants(activeCompanyVacancy);
            }
        });
    });

    document.addEventListener('click', () => {
        companyElements.popover.classList.add('hidden');
    });

    // CREACIÓN DE VACANTE DE LA EMPRESA (MODERADA POR ADMIN)
    companyElements.btnCreateVacancy.addEventListener('click', () => {
        editingVacancyId = null;
        companyElements.formCreate.reset();

        // Restablecer títulos e iconos del modal
        const modalTitle = document.querySelector('#company-create-vacancy-modal h2');
        const modalSubtitle = document.querySelector('#company-create-vacancy-modal p');
        const saveBtn = document.getElementById('btn-comp-save-vacancy');

        if (modalTitle) modalTitle.textContent = "Publicar nueva vacante";
        if (modalSubtitle) modalSubtitle.textContent = "Completa la información para ofertar una plaza de práctica profesional.";
        if (saveBtn) saveBtn.textContent = "Publicar Vacante";

        companyElements.modalCreate.style.display = 'flex';
        setTimeout(() => companyElements.modalCreate.classList.remove('hidden'), 50);
    });

    function closeCompanyModal() {
        companyElements.modalCreate.classList.add('hidden');
        setTimeout(() => companyElements.modalCreate.style.display = 'none', 300);
    }

    companyElements.btnCloseModal.addEventListener('click', closeCompanyModal);
    companyElements.btnCancelModal.addEventListener('click', closeCompanyModal);

    companyElements.btnSaveVacancy.addEventListener('click', (e) => {
        e.preventDefault();

        const title = document.getElementById('comp-vacancy-title').value.trim();
        const dept = document.getElementById('comp-vacancy-dept').value;
        const deadline = document.getElementById('comp-vacancy-deadline').value;
        const desc = document.getElementById('comp-vacancy-desc').value.trim();
        const req = document.getElementById('comp-vacancy-req').value.trim();

        const checkedCareers = [];
        document.querySelectorAll('input[name="comp-careers"]:checked').forEach(chk => {
            checkedCareers.push(chk.value);
        });

        if (!title || !deadline || !desc || !req || checkedCareers.length === 0) {
            showToast('Por favor, complete todos los campos obligatorios.', true);
            return;
        }

        if (editingVacancyId) {
            // Modo edición: buscar vacante existente y actualizarla
            const vac = vacancies.find(v => v.id === editingVacancyId);
            if (vac) {
                vac.title = title;
                vac.department = dept;
                vac.careersList = checkedCareers;
                vac.career = checkedCareers[0];
                vac.description = desc;
                vac.requirements = req.split('\n').filter(r => r.trim() !== '');
                vac.rawDeadline = new Date(deadline).toLocaleDateString('es-HN', { day: 'numeric', month: 'short', year: 'numeric' });

                showToast(`¡Vacante "${title}" actualizada con éxito!`);
            }
            editingVacancyId = null;
        } else {
            // Modo creación: agregar nuevo pendiente para moderación del admin
            const newPending = {
                id: Date.now(),
                title: title,
                company: "TechNova Solutions",
                logoIcon: "business",
                department: dept,
                category: "Ingeniería",
                career: checkedCareers[0],
                careersList: checkedCareers,
                published: "hace unos momentos",
                publishedDateStr: new Date().toLocaleDateString('es-HN', { day: 'numeric', month: 'long', year: 'numeric' }),
                deadline: "30 Nov",
                rawDeadline: new Date(deadline).toLocaleDateString('es-HN', { day: 'numeric', month: 'short', year: 'numeric' }),
                description: desc,
                requirements: req.split('\n').filter(r => r.trim() !== ''),
                companyOwner: "TechNova Solutions",
                status: "Pendiente",
                applicants: []
            };

            pendingVacancies.unshift(newPending);
            showToast('¡Vacante enviada a moderación! Esperando aprobación del Administrador.');
        }

        closeCompanyModal();
        renderCompanyVacancies();
    });


    // === INTERACTIVIDAD DEL ADMINISTRADOR ===

    // RENDERIZAR COLA DE VACANTES PENDIENTES
    function renderAdminVacancies() {
        adminElements.vacanciesTbody.innerHTML = '';
        adminElements.vacanciesPendingCount.textContent = pendingVacancies.length;
        adminElements.tableFooterText.textContent = `Mostrando 1-${pendingVacancies.length} de ${pendingVacancies.length} vacantes pendientes`;

        if (pendingVacancies.length === 0) {
            adminElements.vacanciesTbody.innerHTML = `
                <tr>
                    <td colspan="6" class="px-6 py-10 text-center text-gray-400 font-semibold text-sm">
                        No hay solicitudes de vacantes pendientes de moderación.
                    </td>
                </tr>
            `;
            adminElements.tableFooterText.textContent = 'Mostrando 0 de 0 vacantes pendientes';
            return;
        }

        const searchTerm = adminElements.searchVacancies.value.toLowerCase();
        const filterDept = adminElements.filterDept.value;

        let filtered = pendingVacancies;

        if (searchTerm) {
            filtered = filtered.filter(v => v.title.toLowerCase().includes(searchTerm) || v.company.toLowerCase().includes(searchTerm));
        }

        if (filterDept) {
            filtered = filtered.filter(v => v.department === filterDept);
        }

        filtered.forEach(vac => {
            const row = document.createElement('tr');
            row.className = "hover:bg-gray-50/50 transition-colors group";
            row.innerHTML = `
                <td class="px-6 py-4">
                    <div class="font-bold text-primary text-sm leading-tight">${vac.title}</div>
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-gray-400 text-sm">business</span>
                        <span class="font-semibold text-gray-700 text-xs">${vac.company}</span>
                    </div>
                </td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 bg-blue-50 text-[#002080] rounded text-xs font-bold border border-blue-100">${vac.careersList[0]}</span>
                </td>
                <td class="px-6 py-4 text-xs text-gray-600 font-semibold">${vac.department}</td>
                <td class="px-6 py-4 text-xs text-gray-400">${vac.published}</td>
                <td class="px-6 py-4 text-right">
                    <button class="px-3 py-1.5 bg-[#002080] hover:bg-[#001A5E] text-white font-bold text-xs rounded-lg hover:shadow transition-all active:scale-95 flex items-center gap-1.5 ml-auto btn-admin-review" data-id="${vac.id}">
                        <span class="material-symbols-outlined text-sm">visibility</span>
                        <span>Revisar</span>
                    </button>
                </td>
            `;

            adminElements.vacanciesTbody.appendChild(row);
        });

        // Eventos a botones "Revisar"
        document.querySelectorAll('.btn-admin-review').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                openAdminReviewModal(id);
            });
        });
    }

    // Buscador y filtros de vacantes en el panel de administrador
    if (adminElements.searchVacancies) {
        adminElements.searchVacancies.addEventListener('input', renderAdminVacancies);
    }
    if (adminElements.filterDept) {
        adminElements.filterDept.addEventListener('change', renderAdminVacancies);
    }

    // MODAL DE DETALLE Y REVISIÓN PARA ADMINISTRADOR
    function openAdminReviewModal(id) {
        const vac = pendingVacancies.find(v => v.id === id);
        if (!vac) return;
        activeAdminVacancy = vac;

        if (adminElements.reviewTitle) adminElements.reviewTitle.textContent = vac.title;
        if (adminElements.reviewCompany) adminElements.reviewCompany.textContent = vac.company;
        if (adminElements.reviewDept) adminElements.reviewDept.textContent = vac.department;
        if (adminElements.reviewCareers) adminElements.reviewCareers.textContent = vac.careersList.join(', ');
        if (adminElements.reviewDesc) adminElements.reviewDesc.textContent = vac.description;

        if (adminElements.reviewReqList) {
            adminElements.reviewReqList.innerHTML = '';
            vac.requirements.forEach(r => {
                const li = document.createElement('li');
                li.textContent = r;
                adminElements.reviewReqList.appendChild(li);
            });
        }

        if (adminElements.modalReviewVacancy) {
            adminElements.modalReviewVacancy.style.display = 'flex';
            setTimeout(() => adminElements.modalReviewVacancy.classList.remove('hidden'), 50);
        }
    }

    function closeAdminReviewModal() {
        if (adminElements.modalReviewVacancy) {
            adminElements.modalReviewVacancy.classList.add('hidden');
            setTimeout(() => adminElements.modalReviewVacancy.style.display = 'none', 300);
        }
    }

    if (adminElements.btnCloseReview) adminElements.btnCloseReview.addEventListener('click', closeAdminReviewModal);
    if (adminElements.btnCancelReview) adminElements.btnCancelReview.addEventListener('click', closeAdminReviewModal);

    // APROBAR VACANTE (SE MUEVE A "ACTIVA" Y QUEDA VISIBLE PARA ALUMNOS)
    if (adminElements.btnApproveVacancy) {
        adminElements.btnApproveVacancy.addEventListener('click', () => {
            if (!activeAdminVacancy) return;

            // Remover de la lista de pendientes
            const idx = pendingVacancies.findIndex(v => v.id === activeAdminVacancy.id);
            if (idx !== -1) {
                pendingVacancies.splice(idx, 1);
            }

            // Agregar al catálogo general activo en estado "Activa"
            activeAdminVacancy.status = 'Activa';
            vacancies.unshift(activeAdminVacancy);

            closeAdminReviewModal();
            showToast('¡Vacante aprobada y publicada en el catálogo estudiantil!');
            renderAdminVacancies();
        });
    }

    // RECHAZAR VACANTE (SE REMOVE DE LA COLA)
    if (adminElements.btnRejectVacancy) {
        adminElements.btnRejectVacancy.addEventListener('click', () => {
            if (!activeAdminVacancy) return;

            const idx = pendingVacancies.findIndex(v => v.id === activeAdminVacancy.id);
            if (idx !== -1) {
                pendingVacancies.splice(idx, 1);
            }

            closeAdminReviewModal();
            showToast('Solicitud de vacante rechazada', true);
            renderAdminVacancies();
        });
    }

    // RENDERIZAR DIRECTORIO DE EMPRESAS (ADMIN)
    function renderAdminCompanies() {
        adminElements.companiesTbody.innerHTML = '';

        const search = adminElements.searchCompanies.value.toLowerCase();

        // Obtener el filtro activo de convenios
        const activeFilterTab = adminElements.statusFilters.querySelector('.filter-tab.active');
        const activeFilter = activeFilterTab ? activeFilterTab.getAttribute('data-status') : 'Todos';

        let filtered = companies;

        if (search) {
            filtered = filtered.filter(c => c.name.toLowerCase().includes(search) || c.sector.toLowerCase().includes(search));
        }

        if (activeFilter !== 'Todos') {
            filtered = filtered.filter(c => c.status === activeFilter);
        }

        if (filtered.length === 0) {
            adminElements.companiesTbody.innerHTML = `
                <tr>
                    <td colspan="5" class="px-6 py-10 text-center text-gray-400 font-semibold text-sm">
                        No se encontraron empresas bajo estos criterios de búsqueda.
                    </td>
                </tr>
            `;
            return;
        }

        filtered.forEach(comp => {
            let badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200";
            if (comp.status === 'Pendiente') {
                badgeStyle = "bg-amber-50 text-amber-700 border-amber-200";
            } else if (comp.status === 'Inactiva') {
                badgeStyle = "bg-red-50 text-red-700 border-red-200";
            }

            const initials = comp.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

            const row = document.createElement('tr');
            row.className = "hover:bg-gray-50/50 transition-colors group";
            row.innerHTML = `
                <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded bg-[#002080]/5 text-[#002080] flex items-center justify-center font-bold text-xs shrink-0 border border-gray-150">
                            ${initials}
                        </div>
                        <div>
                            <div class="font-bold text-gray-800 text-sm leading-tight">${comp.name}</div>
                            <div class="text-[10px] text-gray-400 mt-0.5">Rubro: ${comp.sector}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 text-xs font-semibold text-gray-700">${comp.rep}</td>
                <td class="px-6 py-4 text-xs text-gray-500">${comp.date}</td>
                <td class="px-6 py-4 text-center">
                    <span class="status-badge ${badgeStyle} border flex items-center gap-1">
                        <span class="w-1.5 h-1.5 rounded-full ${comp.status === 'Activa' ? 'bg-emerald-500' : (comp.status === 'Pendiente' ? 'bg-amber-500' : 'bg-red-500')}"></span>
                        ${comp.status}
                    </span>
                </td>
                <td class="px-6 py-4 text-right">
                    <button class="btn-admin-change-status text-gray-400 hover:text-primary transition-colors p-1.5 rounded-full hover:bg-gray-100" data-id="${comp.id}">
                        <span class="material-symbols-outlined text-base">edit</span>
                    </button>
                </td>
            `;

            adminElements.companiesTbody.appendChild(row);
        });

        // Eventos para cambiar estado de empresa
        document.querySelectorAll('.btn-admin-change-status').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const compId = parseInt(btn.getAttribute('data-id'));
                const comp = companies.find(c => c.id === compId);

                if (comp) {
                    activeAdminCompany = comp;

                    const rect = btn.getBoundingClientRect();
                    adminElements.popoverCompany.style.top = `${rect.bottom + window.scrollY + 6}px`;
                    adminElements.popoverCompany.style.left = `${rect.left - 160}px`;
                    adminElements.popoverCompany.classList.toggle('hidden');
                }
            });
        });
    }

    // Buscador en panel de empresas
    if (adminElements.searchCompanies) {
        adminElements.searchCompanies.addEventListener('input', renderAdminCompanies);
    }

    // Eventos de los filtros de estado (Tabs)
    if (adminElements.statusFilters) {
        adminElements.statusFilters.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                adminElements.statusFilters.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderAdminCompanies();
            });
        });
    }

    // POPOVER DE MODERACIÓN DE CONVENIOS (EMPRESA EN PANEL ADMIN)
    if (adminElements.popoverCompany) {
        adminElements.popoverCompany.querySelectorAll('[data-status]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const status = item.getAttribute('data-status');

                if (activeAdminCompany) {
                    activeAdminCompany.status = status;
                    showToast(`Convenio de ${activeAdminCompany.name} actualizado a: ${status}`);
                    adminElements.popoverCompany.classList.add('hidden');
                    renderAdminCompanies();
                }
            });
        });
    }

    document.addEventListener('click', () => {
        if (adminElements.popoverCompany) {
            adminElements.popoverCompany.classList.add('hidden');
        }
    });

    // MODAL REGISTRAR NUEVA EMPRESA
    if (adminElements.btnCreateCompany) {
        adminElements.btnCreateCompany.addEventListener('click', () => {
            if (adminElements.formCreateCompany) adminElements.formCreateCompany.reset();
            if (adminElements.modalCreateCompany) {
                adminElements.modalCreateCompany.style.display = 'flex';
                setTimeout(() => adminElements.modalCreateCompany.classList.remove('hidden'), 50);
            }
        });
    }

    function closeCreateCompanyModal() {
        if (adminElements.modalCreateCompany) {
            adminElements.modalCreateCompany.classList.add('hidden');
            setTimeout(() => adminElements.modalCreateCompany.style.display = 'none', 300);
        }
    }

    if (adminElements.btnCloseModalCompany) adminElements.btnCloseModalCompany.addEventListener('click', closeCreateCompanyModal);
    if (adminElements.btnCancelModalCompany) adminElements.btnCancelModalCompany.addEventListener('click', closeCreateCompanyModal);

    if (adminElements.btnSaveCompany) {
        adminElements.btnSaveCompany.addEventListener('click', (e) => {
            e.preventDefault();

            const name = document.getElementById('admin-comp-name').value.trim();
            const sector = document.getElementById('admin-comp-sector').value;
            const rep = document.getElementById('admin-comp-rep').value.trim();
            const dateVal = document.getElementById('admin-comp-date').value;
            const status = document.getElementById('admin-comp-status').value;

            if (!name || !rep || !dateVal) {
                showToast('Por favor, complete todos los campos requeridos.', true);
                return;
            }

            const newComp = {
                id: Date.now(),
                name: name,
                sector: sector,
                rep: rep,
                date: new Date(dateVal).toLocaleDateString('es-HN', { day: 'numeric', month: 'long', year: 'numeric' }),
                status: status
            };

            companies.unshift(newComp);
            closeCreateCompanyModal();
            showToast(`¡Empresa ${name} registrada con éxito!`);
            renderAdminCompanies();
        });
    }


    // === CONTROLADOR DE ACCESO DIRECTO (DEMO BTNS) ===
    demoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const role = btn.getAttribute('data-role') || btn.getAttribute('data-demo-role');

            if (mockCredentials[role]) {
                usernameInput.value = mockCredentials[role].user;
                passwordInput.value = mockCredentials[role].pass;

                setTimeout(() => {
                    form.dispatchEvent(new Event('submit'));
                }, 200);
            }
        });
    });

    // === ENVÍO DE FORMULARIO DE ACCESO (AUTODETECCIÓN Y ENRUTAMIENTO) ===
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const typedUser = usernameInput.value.trim().toLowerCase();
        const typedPass = passwordInput.value;

        // Auto-detectar rol
        if (typedUser.includes('unicah.edu')) {
            currentRole = 'estudiante';
        } else if (typedUser.includes('@')) {
            currentRole = 'empresa';
        } else {
            currentRole = 'administrador';
        }

        const creds = mockCredentials[currentRole];

        const originalBtnText = buttons.loginSubmit.value;
        buttons.loginSubmit.disabled = true;
        buttons.loginSubmit.value = 'Verificando...';

        setTimeout(() => {
            buttons.loginSubmit.disabled = false;
            buttons.loginSubmit.value = originalBtnText;

            if (typedUser && typedPass) {
                let displayUser = creds.name;
                let displayId = typedUser;
                let displayAvatar = creds.avatar;
                let displayRoleText = creds.roleName;

                // Portal General
                const homeUserName = document.getElementById('home-user-name');
                const homeUserAvatar = document.getElementById('home-user-avatar');
                if (homeUserName) homeUserName.textContent = displayUser;
                if (homeUserAvatar) {
                    homeUserAvatar.textContent = displayAvatar;
                }

                // Pantalla de éxito (Admin backup)
                successUserName.textContent = displayUser;
                successUserRole.textContent = displayRoleText;
                successUserId.textContent = displayId;
                successUserAvatar.textContent = displayAvatar;

                if (currentRole === 'estudiante') {
                    successUserAvatar.parentElement.className = 'w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-[#002080]';
                    successUserRole.className = 'text-xs font-semibold text-[#002080] tracking-wider uppercase';
                } else if (currentRole === 'empresa') {
                    successUserAvatar.parentElement.className = 'w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600';
                    successUserRole.className = 'text-xs font-semibold text-amber-600 tracking-wider uppercase';

                    const compProfileName = document.getElementById('company-profile-name');
                    if (compProfileName) compProfileName.textContent = displayUser;
                } else {
                    successUserAvatar.parentElement.className = 'w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600';
                    successUserRole.className = 'text-xs font-semibold text-red-600 tracking-wider uppercase';
                }

                showToast('Acceso autorizado');
                showScreen('home');
            } else {
                showToast('Por favor, complete todos los campos', true);
            }
        }, 1200);
    });
});
