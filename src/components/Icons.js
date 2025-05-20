function LeftArrowIcon({ arrowClass }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={arrowClass} viewBox="0 0 512 512">
            <path d="M321.94 98L158.82 237.78a24 24 0 000 36.44L321.94 414c15.57 13.34 39.62 2.28 39.62-18.22v-279.6c0-20.5-24.05-31.56-39.62-18.18z" />
        </svg>
    )
}

function RightArrowIcon({ arrowClass }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={arrowClass} viewBox="0 0 512 512">
            <path d="M190.06 414l163.12-139.78a24 24 0 000-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18z" />
        </svg>
    )
}

function UpDownArrowIcon({ arrowClass }) {
    // whitespace was trimmed
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="{arrowClass}" viewBox="92.15 150.44 327.67 211.12">             
            <path d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z"></path>         
        </svg>
    )
}

function FilmIcon() {
    return (
        <svg className="ionicon" viewBox="0 0 512 512">
            <path d="M436 80H76a44.05 44.05 0 00-44 44v264a44.05 44.05 0 0044 44h360a44.05 44.05 0 0044-44V124a44.05 44.05 0 00-44-44zM112 388a12 12 0 01-12 12H76a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm0-80a12 12 0 01-12 12H76a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm0-80a12 12 0 01-12 12H76a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm0-80a12 12 0 01-12 12H76a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm241.68 124H158.32a16 16 0 010-32h195.36a16 16 0 110 32zM448 388a12 12 0 01-12 12h-24a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm0-80a12 12 0 01-12 12h-24a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm0-80a12 12 0 01-12 12h-24a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm0-80a12 12 0 01-12 12h-24a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12z" />
        </svg>
    )
}

function TvIcon() {
    return (
        <svg className="ionicon" viewBox="0 0 512 512"><path d="M447.86 384H64.14A48.2 48.2 0 0116 335.86V128.14A48.2 48.2 0 0164.14 80h383.72A48.2 48.2 0 01496 128.14v207.72A48.2 48.2 0 01447.86 384z" />
            <path strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M128 416h256" />
        </svg>
    )
}

function TvOutlineIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
            <rect x="32" y="96" width="448" height="272" rx="32.14" ry="32.14" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/>
            <path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M128 416h256"/>
        </svg>
    )
}

function EyeIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <circle cx="256" cy="256" r="64" fill="black" />
            <path d="M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96c-42.52 0-84.33 12.15-124.27 36.11-40.73 24.43-77.63 60.12-109.68 106.07a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416c46.71 0 93.81-14.43 136.2-41.72 38.46-24.77 72.72-59.66 99.08-100.92a32.2 32.2 0 00-.1-34.76zM256 352a96 96 0 1196-96 96.11 96.11 0 01-96 96z" />
        </svg>
    )
}

function MagnifyerIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
            <path d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z" />
        </svg>
    )
}

function MagnifyerButtonIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
            <path d="M256 80a176 176 0 10176 176A176 176 0 00256 80z" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" />
            <path d="M232 160a72 72 0 1072 72 72 72 0 00-72-72z" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" />
            <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M283.64 283.64L336 336" />
        </svg>
    )
}

function InfoIcon() {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
            <path d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z" fill="none" stroke="" strokeMiterlimit="10" strokeWidth="32"/>
            <path fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M220 220h32v116"/>
            <path fill="none" stroke="" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M208 340h88"/>
            <path d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z"/>
        </svg>
    )
}

export { LeftArrowIcon, RightArrowIcon, UpDownArrowIcon, EyeIcon, 
    FilmIcon, TvIcon, TvOutlineIcon, MagnifyerIcon, MagnifyerButtonIcon, InfoIcon }
