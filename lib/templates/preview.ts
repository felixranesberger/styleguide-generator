import type { in2SecondLevelSection, in2Section } from '../parser.ts'
import { logicalWriteFile } from '../utils.ts'
import { compilePug } from '../vite-pug.ts'

export function getHeaderHtml(data: { projectTitle: string }) {
  return `
<header class="sticky top-0 z-10 mx-auto flex w-full min-[1222px]:border-x border-b pr-6 max-w-[1220px] border-styleguide-border bg-styleguide-bg-highlight">
    <a class="mr-4 flex items-center border-r py-4 pr-4 pl-6 border-styleguide-border w-[260px]" href="/">
        <p class="font-semibold tracking-tight text-styleguide-highlight">
            ${data.projectTitle}
        </p>
    </a>

    <div class="flex grow items-center justify-end py-4 md:justify-between">
        <button
            class="inline-flex items-center justify-between gap-2 rounded-full border p-2 text-sm transition border-styleguide-border hover:text-styleguide-highlight focus:text-styleguide-highlight md:min-w-[150px] md:py-1.5 md:rounded-md md:px-2"
            aria-controls="search-dialog"
            data-open-search=""
        >
            <span class="sr-only md:not-sr-only">Search page</span>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 md:hidden">
                <path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
            </svg>

            <kbd class="relative hidden items-center gap-1 rounded-md border font-semibold text-[10px] border-styleguide-border px-1.5 md:inline-flex">
                <span class="inline-block text-[12px]">⌘</span>
                <span>K</span>
            </kbd>
        </button>

        <form class="hidden theme-select md:block">
            <fieldset class="flex items-center rounded-3xl border border-styleguide-border">
                <legend class="sr-only">Select a display theme:</legend>

                <input id="normal" class="sr-only" type="radio" value="normal" name="theme">
                <label for="normal" class="cursor-pointer p-2">
                    <span class="sr-only">System</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                    </svg>
                </label>

                <input id="light" class="sr-only" type="radio" value="light" name="theme">
                <label for="light" class="cursor-pointer p-2">
                    <span class="sr-only">Light</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>
                </label>

                <input id="dark" class="sr-only" type="radio" value="dark" name="theme">
                <label for="dark" class="cursor-pointer p-2">
                    <span class="sr-only">Dark</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                </label>
            </fieldset>
        </form>
    </div>
</header>
`.trim()
}

export function getSidebarMenuHtml(
  sections: {
    title: string
    items: { label: string, href: string }[]
  }[],
  activePageHref: string,
) {
  const getItemHtml = (item: { label: string, href: string }) => {
    if (item.href.includes(activePageHref)) {
      return `<div class="menu-item menu-item--active">${item.label}</div>`
    }

    return `<a class="menu-item" href="${item.href}">${item.label}</a>`
  }

  return `
<ul class="grid gap-6 px-3 py-6">
    ${sections.map(section => `
        <li>
            <span class="block rounded-md px-3 text-sm font-semibold text-styleguide-highlight">
                ${section.title}
            </span>
            <ul class="mt-3 grid gap-2">
                ${section.items.map(item => `
                    <li>
                       ${getItemHtml(item)}
                    </li>
                `).join('\n')}
            </ul>
        </li>
    `).join('\n')}
</ul>
`.trim()
}

export function getMainContentHtml(secondLevelSection: in2SecondLevelSection) {
  let output = ''

  function renderSection(section: in2Section) {
    if (section.colors && section.colors.length > 0) {
      output += getMainContentSectionWrapper(section, getMainContentColors(section))
    }
    else if (section.icons && section.icons.length > 0) {
      output += getMainContentSectionWrapper(section, getMainContentIcons(section))
    }
    else {
      const content = section.markup ? getMainContentRegular(section) : undefined
      output += getMainContentSectionWrapper(section, content)
    }
  }

  renderSection(secondLevelSection)
  secondLevelSection.sections.forEach(renderSection)

  return output
}

function getMainContentSectionWrapper(section: in2Section, html?: string): string {
  const headingTag = section.sectionLevel === 'second' ? 'h1' : 'h2'
  const headingClass = section.sectionLevel === 'second' ? 'text-4xl' : 'text-2xl'
  const hasSectionExternalFullPage = section.markup.length > 0
    && (section.icons === undefined || section.icons.length === 0)
    && (section.colors === undefined || section.colors.length === 0)

  return `
<section id="section-${section.id}" class="border-b px-4 py-10 border-b-styleguide-border md:px-10">
    <div class="flex items-center justify-between gap-6">
        <a class="relative group" href="#section-${section.id}">
            <svg class="absolute top-1/2 -left-6 -translate-y-1/2 opacity-0 transition size-[18px] group-hover:opacity-100 group-focus:opacity-100"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z"/>
                <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z"/>
            </svg>
            <${headingTag} class="${headingClass} font-semibold text-styleguide-highlight">${section.header}</${headingTag}>
        </a>

        ${hasSectionExternalFullPage
          ? `
          <a class="p-2 group" href="/${section.fullpageFileName}" target="_blank" title="Open ${section.header} in fullpage">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4">
                <path class="transition group-hover:translate-x-px group-hover:-translate-y-px group-focus:translate-x-px group-focus:-translate-y-px" d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"/>
                <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"/>
            </svg>
          </a>
        `
          : ''}
    </div>
    ${section.description ? `<p class="mt-2 font-mono${section.sectionLevel === 'second' ? ' text-xl' : ''}">${section.description}</p>` : ''}
${html ?? ''}
</section>
  `
}

function getMainContentRegular(section: in2Section): string {
  return `
    <!-- Preview Box -->
    <div class="mt-4 overflow-hidden rounded-2xl border border-styleguide-border">
        <div class="w-full border-b p-6 bg-styleguide-bg-highlight border-styleguide-border">
            <iframe
                    id="preview-fullpage-${section.id}"
                    src="/${section.fullpageFileName}"
                    class="w-full preview-iframe"
                    title="${section.header} Preview"
            ></iframe>
        </div>

        <!-- Code -->
        <details class="group">
           <summary class="flex cursor-pointer items-center gap-2 rounded-b-2xl px-6 py-4 text-sm font-light bg-styleguide-bg">
                <svg class="h-4 w-4 group-open:rotate-90 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/>
                </svg>
  
                <span class="group-open:hidden">Show code</span>
                <span class="group-open:block hidden">Hide code</span>
            </summary>

            <div class="border-t p-6 text-sm bg-styleguide-bg-highlight border-styleguide-border">
                <div id="code-fullpage-${section.id}" class="overflow-x-auto w-full code-highlight">
                  <template data-type="code">
${compilePug('production', section.markup)}
                  </template>
              </div>
            </div>
        </details>
    </div>
    
    ${section.modifiers?.length > 0
      ? `
       <!-- Modifiers List -->
      <h3 class="mt-6 flex items-center text-xl font-semibold text-styleguide-highlight gap-1.5">
          ${section.header} Modifiers
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 text-styleguide">
              <path d="M7.25 1.75a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-1.5 0v-1.5ZM11.536 2.904a.75.75 0 1 1 1.06 1.06l-1.06 1.061a.75.75 0 0 1-1.061-1.06l1.06-1.061ZM14.5 7.5a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .75-.75ZM4.464 9.975a.75.75 0 0 1 1.061 1.06l-1.06 1.061a.75.75 0 1 1-1.061-1.06l1.06-1.061ZM4.5 7.5a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .75-.75ZM5.525 3.964a.75.75 0 0 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 1.06-1.061l1.061 1.06ZM8.779 7.438a.75.75 0 0 0-1.368.366l-.396 5.283a.75.75 0 0 0 1.212.646l.602-.474.288 1.074a.75.75 0 1 0 1.449-.388l-.288-1.075.759.11a.75.75 0 0 0 .726-1.165L8.78 7.438Z" />
          </svg>
      </h3>
      <ul class="mt-4 grid gap-6 overflow-hidden rounded-2xl border p-6 border-styleguide-border bg-styleguide-bg-highlight md:grid-cols-2 md:gap-x-10 md:gap-y-14">
          ${section.modifiers?.map(modifier => `
              <li>
                <div>
                    <div class="flex items-center justify-between gap-6">
                        <div class="flex items-center gap-3">
                            <h4 class="font-semibold text-styleguide-highlight">${modifier.description}</h4>
    
                            <button
                                  class="inline-block rounded-md border py-1 font-mono font-semibold transition duration-500 text-[10px] border-styleguide-border px-2.5 bg-styleguide-bg-highlight hover:text-styleguide-highlight focus:text-styleguide-highlight"
                                  title="Copy content"
                                  data-clipboard-value="${modifier.value}"
                            >
                                ${modifier.value}
                            </button>
                        </div>
    
                        <a class="p-2 group" href="/${section.fullpageFileName}?modifier=${modifier.value}" target="_blank" title="Open in fullpage">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                                <path class="transition group-hover:translate-x-px group-hover:-translate-y-px group-focus:translate-x-px group-focus:-translate-y-px"
                                      d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"/>
                                <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"/>
                            </svg>
                        </a>
                    </div>
    
                    <iframe
                          src="/${section.fullpageFileName}?modifier=${modifier.value}"
                          class="mt-2 w-full preview-iframe"
                          title="${section.header} Preview - Modifier: ${modifier.value}"
                    ></iframe>
                </div>
            </li>
          `).join('\n')}
      </ul>      
    `
      : ''}
  `
}

function getMainContentColors(section: in2Section): string {
  return `
    <ul class="my-6 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
        ${section.colors?.map(
          color => `<li class="relative rounded-2xl px-4 py-6" style="background-color: ${color.color}"></li>`,
        ).join('\n')}
    </ul>
  `
}

function getMainContentIcons(section: in2Section): string {
  return `
    <form
        id="icon-search"
        class="my-6 flex items-center overflow-hidden rounded-2xl border px-4 py-2 gap-2.5 bg-styleguide-bg-highlight border-styleguide-border"
        onsubmit="return false;"
    >
        <label for="icon-search-input">
            <span class="sr-only">Search icons</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
            </svg>
        </label>

        <input
            id="icon-search-input"
            class="flex-grow bg-transparent icon-search-input h-[28px] focus:outline-none"
            placeholder="Search icons..."
            aria-autocomplete="list"
            autocomplete="off"
            role="combobox"
            spellcheck="false"
            type="text"
            value=""
            aria-controls="icon-search"
        >

        <button
            id="icon-search-input-reset"
            class="hidden icon-search-input-reset"
            type="reset"
        >
            <span class="sr-only">Reset search input</span>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
            </svg>
        </button>
    </form>

    <div class="min-h-[400px] md:min-h-[250px]">
        <ul
            id="icon-search-list"
            class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
            ${section.icons?.map(icon => `
              <li class="relative grid gap-4 rounded-2xl border border-transparent px-4 py-6 transition duration-700 items icon-search-list__item bg-styleguide-bg-highlight hover:border-styleguide-border focus:border-styleguide-border">
                  <div class="relative flex w-full justify-center size-6 text-styleguide-highlight [&>svg]:h-full [&>svg]:w-auto">
                      ${icon.svg}
  
                      <!-- Successfully copied icon -->
                      <svg class="pointer-events-none ease-in-out icon-search-list__item-copy-icon size-5 text-styleguide-highlight" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                      </svg>
                  </div>
                  <p class="text-center font-mono text-sm font-semibold hyphens-auto">${icon.name}</p>
                  <button
                      class="absolute inset-0 cursor-pointer bg-transparent icon-search-list__item-copy"
                      title="Copy svg content"
                  ></button>
              </li>
            `).join('\n')}
        </ul>
    </div>
  `
}

export function getNextPageControlsHtml(data: {
  before?: {
    label: string
    href: string
  }
  after?: {
    label: string
    href: string
  }
}) {
  return `
<nav class="flex w-full justify-between px-4 py-10 md:px-10">
    <div>
        ${data.before
          ? `
          <a class="flex items-center gap-1 group" href="${data.before.href}">
            <svg class="h-5 w-5 transition group-hover:-translate-x-0.5 group-focus:-translate-x-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd"/>
            </svg>
    
            <span class="grid gap-1.5">
                <span class="text-sm font-light leading-none">Previous</span>
                <span class="font-semibold leading-none text-styleguide-highlight">${data.before.label}</span>
            </span>
        </a>
        `
          : ``}
    </div>
    
    <div>
        ${data.after
          ? `
                    <a class="flex items-center gap-1 group" href="${data.after.href}">
                    <span class="grid text-right gap-1.5">
                        <span class="text-sm font-light leading-none">Next</span>
                        <span class="font-semibold leading-none text-styleguide-highlight">${data.after.label}</span>
                    </span>
        
                    <svg class="h-5 w-5 transition group-hover:translate-x-0.5 group-focus:translate-x-0.5"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/>
                    </svg>
                </a>
        `
          : ``}
    </div>
</nav>
`.trim()
}

export function getSearchHtml(sections: {
  title: string
  items: { label: string, searchKeywords: string[], href: string }[]
}[]) {
  return `
<dialog
    id="search-dialog"
    class="fixed -inset-x-0 top-auto bottom-0 z-30 -mb-px w-full max-w-none overflow-y-auto rounded-t-2xl border search bg-styleguide-bg border-styleguide-border text-styleguide md:max-w-[640px] md:top-1/2 md:bottom-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl mx-0"
>
    <h2 class="sr-only">Search</h2>
    <div class="border-b px-4 py-3 border-styleguide-border">
        <input
            id="search-input"
            class="w-full bg-transparent text-[18px] h-[28px] focus:outline-none"
            placeholder="Search..."
            aria-autocomplete="list"
            autocomplete="off"
            role="combobox"
            spellcheck="false"
            type="text"
            value=""
        >
    </div>

    <nav id="search-list" class="grid gap-4 px-4 py-3 text-sm">
        ${sections.map(section => `
            <div class="search-category">
                <h3 class="mb-2">${section.title}</h3>
                <ul>
                    ${section.items.map(item => `
                        <li 
                            class="search-category__item search-category__item--active" 
                            data-search-keywords="${item.searchKeywords.map(x => x.replaceAll('"', `'`)).join(',')}"
                          >
                            <a 
                                class="flex items-center gap-4 px-1.5 py-2.5 group rounded-md hover:bg-[rgb(242,242,242)] focus:bg-[rgb(242,242,242)] dark:hover:bg-[rgb(26,26,26)] dark:focus:bg-[rgb(26,26,26)] transition" 
                                href="${item.href}"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="transition-all size-5 group-hover:translate-x-0.5 group-focus:translate-x-0.5">
                                    <path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" />
                                </svg>
                                <span class="text-styleguide-highlight">
                                ${item.label}
                            </span>
                            </a>
                        </li>
                    `).join('\n')}
                </ul>
            </div>          
        `).join('\n')}
    </nav>

    <p id="search-no-results" class="hidden px-6 py-8 text-center text-sm">
        No results found
    </p>
</dialog>
`.trim()
}

export function generatePreviewFile(data: {
  filePath: string
  page: {
    title: string
    description?: string
    lang: string
  }
  css: string[]
  js: {
    src: string
    additionalAttributes?: Record<string, string>
  }[]
  html: {
    header: string
    sidebarMenu: string
    mainContent: string
    nextPageControls: string
    search: string
  }
}) {
  const content = `
<!doctype html>
<html lang="${data.page.lang}">
<head>
    <title>${data.page.title}</title>
    ${data.page.description ? `<meta name="description" content="${data.page.description.replaceAll(`'`, '').replaceAll(`"`, '')}">` : ''}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta name="generator" content="styleguide">
    <link rel="icon" type="image/svg+xml" href="/assets/favicon/preview.svg">
    <link rel="stylesheet" type="text/css" href="/assets/styleguide.css" />
    <script type="module" src="/assets/client.js"></script>
</head>
<body class="relative min-h-screen antialiased text-styleguide">
    ${data.html.header}
  
    <main class="relative flex h-full min-h-screen min-[1222px]:border-x min-[1220px]:mx-auto max-w-[1220px] border-styleguide-border">
      <aside
          class="sticky order-1 hidden flex-col overflow-y-auto border-r z-100 w-[260px] border-styleguide-border shrink-0 xl:flex"
          style="top: var(--header-height); max-height: calc(100vh - var(--header-height))"
      >
        ${data.html.sidebarMenu}
      </aside>
      
      <div class="order-2 w-full xl:w-[calc(100%-260px)]">
        ${data.html.mainContent}
        ${data.html.nextPageControls}
      </div>
    </main>
   
    ${data.html.search}
</body>
</html>
`.trim()

  logicalWriteFile(data.filePath, content)
}
