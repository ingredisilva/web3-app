declare module '*.png' {
  const value: any
  export = value
}

interface Window {
  ethereum?: {
    [x: string]: { request: ({ method }: { method: string }) => Promise<void> } | undefined
    request: ({ method }: { method: string }) => Promise<void>
  }
}