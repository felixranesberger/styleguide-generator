import type {in2FirstLevelSection} from "../parser.ts";

function generateMenuSectionHTML(section: in2FirstLevelSection) {
    return `
<li>
    <span class="block px-3 font-semibold rounded-md text-sm text-styleguide-highlight">
        ${section.header}
    </span> 

    ${section.sections.length > 0 ? `
        ${section.sections.map((section) => `
            <li>
                <a 
                    class="block p-3 rounded-md text-sm hover:bg-[rgb(242,242,242)] focus:bg-[rgb(242,242,242)] dark:hover:bg-[rgb(26,26,26)] dark:focus:bg-[rgb(26,26,26)] transition"
                    href="#"
                >
                    ${section.header}
                </a>
            </li>
        `).join('')}
    ` : ''}
</li>
    `.trim()
}

export function generateMenuHTML(sections: in2FirstLevelSection[]) {
    console.log(1734102292334, sections);
    return `
<aside
    class="overflow-y-auto z-100 sticky order-1 hidden w-[260px] flex-col xl:flex border-r border-styleguide-border"
    style="top: var(--header-height); max-height: calc(100vh - var(--header-height))"
>
    <ul class="grid gap-6 px-3 py-6">
        ${sections.map(generateMenuSectionHTML).join('')}
    </ul>
</aside>
    `.trim()
}