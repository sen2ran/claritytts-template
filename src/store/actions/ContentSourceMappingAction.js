export function setContentSourceMappingInclude(payload) {
    return {
      type: "SET_CONTENT_SOURCE_MAPPING_INCLUDE",
      payload: payload
    };
  }
  
  export function setContentSourceMappingExclude(payload) {
    return {
      type: "SET_CONTENT_SOURCE_MAPPING_EXCLUDE",
      payload: payload
    };
  }

  export function setIsValid(payload){
    return {
      type: "SET_CONTENT_SOURCE_MAPPING_IS_VALID",
      payload: payload
    }
  }