import {Api} from './api'

export async function getCharacterDetails(id) {
    let res = null
    try {
        await Api.get(`/character/${id || 1}`).then((response) => {
            res = response.data
        }).catch((err) => {
            console.log(err)
        })
    } catch (err) {
        console.log(err)
    }

    return res
}