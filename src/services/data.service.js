import http from "../http-common";

class FullDataService {
    getAll() {
        return http.get("/data");
    }

    get(formID, type) {
        return http.get(`/data/?formid=${formID}&type=${type}`);
    }


}

export default new FullDataService();