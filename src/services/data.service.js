import http from "../http-common";

class FullDataService {
    getByDataType(dataType) {
        return http.get(`/data/${dataType}`);
    }

    get(formID, dataType) {
        return http.get(`/data/${dataType}?formid=${formID}`);
    }


}

export default new FullDataService();