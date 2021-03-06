import { AxiosInstance } from 'axios'

const qs = require('qs')

const API_BOOKS = '/api/v1/books'

export default class KomgaBooksService {
  private http: AxiosInstance;

  constructor (http: AxiosInstance) {
    this.http = http
  }

  async getBooks (libraryId?: number, pageRequest?: PageRequest, search?: string, mediaStatus?: string[]): Promise<Page<BookDto>> {
    try {
      const params = { ...pageRequest } as any
      if (libraryId) {
        params.library_id = libraryId
      }
      if (search) {
        params.search = search
      }
      if (mediaStatus) {
        params.media_status = mediaStatus
      }
      return (await this.http.get(API_BOOKS, {
        params: params,
        paramsSerializer: params => qs.stringify(params, { indices: false }),
      })).data
    } catch (e) {
      let msg = 'An error occurred while trying to retrieve books'
      if (e.response.data.message) {
        msg += `: ${e.response.data.message}`
      }
      throw new Error(msg)
    }
  }

  async getBook (bookId: number): Promise<BookDto> {
    try {
      return (await this.http.get(`${API_BOOKS}/${bookId}`)).data
    } catch (e) {
      let msg = 'An error occurred while trying to retrieve book'
      if (e.response.data.message) {
        msg += `: ${e.response.data.message}`
      }
      throw new Error(msg)
    }
  }

  async getBookSiblingNext (bookId: number): Promise<BookDto> {
    try {
      return (await this.http.get(`${API_BOOKS}/${bookId}/next`)).data
    } catch (e) {
      let msg = 'An error occurred while trying to retrieve book'
      if (e.response.data.message) {
        msg += `: ${e.response.data.message}`
      }
      throw new Error(msg)
    }
  }

  async getBookSiblingPrevious (bookId: number): Promise<BookDto> {
    try {
      return (await this.http.get(`${API_BOOKS}/${bookId}/previous`)).data
    } catch (e) {
      let msg = 'An error occurred while trying to retrieve book'
      if (e.response.data.message) {
        msg += `: ${e.response.data.message}`
      }
      throw new Error(msg)
    }
  }

  async getBookPages (bookId: number): Promise<PageDto[]> {
    try {
      return (await this.http.get(`${API_BOOKS}/${bookId}/pages`)).data
    } catch (e) {
      let msg = 'An error occurred while trying to retrieve book pages'
      if (e.response.data.message) {
        msg += `: ${e.response.data.message}`
      }
      throw new Error(msg)
    }
  }

  async analyzeBook (book: BookDto) {
    try {
      await this.http.post(`${API_BOOKS}/${book.id}/analyze`)
    } catch (e) {
      let msg = `An error occurred while trying to analyze book '${book.name}'`
      if (e.response.data.message) {
        msg += `: ${e.response.data.message}`
      }
      throw new Error(msg)
    }
  }

  async refreshMetadata (book: BookDto) {
    try {
      await this.http.post(`${API_BOOKS}/${book.id}/metadata/refresh`)
    } catch (e) {
      let msg = `An error occurred while trying to refresh metadata for book '${book.name}'`
      if (e.response.data.message) {
        msg += `: ${e.response.data.message}`
      }
      throw new Error(msg)
    }
  }

  async updateMetadata (bookId: number, metadata: BookMetadataUpdateDto): Promise<BookDto> {
    try {
      return (await this.http.patch(`${API_BOOKS}/${bookId}/metadata`, metadata)).data
    } catch (e) {
      let msg = `An error occurred while trying to update book metadata`
      if (e.response.data.message) {
        msg += `: ${e.response.data.message}`
      }
      throw new Error(msg)
    }
  }
}
