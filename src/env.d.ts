declare module '@pagefind/default-ui' {
  declare class PagefindUI {
    constructor(arg: unknown)
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_GA_MEASUREMENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
