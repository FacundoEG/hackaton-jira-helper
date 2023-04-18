import axios from "axios"

export class ApiRequest {
    constructor() {
        this.backUrl = "http://localhost:8080";
    }
    async getMessage(body) {
        const { data } = await axios.get(`${this.backUrl}${this.message}`, {params: {text: "", conversationId: ""}})
        return data;
    }
    async postCsv(csvData) {
        const { data } = await axios.post(`${this.backUrl}${this.message}`, { csvData });
        return data;
    }
    async importCsv(file, functionality, setData, setLoading, setError){
        const formData = new FormData();
        formData.append('file', file[0]);
        setLoading(true)
        await axios.post(`${this.backUrl}/import/${functionality}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
            // Manejar la respuesta del back-end
            console.log(response.data);
            setData(response.data)
            setLoading(false)
          }).catch(error => {
            // Manejar errores de la solicitud
            console.error(error);
            setError(true)
          });
    }
    async importCsvDescription(file, description, functionality, setData, setLoading, setError){
      const formData = new FormData();
      formData.append('file', file[0]);
      formData.append('description', description);
      setLoading(true)
      await axios.post(`${this.backUrl}/import/${functionality}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          // Manejar la respuesta del back-end
          console.log(response.data);
          setData(response.data)
          setLoading(false)
        }).catch(error => {
          // Manejar errores de la solicitud
          console.error(error);
          setError(true)
        });
  }
}