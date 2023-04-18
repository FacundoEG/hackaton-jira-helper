const axios = require('axios')

export class ApiRequests {
    constructor() {
        this.backUrl = "http://localhost:3000";
        this.message = "/sendMessage";
        this.importCsv = "/parse-jira";
    }
    async getMessage(body) {
        const { data } = await axios.get(`${this.backUrl}${this.message}`, {params: {text: "", conversationId: ""}})
        return data;
    }
    async postCsv(csvData) {
        const { data } = await axios.post(`${this.backUrl}${this.message}`, { csvData });
        return data;
    }
    async importCsv(file, functionality){
        const formData = new FormData();
        formData.append('file', file);
        axios.post(`${this.backUrl}${this.importCsv}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
            // Manejar la respuesta del back-end
            console.log(response.data);
          }).catch(error => {
            // Manejar errores de la solicitud
            console.error(error);
          });
    }
}