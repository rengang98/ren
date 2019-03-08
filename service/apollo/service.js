var apollo = require('node-apollo')
var apolloConfig = require('../../config/apolloConfig').test


async function remoteConfigService(apolloConfig) {
    let res =await apollo.remoteConfigService(apolloConfig)
    console.log(res)
    // apollo.createEnvFile(res)
    return res
}

async function remoteConfigServiceFromCache(apolloConfig) {
    let res = await apollo.remoteConfigServiceFromCache(apolloConfig)
    console.log(res)
    return res
}

remoteConfigService(apolloConfig)
