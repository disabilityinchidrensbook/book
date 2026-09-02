/* ========================================================= */
/* ACCESSIBILITY SETTINGS */
/* ========================================================= */

const accessibility = {

    defaults: {
        theme: "light",
        font: "default",
        textSize: "normal",
        spacing: "normal",
        lineHeight: "normal",
        alignment: "left",
        saturation: "normal",
        highlightLinks: false,
        reduceMotion: false,
        hideImages: false,
        cursor: "normal",
        enhancedFocus: false
    },

    settings: {}
};


/* ========================================================= */
/* LOAD SAVED PREFERENCES */
/* ========================================================= */

function loadAccessibilitySettings() {

    const saved =
        localStorage.getItem("accessibilitySettings");

    accessibility.settings = {
        ...accessibility.defaults,
        ...(saved ? JSON.parse(saved) : {})
    };

    applyAccessibilitySettings();
}


/* ========================================================= */
/* APPLY SETTINGS */
/* ========================================================= */

function applyAccessibilitySettings() {

    const root = document.documentElement;


    /* ----------------------------------------------------- */
    /* Remove old setting classes */
    /* ----------------------------------------------------- */

    root.classList.remove(

        /* Theme */
        "theme-light",
        "theme-dark",
        "theme-high-contrast",

        /* Font */
        "font-default",
        "font-lexend",
        "font-opendyslexia",

        /* Text size */
        "text-small",
        "text-normal",
        "text-large",
        "text-xlarge",
        "text-xxlarge",

        /* Spacing */
        "spacing-normal",
        "spacing-wide",
        "spacing-xwide",

        /* Line height */
        "line-height-normal",
        "line-height-relaxed",
        "line-height-large",

        /* Alignment */
        "align-left",
        "align-center",
        "align-right",
        "align-justify",

        /* Saturation */
        "saturation-normal",
        "saturation-low",
        "saturation-none",

        /* Cursor */
        "cursor-normal",
        "cursor-large",
        "cursor-xlarge"
    );


    /* ----------------------------------------------------- */
    /* Add current settings */
    /* ----------------------------------------------------- */

    root.classList.add(

        `theme-${accessibility.settings.theme}`,

        `font-${accessibility.settings.font}`,

        `text-${accessibility.settings.textSize}`,

        `spacing-${accessibility.settings.spacing}`,

        `line-height-${accessibility.settings.lineHeight}`,

        `align-${accessibility.settings.alignment}`,

        `saturation-${accessibility.settings.saturation}`,

        `cursor-${accessibility.settings.cursor}`
    );


    /* ----------------------------------------------------- */
    /* Toggle settings */
    /* ----------------------------------------------------- */

    root.classList.toggle(
        "highlight-links",
        accessibility.settings.highlightLinks
    );

    root.classList.toggle(
        "reduce-motion",
        accessibility.settings.reduceMotion
    );

    root.classList.toggle(
        "hide-images",
        accessibility.settings.hideImages
    );

    root.classList.toggle(
        "enhanced-focus",
        accessibility.settings.enhancedFocus
    );


    /* Update button appearance */

    updateAccessibilityButtons();
}


/* ========================================================= */
/* SAVE PREFERENCES */
/* ========================================================= */

function saveAccessibilitySettings() {

    localStorage.setItem(
        "accessibilitySettings",
        JSON.stringify(accessibility.settings)
    );
}


/* ========================================================= */
/* UPDATE BUTTON APPEARANCE */
/* ========================================================= */

function updateAccessibilityButtons() {

    document
        .querySelectorAll(".accessibility-option")
        .forEach(button => {

            const setting = button.dataset.setting;
            const value = button.dataset.value;
            const toggle = button.dataset.toggle;


            /* Normal setting */

            if (setting) {

                button.classList.toggle(
                    "active",
                    accessibility.settings[setting] === value
                );

            }


            /* Toggle setting */

            if (toggle) {

                button.classList.toggle(
                    "active",
                    accessibility.settings[toggle] === true
                );

            }

        });
}


/* ========================================================= */
/* CHANGE SETTING */
/* ========================================================= */

function changeAccessibilitySetting(setting, value) {

    accessibility.settings[setting] = value;

    applyAccessibilitySettings();

    saveAccessibilitySettings();
}


/* ========================================================= */
/* TOGGLE SETTING */
/* ========================================================= */

function toggleAccessibilitySetting(setting) {

    accessibility.settings[setting] =
        !accessibility.settings[setting];

    applyAccessibilitySettings();

    saveAccessibilitySettings();
}


/* ========================================================= */
/* SIDEBAR SETUP */
/* ========================================================= */

function setupAccessibilityPanel() {

    const panel =
        document.getElementById("accessibilityPanel");

    const button =
        document.getElementById("accessibilityButton");

    const close =
        document.getElementById("accessibilityClose");

    const clear =
        document.getElementById("clearAccessibility");


    /* Sidebar has not loaded yet */

    if (!panel || !button) {
        return;
    }


    /* ----------------------------------------------------- */
    /* Open sidebar */
    /* ----------------------------------------------------- */

    button.addEventListener("click", () => {

        panel.classList.add("open");

        panel.setAttribute(
            "aria-hidden",
            "false"
        );

        button.setAttribute(
            "aria-expanded",
            "true"
        );

    });


    /* ----------------------------------------------------- */
    /* Close sidebar */
    /* ----------------------------------------------------- */

    if (close) {

        close.addEventListener("click", () => {

            panel.classList.remove("open");

            panel.setAttribute(
                "aria-hidden",
                "true"
            );

            button.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    }


    /* ----------------------------------------------------- */
    /* Accessibility buttons */
    /* ----------------------------------------------------- */

    document
        .querySelectorAll(".accessibility-option")
        .forEach(option => {

            option.addEventListener("click", () => {

                const setting =
                    option.dataset.setting;

                const value =
                    option.dataset.value;

                const toggle =
                    option.dataset.toggle;


                /* Setting such as theme, font, size */

                if (setting && value) {

                    changeAccessibilitySetting(
                        setting,
                        value
                    );

                }


                /* Toggle such as hide images */

                if (toggle) {

                    toggleAccessibilitySetting(
                        toggle
                    );

                }

            });

        });


    /* ----------------------------------------------------- */
    /* Clear preferences */
    /* ----------------------------------------------------- */

    if (clear) {

        clear.addEventListener("click", () => {

            accessibility.settings = {
                ...accessibility.defaults
            };

            localStorage.removeItem(
                "accessibilitySettings"
            );

            applyAccessibilitySettings();

        });

    }


    /* Initial button states */

    updateAccessibilityButtons();
}


/* ========================================================= */
/* INITIALISATION */
/* ========================================================= */

loadAccessibilitySettings();


/*
 * The Charadex sidebar is loaded dynamically.
 *
 * Try once when the page loads, then again shortly
 * afterwards in case load-html has not finished yet.
 */

document.addEventListener(
    "DOMContentLoaded",
    setupAccessibilityPanel
);

setTimeout(
    setupAccessibilityPanel,
    500
);

