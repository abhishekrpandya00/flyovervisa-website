const COUNTRY_DATA_URL = "assets/data/countries.json";
let countriesCache = null;

const COUNTRY_POSTER_PATHS = {
    australia: "assets/images/posters/country-australia.jpg",
    austria: "assets/images/posters/country-austria.jpg",
    belgium: "assets/images/posters/country-belgium.jpg",
    bulgaria: "assets/images/posters/country-bulgaria.jpg",
    canada: "assets/images/posters/country-canada.jpg",
    croatia: "assets/images/posters/country-croatia.jpg",
    czechia: "assets/images/posters/country-czechia.jpg",
    denmark: "assets/images/posters/country-denmark.jpg",
    estonia: "assets/images/posters/country-estonia.jpg",
    finland: "assets/images/posters/country-finland.jpg",
    france: "assets/images/posters/country-france.jpg",
    germany: "assets/images/posters/country-germany.jpg",
    greece: "assets/images/posters/country-greece.jpg",
    hungary: "assets/images/posters/country-hungary.jpg",
    iceland: "assets/images/posters/country-iceland.jpg",
    ireland: "assets/images/posters/country-ireland.jpg",
    italy: "assets/images/posters/country-italy.jpg",
    japan: "assets/images/posters/country-japan.jpg",
    latvia: "assets/images/posters/country-latvia.jpg",
    liechtenstein: "assets/images/posters/country-Liechtenstein.jpg",
    lithuania: "assets/images/posters/country-lithuania.jpg",
    luxembourg: "assets/images/posters/country-luxembourg.jpg",
    malta: "assets/images/posters/country-malta.jpg",
    netherlands: "assets/images/posters/country-netherlands.jpg",
    "new-zealand": "assets/images/posters/country-new-zealand.jpg",
    norway: "assets/images/posters/country-norway.jpg",
    poland: "assets/images/posters/country-poland.jpg",
    portugal: "assets/images/posters/country-portugal.jpg",
    romania: "assets/images/posters/country-romania.jpg",
    slovakia: "assets/images/posters/country-slovakia.jpg",
    slovenia: "assets/images/posters/country-slovenia.jpg",
    "south-korea": "assets/images/posters/country-south-korea.jpg",
    spain: "assets/images/posters/country-spain.jpg",
    sweden: "assets/images/posters/country-sweden.jpg",
    switzerland: "assets/images/posters/country-switzerland.jpg",
    uae: "assets/images/posters/country-uae.jpg",
    uk: "assets/images/posters/country-uk.jpg",
    usa: "assets/images/posters/country-usa.jpg",
};

const GUIDANCE_URL = "https://app.flyovervisa.com/FVP_Inquiry.html";

const COUNTRY_CARD_METADATA = {
    australia: { region: "Asia-Pacific", fields: ["Healthcare", "Engineering", "Business"] },
    austria: { region: "Europe", fields: ["Engineering", "Music & Arts", "Business"] },
    belgium: { region: "Europe", fields: ["Engineering", "Business", "Life Sciences"] },
    bulgaria: { region: "Europe", fields: ["Medicine", "Engineering", "Business"] },
    canada: { region: "North America", fields: ["Business", "Engineering", "Healthcare"] },
    croatia: { region: "Europe", fields: ["Tourism", "Engineering", "Business"] },
    czechia: { region: "Europe", fields: ["Engineering", "IT", "Business"] },
    denmark: { region: "Europe", fields: ["Engineering", "IT", "Sustainability"] },
    estonia: { region: "Europe", fields: ["IT", "Engineering", "Business"] },
    finland: { region: "Europe", fields: ["IT", "Engineering", "Business"] },
    france: { region: "Europe", fields: ["Business", "Engineering", "Luxury"] },
    germany: { region: "Europe", fields: ["Engineering", "IT", "Automotive"] },
    greece: { region: "Europe", fields: ["Shipping", "Tourism", "Business"] },
    hungary: { region: "Europe", fields: ["Medicine", "Engineering", "Business"] },
    iceland: { region: "Europe", fields: ["Renewable Energy", "Earth Sciences", "Engineering"] },
    ireland: { region: "Europe", fields: ["IT", "Business", "Pharma"] },
    italy: { region: "Europe", fields: ["Design", "Engineering", "Architecture"] },
    japan: { region: "Asia-Pacific", fields: ["Engineering", "Robotics", "Automotive"] },
    latvia: { region: "Europe", fields: ["IT", "Engineering", "Business"] },
    liechtenstein: { region: "Europe", fields: ["Finance", "Architecture", "Business"] },
    lithuania: { region: "Europe", fields: ["IT", "Engineering", "FinTech"] },
    luxembourg: { region: "Europe", fields: ["Finance", "Data & Tech", "Business"] },
    malta: { region: "Europe", fields: ["Tourism", "IT & Gaming", "Business"] },
    netherlands: { region: "Europe", fields: ["Engineering", "IT & AI", "Business"] },
    "new-zealand": { region: "Asia-Pacific", fields: ["Engineering", "IT", "Agriculture"] },
    norway: { region: "Europe", fields: ["Engineering", "Energy", "Sustainability"] },
    poland: { region: "Europe", fields: ["IT", "Engineering", "Medicine"] },
    portugal: { region: "Europe", fields: ["Business", "Technology", "Tourism"] },
    romania: { region: "Europe", fields: ["Engineering", "IT", "Medicine"] },
    slovakia: { region: "Europe", fields: ["Engineering", "Automotive", "IT"] },
    slovenia: { region: "Europe", fields: ["Engineering", "Sustainability", "Business"] },
    "south-korea": { region: "Asia-Pacific", fields: ["AI & IT", "Engineering", "Semiconductors"] },
    spain: { region: "Europe", fields: ["Business", "Engineering", "Tourism"] },
    sweden: { region: "Europe", fields: ["Engineering", "AI & Tech", "Sustainability"] },
    switzerland: { region: "Europe", fields: ["Engineering", "Finance", "Hospitality"] },
    uae: { region: "Middle East", fields: ["Business", "Aviation", "Hospitality"] },
    uk: { region: "Europe", fields: ["Business", "Engineering", "Healthcare"] },
    usa: { region: "North America", fields: ["Technology", "Business", "Engineering"] },
};

function applyCountryDefaults(country) {
    const name = country.name;
    const defaults = {
        heroTag: "Study, work and global mobility pathways",
        shortDescription: `${name} offers study, work and long-term mobility options for eligible international applicants.`,
        cardTagline: "Study, Work & Mobility",
        image: "assets/images/countries-map.jpg",
        theme: "from-[#10263d]/95 via-[#36536b]/85 to-[#a84940]/70",
        featured: false,
        overview: {
            capital: "See official guidance",
            language: "Varies by region and programme",
            currency: "See official guidance",
            population: "See official statistics",
            popularCities: "Major student cities",
            indianPopulation: "Indian student and professional community",
            indianEmbassy: "See official Indian mission information",
        },
        visaTypesLabel: "Key Visa / Residence Routes",
        visaTypes: ["Student route", "Visitor route", "Work route", "Family route, where applicable"],
        whyChoose: [
            "International education and career opportunities",
            "A choice of institutions and study pathways",
            "Multicultural student communities",
            "Work and long-term mobility options for eligible applicants",
        ],
        studentVisaRequirementsLabel: "Student Visa Requirements",
        studentVisaRequirements: [
            "Valid passport or travel document",
            "Admission or enrolment confirmation from an eligible institution",
            "Proof of financial capacity, where required",
            "Academic and language documents, where required",
            "Health insurance, biometrics or other documents, where applicable",
        ],
        topUniversities: ["Leading universities and specialist institutions"],
        tuitionFees: ["Tuition varies by institution, programme and applicant category", "Check the provider's official fee schedule before applying"],
        scholarships: ["Funding opportunities vary by institution, programme and applicant profile. Check eligibility and deadlines early."],
        scholarshipHighlights: [
            { title: "University Awards", description: "Merit-based and programme-specific scholarships may be available." },
            { title: "Government Funding", description: "Eligible applicants may find national or regional scholarship schemes." },
            { title: "Research Funding", description: "Graduate and research students may find assistantships or stipends." },
            { title: "External Scholarships", description: "Foundations and other organisations may offer funding opportunities." },
        ],
        scholarshipNote: "Scholarships are competitive. Confirm eligibility, application steps and deadlines directly with the funding provider.",
        costOfLiving: {
            summary: "Living costs vary by city, accommodation and lifestyle",
            items: ["Accommodation", "Food and groceries", "Transport", "Personal expenses"],
        },
        fundsToShowLabel: "Funds to Show",
        fundsToShow: {
            summary: "Financial requirements vary by route and can change",
            proof: ["Tuition or course fees, where applicable", "Living costs", "Travel and health-insurance costs, where applicable", "Official financial evidence required for the application"],
        },
        partTimeJobLabel: "Part-Time Work",
        partTimeJob: {
            summary: "Eligible students may work subject to immigration and course conditions",
            items: ["Work permission and limits depend on the applicable rules", "Check the conditions attached to your visa or residence permit"],
        },
        postStudyWorkLabel: "Post-Study Work",
        postStudyWork: {
            summary: "Post-study work options may be available for eligible graduates",
            items: ["Eligibility and duration depend on the programme, route and current rules", "Confirm your options with the relevant immigration authority before applying"],
        },
        permanentResidencyLabel: "Long-Term Residence Pathways",
        permanentResidency: {
            summary: "Long-term residence options depend on the applicant's profile and current immigration rules",
            items: ["Work experience, language ability and other eligibility requirements may apply", "A study route does not guarantee permanent residence"],
        },
    };

    return {
        ...defaults,
        ...country,
        image: COUNTRY_POSTER_PATHS[country.slug] || country.image || defaults.image,
        cardTagline: country.cardTagline === "Content coming soon" ? defaults.cardTagline : country.cardTagline,
        popularFields: country.popularFields || COUNTRY_CARD_METADATA[country.slug]?.fields || [],
        region: country.region || COUNTRY_CARD_METADATA[country.slug]?.region || "Other",
        overview: { ...defaults.overview, ...country.overview },
        costOfLiving: { ...defaults.costOfLiving, ...country.costOfLiving },
        fundsToShow: { ...defaults.fundsToShow, ...country.fundsToShow },
        partTimeJob: { ...defaults.partTimeJob, ...country.partTimeJob },
        postStudyWork: { ...defaults.postStudyWork, ...country.postStudyWork },
        permanentResidency: { ...defaults.permanentResidency, ...country.permanentResidency },
    };
}

async function loadComponent(selector, url, templateId) {
    const target = document.querySelector(selector);
    if (!target) return;

    if (window.location.protocol !== "file:" && url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${url}`);
            }

            target.innerHTML = await response.text();
            return;
        } catch (error) {
            console.warn(error);
        }
    }

    const template = templateId ? document.querySelector(templateId) : null;
    if (template) {
        target.innerHTML = template.innerHTML;
    }
}

function initActiveNav() {
    const currentPage = document.body.dataset.page;
    if (!currentPage) return;

    document.querySelectorAll("[data-nav]").forEach((link) => {
        const isActive = link.dataset.nav === currentPage;
        link.classList.toggle("text-secondary", isActive);
        link.classList.toggle("border-b-2", isActive);
        link.classList.toggle("border-secondary", isActive);
        link.classList.toggle("pb-1", isActive);
        link.classList.toggle("text-on-surface-variant", !isActive);
    });
}

function initNavScrollSpy() {
    if (document.body.dataset.page !== "home") return;

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a[href^='index.html#'], nav a[href^='#']");

    if (!sections.length || !navLinks.length) return;

    const setActive = (id) => {
        navLinks.forEach((link) => {
            const href = link.getAttribute("href") || "";
            const matches = href.endsWith(`#${id}`) || href === `#${id}`;
            const isHomeLink = link.dataset.nav === "home" && id === "home";

            if (matches || isHomeLink) {
                link.classList.add("text-secondary", "border-b-2", "border-secondary", "pb-1");
                link.classList.remove("text-on-surface-variant");
            } else if (link.dataset.nav !== "countries") {
                link.classList.remove("text-secondary", "border-b-2", "border-secondary", "pb-1");
                link.classList.add("text-on-surface-variant");
            }
        });
    };

    window.addEventListener("scroll", () => {
        let current = "home";

        sections.forEach((section) => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.id;
            }
        });

        setActive(current);
    });
}

function initCopyrightYear() {
    document.querySelectorAll("[data-current-year]").forEach((element) => {
        element.textContent = new Date().getFullYear();
    });
}

async function getCountries() {
    if (countriesCache) {
        return countriesCache;
    }

    const response = await fetch(COUNTRY_DATA_URL);
    if (!response.ok) {
        throw new Error("Unable to load countries data.");
    }

    countriesCache = (await response.json()).map(applyCountryDefaults);
    return countriesCache;
}

function createCountryCard(country, options = {}) {
    const { compact = false } = options;
    const card = document.createElement("a");
    const baseClasses = compact
        ? "country-card group relative block aspect-[4/5] overflow-hidden rounded-2xl"
        : "country-card group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface shadow-xl";

    card.className = baseClasses;
    card.href = `country.html?slug=${encodeURIComponent(country.slug)}`;
    card.setAttribute("aria-label", `${country.name} destination details`);

    const copyClasses = compact
        ? "absolute bottom-0 left-0 w-full p-8 translate-y-4 transform transition-transform group-hover:translate-y-0"
        : "absolute bottom-0 left-0 w-full p-6 md:p-8";

    card.innerHTML = `
        <div class="absolute inset-0 bg-cover bg-center bg-slate-700 transition-transform duration-700 group-hover:scale-110" data-country-poster data-image="${country.image}" style="background-position: ${country.imagePosition || "center"}"></div>
        <div class="absolute inset-0 bg-gradient-to-t opacity-80 ${country.theme}"></div>
        <div class="${copyClasses}">
            <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-label-sm font-semibold uppercase tracking-[0.18em] text-white/80">
                <span class="material-symbols-outlined text-[16px]">public</span>
                ${country.featured ? "Featured" : "Destination"}
            </div>
            <h3 class="font-headline-md text-headline-md text-white">${country.name}</h3>
            ${createPopularFieldsMarkup(country)}
            <span class="mt-6 inline-flex items-center gap-2 font-label-md text-label-md font-bold text-white">
                Explore Country
                <span class="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
            </span>
        </div>
    `;

    return card;
}

function createPopularFieldsMarkup(country) {
    if (!country.popularFields.length) {
        return `<p class="mt-2 max-w-sm font-body-md text-body-md text-white/80">${country.cardTagline}</p>`;
    }

    return `
        <div class="mt-3">
            <p class="font-label-sm text-label-sm font-bold uppercase tracking-[0.14em] text-white/70">Popular for</p>
            <div class="mt-2 flex flex-wrap gap-2">
                ${country.popularFields.map((field) => `<span class="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 font-label-sm text-label-sm text-white">${field}</span>`).join("")}
            </div>
        </div>
    `;
}

let countryPosterObserver = null;

function loadCountryPoster(poster) {
    if (poster.dataset.posterLoaded || !poster.dataset.image) return;
    poster.style.backgroundImage = `url('${poster.dataset.image}')`;
    poster.dataset.posterLoaded = "true";
}

function initialiseCountryPosterLoading(container = document) {
    const posters = container.querySelectorAll("[data-country-poster]");
    if (!posters.length) return;

    if (!("IntersectionObserver" in window)) {
        posters.forEach(loadCountryPoster);
        return;
    }

    if (!countryPosterObserver) {
        countryPosterObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                loadCountryPoster(entry.target);
                countryPosterObserver.unobserve(entry.target);
            });
        }, { rootMargin: "400px 0px" });
    }

    posters.forEach((poster) => countryPosterObserver.observe(poster));
}

// Curated homepage selection. Keep this to a small, deliberate list (not the
// full catalogue) so the homepage stays conversion-focused; the full set of
// countries lives on countries.html. Revisit this list once real enquiry /
// application data can drive the choice instead of general popularity.
const HOME_FEATURED_SLUGS = ["canada", "australia", "uk", "usa", "germany", "france"];

function createFeaturedCountryCard(country) {
    const card = document.createElement("a");
    card.className = "country-card group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface shadow-xl";
    card.href = `country.html?slug=${encodeURIComponent(country.slug)}`;
    card.setAttribute("aria-label", `Study in ${country.name}`);

    card.innerHTML = `
        <div class="absolute inset-0 bg-cover bg-center bg-slate-700 transition-transform duration-700 group-hover:scale-110" data-country-poster data-image="${country.image}" style="background-position: ${country.imagePosition || "center"}"></div>
        <div class="absolute inset-0 bg-gradient-to-t opacity-80 ${country.theme}"></div>
        <div class="absolute bottom-0 left-0 w-full p-6 md:p-8">
            <h3 class="font-headline-lg text-headline-lg text-white">${country.name}</h3>
            ${createPopularFieldsMarkup(country)}
            <span class="mt-6 inline-flex items-center gap-2 font-label-md text-label-md font-bold text-white">
                Explore ${country.name}
                <span class="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
            </span>
        </div>
    `;

    return card;
}

function renderHomeCountries(countries) {
    const container = document.querySelector("[data-home-countries-grid]");
    if (!container) return;

    container.innerHTML = "";

    const featured = HOME_FEATURED_SLUGS
        .map((slug) => countries.find((country) => country.slug === slug))
        .filter(Boolean);

    featured.forEach((country) => {
        container.appendChild(createFeaturedCountryCard(country));
    });
    initialiseCountryPosterLoading(container);
}

function renderCountriesPage(countries) {
    const grid = document.querySelector("[data-countries-grid]");
    const featuredContainer = document.querySelector("[data-featured-country]");
    if (!grid) return;

    const search = document.querySelector("[data-country-search]");
    const resultCount = document.querySelector("[data-country-result-count]");
    const filters = document.querySelectorAll("[data-country-filter]");
    let selectedRegion = "All";

    const renderGrid = () => {
        const query = (search?.value || "").trim().toLowerCase();
        const matches = countries.filter((country) => {
            const searchableText = [country.name, country.region, ...country.popularFields].join(" ").toLowerCase();
            return (selectedRegion === "All" || country.region === selectedRegion) && searchableText.includes(query);
        });

        grid.innerHTML = "";
        matches.forEach((country) => grid.appendChild(createCountryCard(country)));
        initialiseCountryPosterLoading(grid);
        if (resultCount) {
            resultCount.textContent = `${matches.length} destination${matches.length === 1 ? "" : "s"} found`;
        }
    };

    search?.addEventListener("input", renderGrid);
    filters.forEach((filter) => {
        filter.addEventListener("click", () => {
            selectedRegion = filter.dataset.countryFilter || "All";
            filters.forEach((item) => {
                const isActive = item === filter;
                item.classList.toggle("bg-secondary", isActive);
                item.classList.toggle("text-on-secondary", isActive);
                item.classList.toggle("border-secondary", isActive);
                item.classList.toggle("bg-surface-container-lowest", !isActive);
                item.classList.toggle("text-on-surface", !isActive);
                item.classList.toggle("border-outline-variant", !isActive);
            });
            renderGrid();
        });
    });

    renderGrid();

    if (featuredContainer && countries.length) {
        const spotlight = countries.find((country) => country.featured) || countries[0];
        featuredContainer.innerHTML = `
            <div class="relative overflow-hidden rounded-[2rem] border border-outline-variant bg-on-surface text-white shadow-2xl">
                <div class="absolute inset-0 bg-cover bg-center opacity-30" style="background-image: url('${spotlight.image}'); background-position: ${spotlight.imagePosition || "center"}"></div>
                <div class="absolute inset-0 bg-gradient-to-br ${spotlight.theme}"></div>
                <div class="relative grid gap-8 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12">
                    <div class="space-y-5">
                        <span class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-label-sm text-label-sm uppercase tracking-[0.2em] text-white/80">
                            <span class="material-symbols-outlined text-[16px]">star</span>
                            Country Spotlight
                        </span>
                        <h2 class="font-headline-lg text-headline-lg md:text-[40px] md:leading-[48px]">${spotlight.name}</h2>
                        <p class="max-w-2xl font-body-lg text-body-lg text-white/80">${spotlight.shortDescription}</p>
                        <a class="inline-flex items-center gap-3 rounded-full bg-secondary px-8 py-4 font-label-md text-label-md font-bold text-on-secondary transition-all hover:-translate-y-0.5 hover:shadow-xl" href="country.html?slug=${encodeURIComponent(spotlight.slug)}">
                            View ${spotlight.name} Guide
                            <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
                        </a>
                    </div>
                    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
                        <div class="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                            <p class="font-label-sm text-label-sm uppercase tracking-[0.16em] text-white/60">${spotlight.visaTypesLabel || "Visa Types"}</p>
                            <p class="mt-3 font-body-md text-body-md text-white">${spotlight.visaTypes.join(", ")}</p>
                            ${spotlight.visaTypesNote ? `<p class="mt-2 font-body-md text-body-md text-white/70">${spotlight.visaTypesNote}</p>` : ""}
                        </div>
                        <div class="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                            <p class="font-label-sm text-label-sm uppercase tracking-[0.16em] text-white/60">Popular Cities</p>
                            <p class="mt-3 font-body-md text-body-md text-white">${spotlight.overview.popularCities}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function createListMarkup(items) {
    return items.map((item) => `<li class="flex gap-3"><span class="mt-1 text-secondary material-symbols-outlined text-[18px]">check_circle</span><span>${item}</span></li>`).join("");
}

function createOverviewMarkup(overview) {
    const facts = [
        ["Capital", overview.capital],
        ["Language", overview.language],
        ["Currency", overview.currency],
        ["Population", overview.population],
        ["Popular Cities", overview.popularCities],
        ["Indian Community", overview.indianPopulation],
        ["Indian Embassy", overview.indianEmbassy],
    ];

    if (overview.studentLife) facts.push(["Student Life", overview.studentLife]);
    if (overview.education) facts.push(["Education", overview.education]);

    return facts.map(([label, value]) => `
        <div class="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
            <p class="font-label-sm text-label-sm uppercase tracking-[0.14em] text-on-surface-variant">${label}</p>
            <p class="mt-3 font-body-md text-body-md text-on-surface">${value}</p>
        </div>
    `).join("");
}

function getStudyFieldCategory(field) {
    const value = field.toLowerCase();

    if (/(medicine|health|dentistry|pharma|life sciences)/.test(value)) return "health";
    if (/(engineering|automotive|aviation)/.test(value)) return "engineering";
    if (/(technology|\bit\b|artificial intelligence|\bai\b|computer|cyber|robotics|semiconductors|data)/.test(value)) return "technology";
    if (/(business|finance|fintech|economics|management|international relations|logistics|shipping)/.test(value)) return "business";
    if (/(sustainability|renewable|energy|environment|agriculture|marine|earth sciences)/.test(value)) return "sustainability";
    if (/(tourism|hospitality)/.test(value)) return "hospitality";
    if (/(design|architecture|music|arts|luxury|fashion)/.test(value)) return "creative";

    return value;
}

function getFieldMatchScore(field, candidateFields) {
    const target = field.toLowerCase();
    const targetCategory = getStudyFieldCategory(field);

    return candidateFields.reduce((bestScore, candidateField) => {
        const candidate = candidateField.toLowerCase();
        if (candidate === target) return Math.max(bestScore, 3);
        if (getStudyFieldCategory(candidateField) === targetCategory) return Math.max(bestScore, 2);
        return bestScore;
    }, 0);
}

function getFieldRelatedCountries(country, countries) {
    return country.popularFields.slice(0, 3).map((field) => {
        const ranked = countries
            .filter((item) => item.slug !== country.slug)
            .map((item) => ({ item, score: getFieldMatchScore(field, item.popularFields) }))
            .filter(({ score }) => score > 0)
            .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name));

        return {
            field,
            countries: ranked.slice(0, 3).map(({ item }) => item),
        };
    });
}

function createFieldRelatedCard(country, field) {
    return `
        <a class="group relative block aspect-[4/5] overflow-hidden rounded-2xl" href="country.html?slug=${encodeURIComponent(country.slug)}">
            <div class="absolute inset-0 bg-cover bg-center bg-slate-700 transition-transform duration-700 group-hover:scale-110" data-country-poster data-image="${country.image}" style="background-position: ${country.imagePosition || "center"}"></div>
            <div class="absolute inset-0 bg-gradient-to-t ${country.theme}"></div>
            <div class="absolute bottom-0 left-0 w-full p-6">
                <p class="font-label-sm text-label-sm font-bold uppercase tracking-[0.14em] text-white/70">Explore for ${field}</p>
                <h3 class="mt-2 font-headline-md text-headline-md text-white">${country.name}</h3>
                <div class="mt-3 flex flex-wrap gap-1.5">
                    ${country.popularFields.map((item) => `<span class="rounded-full border border-white/20 bg-white/10 px-2 py-1 font-label-sm text-label-sm text-white">${item}</span>`).join("")}
                </div>
            </div>
        </a>
    `;
}

function renderCountryDetail(country, countries) {
    const page = document.querySelector("[data-country-detail]");
    if (!page) return;

    document.title = `${country.name} | Flyover Visa Peak`;

    const relatedCountries = getFieldRelatedCountries(country, countries)
        .map(({ field, countries: matches }) => `
            <div>
                <div class="mb-5 flex items-center gap-3">
                    <span class="h-px flex-1 bg-white/15"></span>
                    <h3 class="font-headline-md text-headline-md text-white">More options for ${field}</h3>
                    <span class="h-px flex-1 bg-white/15"></span>
                </div>
                <div class="grid gap-6 md:grid-cols-3">
                    ${matches.map((item) => createFieldRelatedCard(item, field)).join("")}
                </div>
            </div>
        `).join("<div class=\"h-px bg-white/10\"></div>");

    const scholarshipIntro = Array.isArray(country.scholarships)
        ? country.scholarships[0]
        : country.scholarships;

    const scholarshipContent = country.scholarshipHighlights
        ? `
            <p class="font-body-md text-body-md leading-relaxed text-on-surface-variant">${scholarshipIntro}</p>
            <div class="mt-7 grid gap-4 sm:grid-cols-2">
                ${country.scholarshipHighlights.map((item) => `
                    <article class="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                        <span class="material-symbols-outlined text-[22px] text-secondary">workspace_premium</span>
                        <h3 class="mt-3 font-label-md text-label-md font-bold text-on-surface">${item.title}</h3>
                        <p class="mt-2 font-body-md text-body-md leading-relaxed text-on-surface-variant">${item.description}</p>
                    </article>
                `).join("")}
            </div>
            <div class="mt-6 flex gap-3 rounded-2xl border border-secondary/20 bg-secondary/5 p-4 text-on-surface-variant">
                <span class="material-symbols-outlined shrink-0 text-[20px] text-secondary">info</span>
                <p class="font-body-md text-body-md leading-relaxed">${country.scholarshipNote}</p>
            </div>
        `
        : `<div class="space-y-5 font-body-md text-body-md leading-relaxed text-on-surface-variant">${country.scholarships.map((paragraph) => `<p>${paragraph}</p>`).join("")}</div>`;

    const bestFieldsContent = country.bestFields?.length
        ? `
            <section class="bg-surface-container-low py-section-padding-mobile md:py-section-padding-desktop">
                <div class="mx-auto max-w-max-width px-gutter">
                    <div class="mb-10 max-w-3xl space-y-4">
                        <span class="font-label-md text-label-md uppercase tracking-[0.18em] text-secondary">Academic Strengths</span>
                        <h2 class="font-headline-lg text-headline-lg text-on-surface">Best fields to study in ${country.name}</h2>
                    </div>
                    <div class="grid gap-5 md:grid-cols-2">
                        ${country.bestFields.map((field) => `
                            <article class="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-7 shadow-lg">
                                <span class="material-symbols-outlined text-[24px] text-secondary">school</span>
                                <h3 class="mt-4 font-headline-md text-headline-md text-on-surface">${field.title}</h3>
                                <p class="mt-3 font-body-md text-body-md leading-relaxed text-on-surface-variant">${field.description}</p>
                            </article>
                        `).join("")}
                    </div>
                </div>
            </section>
        `
        : "";

    const studyStepsContent = country.studySteps?.length
        ? `
            <section class="bg-surface py-section-padding-mobile md:py-section-padding-desktop">
                <div class="mx-auto max-w-max-width px-gutter">
                    <div class="mb-10 max-w-3xl space-y-4">
                        <span class="font-label-md text-label-md uppercase tracking-[0.18em] text-secondary">Application Journey</span>
                        <h2 class="font-headline-lg text-headline-lg text-on-surface">How to study in ${country.name}</h2>
                    </div>
                    <ol class="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                        ${country.studySteps.map((step, index) => `
                            <li class="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                                <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary font-label-md text-label-md font-bold text-on-secondary">${String(index + 1).padStart(2, "0")}</span>
                                <h3 class="mt-5 font-label-md text-label-md font-bold text-on-surface">${step.title}</h3>
                                <p class="mt-3 font-body-md text-body-md leading-relaxed text-on-surface-variant">${step.description}</p>
                            </li>
                        `).join("")}
                    </ol>
                </div>
            </section>
        `
        : "";

    page.innerHTML = `
        <section class="relative overflow-hidden bg-on-surface pt-14 text-white">
            <div class="absolute inset-0 bg-cover bg-center opacity-25" style="background-image: url('${country.image}'); background-position: ${country.imagePosition || "center"}"></div>
            <div class="absolute inset-0 bg-gradient-to-br ${country.theme}"></div>
            <div class="relative mx-auto max-w-max-width px-gutter py-20 md:py-28">
                <div class="max-w-3xl space-y-6">
                    <div class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 font-label-sm text-label-sm uppercase tracking-[0.18em] text-white/80">
                        <span class="material-symbols-outlined text-[16px]">map</span>
                        ${country.heroTag}
                    </div>
                    <div class="flex flex-wrap items-center gap-3 text-label-sm text-white/70">
                        <a class="hover:text-white" href="index.html">Home</a>
                        <span>/</span>
                        <a class="hover:text-white" href="countries.html">Study Destinations</a>
                        <span>/</span>
                        <span class="text-white">${country.name}</span>
                    </div>
                    <h1 class="font-display-lg text-display-lg">${country.name}</h1>
                    <p class="max-w-2xl font-body-lg text-body-lg text-white/80">${country.shortDescription}</p>
                    <div class="flex flex-wrap gap-4 pt-4">
                        <a class="rounded-full bg-secondary px-8 py-4 font-label-md text-label-md font-bold text-on-secondary shadow-xl transition-all hover:-translate-y-0.5" href="${GUIDANCE_URL}" target="_blank" rel="noopener noreferrer">Get Free Guidance</a>
                        <a class="rounded-full border border-white/20 px-8 py-4 font-label-md text-label-md font-bold text-white transition-all hover:bg-white/10" href="#country-overview">Explore Overview</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-surface-container-lowest py-section-padding-mobile md:py-section-padding-desktop" id="country-overview">
            <div class="mx-auto max-w-max-width px-gutter">
                <div class="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div class="space-y-4">
                        <span class="font-label-md text-label-md uppercase tracking-[0.18em] text-secondary">Overview</span>
                        <h2 class="font-headline-lg text-headline-lg text-on-surface">Quick facts for ${country.name}</h2>
                    </div>
                    <div class="rounded-2xl bg-surface-container-low px-5 py-4 text-on-surface-variant">
                        <span class="font-label-sm text-label-sm uppercase tracking-[0.16em]">${country.visaTypesLabel || "Visa Types"}</span>
                        <p class="mt-2 font-body-md text-body-md text-on-surface">${country.visaTypes.join(", ")}</p>
                        ${country.visaTypesNote ? `<p class="mt-2 font-body-md text-body-md text-on-surface-variant">${country.visaTypesNote}</p>` : ""}
                    </div>
                </div>
                <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    ${createOverviewMarkup(country.overview)}
                </div>
            </div>
        </section>

        <section class="bg-surface py-section-padding-mobile md:py-section-padding-desktop">
            <div class="mx-auto grid max-w-max-width gap-8 px-gutter lg:grid-cols-[0.95fr_1.05fr]">
                <div class="rounded-[2rem] border border-outline-variant bg-surface-container-low p-8">
                    <span class="font-label-md text-label-md uppercase tracking-[0.18em] text-secondary">Why Choose ${country.name}</span>
                    <h2 class="mt-4 font-headline-lg text-headline-lg text-on-surface">Built for ambitious students and families</h2>
                    <ul class="mt-8 space-y-4 font-body-md text-body-md text-on-surface-variant">
                        ${createListMarkup(country.whyChoose)}
                    </ul>
                </div>
                <div class="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-8 shadow-lg">
                    <span class="font-label-md text-label-md uppercase tracking-[0.18em] text-secondary">${country.studentVisaRequirementsLabel || "Student Visa Requirements"}</span>
                    <ul class="mt-8 grid gap-4 font-body-md text-body-md text-on-surface-variant sm:grid-cols-2">
                        ${createListMarkup(country.studentVisaRequirements)}
                    </ul>
                </div>
            </div>
        </section>

        ${bestFieldsContent}

        <section class="bg-surface-container-low py-section-padding-mobile md:py-section-padding-desktop">
            <div class="mx-auto max-w-max-width px-gutter">
                <div class="grid gap-8 lg:grid-cols-2">
                    <div class="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-8 shadow-lg">
                        <span class="font-label-md text-label-md uppercase tracking-[0.18em] text-secondary">Top Universities</span>
                        <ul class="mt-8 space-y-4 font-body-md text-body-md text-on-surface-variant">
                            ${createListMarkup(country.topUniversities)}
                        </ul>
                    </div>
                    <div class="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-8 shadow-lg">
                        <span class="font-label-md text-label-md uppercase tracking-[0.18em] text-secondary">Cost of Studying</span>
                        <ul class="mt-8 space-y-4 font-body-md text-body-md text-on-surface-variant">
                            ${createListMarkup(country.tuitionFees)}
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        ${studyStepsContent}

        <section class="bg-surface-container-lowest py-section-padding-mobile md:py-section-padding-desktop">
            <div class="mx-auto max-w-max-width px-gutter">
                <div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div class="rounded-[2rem] border border-outline-variant bg-surface-container-low p-8">
                        <span class="font-label-md text-label-md uppercase tracking-[0.18em] text-secondary">Scholarships</span>
                        <div class="mt-8">${scholarshipContent}</div>
                    </div>
                    <div class="grid gap-6">
                        <div class="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-8 shadow-lg">
                            <span class="font-label-md text-label-md uppercase tracking-[0.18em] text-secondary">Cost of Living</span>
                            <p class="mt-4 font-headline-md text-headline-md text-on-surface">${country.costOfLiving.summary}</p>
                            <ul class="mt-6 space-y-4 font-body-md text-body-md text-on-surface-variant">
                                ${createListMarkup(country.costOfLiving.items)}
                            </ul>
                        </div>
                        <div class="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-8 shadow-lg">
                            <span class="font-label-md text-label-md uppercase tracking-[0.18em] text-secondary">${country.fundsToShowLabel || "Funds to Show"}</span>
                            <p class="mt-4 font-headline-md text-headline-md text-on-surface">${country.fundsToShow.summary}</p>
                            <ul class="mt-6 space-y-4 font-body-md text-body-md text-on-surface-variant">
                                ${createListMarkup(country.fundsToShow.proof)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-surface py-section-padding-mobile md:py-section-padding-desktop">
            <div class="mx-auto max-w-max-width px-gutter">
                <div class="grid gap-8 lg:grid-cols-3">
                    <div class="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-8 shadow-lg">
                        <span class="font-label-md text-label-md uppercase tracking-[0.18em] text-secondary">${country.partTimeJobLabel || "Part-Time Job Earnings"}</span>
                        <p class="mt-4 font-headline-md text-headline-md text-on-surface">${country.partTimeJob.summary}</p>
                        <ul class="mt-6 space-y-4 font-body-md text-body-md text-on-surface-variant">
                            ${createListMarkup(country.partTimeJob.items)}
                        </ul>
                    </div>
                    <div class="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-8 shadow-lg">
                        <span class="font-label-md text-label-md uppercase tracking-[0.18em] text-secondary">${country.postStudyWorkLabel || "Post Study Work"}</span>
                        <p class="mt-4 font-headline-md text-headline-md text-on-surface">${country.postStudyWork.summary}</p>
                        <ul class="mt-6 space-y-4 font-body-md text-body-md text-on-surface-variant">
                            ${createListMarkup(country.postStudyWork.items)}
                        </ul>
                    </div>
                    <div class="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-8 shadow-lg">
                        <span class="font-label-md text-label-md uppercase tracking-[0.18em] text-secondary">${country.permanentResidencyLabel || "Permanent Residency"}</span>
                        <p class="mt-4 font-headline-md text-headline-md text-on-surface">${country.permanentResidency.summary}</p>
                        <ul class="mt-6 space-y-4 font-body-md text-body-md text-on-surface-variant">
                            ${createListMarkup(country.permanentResidency.items)}
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-on-surface py-section-padding-mobile text-white md:py-section-padding-desktop">
            <div class="mx-auto max-w-max-width px-gutter">
                <div class="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div class="space-y-4">
                        <span class="font-label-md text-label-md uppercase tracking-[0.18em] text-secondary">Explore More</span>
                        <h2 class="font-headline-lg text-headline-lg">Other destinations you can compare</h2>
                    </div>
                    <a class="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-label-md text-label-md hover:border-secondary hover:bg-secondary" href="countries.html">
                        View All Countries
                        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </a>
                </div>
                <div class="space-y-12">
                    ${relatedCountries}
                </div>
            </div>
        </section>
    `;

    initialiseCountryPosterLoading(page);
}

function renderCountryNotFound() {
    const page = document.querySelector("[data-country-detail]");
    if (!page) return;

    page.innerHTML = `
        <section class="bg-surface-container-lowest py-section-padding-desktop">
            <div class="mx-auto max-w-max-width px-gutter text-center">
                <div class="mx-auto max-w-2xl rounded-[2rem] border border-outline-variant bg-surface p-10 shadow-lg">
                    <span class="material-symbols-outlined text-[48px] text-secondary">travel_explore</span>
                    <h1 class="mt-6 font-headline-lg text-headline-lg text-on-surface">Country guide not found</h1>
                    <p class="mt-4 font-body-md text-body-md text-on-surface-variant">The country you requested is not available yet. You can still browse all available destination guides.</p>
                    <a class="mt-8 inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 font-label-md text-label-md font-bold text-on-secondary" href="countries.html">
                        Browse All Countries
                        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </a>
                </div>
            </div>
        </section>
    `;
}

function populateCountriesMenus(countries) {
    document.querySelectorAll("[data-countries-menu-list]").forEach((list) => {
        list.innerHTML = countries
            .map(
                (country) => `
                    <a class="truncate rounded-md px-2 py-1.5 font-body-sm text-body-sm text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary" href="country.html?slug=${encodeURIComponent(country.slug)}">${country.name}</a>
                `
            )
            .join("");
    });
}

async function initCountryExperiences() {
    const countries = await getCountries();

    renderHomeCountries(countries);
    renderCountriesPage(countries);
    populateCountriesMenus(countries);

    if (document.querySelector("[data-country-detail]")) {
        const params = new URLSearchParams(window.location.search);
        const slug = params.get("slug");
        const match = countries.find((country) => country.slug === slug);

        if (match) {
            renderCountryDetail(match, countries);
        } else {
            renderCountryNotFound();
        }
    }
}

const SCHOLARSHIP_DATA_URL = "assets/data/scholarships.json";

function escapeScholarshipText(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

const SCHOLARSHIP_COUNTRY_FLAGS = {
    Australia: "🇦🇺",
    USA: "🇺🇸",
    UK: "🇬🇧",
    Italy: "🇮🇹",
    Canada: "🇨🇦",
    Germany: "🇩🇪",
    "All destinations": "🌍",
};

function scholarshipTiming(record, now = new Date()) {
    const opensAt = record.opens_at ? new Date(record.opens_at) : null;
    const deadlineAt = record.deadline_at ? new Date(record.deadline_at) : null;
    const validOpensAt = opensAt && !Number.isNaN(opensAt.getTime()) ? opensAt : null;
    const validDeadlineAt = deadlineAt && !Number.isNaN(deadlineAt.getTime()) ? deadlineAt : null;

    if (validDeadlineAt && now > validDeadlineAt) {
        return { label: "Closed", tone: "closed", key: "Closed", timing: "Deadline passed" };
    }
    if (validOpensAt && now < validOpensAt) {
        const days = Math.max(1, Math.ceil((validOpensAt - now) / 86400000));
        return { label: "Upcoming", tone: "upcoming", key: "Upcoming", timing: `Opens in ${days} ${days === 1 ? "day" : "days"}` };
    }
    if (validDeadlineAt) {
        const days = Math.max(0, Math.ceil((validDeadlineAt - now) / 86400000));
        return { label: "Open now", tone: "open", key: "Open", timing: days === 0 ? "Closes today" : `${days} ${days === 1 ? "day" : "days"} left` };
    }

    const value = record.status.toLowerCase();
    if (value.includes("open")) return { label: "Open now", tone: "open", key: "Open" };
    if (value.includes("upcoming")) return { label: "Upcoming", tone: "upcoming", key: "Upcoming" };
    if (value.includes("closed")) return { label: "Closed", tone: "closed", key: "Closed" };
    return { label: "Active / recurring", tone: "active", key: "Active" };
}

function scholarshipCard(record) {
    const status = scholarshipTiming(record);
    const amount = escapeScholarshipText(record.award_summary);
    const flag = SCHOLARSHIP_COUNTRY_FLAGS[record.country] || "🎓";
    return `
        <article class="scholarship-card rounded-[1.5rem] border border-outline-variant bg-white p-6 md:p-7">
            <div class="flex items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <span class="scholarship-country-mark" aria-hidden="true">${flag}</span>
                    <div>
                        <p class="font-label-sm text-label-sm font-bold uppercase tracking-[.14em] text-primary">${escapeScholarshipText(record.country)}</p>
                        <p class="mt-1 font-label-sm text-label-sm text-on-surface-variant">${escapeScholarshipText(record.provider)}</p>
                    </div>
                </div>
                <span class="scholarship-status scholarship-status--${status.tone}">${status.label}</span>
            </div>
            <h2 class="mt-5 font-headline-md text-headline-md text-on-surface">${escapeScholarshipText(record.name)}</h2>
            <div class="mt-4 flex flex-wrap gap-2">
                <span class="scholarship-tag">${escapeScholarshipText(record.study_level)}</span>
                <span class="scholarship-tag">${escapeScholarshipText(record.funding_type)}</span>
                <span class="scholarship-tag">${escapeScholarshipText(record.competitiveness)}</span>
            </div>
            <div class="mt-5 rounded-xl bg-surface-container-low p-4">
                <p class="font-label-sm text-label-sm font-bold uppercase tracking-[.12em] text-on-surface-variant">What it covers</p>
                <p class="mt-2 font-body-md text-body-md text-on-surface">${amount}</p>
            </div>
            <details class="scholarship-details mt-5">
                <summary class="flex cursor-pointer list-none items-center justify-between font-label-md text-label-md font-bold text-primary">
                    Requirements &amp; eligibility
                    <span class="material-symbols-outlined transition-transform">expand_more</span>
                </summary>
                <div class="mt-4 space-y-4 border-t border-outline-variant pt-4 font-body-md text-body-md">
                    <div><strong class="block text-on-surface">Who can apply</strong><span class="text-on-surface-variant">${escapeScholarshipText(record.key_eligibility)}</span></div>
                    <div><strong class="block text-on-surface">Eligible fields</strong><span class="text-on-surface-variant">${escapeScholarshipText(record.eligible_fields)}</span></div>
                    <div><strong class="block text-on-surface">How to apply</strong><span class="text-on-surface-variant">${escapeScholarshipText(record.application_route)}</span></div>
                    <div><strong class="block text-on-surface">Deadline / cycle</strong><span class="text-on-surface-variant">${escapeScholarshipText(record.deadline_or_cycle)}</span>${status.timing ? `<span class="scholarship-countdown scholarship-countdown--${status.tone}"><span class="material-symbols-outlined">schedule</span>${escapeScholarshipText(status.timing)}</span>` : ""}</div>
                    <p class="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 font-label-sm text-label-sm text-amber-900">Last checked ${escapeScholarshipText(record.last_verified)}. Always confirm the latest terms on the official website.</p>
                </div>
            </details>
            <div class="mt-6 border-t border-outline-variant pt-5">
                <span class="font-label-sm text-label-sm text-on-surface-variant">${escapeScholarshipText(record.indian_applicant_fit)}</span>
                <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <a class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 font-label-md text-label-md font-bold text-on-secondary shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2" href="${escapeScholarshipText(record.application_url || record.official_url)}" rel="noopener noreferrer" target="_blank">
                        Apply now <span class="material-symbols-outlined text-[18px]">arrow_outward</span>
                    </a>
                    <a class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-primary bg-white px-4 py-3 font-label-md text-label-md font-bold text-primary transition hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" href="${escapeScholarshipText(record.official_url)}" rel="noopener noreferrer" target="_blank">
                        Official details <span class="material-symbols-outlined text-[18px]">open_in_new</span>
                    </a>
                </div>
            </div>
        </article>
    `;
}

async function initScholarshipFinder() {
    const grid = document.querySelector("[data-scholarship-grid]");
    if (!grid) return;

    const response = await fetch(SCHOLARSHIP_DATA_URL);
    if (!response.ok) throw new Error("Unable to load scholarship data.");
    const records = await response.json();
    const controls = {
        search: document.querySelector("[data-scholarship-search]"),
        country: document.querySelector("[data-scholarship-country]"),
        level: document.querySelector("[data-scholarship-level]"),
        funding: document.querySelector("[data-scholarship-funding]"),
        sort: document.querySelector("[data-scholarship-sort]"),
    };
    let selectedStatus = "";

    [...new Set(records.map((record) => record.country))].sort().forEach((country) => {
        controls.country.insertAdjacentHTML("beforeend", `<option value="${escapeScholarshipText(country)}">${escapeScholarshipText(country)}</option>`);
    });
    document.querySelector("[data-scholarship-total]").textContent = records.length;

    const render = () => {
        const query = controls.search.value.trim().toLowerCase();
        const filtered = records.filter((record) => {
            const haystack = [record.name, record.provider, record.country, record.eligible_fields, record.award_summary].join(" ").toLowerCase();
            return (!query || haystack.includes(query))
                && (!controls.country.value || record.country === controls.country.value)
                && (!controls.level.value || record.study_level.toLowerCase().includes(controls.level.value.toLowerCase()))
                && (!controls.funding.value || record.funding_type.toLowerCase().includes(controls.funding.value.toLowerCase()))
                && (!selectedStatus || scholarshipTiming(record).key === selectedStatus);
        });

        const statusRank = (record) => ({ Open: 0, Upcoming: 1, Active: 2, Closed: 3 }[scholarshipTiming(record).key] ?? 4);
        filtered.sort((a, b) => controls.sort.value === "name"
            ? a.name.localeCompare(b.name)
            : controls.sort.value === "status"
                ? statusRank(a) - statusRank(b) || a.name.localeCompare(b.name)
                : a.country.localeCompare(b.country) || a.name.localeCompare(b.name));

        grid.innerHTML = filtered.map(scholarshipCard).join("");
        document.querySelector("[data-scholarship-count]").textContent = `${filtered.length} ${filtered.length === 1 ? "opportunity" : "opportunities"} found`;
        document.querySelector("[data-scholarship-empty]").classList.toggle("hidden", filtered.length !== 0);
    };

    [controls.search, controls.country, controls.level, controls.funding, controls.sort].forEach((control) => control.addEventListener("input", render));
    document.querySelectorAll("[data-scholarship-status]").forEach((button) => button.addEventListener("click", () => {
        selectedStatus = button.dataset.scholarshipStatus;
        document.querySelectorAll("[data-scholarship-status]").forEach((item) => item.classList.toggle("is-active", item === button));
        render();
    }));
    document.querySelector("[data-scholarship-reset]").addEventListener("click", () => {
        controls.search.value = "";
        controls.country.value = "";
        controls.level.value = "";
        controls.funding.value = "";
        controls.sort.value = "country";
        selectedStatus = "";
        document.querySelectorAll("[data-scholarship-status]").forEach((item) => item.classList.toggle("is-active", item.dataset.scholarshipStatus === ""));
        render();
    });
    render();
    window.setInterval(render, 60000);
}

const SITE_LOADER_MINIMUM_DURATION = 600;
let siteLoader = null;
let siteLoaderAnimation = null;
let siteLoaderStartedAt = 0;

function initialiseSiteLoader() {
    if (!document.body || document.querySelector("[data-site-loader]")) return;

    siteLoaderStartedAt = Date.now();
    document.body.insertAdjacentHTML(
        "afterbegin",
        `
            <div class="site-loader" data-site-loader role="status" aria-label="Loading website">
                <div class="site-loader__content">
                    <div class="site-loader__animation" data-site-loader-animation aria-hidden="true"></div>
                    <span class="site-loader__label">Preparing your journey</span>
                </div>
            </div>
        `
    );

    siteLoader = document.querySelector("[data-site-loader]");
    const animationContainer = document.querySelector("[data-site-loader-animation]");

    if (window.lottie && animationContainer) {
        siteLoaderAnimation = window.lottie.loadAnimation({
            container: animationContainer,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "assets/animations/site-loader.json",
        });
    }
}

function hideSiteLoader() {
    if (!siteLoader) return;

    const remainingDuration = Math.max(0, SITE_LOADER_MINIMUM_DURATION - (Date.now() - siteLoaderStartedAt));
    window.setTimeout(() => {
        siteLoader.classList.add("site-loader--hidden");
        window.setTimeout(() => {
            siteLoaderAnimation?.destroy();
            siteLoader.remove();
            siteLoader = null;
        }, 350);
    }, remainingDuration);
}

initialiseSiteLoader();

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await Promise.all([
            loadComponent("#site-header", "components/header.html", "#site-header-template"),
            loadComponent("#site-footer", "components/footer.html", "#site-footer-template"),
        ]);

        initActiveNav();
        initCopyrightYear();
        initNavScrollSpy();
        await initCountryExperiences();
        await initScholarshipFinder();
    } catch (error) {
        console.error(error);
    } finally {
        hideSiteLoader();
    }
});
