export interface User {
  id: string
  email: string
  createdAt: string
}


export class SentraCoreClient {
  private baseUrl: string
  private token: string | null

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.token = null
  }

  setToken(token: string) {
    this.token = token
  }

  private async request<T>(method: string, path: string, body?: any): Promise<T> {
    const headers: Record<string, string> = { "Content-Type": "application/json" }
    if (this.token) headers["Authorization"] = `Bearer ${this.token}`
    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    })
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
    if (res.status === 204) return undefined as T
    return (await res.json()) as T
  }


  async getMe(): Promise<User> {
    return await this.request<User>("GET", "/me")
  }


}
