export enum StorageKey {
    colorMode = "@easy-test-color-mode",
    user = "@easy-test-user",
}

export enum APIPath {
    root = "http://easy-test.site/app/",
    auth = "auth",
    registration = "registration",
    refreshCaptcha = "refresh-captcha",
    user = "user",
    setName = "setName",
    changePassword = "changePassword",
    
    logout = "logout",

    connect = "test/connect",
    questions = "testings/questions",
    test = "testings/get",
    updateProgress = "test/updateJsonProgress",
    completeTest = "test/complete",
    getActivate = "testings/getActivate",
    getResultById = "getResultById",

    allActivates = "testings/allActivates",
    activate = "testings/activate",
    deleteActivate = "testings/deleteActivate",

    allTests = "testings/all",
    deleteTest = "testings/delete",

    results = "results",

    testingLink = "testings?test="

}