import http from "../http-common";

class FullDataService {
    getByDataType(dataType) {
        return http.get(`/data/raw_data/${dataType}`);
    }

    get(formID, dataType) {
        return http.get(`/data/raw_data/${dataType}?formid=${formID}`);
    }

    getAllHFIASData() {
        return http.get("/data/food_security/hfias");
    }

    getHFIASByCondition(pro) {
        return http.get(`/data/food_security/hfias?projectid=${pro}`);
    }

    getAllFoodSecurityData() {
        return http.get("/data/food_security/food_shortage");
    }

    getFoodSecurityByCondition(pro) {
        return http.get(`/data/food_security/food_shortage?projectid=${pro}`);
    }

}

export default new FullDataService();