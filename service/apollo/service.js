var apollo = require('node-apollo')
var apolloConfig = require('../../config/apolloConfig').test
const assert = require('assert');

async function remoteConfigService(apolloConfig) {
    let res =await apollo.remoteConfigService(apolloConfig)
    console.log(res)
    // apollo.createEnvFile(res)
    return res
}

async function remoteConfigServiceFromCache(apolloConfig) {
    return await apollo.remoteConfigServiceFromCache(apolloConfig)
}

async function remoteConfigServiceSkipCache(apolloConfig) {
    return await apollo.remoteConfigServiceSkipCache(apolloConfig)
}

async function write(res) {
    try {
        await apollo.createEnvFile(res)
        console.log(res)
        // await apollo.setEnv()
    }catch (e){
        assert(e,"fail")
    }

    return 'success'
}

async function update(apolloConfig) {
    let res = await remoteConfigServiceSkipCache(apolloConfig)
    return write(res)
}

remoteConfigService(apolloConfig)
// update(apolloConfig)
