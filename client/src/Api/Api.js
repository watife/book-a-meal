import axios from "axios";
const baseUrl = process.env.FAKE_URL;

class Api {
  static async create(url, data) {
    try {
      const response = await axios.post(`${baseUrl}/${url}`, data);

      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async fake(url) {
    try {
      const response = await axios.get(`${baseUrl}/${url}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async get(url) {
    try {
      const response = await axios.get(`${baseUrl}/${url}`);

      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async update(url, data) {
    try {
      const response = await axios.post(`${baseUrl}/${url}`, data);

      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async delete(url, data) {
    try {
      const response = await axios.post(`${baseUrl}/${url}`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async auth(url, data) {
    try {
      const response = await axios.post(`${baseUrl}/${url}`, data);

      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default Api;
