const { ApolloClient, InMemoryCache, HttpLink } = require("@apollo/client/core");
const { GET_CHANNELS_SLOW_QUERY, GET_VIDEO_FAST_QUERY } = require("./queries");
const { PerformanceObserver, performance } = require('perf_hooks');
const fetch = require('cross-fetch')
const process = require('process')
const { print } = require('graphql/language/printer')
const axios = require('axios')

const URL = 'https://hydra.joystream.org/graphql'

// const client = new ApolloClient({
//     link: new HttpLink({ uri: URL, fetch }),
//     cache: new InMemoryCache(),
// })

const runQuery = (query) => {
    const printedQuery = print(query)

    const start = process.hrtime.bigint()
    
    // client.query({query: query,})
    axios.default.post(URL, {query: printedQuery})
    .then(() => {
        const end = process.hrtime.bigint()
        const formattedEnd = (end - start) / 1000n / 1000n
        console.log(`Request took ${formattedEnd}ms`)
    }).catch((err) => {
        console.error("Failed:", err)
    })
}

// run only GET_VIDEO_FAST_QUERY first
// run only GET_CHANNELS_SLOW_QUERY second
// run both at the same time third
// you can see that if both queries are sent at the same time, both will be slow, even though resolving one of them should be fast
runQuery(GET_CHANNELS_SLOW_QUERY)
runQuery(GET_VIDEO_FAST_QUERY)

