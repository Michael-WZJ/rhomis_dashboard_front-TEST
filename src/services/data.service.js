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


    getAllFoodShortageData() {
        return http.get("/data/food_security/food_shortage");
    }

    getFoodShortageByCondition(pro) {
        return http.get(`/data/food_security/food_shortage?projectid=${pro}`);
    }


    getAllFoodConsumedData() {
        return http.get("/data/food_security/food_consumed");
    }

    getFoodConsumedByCondition(pro) {
        return http.get(`/data/food_security/food_consumed?projectid=${pro}`);
    }


    getAllHDDSData() {
        return http.get("/data/food_security/hdds");
    }

    getHDDSByCondition(pro) {
        return http.get(`/data/food_security/hdds?projectid=${pro}`);
    }

}

export default new FullDataService();