import type { in2Section } from '../parser.ts'
import { logicalWriteFile } from '../utils.ts'

export function getHeaderHtml(data: { projectTitle: string }) {
  return `
<header class="sticky top-0 z-10 mx-auto -mx-px flex w-full border-b pr-6 max-w-[1220px] border-styleguide-border bg-styleguide-bg-highlight">
    <a class="mr-4 block flex items-center border-r py-4 pr-4 pl-6 border-styleguide-border w-[260px] xl:border-l" href="/">
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

export function getMainContentHtml(data: in2Section) {}

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
  items: { label: string, searchKeywords: string[] }[]
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
                        <li class="search-category__item search-category__item--active" data-search-keywords="${item.searchKeywords.join(',')}">
                            <a class="flex items-center gap-4 px-1.5 py-2.5 group rounded-md hover:bg-[rgb(242,242,242)] focus:bg-[rgb(242,242,242)] dark:hover:bg-[rgb(26,26,26)] dark:focus:bg-[rgb(26,26,26)] transition" href="#">
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
  const computedScriptTags = data.js.map((js) => {
    const additionalAttributes = js.additionalAttributes ? Object.entries(js.additionalAttributes).map(([key, value]) => `${key}="${value}"`).join(' ') : ''
    return `<script src="${js.src}" ${additionalAttributes}></script>`
  })

  const content = `
<!doctype html>
<html lang="${data.page.lang}">
<head>
    <title>${data.page.title}</title>
    <meta name="description" content="${data.page.description || ''}">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta name="generator" content="styleguide">
    ${data.css.map(css => `<link rel="stylesheet" type="text/css" href="${css}" />`).join('\n')}
    <script type="module" src="/fullpage.js"></script>
</head>
<body class="relative min-h-screen antialiased text-styleguide">
    ${data.html.header}
    
    <main class="relative mx-auto -mx-[2px] flex h-full min-h-screen border-x max-w-[1220px] border-styleguide-border">
      <aside
          class="sticky order-1 -mx-px hidden flex-col overflow-y-auto border-r z-100 w-[260px] border-styleguide-border shrink-0 xl:flex"
          style="top: var(--header-height); max-height: calc(100vh - var(--header-height))"
      >
        ${data.html.sidebarMenu}
      </aside>
      
      <div class="order-2 grow">
        ${data.html.mainContent}
        ${data.html.nextPageControls}
      </div>
    </main>
    ${data.html.search}
    ${computedScriptTags.join('\n')}
</body>
</html>
`.trim()

  logicalWriteFile(data.filePath, content)
}
