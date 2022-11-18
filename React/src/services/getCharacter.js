import {Api} from './api'

export async function getCharacters(params) {
    let res = []
    try {
        await Api.get('/character', {params}).then((response) => {
            res = response.data
        }).catch((err) => {
            console.log(err)
        })
    } catch (err) {
        console.log(err)
    }

    return res
}